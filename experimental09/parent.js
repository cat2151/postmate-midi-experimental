import { postmateMidi } from "./postmate-midi.js";
import { kb } from "./keyboard.js";
postmateMidi.registerParent(/*child=*/'./child.html', null, null, null, null, null);
postmateMidi.seq.registerSeq(kb);
postmateMidi.seq.init(2);
postmateMidi.ui.registerPlayButton('button', kb.initOnStartPlaying, /*isRemovePlayButtonAtTonejsStartRunning=*/true); // iPadではplayボタン経由でTone.js startしないと音が鳴らないことがあるようなので
if (!postmateMidi.ui.isIpad()) { postmateMidi.ui.button.remove(); }

import { initSynth } from "./synth-poly.js";
initSynth(postmateMidi.tonejs, {oscillator: {type: 'sawtooth'}});

console.log(`postmate-midi parent:`, postmateMidi);
