// import * as Tone from 'tone'; // コメントアウトする。index.htmlでTone.jsをsrcする。そうしないとバンドラーを使わない別projectにおいてソースをそのまま利用できず不便だったので。

function initSynthSaw(s) {
  const synth = new Tone.Synth({oscillator: {type: 'sawtooth'}});
  const filter = new Tone.Filter({type: "lowpass"});
  const freqEnv = new Tone.FrequencyEnvelope({
    attack: 0,
    decay: 2,
    baseFrequency: Tone.Midi(30).toFrequency(),
    octaves: 4
  });
  const vol = new Tone.Volume(-6);

  synth.connect(filter);
  filter.connect(vol);
  freqEnv.connect(filter.frequency);
  vol.toDestination();

  s.noteOn = noteOn;
  s.noteOff = noteOff;

  function noteOn(noteNum) {
    filter.set({Q: 10 + Math.random() * 10});
    freqEnv.set({decay: 1 + Math.random() * 2});
    freqEnv.set({baseFrequency: Tone.Midi(20 + Math.random() * 40).toFrequency()});
    freqEnv.triggerAttack();

    synth.triggerAttack(Tone.Midi(noteNum).toFrequency());
    s.isNoteOn = true;
  };

  function noteOff(noteNum) {
    if (!s.isNoteOn) return;
    synth.triggerRelease();
  };
}

export { initSynthSaw };
