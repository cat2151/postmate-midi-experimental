import { postmateMidi } from "./postmate-midi.js";
import { seq } from "./seq.js";
postmateMidi.registerChild('#textarea', seq.startPlayJson, 'select', seq.getTemplates, seq.setupByData);
postmateMidi.registerSeq(seq);
postmateMidi.registerTonejsStarter('button', seq.togglePlay);

import { initSynth } from "./saw-poly.js";
initSynth(postmateMidi);
