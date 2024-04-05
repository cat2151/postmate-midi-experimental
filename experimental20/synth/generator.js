// import * as Tone from 'tone'; // コメントアウトする。index.htmlでTone.jsをsrcする。そうしないとバンドラーを使わない別projectにおいてソースをそのまま利用できず不便だったので。

const gn = { setupTonejsPreRenderer };

function setupTonejsPreRenderer(ch, initSynth) {
  // synth for preRender
  // OfflineContextにしてから initSynth する必要があるので
  initSynth(ch[1-1], {oscillator: {type: 'sawtooth'}});

  // seq for preRender
  // postmateMidiのchのcontrolChange初期化等を利用するので
  // ch[1-1].noteOn(60, Tone.now());
  // ch[1-1].noteOn(64, Tone.now());
  // ch[1-1].noteOn(67, Tone.now());
  // ch[1-1].noteOn(71, Tone.now());
  // ch[1-1].noteOff(60, Tone.now() + 7);
  // ch[1-1].noteOff(64, Tone.now() + 7);
  // ch[1-1].noteOff(67, Tone.now() + 7);
  // ch[1-1].noteOff(71, Tone.now() + 7);
}

export { gn };
