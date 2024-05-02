// import * as Tone from 'tone'; // コメントアウトする。index.htmlでTone.jsをsrcする。そうしないとバンドラーを使わない別projectにおいてソースをそのまま利用できず不便だったので。
import { initSynthCommon } from "../synth-util.js";

function initSampler(s, samplerParam, volume) {
  console.log(`initSampler : ${samplerParam}, ${volume}`);
  let sampler;
  if (samplerParam) {
    sampler = new Tone.Sampler(samplerParam);
  } else {
    sampler = new Tone.Sampler(); // あとでaddする用
  }
  s.synth = sampler;

  initSynthCommon(s, volume);
}

export { initSampler };
