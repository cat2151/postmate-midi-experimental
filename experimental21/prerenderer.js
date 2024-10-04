// TODO postmate-midi.js から、prerender 部分を切り出す

const preRenderer = { onStartPreRender, doPreRenderAsync, schedulingPreRender, renderContextAsync, setContextInitSynthAddWav, sendWavAfterHandshakeAllChildrenSub, afterWavFileUploadAsync, getChNum };

// function isAutoStartPrerender() { // ボツ。ボツ理由は、これでは用途を満たさないため。prerendererをimportするchildにおいても、autostartしたいsynthと、autostartしないsamplerとで用途が違う。このfncだとsampler側がautostartしようとしてバグってしまった。
//   console.log('isAutoStartPrerender');
//   return true;
// }

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
