import "./seq.js";

import { initSynthSaw } from "./saw.js";
initSynthSaw(postmateMidi);

postmateMidi.registerParent(/*child=*/'./child.html', 'textarea');
