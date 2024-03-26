// import * as Tone from 'tone'; // コメントアウトする。index.htmlでTone.jsをsrcする。そうしないとバンドラーを使わない別projectにおいてソースをそのまま利用できず不便だったので。

function initSynth(s, synthParam) {
  const synth = new Tone.PolySynth(Tone.Synth, synthParam);
  const filter = new Tone.Filter({type: "lowpass", frequency: 2400});
  const vol = new Tone.Volume(-15);

  synth.connect(filter);
  filter.connect(vol);
  vol.toDestination();

  s.noteOn = noteOn;
  s.noteOff = noteOff;
  s.synth = synth;
  s.controlChange[74] = cutoff;

  function noteOn(noteNum, timestamp) {
    synth.triggerAttack(Tone.Midi(noteNum).toFrequency(), timestamp);
  };

  function noteOff(noteNum, timestamp) {
    synth.triggerRelease(Tone.Midi(noteNum).toFrequency(), timestamp);
  };

  function cutoff(v) {
    const mul = v2mul(90 + v * 0.5);
    const hz = 200 + mul;
    console.log(`cutoff : v:${v} -> Hz:${Math.floor(hz)}`);
    filter.set({frequency: hz});
  };
  function v2mul(v) {
    return Math.pow(2, 1 / 12 * v);
  }
}

export { initSynth };
