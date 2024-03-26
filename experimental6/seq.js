// 用途 : 和音演奏のtest用
// usage : parent.js / child.js の import "./seq.js"; 付近を参照ください
const BPM = 100;
const BEAT_NOTE = 16;
const DURATION_RATIO = 0.1;
const seq = {};

seq.togglePlay = () => {
  seq.isPlaying = !seq.isPlaying;
  if (seq.isPlaying) {
    init();
  }
  seqPlay();
}

seq.initAndPlayStep = () => {
  init();
  playStep()
}

function seqPlay() {
  if (seq.isPlaying) {
    const time = playStep();
    setTimeout(seqPlay, time);
  } else {
    sendNoteOff();
  }
}

function init() {
  seq.stepTime = calcStepTimeMsec(BPM, BEAT_NOTE);
  seq.baseTime = performance.now();
  seq.playTime = 0;
}

function playStep() {
  sendNoteOn(/*noteNum = */60);
  sendNoteOn(/*noteNum = */64);
  sendNoteOn(/*noteNum = */67);
  // sendNoteOn(/*noteNum = */71);
  const time = calcNextTime(seq.stepTime);

  setTimeout(sendNoteOff, time * DURATION_RATIO, /*noteNum = */60);
  setTimeout(sendNoteOff, time * DURATION_RATIO, /*noteNum = */64);
  setTimeout(sendNoteOff, time * DURATION_RATIO, /*noteNum = */67);
  // setTimeout(sendNoteOff, time * DURATION_RATIO, /*noteNum = */71);

  return time;
}

function calcNextTime(stepTime) {
  const real = performance.now() - seq.baseTime;
  const diff = real - seq.playTime;
  const time = stepTime - diff;
  // console.log({diff: Math.floor(diff), time: Math.floor(time)});
  seq.playTime += stepTime;
  return time;
}

function calcStepTimeMsec(bpm, beatnote) {
  return 1000 * 60 * 4 / bpm / beatnote;
}

function sendNoteOn(noteNum) {
  seq.sendMidiMessage(new Uint8Array([0x90, noteNum, 127]));
}

function sendNoteOff(noteNum) {
  seq.sendMidiMessage(new Uint8Array([0x80, noteNum, 127]));
}

export { seq };
