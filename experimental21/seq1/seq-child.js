import { postmateMidi } from "../postmate-midi.js";
import { preRenderer } from "../prerenderer.js";
import { seq as sq } from "./seq.js";
if (!new URL(window.location.href).searchParams.get('query')) window.location.href = "../"; // dir階層直叩きした場合の混乱防止用
const urlParams = rison2.parse(new URL(window.location.href).searchParams.get('query'));

sq.getTemplates = () => {
  return [
    ["---", ``],
    //   event           st   gt
    ["preRender1", `[
      [ [0xB0, 74,  90],   0,   0 ],
      [ [0xB0, 10, 127],   0,   0 ],
      [ [0x90, 60, 127],   0, 478 ],
      [ [0x90, 64, 127],   0, 478 ],
      [ [0x90, 67, 127], 480, 478 ]
    ]`],
    ["preRender2", `[
      [ [0xB0, 74, 127],   0,   0 ],
      [ [0xB0, 10,   1],   0,   0 ],
      [ [0x90, 48, 127],   0, 478 ],
      [ [0x90, 36, 127],   0, 478 ],
      [ [0x90, 24, 127], 480, 478 ]
    ]`]
  ];
}
sq.BPM = 120;

postmateMidi.registerChild(urlParams, '#textarea', null/*sq.startPlayJson*/, 'select', sq.getTemplates, sq.setupByData);
postmateMidi.seq.registerSeq(sq);
postmateMidi.ui.removeButton('button');
postmateMidi.preRenderer.registerPrerenderer(preRenderer);

console.log(`postmate-midi child:`, postmateMidi);
