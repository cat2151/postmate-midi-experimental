// import * as Tone from 'tone'; // コメントアウトする。index.htmlでTone.jsをsrcする。そうしないとバンドラーを使わない別projectにおいてソースをそのまま利用できず不便だったので。

// synth-poly.jsと、sampler.jsで、処理を共通化する用
function initSynthCommon(s, volume) {
  const synth = s.synth;
  const filter = new Tone.Filter({type: "lowpass", frequency: 2400});
  const panner = new Tone.Panner();
  const vol = new Tone.Volume(volume);

  synth.connect(filter);
  filter.connect(panner);
  panner.connect(vol);
  vol.toDestination();

  s.noteOn = noteOn;
  s.noteOff = noteOff;
  s.controlChange[74] = cutoff;
  s.controlChange[10] = panpot;

  function noteOn(noteNum, timestamp) {
    // console.log(`synth : noteOn : noteNum = ${noteNum}, timestamp = ${timestamp}`);
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

  function panpot(v, timestamp) {
    v = v.clamp(1, 127); // MIDI RP-036
    v -= 64;
    v /= 63; // Pan Law設定の実装は後回しにする
    panner.pan.setValueAtTime(v, timestamp);
  }
  Number.prototype.clamp = function (_min, _max) {
    return Math.min(Math.max(this, _min), _max);
  };
}

export { initSynthCommon };
