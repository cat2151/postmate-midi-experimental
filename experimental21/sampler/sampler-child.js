import { postmateMidi } from "../postmate-midi.js";
import { initSynth } from "../synth/synth-poly.js";
if (!new URL(window.location.href).searchParams.get('query')) window.location.href = "../"; // dir階層直叩きした場合の混乱防止用
const urlParams = rison2.parse(new URL(window.location.href).searchParams.get('query'));

postmateMidi.registerChild(urlParams, null, null, null, null, null);

postmateMidi.tonejs.registerSynth((ch) => {
  initSynth(ch, [ {ch: 1-1, instrument: 'Sampler', samples: null, volume: -9, isUsingPan: false},
                  {ch: 2-1, instrument: 'Sampler', samples: null, volume: -6, isUsingPan: false} ]);
});

postmateMidi.ui.registerPrerenderButton('#prerender');
postmateMidi.isSampler = true;
postmateMidi.ui.registerWavImportButton('#wavimport');

postmateMidi.ui.visualizeCurrentSound();
console.log(`postmate-midi child:`, postmateMidi);
