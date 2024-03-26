import { postmateMidi } from "./postmate-midi.js";
import { kb } from "./keyboard.js";
postmateMidi.registerChild(null, null, null, null, null);
postmateMidi.seq.registerSeq(kb);
postmateMidi.ui.registerPlayButton('button', kb.initOnStartPlaying, /*isRemovePlayButtonAtTonejsStartRunning=*/true); // iPadではplayボタン経由でTone.js startしないと音が鳴らないことがあるようなので
if (!postmateMidi.ui.isIpad()) { postmateMidi.ui.button.remove(); }

import { initSynth } from "./synth-poly.js";
initSynth(postmateMidi.tonejs, {oscillator: {type: 'triangle'}});

console.log(`postmate-midi child:`, postmateMidi);
