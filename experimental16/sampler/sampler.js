// import * as Tone from 'tone'; // コメントアウトする。index.htmlでTone.jsをsrcする。そうしないとバンドラーを使わない別projectにおいてソースをそのまま利用できず不便だったので。

function initSampler(s, samplerParam, volume) {
  console.log(`sampler : init...`);
  let sampler;

  if (samplerParam) {
    sampler = new Tone.Sampler(samplerParam);
  } else {
    sampler = new Tone.Sampler();
    const noteNum = 60;
    const wav = createWav(noteNum, 1/*sec*/);
    sampler.add(noteNum, wav);
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

  function createWav(noteNum, time) {
    const sampleRate = Tone.context.sampleRate;
    console.log(`sampler : sampling rate : ${sampleRate}`);
    const freq = Tone.Midi(noteNum).toFrequency()
    const twoPiFreqPerSampleRate = 2 * Math.PI * freq / sampleRate
    let wav = new Float32Array(sampleRate * time);
    for (let i = 0; i < wav.length; i++) {
      wav[i] = 0.5 * Math.sin(i * twoPiFreqPerSampleRate);
    }
    console.log(`sampler : wav : `, wav);
    return Tone.Buffer.fromArray(wav);
  }
}

export { initSampler };
