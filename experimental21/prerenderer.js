// TODO postmate-midi.js から、prerender 部分を切り出す

const preRenderer = { onStartPreRender, afterWavFileUploadAsync, getChNum };

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
