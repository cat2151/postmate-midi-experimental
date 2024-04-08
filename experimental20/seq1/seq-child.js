import { postmateMidi } from "../postmate-midi.js";
import { seq as sq } from "./seq.js";
if (!new URL(window.location.href).searchParams.get('query')) window.location.href = "../"; // dir階層直叩きした場合の混乱防止用
const urlParams = rison2.parse(new URL(window.location.href).searchParams.get('query'));

sq.getTemplates = () => {
  return [
    ["テンプレートを選んでください", ``],
    //   event           st   gt
    ["test1", `[
      [ [0xB0, 74,  90],   0,   0 ],
      [ [0x90, 60, 127],   0, 478 ],
      [ [0x90, 64, 127],   0, 478 ],
      [ [0x90, 67, 127], 480, 478 ]
    ]`]
  ];
}
sq.BPM = 120;

// isChild
postmateMidi.registerChild(urlParams, '#textarea', sq.startPlayJson, 'select', sq.getTemplates, sq.setupByData);
postmateMidi.seq.registerSeq(sq);
postmateMidi.ui.registerPlayButton('button', sq.togglePlay);
console.log(`postmate-midi child:`, postmateMidi);
