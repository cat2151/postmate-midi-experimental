import { postmateMidi } from "../postmate-midi.js";
import { seq as sq } from "./seq.js";
if (!new URL(window.location.href).searchParams.get('query')) window.location.href = "../"; // dir階層直叩きした場合の混乱防止用
const urlParams = rison2.parse(new URL(window.location.href).searchParams.get('query'));

sq.getTemplates = () => {
  return [
    ["テンプレートを選んでください", ``],
    //   event           st   gt
    ["test1", `[
      [ [0x91, 60, 127],   0, 382 ],
      [ [0x90, 60, 127],  96,  94 ],
      [ [0x90, 63, 127],  96,  94 ],
      [ [0x90, 65, 127],  96,  94 ],
      [ [0x90, 68, 127],  48,  46 ],
      [ [0x90, 70, 127],  48,  46 ]
    ]`]
  ];
}
sq.BPM = 140;

// isChild
postmateMidi.registerChild(urlParams, '#textarea', sq.startPlayJson, 'select', sq.getTemplates, sq.setupByData);
postmateMidi.seq.registerSeq(sq);
postmateMidi.ui.registerPlayButton('button', sq.togglePlay);
console.log(`postmate-midi child:`, postmateMidi);
