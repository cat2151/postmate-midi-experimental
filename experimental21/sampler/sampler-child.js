import { postmateMidi } from "../postmate-midi.js";
import { preRenderer } from "../prerenderer.js";
import { initSynth } from "../synth/synth-poly.js";
if (!new URL(window.location.href).searchParams.get('query')) window.location.href = "../"; // dir階層直叩きした場合の混乱防止用
const urlParams = rison2.parse(new URL(window.location.href).searchParams.get('query'));

postmateMidi.registerChild(urlParams, null, null, null, null, null);

postmateMidi.tonejs.registerSynth((ch) => {
  initSynth(ch, [ {ch: 1-1, instrument: 'Sampler', samples: null, volume: -9, isUsingPan: false},
                  {ch: 2-1, instrument: 'Sampler', samples: null, volume: -6, isUsingPan: false} ]);
});

postmateMidi.isSampler = true;

postmateMidi.preRenderer.registerPrerenderer(preRenderer);
postmateMidi.ui.registerPrerenderButton('#prerender'); // registerPrerendererのあとに呼び出すこと
postmateMidi.ui.registerWavImportButton('#wavimport'); // registerPrerendererのあとに呼び出すこと

postmateMidi.ui.registerGeneratedSoundVisualizer();
postmateMidi.ui.visualizeCurrentSound();
console.log(`postmate-midi child:`, postmateMidi);
