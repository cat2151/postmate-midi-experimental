import { postmateMidi } from "../postmate-midi.js";
import { initSynth } from "./synth-poly.js";
if (!new URL(window.location.href).searchParams.get('query')) window.location.href = "../"; // dir階層直叩きした場合の混乱防止用
const urlParams = rison2.parse(new URL(window.location.href).searchParams.get('query'));

postmateMidi.registerChild(urlParams, null, null, null, null, null);
initSynth(postmateMidi.ch[1-1], {oscillator: {type: 'sawtooth'}});
postmateMidi.ui.visualizeCurrentSound();
console.log(`postmate-midi child:`, postmateMidi);
