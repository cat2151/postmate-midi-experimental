import { postmateMidi } from "../postmate-midi.js";
import { initSampler } from "./sampler.js";
if (!new URL(window.location.href).searchParams.get('query')) window.location.href = "../"; // dir階層直叩きした場合の混乱防止用
const urlParams = rison2.parse(new URL(window.location.href).searchParams.get('query'));

postmateMidi.registerChild(urlParams, null, null, null, null, null);
initSampler(postmateMidi.ch[1-1], null, /*volume=*/-9);
initSampler(postmateMidi.ch[2-1], null, /*volume=*/-6);

const gn = { setupTonejsPreRenderer: function(ch, initSampler) {
  console.log('sampler-child.js : setupTonejsPreRenderer');
  initSampler(ch[1-1], null, /*volume=*/-9);
  initSampler(ch[2-1], null, /*volume=*/-6);
}};
postmateMidi.tonejs.generator.registerGenerator(gn, initSampler);

postmateMidi.ui.registerPrerenderButton('#prerender');
postmateMidi.isSampler = true;

postmateMidi.ui.visualizeCurrentSound();
console.log(`postmate-midi child:`, postmateMidi);
