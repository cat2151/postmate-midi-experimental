import { postmateMidi } from "./postmate-midi.js";
import { seq as sq } from "./seq.js";
postmateMidi.registerChild('#textarea', sq.startPlayJson, 'select', sq.getTemplates, sq.setupByData);
postmateMidi.ui.registerPlayButton('button', sq.togglePlay);
postmateMidi.seq.registerSeq(sq);

import { initSynth } from "./saw-poly.js";
initSynth(postmateMidi.tonejs);

console.log(`postmate-midi child:`);
console.log(postmateMidi);
