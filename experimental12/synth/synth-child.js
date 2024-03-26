import { postmateMidi } from "../postmate-midi.js";
if (!new URL(window.location.href).searchParams.get('query')) window.location.href = "../"; // dir階層直叩きした場合の混乱防止用
const urlParams = rison2.parse(new URL(window.location.href).searchParams.get('query'));
postmateMidi.registerChild(urlParams, null, null, null, null, null);

import { initSynth } from "./synth-poly.js";
initSynth(postmateMidi.ch[1-1], {oscillator: {type: 'square'}});
initSynth(postmateMidi.ch[2-1], {oscillator: {type: 'sawtooth'}});
initSynth(postmateMidi.ch[3-1], {oscillator: {type: 'triangle'}});
// 備忘、4-1～16-1は、noteOnしたらalertとなるままにしておく、理由、Androidで空のsynth 4-1～16-1があるとき、ビジュアライザありで、音途切れが発生していたため（だが再現しなくなった）

postmateMidi.ui.visualizeCurrentSound();

console.log(`postmate-midi synty-child:`, postmateMidi);
