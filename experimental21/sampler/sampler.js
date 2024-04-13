// import * as Tone from 'tone'; // コメントアウトする。index.htmlでTone.jsをsrcする。そうしないとバンドラーを使わない別projectにおいてソースをそのまま利用できず不便だったので。

function initSampler(s, samplerParam, volume) {
  let sampler;
  if (samplerParam) {
    sampler = new Tone.Sampler(samplerParam);
  } else {
    sampler = new Tone.Sampler(); // あとでaddする用
  }

  sampler.toDestination();
  sampler.volume.value = volume;

  s.noteOn = noteOn;
  s.noteOff = noteOff;
  s.synth = sampler;

  function noteOn(noteNum, timestamp) {
    sampler.triggerAttack(Tone.Midi(noteNum).toFrequency(), timestamp);
  };

  function noteOff(noteNum, timestamp) {
    sampler.triggerRelease(Tone.Midi(noteNum).toFrequency(), timestamp);
  };
}

export { initSampler };
