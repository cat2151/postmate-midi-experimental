const preRenderer = { sendWavAfterHandshakeAllChildren, onStartPreRender, doPreRenderAsync, schedulingPreRender, renderContextAsync, setContextInitSynthAddWav, sendWavAfterHandshakeAllChildrenSub, saveWavByDialog, sendToSampler, updateGnWavs, samplerAddWavs, afterWavFileUploadAsync, getChNum };

// function isAutoStartPrerender() { // ボツ。ボツ理由は、これでは用途を満たさないため。prerendererをimportするchildにおいても、autostartしたいsynthと、autostartしないsamplerとで用途が違う。このfncだとsampler側がautostartしようとしてバグってしまった。
//   console.log('isAutoStartPrerender');
//   return true;
// }

// TODO 切り分けた上で、auto exec prerender という名前をつけてわかりやすくする
//  auto exec をするかどうかも含めて、外部のprerenderに仕様も含めて切り出す。
//    ここの責務は「 sendWavAfterHandshakeAllChildren というタイミングで、prerender側の sendWavAfterHandshakeAllChildren を呼ぶ」のみに切り分ける。
//      なぜならauto start prerenderするかどうかは、prerenderの用途で都度変化するので。なので、postmateMidi側でなくprerenderに持たせるのがよい、と考える。
//  同様に、まだprerenderとして切り出すものがありそう。位置付けとして、postmateMidiのシンプルな機能、とズレてるものがあったら、まずcommentにして切り出す。
// child用
// 注意、位置づけと名前がズレている。今後、末尾のcreateWavを削除したら、名前を、sendWavのかわりに、startAutoPrerender にする想定。
//  位置づけ：
//   now : startAutoPrerender。prerender の仕組みを使って、seq + synth がwav生成を開始…するための非同期処理を開始、する用。非同期処理。
//   old : sendWav。           createWav があるとき、synthがwav生成し、send wav to samplerする用。今はほとんど使わない想定。ボツにして、prerenderに一元管理する想定。同期処理。
// Q : なぜここ？ A : 用途に応じていくらでも仕様変更がありうるので、postmate-midi.js側に集約するより、こちらに切り出したほうがよい。
function sendWavAfterHandshakeAllChildren(postmateMidi) {
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

export { preRenderer };
