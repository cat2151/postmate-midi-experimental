// 用途 : 簡易仮想MIDIキーボードのtest用
// usage : parent.js / child.js の import "./keyboard.js"; 付近を参照ください
const kb = { mouseNoteNums: [], mouseLastNoteNum: null, keyboardNoteNums: [], keyShift: 0, isTouch: false };

kb.init = (keyShift) => {
  kb.keyShift = keyShift; // parent / child から個別の値を指定して呼び出す用
}

////////////////////////////
// mouse or touch device
const elm = window; // windowの場合は、childの下の空白をpointしても音が鳴る（そこはwindowなので）。bodyやdiv範囲外に出てもmouseupを検知できる（そこはwindowなので）。
//const elm = document.querySelector("#div"); // bodyや#divの場合は、childの下の空白をpointしても音が鳴らない（そこはbodyやdivではないということ）。bodyやdiv範囲外に出るとmouseup等を検知できない（そこはbodyやdivではないということ）。

////////////////////////////////////
// pointer (mouse or touch device)
// シンプル優先で、mousedownやtouchstartでなく、これを使う。 → pointercancelが意図しないタイミングで発生したため、やむなくtouchも併用する。
elm.addEventListener("pointerdown", (ev) => {
  if (kb.isTouch) return; // iPadやAndroidで意図せぬ発音処理をさせない用（タッチ後にタップでmouseイベントが発生してここに到達する）
  const x = Math.floor(ev.clientX);
  console.log("pointerdown", ev, x);
  onmousedownOrTouchStart(x);
});
elm.addEventListener("pointermove", (ev) => {
  if (kb.isTouch) return;
  // console.log("pointermove");
  const x = ev.clientX;
  onmousemoveOrTouchMove(x);
});
elm.addEventListener("pointercancel", (ev) => { // PC Chrome DevTools iPad emulator にて、mouseを少し動かすだけで発生した。これではiPadのtestができない。対策として、touch検出時はtouchを優先して使うようにした。
  if (kb.isTouch) return;
  console.log("pointercancel");
  onmouseupOrTouchEnd();
});
elm.addEventListener("pointerup", (ev) => {
  if (kb.isTouch) return;
  console.log("pointerup");
  onmouseupOrTouchEnd();
});

elm.addEventListener("blur", (ev) => { // ALT+TAB等で発生する
  console.log("blur");
  allNoteOff();
});

///////////////////
// touch device
elm.addEventListener("touchstart", (ev) => {
  kb.isTouch = true;
  const x = Math.floor(ev.changedTouches[0].clientX);
  console.log("touchstart", ev, x);
  onmousedownOrTouchStart(x);
});
elm.addEventListener("touchmove", (ev) => {
  kb.isTouch = true;
  const x = Math.floor(ev.changedTouches[0].clientX);
  // console.log("touchmove", ev, x, window.innerWidth);
  onmousemoveOrTouchMove(x);
});
elm.addEventListener("touchcancel", (ev) => { // ALT+TAB等で発生する
  kb.isTouch = true;
  console.log("touchcancel");
  onmouseupOrTouchEnd();
});
elm.addEventListener("touchend", (ev) => {
  kb.isTouch = true;
  console.log("touchend", ev);
  onmouseupOrTouchEnd();
});

////////////////////
// mouse or touch
function onmousedownOrTouchStart(x) {
  const noteNum = getPenta(getMouseNoteNum(x));
  if (noteNum == kb.mouseLastNoteNum) return;
  noteOn(noteNum);
  kb.mouseNoteNums.push(noteNum);
  kb.mouseLastNoteNum = noteNum;
}
function onmousemoveOrTouchMove(x) {
  const noteNum = getPenta(getMouseNoteNum(x));
  if (kb.mouseLastNoteNum == null) return;
  if (noteNum == kb.mouseLastNoteNum) return;
  noteOff(kb.mouseNoteNums.pop());
  noteOn(noteNum);
  kb.mouseNoteNums.push(noteNum);
  kb.mouseLastNoteNum = noteNum;
}
function onmouseupOrTouchEnd() {
  while (kb.mouseNoteNums.length) {
    noteOff(kb.mouseNoteNums.pop());
  }
  kb.mouseLastNoteNum = null;
}

