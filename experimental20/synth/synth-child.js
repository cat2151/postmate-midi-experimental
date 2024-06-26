import { postmateMidi } from "../postmate-midi.js";
import { initSynth } from "./synth-poly.js";
if (!new URL(window.location.href).searchParams.get('query')) window.location.href = "../"; // dir階層直叩きした場合の混乱防止用
const urlParams = rison2.parse(new URL(window.location.href).searchParams.get('query'));

postmateMidi.registerChild(urlParams, null, null, null, null, null);

const gn = { setupTonejsPreRenderer: function(ch, initSynth) { initSynth(ch[1-1], {oscillator: {type: 'fatsawtooth'}}); } };
postmateMidi.tonejs.generator.registerGenerator(gn, initSynth);

postmateMidi.ui.visualizeGeneratedSound();
console.log(`postmate-midi child:`, postmateMidi);
