import { postmateMidi } from "../postmate-midi.js";
import { initSynth } from "./synth-poly.js";
if (!new URL(window.location.href).searchParams.get('query')) window.location.href = "../"; // dir階層直叩きした場合の混乱防止用
const urlParams = rison2.parse(new URL(window.location.href).searchParams.get('query'));

postmateMidi.registerChild(urlParams, null, null, null, null, null);

postmateMidi.tonejs.registerSynth((ch) => {
  initSynth(ch, [ {ch: 1-1, instrument: 'PolySynth', voice: 'Synth', voiceArgs: {oscillator: {type: 'fatsawtooth'}}, volume: 0, isUsingPan: true} ]);
});
postmateMidi.isPreRenderSynth = true;

postmateMidi.ui.visualizeGeneratedSound();
console.log(`postmate-midi child:`, postmateMidi);
