import { postmateMidi } from "../postmate-midi.js";
import { seq as sq } from "./seq.js";
import { initSynth } from "./synth-poly.js";
if (!new URL(window.location.href).searchParams.get('query')) window.location.href = "../"; // dir階層直叩きした場合の混乱防止用
const urlParams = rison2.parse(new URL(window.location.href).searchParams.get('query'));

if (urlParams.urls) {
  // isStandalone or isParent
  if (!urlParams.urls.length) {
    // isStandalone
    postmateMidi.registerParent(urlParams, '#textarea', sq.startPlayJson, 'select', sq.getTemplates, sq.setupByData);
    postmateMidi.seq.registerSeq(sq);
    postmateMidi.ui.registerPlayButton('button', sq.togglePlay);

    initSynth(postmateMidi.ch[1-1], {oscillator: {type: 'sawtooth'}});
    // initSynth(postmateMidi.ch[1-1], {oscillator: {type: 'sine'}});
    postmateMidi.ui.visualizeCurrentSound();

    console.log(`postmate-midi standalone:`, postmateMidi);
  } else {
    // isParent
    postmateMidi.registerParent(urlParams, '#textarea', sq.startPlayJson, 'select', sq.getTemplates, sq.setupByData);
    postmateMidi.seq.registerSeq(sq);
    postmateMidi.ui.registerPlayButton('button', sq.togglePlay);
    console.log(`postmate-midi parent:`, postmateMidi);
  }
} else if (urlParams.childId >= 0) {
  // isChild
  postmateMidi.registerChild(urlParams, null, null, null, null, null);
  document.querySelectorAll('select, textarea, button').forEach((element) => { element.remove(); });
  initSynth(postmateMidi.ch[1-1], {oscillator: {type: 'sawtooth'}});
  // initSynth(postmateMidi.ch[1-1], {oscillator: {type: 'sine'}});
  postmateMidi.ui.visualizeCurrentSound();
  console.log(`postmate-midi child:`, postmateMidi);
} else {
  alert(`ERROR : ${urlParams}`);
}
