import { postmateMidi } from "./postmate-midi.js";
import { seq } from "./seq.js";
postmateMidi.registerChild('#textarea', seq.initAndPlayStep);
postmateMidi.registerSeq(seq);
postmateMidi.registerTonejsStarter('button', seq.togglePlay);

import { initSynthPoly } from "./poly.js";
// initSynthPoly(postmateMidi);
