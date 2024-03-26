import { postmateMidi } from "../postmate-midi.js";
import { seq as sq } from "./seq.js";
if (!new URL(window.location.href).searchParams.get('query')) window.location.href = "../"; // dir階層直叩きした場合の混乱防止用
const urlParams = rison2.parse(new URL(window.location.href).searchParams.get('query'));

// isChild
postmateMidi.registerChild(urlParams, '#textarea', sq.startPlayJson, 'select', sq.getTemplates, sq.setupByData);
postmateMidi.seq.registerSeq(sq);
postmateMidi.ui.registerPlayButton('button', sq.togglePlay);
console.log(`postmate-midi child:`, postmateMidi);
