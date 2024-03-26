import { postmateMidi } from "../postmate-midi.js";
import { initSampler } from "./sampler.js";
if (!new URL(window.location.href).searchParams.get('query')) window.location.href = "../"; // dir階層直叩きした場合の混乱防止用
const urlParams = rison2.parse(new URL(window.location.href).searchParams.get('query'));

postmateMidi.registerChild(urlParams, null, null, null, null, null);
const samplerParam1 = { urls: { A2: "handdrum-loop.mp3" }, baseUrl: "https://tonejs.github.io/audio/drum-samples/" };
const samplerParam2 = { urls: { C5: "Analogsynth_octaves_highmid.mp3" }, baseUrl: "https://tonejs.github.io/audio/berklee/" };
const samplerParam3 = null;
initSampler(postmateMidi.ch[1-1], samplerParam1, /*volume=*/-1);
initSampler(postmateMidi.ch[2-1], samplerParam3, /*volume=*/-9);

postmateMidi.ui.visualizeCurrentSound();
console.log(`postmate-midi child:`, postmateMidi);
