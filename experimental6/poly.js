// import * as Tone from 'tone'; // コメントアウトする。index.htmlでTone.jsをsrcする。そうしないとバンドラーを使わない別projectにおいてソースをそのまま利用できず不便だったので。

function initSynthPoly(s) {
  const synth = new Tone.PolySynth(Tone.Synth, {oscillator: {type: 'sine'}});
  const vol = new Tone.Volume(-12);

  synth.connect(vol);
  vol.toDestination();

  s.noteOn = noteOn;
  s.noteOff = noteOff;

  function noteOn(noteNum) {
    synth.triggerAttack(Tone.Midi(noteNum).toFrequency());
  };

  function noteOff(noteNum) {
    synth.triggerRelease(Tone.Midi(noteNum).toFrequency());
  };
}

export { initSynthPoly };
