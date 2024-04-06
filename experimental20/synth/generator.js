// import * as Tone from 'tone'; // コメントアウトする。index.htmlでTone.jsをsrcする。そうしないとバンドラーを使わない別projectにおいてソースをそのまま利用できず不便だったので。

const gn = { setupTonejsPreRenderer };

function setupTonejsPreRenderer(ch, initSynth) {
  // synth for preRender
  // OfflineContextにしてから initSynth する必要があるので
  initSynth(ch[1-1], {oscillator: {type: 'fatsawtooth'}});
}

export { gn };
