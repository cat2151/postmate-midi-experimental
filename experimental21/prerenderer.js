const preRenderer = { registerPrerenderButton, registerWavImportButton, onCompleteHandshakeAllChildren, onStartPreRender, doPreRenderAsync, schedulingPreRender, renderContextAsync, setContextInitSynthAddWav, sendWavAfterHandshakeAllChildrenSub, saveWavByDialog, sendToSampler, updateGnWavs, samplerAddWavs, afterWavFileUploadAsync, getChNum, registerGeneratedSoundVisualizer };

// 用途の例：
//  generatorにて、プリレンダで音色wavを生成する用。生成されたwavはsamplerに送信され、演奏に利用できる。
//  samplerにて、プリレンダでmixdown wavを生成する用。生成されたwavはローカルにダウンロードされる。

// function isAutoStartPrerender() { // ボツ。ボツ理由は、これでは用途を満たさないため。prerendererをimportするchildにおいても、autostartしたいsynthと、autostartしないsamplerとで用途が違う。このfncだとsampler側がautostartしようとしてバグってしまった。
//   console.log('isAutoStartPrerender');
//   return true;
// }

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
function registerPrerenderButton(postmateMidi, buttonSelector) {
  postmateMidi.hasPreRenderButton = true;
  const ui = postmateMidi.ui;
  ui.button = document.querySelector(buttonSelector);
  ui.button.onclick = function() {
    console.log(`%c${postmateMidi.getParentOrChild()} : onclick prerenderButton`, 'color:black; background-color:lightblue');
    const gn = postmateMidi.tonejs.generator;

    postmateMidi.isPreRenderSynth = true; // noteOn時にprerender用のtimestamp制御をする用

    // prerender ※この3行は、ひとまずsendWavAfterHandshakeAllChildrenのコピー。あとでfncにして共通化するかも
    gn.orgContext = Tone.getContext();
    console.log(`${postmateMidi.getParentOrChild()} : emit onStartPreRender`);
    postmateMidi.parent.emit('onStartPreRender' + (postmateMidi.childId + 1));
    // 以降は非同期で後続処理へ
  };
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
function registerWavImportButton(postmateMidi, buttonSelector) {
  postmateMidi.hasWavImportButton = true;
  const ui = postmateMidi.ui;
  ui.wavImportButton = document.querySelector(buttonSelector);
  ui.wavImportButton.onclick = function() {
    console.log(`%c${postmateMidi.getParentOrChild()} : onclick wavImportButton`, 'color:black; background-color:lightblue');
    postmateMidi.openDialogForFileUpload(postmateMidi.preRenderer.afterWavFileUploadAsync);
  };
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
function onCompleteHandshakeAllChildren(postmateMidi, data) {
  autoExecPrerender(postmateMidi);
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
function autoExecPrerender(postmateMidi) {
  // 開発用 log
  if (postmateMidi.preRenderer.registerPrerenderer) {
    console.log(`${postmateMidi.getParentOrChild()} : sendWavAfterHandshakeAllChildren : preRenderer未登録`); // これが出力されるケースは基本的に、そもそもseq-childなのでprerenderをregisterしていないケースである
  } else {
    console.log(`${postmateMidi.getParentOrChild()} : sendWavAfterHandshakeAllChildren : preRenderer登録済`);
  }

  const gn = postmateMidi.tonejs.generator;
  if (gn.isSent) return; // 備忘、現在は未使用。project内部でほかにhitなし。過去に使っていた可能性あり。

  // webpage起動完了後、
  // 自動でprerenderを開始する
  // ※備忘、現在判定に使っている isPreRenderSynth は、まずsynth-childにてtrueにすることで、synthのみtrueにしている。samplerはこの時点ではまだprerenderできない。wavないので。そして、のち、samplerにwavが届いたあとは、registerPrerenderButton でsamplerもtrueにしている。
  console.log(`${postmateMidi.getParentOrChild()} : sendWavAfterHandshakeAllChildren : isPreRenderSynth : `, postmateMidi.isPreRenderSynth); // 備忘、これで可視化した結果、sampler側はこれはfalse。つまりprerenderer登録済、でisPreRenderSynthがfalse。意図通り。開始時にauto prerenderしたいのは、synth側のみなので。sampler側はそもそもまだsynthがprerender終わってない状態ではauto prerenderはできないので。
  // if (postmateMidi.preRenderer.isAutoStartPrerender && postmateMidi.preRenderer.isAutoStartPrerender()) { // ボツ。ボツ理由、これだとエラー。こっちだとsampler側もtrueになってしまい、起動時のsamplerにwavがない状態でautoprerenderしようとしてバグる。isPreRenderSynth ならsynth側のみtrueである。
  if (postmateMidi.isPreRenderSynth) {
    console.info(`%c${postmateMidi.getParentOrChild()} : I am preRenderSynth. 自動prerenderをstartします.`, 'color:black; background-color:lightblue')
    gn.orgContext = Tone.getContext();
    console.log(`${postmateMidi.getParentOrChild()} : emit onStartPreRender`);
    postmateMidi.parent.emit('onStartPreRender' + (postmateMidi.childId + 1));
    // 以降は非同期で後続処理へ
    return;
  }
  // 備忘、過去に使っていた。今はprerenderに置き換えて一元化する考え。コミットコメントに意図を残して削除する考え。
  //  保留。ほかを削除してから削除する想定。現状、gnの位置付けが曖昧なので。
  if (gn.createWav) {
    if (!gn.wav) {
      gn.noteNum = 60;
      gn.wav = gn.createWav(gn.noteNum);
    }
    postmateMidi.sendWavAfterHandshakeAllChildrenSub(gn);
    return;
  }
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
function onStartPreRender(postmateMidi, data) {
  const songs = createPreRenderSeqData(postmateMidi, data);
  postmateMidi.parent.emit('onCompletePreRenderSeq' + (postmateMidi.childId + 1), songs);
}

function createPreRenderSeqData(postmateMidi, data) {
  // sq
  if (postmateMidi.ui.checkRemovePlayButton) postmateMidi.ui.checkRemovePlayButton(); // playボタンを消す用。混乱防止用。playボタンがあると混乱する。
  console.log(`${postmateMidi.getParentOrChild()} : createPreRenderSeqData : recv data [${data}]`);
  const sq = postmateMidi.seq;
  console.log(`${postmateMidi.getParentOrChild()} : createPreRenderSeqData : sq : `, sq);

  const templates = sq.getTemplates();
  console.log(`${postmateMidi.getParentOrChild()} : createPreRenderSeqData : templates : `, templates);
  if (!postmateMidi.isPreRenderSeq()) {
    console.error(`${postmateMidi.getParentOrChild()} : seqに getPreRenderMidiData を実装してください`);
    return;
  }

  const songs = [];
  for (let templateId = 1; templateId < templates.length; templateId++) {
    const midiJson = templates[templateId][1/*body*/];
    songs.push(sq.getPreRenderMidiData(midiJson));
  }
  console.log(`${postmateMidi.getParentOrChild()} : createPreRenderSeqData : songs : `, songs);
  return songs;
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
async function doPreRenderAsync(postmateMidi, songs) {
  const gn = postmateMidi.tonejs.generator;
  const wavs = [];
  gn.noteNum = 60;
  for (let songId = 0; songId < songs.length; songId++) {
    const preRenderMidi = songs[songId];
    console.groupCollapsed(`${postmateMidi.getParentOrChild()} : doPreRenderAsync : Tone.js preRender scheduling start... : songId ${songId} : time : ${Date.now() % 10000}`);
    postmateMidi.schedulingPreRender(gn, preRenderMidi);
    gn.wav = await postmateMidi.renderContextAsync(gn, Tone.getContext(), gn.orgContext, songId); // 問題、visualizerは、現状、最後にrenderしたwavしか表示できないことになる。対策、ひとまずこのままいく
    wavs.push([gn.noteNum, gn.wav]);
    console.groupEnd();
  }
  updateGnWavs(postmateMidi, gn, wavs); // generator側のvisualizerでwavsを表示する用 ※備忘、もし単純な gn.wavs上書き にすると、prerenderボタン2回目でエラーになる
  if (gn.visualizer && gn.visualizer.dispWavs) gn.visualizer.dispWavs(postmateMidi); // 備忘、samplerAddWavs 末尾と同じ
  postmateMidi.sendWavAfterHandshakeAllChildrenSub(wavs);
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
function schedulingPreRender(postmateMidi, gn, preRenderMidi) {
  // const audioCh = 1/*MONO*/;
  const audioCh = 2/*STEREO*/;
  const bufferSec = 7;
  postmateMidi.setContextInitSynthAddWav(new Tone.OfflineContext(audioCh, bufferSec, gn.orgContext.sampleRate));
  console.log(`${postmateMidi.getParentOrChild()} : schedulingPreRender : Tone.getContext().sampleRate : ${Tone.getContext().sampleRate}`); // iPadで再生pitchが下がる不具合の調査用
  console.groupCollapsed(`${postmateMidi.getParentOrChild()} : schedulingPreRender : scheduling start...`);
  for (let i = 0; i < preRenderMidi.length; i++) {
    postmateMidi.onmidimessage(preRenderMidi[i]);
  }
  console.groupEnd();
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
async function renderContextAsync(postmateMidi, gn, context, orgContext, songId) {
  const startTime = Date.now();
  console.log(`${postmateMidi.getParentOrChild()} : renderContextAsync : Tone.js wav preRendering : start... : songId ${songId} : time : ${Date.now() % 10000}`);
  let wav = await context.render();
  postmateMidi.setContextInitSynthAddWav(orgContext);
  wav = wav.toArray();
  if (!postmateMidi.ui.isIpad()) console.log(`${postmateMidi.getParentOrChild()} : renderContextAsync : rendered wav : `, wav);
  postmateMidi.checkWavOk(wav);
  console.log(`${postmateMidi.getParentOrChild()} : renderContextAsync : Tone.js wav preRendering : completed : songId ${songId} : ${Date.now() - startTime}msec`);
  return wav;
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
function setContextInitSynthAddWav(postmateMidi, context) {
  const gn = postmateMidi.tonejs.generator;
  Tone.setContext(context);
  if (postmateMidi.tonejs.initSynthFnc) postmateMidi.tonejs.initSynthFnc(postmateMidi.ch); // setContext後にsynthが鳴らなくなるのを防止する用
  if (postmateMidi.isSampler) {
    if (!gn.wavs) console.error(`${postmateMidi.getParentOrChild()} : setContextInitSynthAddWav : ERROR : gn.wavs : `, gn.wavs);
    postmateMidi.samplerAddWavs(gn.wavs); // samplerにてprerenderする用
  }
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
function sendWavAfterHandshakeAllChildrenSub(postmateMidi, wavs) {
  if (!postmateMidi.isChild) return; // 備忘、parentは送受信の対象外にしておく、シンプル優先
  console.log(`${postmateMidi.getParentOrChild()} : sendWavAfterHandshakeAllChildrenSub : time : ${Date.now() % 10000}`);
  // to sampler
  if (!postmateMidi.parent) return;
  postmateMidi.parent.emit('sendToSampler' + (postmateMidi.childId + 1), wavs);
  // samplerのprerenderボタンを押したあと、seqのplayボタンで演奏できるようにする用
  if (postmateMidi.hasPreRenderButton) postmateMidi.isPreRenderSynth = false;

  for (let i = 0; i < wavs.length; i++) {
    const wav = wavs[i][1]; // 備忘、wavsには、notenumとwavが入っている
    postmateMidi.saveWavByDialog(wav);
  }
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
function saveWavByDialog(postmateMidi, wavFloat32) {
  if (!postmateMidi.ui.isIpad()) console.log(`${postmateMidi.getParentOrChild()} : saveWavByDialog : wav : `, wavFloat32);
  const toneAudioBuffer = Tone.ToneAudioBuffer.fromArray(wavFloat32);
  const wavFile = postmateMidi.getWavFileFromFloat32(toneAudioBuffer);
  const blob = new Blob([wavFile], { type: 'audio/wav' });
  postmateMidi.openDownloadDialog(blob, 'prerendered.wav');
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
function sendToSampler(postmateMidi, wavs) {
  if (!postmateMidi.ui.isIpad()) console.log(`${postmateMidi.getParentOrChild()} : received : `, wavs); // iPad以外なのは、iPad chrome inspect でログが波形データで埋め尽くされて調査できない、のを防止する用
  const gn = postmateMidi.tonejs.generator;
  gn.wavs = postmateMidi.updateGnWavs(postmateMidi, gn, wavs);
  postmateMidi.samplerAddWavs(gn.wavs);
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
// 用途、prerenderボタンで使う用 & prerenderボタンでのsamplerのprerender後に既存ch1に上書きしてch2は残す用（wavsをそのまま上書きするとch2が消えてしまうのでそれを防止する用）
// 備忘、引数 postmateMidi は他の関数同様につけておく、仕様変更時に引数そのままにできる用
function updateGnWavs(postmateMidi, gn, wavs) {
  // console.log(`${postmateMidi.getParentOrChild()} : updateGnWavs : gn : `, gn, `wavs : `, wavs);
  if (!gn.wavs) {
    gn.wavs = [];
    // console.log(`${postmateMidi.getParentOrChild()} : updateGnWavs : gn.wavs を初期化しました`);
  }
  for (let i = 0; i < wavs.length; i++) {
    if (i < gn.wavs.length) {
      if (!wavs[i]) continue; // 例えばch02用のwavs[1]だけを上書きし、ch01用はgn.wavs[0]のままとする用
      gn.wavs[i] = wavs[i];
    } else {
      gn.wavs.push(wavs[i]);
    }
  }
  // console.log(`${postmateMidi.getParentOrChild()} : updateGnWavs : gn.wavs : `, gn.wavs);
  return gn.wavs;
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
function samplerAddWavs(postmateMidi, wavs) {
  console.groupCollapsed(`${postmateMidi.getParentOrChild()} : samplerAddWavs`);
  if (!wavs) console.error(`${postmateMidi.getParentOrChild()} : samplerAddWavs : ERROR : wavs : `, wavs);

  for (let i = 0; i < wavs.length; i++) {
    const data = wavs[i];
    console.groupCollapsed(`${postmateMidi.getParentOrChild()} : samplerAddWavs : wav${i + 1} : data : `, data);
    if (!data) {
      console.groupEnd();
      continue;
    }
    const noteNum = data[0];
    const wav = data[1];
    const ch = i; // wavs[0],1,...を、samplerのch[1-1],2-1,...にsendする
    postmateMidi.checkWavOk(wav);
    if (postmateMidi.ch[ch].synth) {
      if (!postmateMidi.ui.isIpad()) console.log(`${postmateMidi.getParentOrChild()} : samplerAddWavs : wav add to sampler wav : `, wav);
      const toneBuffer = Tone.Buffer.fromArray(wav);
      console.log(`${postmateMidi.getParentOrChild()} : samplerAddWavs : wav${i + 1} : wav added to sampler : toneBuffer._buffer.numberOfChannels : `, toneBuffer._buffer.numberOfChannels);
      postmateMidi.ch[ch].synth.add(noteNum, toneBuffer);
      console.log(`${postmateMidi.getParentOrChild()} : samplerAddWavs : wav${i + 1} : wav added to sampler ch${ch + 1} noteNum${noteNum} : time : ${Date.now() % 10000}`);
    }
    console.groupEnd();
  }

  console.log(`${postmateMidi.getParentOrChild()} : samplerAddWavs : completed`);
  console.groupEnd();

  const gn = postmateMidi.tonejs.generator;
  if (gn.visualizer && gn.visualizer.dispWavs) gn.visualizer.dispWavs(postmateMidi);
}

// wav import用
// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
async function afterWavFileUploadAsync(fileContent, filename, postmateMidi) {
  console.log(`${postmateMidi.getParentOrChild()} : afterWavFileUploadAsync : ${filename}`);
  if (!postmateMidi.preRenderer.getChNum) console.log(`afterWavFileUploadAsync : ERROR : postmateMidi.preRenderer.getChNum not Found`);
  const chNum = postmateMidi.preRenderer.getChNum(postmateMidi, filename);
  const wav = await postmateMidi.getFloat32ArrayFromWavFileAsync(fileContent);

  // update gn wavs
  const wavs = new Array(16).fill(null);
  wavs[chNum] = [60, wav];
  const gn = postmateMidi.tonejs.generator;
  gn.wavs = postmateMidi.updateGnWavs(postmateMidi, gn, wavs);

  // add to sampler
  console.log(`${postmateMidi.getParentOrChild()} : afterWavFileUploadAsync : add to sampler`);
  const context = Tone.getContext();
  postmateMidi.setContextInitSynthAddWav(context);
}

// wav import用
// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
function getChNum(postmateMidi, filename) {
  // "ch1.wav" -> 0, "ch2.wav" -> 1
  const chNum = extractNumberFromStr(filename);
  console.log(`${postmateMidi.getParentOrChild()} : preRenderer : wav import [${filename}] to ch${chNum + 1}`);
  return chNum;

  function extractNumberFromStr(str) {
    const match = str.match(/\d+/);
    if (match) {
      return parseInt(match[0], 10) - 1;
    } else {
      return 0;
    }
  }
}

// TODO registerGeneratedSoundVisualizer は一段落したか？整理する

// TODO 次どうする？整理する
//  課題、ジレンマがある。シンプルにexperimental21をコンパクトに終了させ、22に進んで検証がよさげ。
//   一方で、21に懸念がある。検証不足、機能不足、これでは実証実験としては不足で、ほかに進んでもここが中途半端だとボトルネックになるのではという懸念がある。
//    対策、仮説、21をシンプルに終了させたのち、22などを検証していくことで、21に不足があったか？があとから見えてくる、という仮説。それを可視化して整理していく。
//     仮説、「今21で何をやりたいか」の可視化が不足。このままだとあとからわからなくなる、という懸念。なので「あとからわかる、読みやすい」状態に21を持っていく。

// 使い方:
//  *child.js にて、registerGeneratedSoundVisualizer する
//  以上。
//  もし波形表示されていない場所があれば、gn.visualizer.dispWavs の呼び出しを適宜実装する。

//  test list: ※複雑なので備忘用
//   済 generator側 : 起動時にgeneratorでrenderした波形が、generator側に波形表示されること。
//   済 sampler側   : 起動時にgeneratorでrenderしてsamplerにsendされた波形が、sampler側に波形表示されること。
//   済 sampler側   : wav importしたとき、importした波形が、sampler側に波形表示されること。
//   済 sampler側   : `prerender`ボタンでself samplingしたとき、self sampling後の波形が、sampler側に波形表示されること。generator側の波形は変化ないこと。

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
// 用途、generator(Tone Generator)用。generatorはoutputが波形データであるが、同時に可視化もして、状況把握しやすく使いやすくする用。
function registerGeneratedSoundVisualizer(postmateMidi) {
  const gn = postmateMidi.tonejs.generator;
  const visualizer = gn.visualizer;
  visualizer.dispWavs = generatedSoundVisualizer_dispWavs;

  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  document.body.appendChild(canvas);

  gn.visualizer.canvas = canvas;
}

function generatedSoundVisualizer_dispWavs(postmateMidi) {
  console.groupCollapsed(`${postmateMidi.getParentOrChild()} : generatedSoundVisualizer_dispWavs`);

  const gn = postmateMidi.tonejs.generator;
  const visualizer = gn.visualizer;
  const canvas = visualizer.canvas;
  const eventId = visualizer.eventId;

  const ctx = canvas.getContext("2d");
  if (!gn.wavs) {
    // console.log(`${postmateMidi.getParentOrChild()} : generatedSoundVisualizer_dispWavs : wavがないので、描画しません`);
    console.groupEnd();
    return;
  }
  const startTime = Date.now(); // かかった時間計測用
  const waveform = getWaveform(gn.wavs, canvas.width);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = "#0f0"; // dark mode / light 両対応を想定
  for (let i = 0; i < waveform.length; i++) {
    const x = (i / waveform.length) * canvas.width;
    const y = (0.5 * canvas.height) - (waveform[i] * canvas.height);
    ctx.lineTo(x, y);
  }
  ctx.stroke();

  // 一度描画したら描画をとめる
  // console.log(`${postmateMidi.getParentOrChild()} : generatedSoundVisualizer_dispWavs : stopped`)
  Tone.Transport.clear(eventId);

  // かかった時間。7秒のwavで、3～5msec等、問題ないことを確認する用
  console.log(`${postmateMidi.getParentOrChild()} : generatedSoundVisualizer_dispWavs : completed : ${Date.now() - startTime}msec`);
  console.groupEnd();

  function getWaveform(gnWavs, xSize) {
    let waveform = getPeakOfWavs(gnWavs, xSize);
    waveform = normalizeWav(waveform);
    console.groupCollapsed(`${postmateMidi.getParentOrChild()} : generatedSoundVisualizer_dispWavs : getWaveform : `);
    console.log(waveform);
    console.groupEnd();
    return waveform;

    // 音量は仮、正確さより実装の楽さを優先する
    function getPeakOfWavs(gnWavs, xSize) {
      console.log(`${postmateMidi.getParentOrChild()} : generatedSoundVisualizer_dispWavs : getPeakOfWavs : gnWavs : `, gnWavs);
      let peakWav = new Float32Array(0);
      for (let wavIndex = 0; wavIndex < gnWavs.length; wavIndex++) {
        const gnWav = gnWavs[wavIndex];
        if (!gnWav) continue;
        const wav = gnWav[1]; // gnWavsの構造に依存している
        let pw = getPeakOf1wav(wav, xSize / gnWavs.length);
        peakWav = combineFloat32Array(peakWav, pw);
      }
      return peakWav;
    }

    function getPeakOf1wav(wav, xSize) {
      const peakWav = new Float32Array(xSize);
      for (let i = 0; i < xSize; i++) {
        peakWav[i] = getPeakOfSliced(i, wav, xSize);
      }
      return peakWav;
    }

    function combineFloat32Array(array1, array2) {
      const combinedArray = new Float32Array(array1.length + array2.length);
      combinedArray.set(array1);
      combinedArray.set(array2, array1.length);
      return combinedArray;
    }

    function getPeakOfSliced(i, wav, xSize) {
      const numOfCh = wav.length;
      const chIndex = i % numOfCh;
      const wav1ch = wav[chIndex];
      const chunkSize = wav1ch.length / xSize;
      const sliced = wav1ch.slice(chunkSize * i, chunkSize * (i + 1));
      const peakAbs = postmateMidi.getPeakAbs(sliced);
      if (chIndex) return - peakAbs;
      return peakAbs;
    }

    function normalizeWav(wav) {
      const maxAbs = postmateMidi.getPeakAbs(wav);
      if (!maxAbs) {
        console.error(`${postmateMidi.getParentOrChild()} : generatedSoundVisualizer_dispWavs : ERROR : maxAbsが0`);
        return wav;
      }
      for (let i = 0; i < wav.length; i++) {
        wav[i] /= maxAbs * 2;
      }
      return wav;
    }
  }
}

export { preRenderer };