function getMouseNoteNum(x) {
  return 36 + Math.floor(x / window.innerWidth * 48);
}

/////////////
// keyboard
onkeydown = (event) => {
  const noteNum = getPenta(getKeyboardNoteNum(event.code));
  console.log("onkeydown", event.code, noteNum)
  if (noteNum < 0) return;
  if (kb.keyboardNoteNums[noteNum]) return;
  kb.keyboardNoteNums[noteNum] = true;
  noteOn(noteNum);
};
onkeyup = (event) => {
  const noteNum = getPenta(getKeyboardNoteNum(event.code));
  console.log("onkeyup", event.code, noteNum)
  if (noteNum < 0) return;
  noteOff(noteNum);
  kb.keyboardNoteNums[noteNum] = false;
};

function getKeyboardNoteNum(key) {
  const i = "ASDFGHJKL".indexOf(key.replace("Key", ""));
  if (i < 0) return i;
  return 60 + i2penta(i);
  function i2penta(i) {
    switch (i) {
      case  0: return  0;
      case  1: return  3;
      case  2: return  5;
      case  3: return  7;
      case  4: return 10;
      case  5: return 12 + 0;
      case  6: return 12 + 3;
      case  7: return 12 + 5;
      case  8: return 12 + 7;
    }
  }
}

function getPenta(noteNum) {
  if (noteNum < 0) return noteNum;
  const octave = Math.floor(noteNum / 12);
  const semitone = noteNum % 12;
  const result = octave * 12 + semitone2penta(semitone);
  // console.log(octave, semitone, result);
  return result;
  function semitone2penta(semitone) {
    // minor penta
    switch (semitone) {
    case  0: return  0;
    case  1: return  0;
    case  2: return  0;
    case  3: return  3;
    case  4: return  3;
    case  5: return  5;
    case  6: return  5;
    case  7: return  7;
    case  8: return  7;
    case  9: return  7;
    case 10: return 10;
    case 11: return 10;
    }
  }
}

////////
// MIDI
function noteOn(noteNum) {
  checkAndSend(sendNoteOn, noteNum);
}
function noteOff(noteNum) {
  checkAndSend(sendNoteOff, noteNum);
}
function allNoteOff(noteNum) {
  checkAndSend(sendAllNoteOff, noteNum);
}
function sendNoteOn(noteNum) {
  noteNum += kb.keyShift;
  kb.sendMidiMessage([[0x90, noteNum, 127]]);
}
function sendNoteOff(noteNum) {
  noteNum += kb.keyShift;
  kb.sendMidiMessage([[0x80, noteNum, 127]]);
}
function sendAllNoteOff() {
  kb.sendMidiMessage([new Uint8Array([0xB0, 0x7B, 0])]);
}

function checkAndSend(fnc, noteNum) {
  if (!kb.isAllSynthReady()) {

    /*
    iPadブラウザ問題
      iPadブラウザは他の環境と異なり、
        playボタンを押さないとWeb Audioから音を出せない
        playボタンを押さずにWeb Audioを呼び続けると、playボタンを押しても音が鳴らなくなる。体験としては、playボタンに気づかずにしばらくタップやスワイプするとplayボタンを押しても音が鳴らなくなりユーザーが混乱する。
      対策
        iPadブラウザは、
          playボタンを用意する
          playボタンで、Web Audioを初期化する。複数webpageのsynthが対象の場合は全て初期化する
          playボタンを押す前は、Web Audioを一切呼ばないようにする
        これらの処理をアプリごとに毎回書くのは手間なので、ライブラリ化して利用する
    */

    if (kb.isIpad()) return; // iPadはplayボタンでのみWeb Audioを初期化するので

    kb.initOnStartPlaying(); // Web Audioを初期化する用

    (async () => {
      let i = 0;
      while (true) {
        const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
        await sleep(16);
        if (kb.isAllSynthReady()) { // PCで、mousedownしてsynth側の準備ができたらそのまま音を鳴らす用
          fnc(noteNum);
          break;
        }
        if (i++ > 60) {
          console.log(`${fnc.name} : 時間切れ`);
          break;
        }
      }
    })();
  } else {
    fnc(noteNum);
  }
}

export { kb };
