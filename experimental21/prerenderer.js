const preRenderer = { registerPrerenderButton, registerWavImportButton, onCompleteHandshakeAllChildren, onStartPreRender, doPreRenderAsync, schedulingPreRender, renderContextAsync, setContextInitSynthAddWav, sendWavAfterHandshakeAllChildrenSub, saveWavByDialog, sendToSampler, updateGnWavs, samplerAddWavs, afterWavFileUploadAsync, getChNum, visualizeGeneratedSound };

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
    console.log(`${postmateMidi.getParentOrChild()} : onclick prerenderButton`);
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
    console.log(`${postmateMidi.getParentOrChild()} : onclick wavImportButton`);
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
  console.log(`${postmateMidi.getParentOrChild()} : recv : onStartPreRender : data [${data}]`);
  const sq = postmateMidi.seq;
  console.log(`${postmateMidi.getParentOrChild()} : sq : `, sq);

  const templates = sq.getTemplates();
  console.log(`${postmateMidi.getParentOrChild()} : t : `, templates);
  if (!postmateMidi.isPreRenderSeq()) {
    console.error(`${postmateMidi.getParentOrChild()} : seqに getPreRenderMidiData を実装してください`);
    return;
  }

  const songs = [];
  for (let templateId = 1; templateId < templates.length; templateId++) {
    const midiJson = templates[templateId][1/*body*/];
    songs.push(sq.getPreRenderMidiData(midiJson));
  }
  console.log(`${postmateMidi.getParentOrChild()} : songs : `, songs);
  return songs;
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
async function doPreRenderAsync(postmateMidi, songs) {
  const gn = postmateMidi.tonejs.generator;
  const wavs = [];
  gn.noteNum = 60;
  for (let songId = 0; songId < songs.length; songId++) {
    const preRenderMidi = songs[songId];
    console.log(`${postmateMidi.getParentOrChild()} : Tone.js preRender scheduling start... : songId ${songId} : time : ${Date.now() % 10000}`);
    postmateMidi.schedulingPreRender(gn, preRenderMidi);
    gn.wav = await postmateMidi.renderContextAsync(gn, Tone.getContext(), gn.orgContext, songId); // 問題、visualizerは、現状、最後にrenderしたwavしか表示できないことになる。対策、ひとまずこのままいく
    wavs.push([gn.noteNum, gn.wav]);
  }
  postmateMidi.sendWavAfterHandshakeAllChildrenSub(wavs);
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
function schedulingPreRender(postmateMidi, gn, preRenderMidi) {
  // const audioCh = 1/*MONO*/;
  const audioCh = 2/*STEREO*/;
  const bufferSec = 7;
  postmateMidi.setContextInitSynthAddWav(new Tone.OfflineContext(audioCh, bufferSec, gn.orgContext.sampleRate));
  console.log(`${postmateMidi.getParentOrChild()} : schedulingPreRender : Tone.getContext().sampleRate : ${Tone.getContext().sampleRate}`); // iPadで再生pitchが下がる不具合の調査用
  for (let i = 0; i < preRenderMidi.length; i++) {
    postmateMidi.onmidimessage(preRenderMidi[i]);
  }
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
async function renderContextAsync(postmateMidi, gn, context, orgContext, songId) {
  const startTime = Date.now();
  console.log(`${postmateMidi.getParentOrChild()} : Tone.js wav preRendering : start... : songId ${songId} : time : ${Date.now() % 10000}`);
  let wav = await context.render();
  postmateMidi.setContextInitSynthAddWav(orgContext);
  wav = wav.toArray();
  if (!postmateMidi.ui.isIpad()) console.log(`${postmateMidi.getParentOrChild()} : rendered wav : `, wav);
  postmateMidi.checkWavOk(wav);
  console.log(`${postmateMidi.getParentOrChild()} : Tone.js wav preRendering : completed : songId ${songId} : ${Date.now() - startTime}msec`);
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
  if (!postmateMidi.ui.isIpad()) console.log(`${postmateMidi.getParentOrChild()} : wav : `, wavFloat32);
  const toneAudioBuffer = Tone.ToneAudioBuffer.fromArray(wavFloat32);
  const wavFile = postmateMidi.getWavFileFromFloat32(toneAudioBuffer);
  const blob = new Blob([wavFile], { type: 'audio/wav' });
  postmateMidi.openDownloadDialog(blob, 'prerendered.wav');
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
function sendToSampler(postmateMidi, wavs) {
  if (!postmateMidi.ui.isIpad()) console.log(`${postmateMidi.getParentOrChild()} : received : `, wavs); // iPad以外なのは、iPad chrome inspect でログが波形データで埋め尽くされて調査できない、のを防止する用
  const gn = postmateMidi.tonejs.generator;
  gn.wavs = postmateMidi.updateGnWavs(gn, wavs);
  postmateMidi.samplerAddWavs(gn.wavs);
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
// 用途、prerenderボタンで使う用 & prerenderボタンでのsamplerのprerender後に既存ch1に上書きしてch2は残す用（wavsをそのまま上書きするとch2が消えてしまうのでそれを防止する用）
// 備忘、引数 postmateMidi は他の関数同様につけておく、仕様変更時に引数そのままにできる用
function updateGnWavs(postmateMidi, gn, wavs) {
  if (!gn.wavs) gn.wavs = [];
  for (let i = 0; i < wavs.length; i++) {
    if (i < gn.wavs.length) {
      if (!wavs[i]) continue; // 例えばch02用のwavs[1]だけを上書きし、ch01用はgn.wavs[0]のままとする用
      gn.wavs[i] = wavs[i];
    } else {
      gn.wavs.push(wavs[i]);
    }
  }
  return gn.wavs;
}

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
function samplerAddWavs(postmateMidi, wavs) {
  if (!wavs) console.error(`${postmateMidi.getParentOrChild()} : samplerAddWavs : ERROR : wavs : `, wavs);
  for (let i = 0; i < wavs.length; i++) {
    const data = wavs[i];
    if (!data) {
      continue;
    }
    const noteNum = data[0];
    const wav = data[1];
    const ch = i; // wavs[0],1,...を、samplerのch[1-1],2-1,...にsendする
    postmateMidi.checkWavOk(wav);
    if (postmateMidi.ch[ch].synth) {
      if (!postmateMidi.ui.isIpad()) console.log(`${postmateMidi.getParentOrChild()} : wav add to sampler wav : `, wav);
      const toneBuffer = Tone.Buffer.fromArray(wav);
      console.log(`${postmateMidi.getParentOrChild()} : wav added to sampler : toneBuffer._buffer.numberOfChannels : `, toneBuffer._buffer.numberOfChannels);
      postmateMidi.ch[ch].synth.add(noteNum, toneBuffer);
      console.log(`${postmateMidi.getParentOrChild()} : wav added to sampler ch${ch + 1} noteNum${noteNum} : time : ${Date.now() % 10000}`);
    }
  }
}

// wav import用
// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
async function afterWavFileUploadAsync(fileContent, filename, postmateMidi) {
  console.log(`afterWavFileUploadAsync : ${filename}`);
  if (!postmateMidi.preRenderer.getChNum) console.log(`afterWavFileUploadAsync : ERROR : postmateMidi.preRenderer.getChNum not Found`);
  const chNum = postmateMidi.preRenderer.getChNum(filename);
  const wav = await postmateMidi.getFloat32ArrayFromWavFileAsync(fileContent);

  // update gn wavs
  const wavs = new Array(16).fill(null);
  wavs[chNum] = [60, wav];
  const gn = postmateMidi.tonejs.generator;
  gn.wavs = postmateMidi.updateGnWavs(gn, wavs);

  // add to sampler
  const context = Tone.getContext();
  postmateMidi.setContextInitSynthAddWav(context);
}

// wav import用
// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
function getChNum(filename) {
  // "ch1.wav" -> 0, "ch2.wav" -> 1
  const chNum = extractNumberFromStr(filename);
  console.log(`preRenderer : wav import [${filename}] to ch${chNum + 1}`);
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

// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
// 用途、generator(Tone Generator)用。generatorはoutputが波形データであるが、同時に可視化もして、状況把握しやすく使いやすくする用。
//  ※開発当初はgeneratorという名前だったが、現在はprerender に名前を統一する方向で検討中
function visualizeGeneratedSound(postmateMidi) {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  // 波形全体を表示
  let eventId = Tone.Transport.scheduleRepeat(() => {
    const gn = postmateMidi.tonejs.generator;
    if (!gn.wav) return; // wavが生成されるまでは、描画しない
    console.log(`${postmateMidi.getParentOrChild()} : gn.wav : `, gn.wav);
    const startTime = Date.now(); // かかった時間計測用
    const waveform = getWaveform(gn.wav, canvas.width);
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
    // console.log(`${postmateMidi.getParentOrChild()} : visualizeGeneratedSound : stopped`)
    Tone.Transport.clear(eventId);

    // かかった時間。7秒のwavで、3～5msec等、問題ないことを確認する用
    console.log(`${postmateMidi.getParentOrChild()} : visualizeGeneratedSound : completed : ${Date.now() - startTime}msec`);

    function getWaveform(wav, xSize) {
      let waveform = getPeakWav(wav, xSize);
      waveform = normalizeWav(waveform);
      return waveform;

      // もし、より厳密に音量を描画したいなら1sampleごとに前後一定sampleのエネルギーの大きさを上下幅として描画したほうがよさげ。
      // とはいえ、そこに手間かけるよりほかを優先する。ひとまず絶対値の最大のpointを、1sampleごとに交互に上下に描画する。なお交互上下にしない場合は意図しない周期性が出て、確認したい音量と乖離したものになった。
      function getPeakWav(wav, xSize) {
        const chunkSize = wav.length / xSize;
        const peakWav = new Float32Array(xSize);
        for (let i = 0; i < xSize; i++) {
          peakWav[i] = postmateMidi.getPeakAbs(wav.slice(chunkSize * i, chunkSize * (i + 1)));
          if (i % 2) peakWav[i] *= -1;
        }
        return peakWav;
      }

      function normalizeWav(wav) {
        const maxAbs = postmateMidi.getPeakAbs(wav);
        for (let i = 0; i < wav.length; i++) {
          wav[i] /= maxAbs * 2;
        }
        return wav;
      }

    }
  }, "60hz"); // let eventId = Tone.Transport.scheduleRepeat(() => {

  // 定期的に、wav生成済みかチェックし、wav生成完了していたら一度だけ描画する
  Tone.Transport.start();
}

export { preRenderer };
