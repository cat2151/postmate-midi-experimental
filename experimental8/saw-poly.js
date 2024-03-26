// import * as Tone from 'tone'; // コメントアウトする。index.htmlでTone.jsをsrcする。そうしないとバンドラーを使わない別projectにおいてソースをそのまま利用できず不便だったので。

function initSynth(s) {
  const synth = new Tone.PolySynth(Tone.Synth, {oscillator: {type: 'sawtooth'}});
  const filter = new Tone.Filter({type: "lowpass", frequency: 2400});
  const vol = new Tone.Volume(-15);

  synth.connect(filter);
  filter.connect(vol);
  vol.toDestination();

  s.noteOn = noteOn;
  s.noteOff = noteOff;
  s.synth = synth;

  function noteOn(noteNum, timestamp) {
    synth.triggerAttack(Tone.Midi(noteNum).toFrequency(), timestamp);
  };

  function noteOff(noteNum, timestamp) {
    synth.triggerRelease(Tone.Midi(noteNum).toFrequency(), timestamp);
  };
}

export { initSynth };
