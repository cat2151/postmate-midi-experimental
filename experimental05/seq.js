// 用途 : 演奏時の時間分解能がどれだけ高いか？のtest用
// postmateMidi用
// usage : import "./seq.js";
const BPM = 500;
const BEAT_NOTE = 64;
const DURATION_RATIO = 0.9;
const seq = {};

seq.togglePlay = () => {
  seq.isPlaying = !seq.isPlaying;
  if (seq.isPlaying) {
    seq.stepTime = calcStepTimeMsec(BPM, BEAT_NOTE);
    seq.baseTime = performance.now();
    seq.playTime = 0;
  }
  seqPlay();
}

function seqPlay() {
  if (seq.isPlaying) {
    sendNoteOn(/*noteNum = */60 + Math.random() * 12);
    const time = calcNextTime(seq.stepTime);
    setTimeout(sendNoteOff, time * DURATION_RATIO);
    setTimeout(seqPlay, time);
  } else {
    sendNoteOff();
  }
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
  // postmateMidi.noteOn(noteNum);
  sendMidiMessage(new Uint8Array([0x90, noteNum, 127]));
}

function sendNoteOff(noteNum) {
  sendMidiMessage(new Uint8Array([0x80, noteNum, 127]));
}

function sendMidiMessage(event) {
  if (postmateMidi.child) {
    postmateMidi.child.call('onmidimessage', event);
    return;
  }
  if (postmateMidi.parent) {
    postmateMidi.parent.emit('onmidimessage', event);
    return;
  }
}

postmateMidi.seq = seq;
