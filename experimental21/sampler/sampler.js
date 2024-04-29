// import * as Tone from 'tone'; // コメントアウトする。index.htmlでTone.jsをsrcする。そうしないとバンドラーを使わない別projectにおいてソースをそのまま利用できず不便だったので。

function initSampler(s, samplerParam, volume) {
  console.log(`initSampler : ${samplerParam}, ${volume}`);
  let sampler;
  if (samplerParam) {
    sampler = new Tone.Sampler(samplerParam);
  } else {
    sampler = new Tone.Sampler(); // あとでaddする用
  }

  const filter = new Tone.Filter({type: "lowpass", frequency: 2400});
  const pan = new Tone.Panner(1); // -1～1 ひとまずtest用に1（right）。TODO control change 10 0と1を-1に、127を1に、64を0にする。MIDI RP-036。Pan Law設定の実装は後回しにする。
  const vol = new Tone.Volume(volume);

  sampler.connect(filter);
  filter.connect(pan);
  pan.connect(vol);
  vol.toDestination();

  s.noteOn = noteOn;
  s.noteOff = noteOff;
  s.synth = sampler;
  s.controlChange[74] = cutoff;

  function noteOn(noteNum, timestamp) {
    console.log(`sampler : noteOn : ${noteNum}, ${timestamp}`);
    sampler.triggerAttack(Tone.Midi(noteNum).toFrequency(), timestamp);
  };

  function noteOff(noteNum, timestamp) {
    sampler.triggerRelease(Tone.Midi(noteNum).toFrequency(), timestamp);
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

export { initSampler };
