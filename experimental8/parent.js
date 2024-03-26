import { postmateMidi } from "./postmate-midi.js";
import { seq as sq } from "./seq.js";
postmateMidi.registerParent(/*child=*/'./child.html', '#textarea', sq.startPlayJson, 'select', sq.getTemplates, sq.setupByData);
postmateMidi.ui.registerPlayButton('button', sq.togglePlay);
postmateMidi.seq.registerSeq(sq);

import { initSynth } from "./saw-poly.js";
initSynth(postmateMidi.tonejs);

console.log(`postmate-midi parent:`);
console.log(postmateMidi);
