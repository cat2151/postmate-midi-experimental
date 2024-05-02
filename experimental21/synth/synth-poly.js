// import * as Tone from 'tone'; // コメントアウトする。index.htmlでTone.jsをsrcする。そうしないとバンドラーを使わない別projectにおいてソースをそのまま利用できず不便だったので。
import { initSynthCommon } from "../synth-util.js";

function initSynth(s, synthParam, volume) {
  const synth = new Tone.PolySynth(Tone.Synth, synthParam);
  s.synth = synth;
  initSynthCommon(s, volume);
}

export { initSynth };
