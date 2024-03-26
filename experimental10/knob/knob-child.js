import { postmateMidi } from "../postmate-midi.js";
import { kb } from "./knob.js";
if (!new URL(window.location.href).searchParams.get('query')) window.location.href = "../"; // dir階層直叩きした場合の混乱防止用
const urlParams = rison2.parse(new URL(window.location.href).searchParams.get('query'));
postmateMidi.registerChild(urlParams, null, null, null, null, null);
postmateMidi.seq.registerSeq(kb);

console.log(`postmate-midi child1:`, postmateMidi);
