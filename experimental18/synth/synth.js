// import * as Tone from 'tone'; // コメントアウトする。index.htmlでTone.jsをsrcする。そうしないとバンドラーを使わない別projectにおいてソースをそのまま利用できず不便だったので。

const gn = { setupTonejsPreRenderer };

function setupTonejsPreRenderer(context) {
  const synth = new Tone.PolySynth({ context, volume: -6 });
  synth.set({
    oscillator: {type: "sawtooth"},
    envelope: {attack: 0.1, decay: 0.8}
  });
  const filter = new Tone.Filter({context, type: "bandpass", frequency: 2400, Q: 5});
  const freqEnv = new Tone.FrequencyEnvelope({context, attack: 0.2, decay: 0.4, baseFrequency: "C3", octaves: 4 });
  const phaser = new Tone.Phaser({context, frequency: 0.09});
  const distortion = new Tone.Distortion({context, distortion: 5});

  freqEnv.connect(filter.frequency);
  synth.chain(filter, phaser, distortion, context.destination);

  // seq for prerender
  freqEnv.triggerAttack();
  synth.triggerAttackRelease(["C4","C3","G5"], 7);
}

export { gn };
