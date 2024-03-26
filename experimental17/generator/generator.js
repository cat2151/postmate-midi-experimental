// import * as Tone from 'tone'; // コメントアウトする。index.htmlでTone.jsをsrcする。そうしないとバンドラーを使わない別projectにおいてソースをそのまま利用できず不便だったので。

const gn = { createWav };

function createWav(noteNum = 60, time = 7/*sec メロトロンが最大7秒のワンショット。なお手元環境で演奏開始時のプリレンダリングからsampler add完了まで12msecだった*/) {
  const sampleRate = Tone.context.sampleRate;
  console.log(`generator : sampling rate : ${sampleRate}`);
  const freq = Tone.Midi(noteNum).toFrequency()
  const twoPiFreqPerSampleRate = 2 * Math.PI * freq / sampleRate
  let wav = new Float32Array(sampleRate * time);
  for (let i = 0; i < wav.length; i++) {
    wav[i] = 0.5 * Math.sin(i * twoPiFreqPerSampleRate);
  }
  console.log(`generator : wav : `, wav);
  return wav;
}

export { gn };
