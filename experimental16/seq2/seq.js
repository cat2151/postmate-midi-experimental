// 用途 : JSON演奏のtest用
// usage : parent.js / child.js の import "./seq.js"; 付近を参照ください
const BPM = 130;
const TICKS_PER_MEASURE = 192;
const seq = {};

seq.getTemplates = () => {
  return [
    ["テンプレートを選んでください", ``],
    //   event           st   gt    ※ひとまずMIDI ch 2
    ["test1", `[
      [ [0x91, 72, 127],  12,  90 ],
      [ [0x91, 76, 127],  12,  90 ],
      [ [0x91, 79, 127],  12,  90 ],
      [ [0x91, 83, 127],  60,  90 ]
    ]`]
  ];
}

seq.togglePlay = () => {
  seq.isPlaying = !seq.isPlaying;
  if (seq.isPlaying) {
    console.log(`seq : togglePlay (${location.pathname})`);
    init();
    seqPlay();
  } else {
    allNoteOff(); // 音の余韻が残る。playボタンの操作感覚としては心地よい
    // init(); // 音がぶつ切りになる。用途次第ではこちらもよいので使い分け想定
  }
}

seq.setupByData = (data) => {
  data = data.replace(/0x[0-9A-Fa-f]+/g, function (match) {
    return parseInt(match, 16);
  });
  seq.json = JSON.parse(data);
}

seq.startPlayJson = (data) => {
  console.log(`seq : startPlayJson (${location.pathname})`);
  seq.setupByData(data);
  init();
  seq.isPlaying = true;
  seqPlay();
}

function seqPlay() {
  if (!seq.isPlaying) return;

  seq.midiMessagesBuffer = [];
  let waitTime;
  while (!waitTime) {
    waitTime = playStep(); // 和音の構成音それぞれの発音タイミングが思ったよりズレたため、対策として、st0の間はmidiMessageをバッファリングし、まとめてsendとした。あわせて、synth側に発音予定時刻playTimeを伝えることで解決した。
  }
  seq.sendMidiMessage(seq.midiMessagesBuffer, seq.playTime);
  seq.timeoutIds.push(setTimeout(seqPlay, waitTime));
}

function init() {
  allSoundOff();
  seq.timeOf1st = calcStepTimeMsec(BPM, TICKS_PER_MEASURE);
  seq.baseTimeStamp = performance.now();
  seq.playTime = 0;
  seq.nextTime = 0;
  seq.index = 0;
  seq.initOnStartPlaying();
  clearTimeouts();

  function clearTimeouts() {
    if (seq.timeoutIds) {
      for (const id of seq.timeoutIds) {
        clearTimeout(id); // 再演奏時に、以前のnoteOffのsetTimeoutが残っていて音が消える、のを防止する用。なお発火済みのtimeoutを都度消すのはしていない、シンプル優先。仮に1秒に10要素、1時間で36000要素、問題ないと想定する。
      }
      seq.timeoutIds = [];
    } else {
      seq.timeoutIds = [];
    }
  }
}

function playStep() {
  const arr = seq.json[seq.index][0];
  const event = new Uint8Array(arr);
  const st = seq.json[seq.index][1];
  const waitTime = procNextTime(seq.timeOf1st * st);

  seq.midiMessagesBuffer.push(event);
  if (isNoteOn(event)) {
    setupNoteOff();
    function setupNoteOff() {
      const gt = seq.json[seq.index][2];
      const noteOffTimeLogical = seq.timeOf1st * gt;
      const playTime = seq.playTime + noteOffTimeLogical;
      seq.timeoutIds.push(setTimeout(noteOff, noteOffTimeLogical, new Uint8Array(arr), playTime));
      function noteOff(event, playTime) {
        const ch = event[0] & 0x0F;
        event[0] = 0x80 | ch;
        seq.sendMidiMessage([event], playTime);
      }
    }
  }

  seq.index = (seq.index + 1) % seq.json.length;
  return waitTime;

  function isNoteOn(event) {
    return (event[0] & 0xF0) == 0x90;
  }
}

function procNextTime(stepTime) {
  seq.playTime = seq.nextTime; // 現在の論理演奏時間
  const real = performance.now() - seq.baseTimeStamp; // 処理速度が有限のため論理より大きくなる（遅れる）、現在の物理演奏時間
  const diff = real - seq.playTime;
  const waitTime = stepTime - diff; // 次回のsetTimeout用
  // console.log({diff: Math.floor(diff), time: Math.floor(time)});
  seq.nextTime += stepTime; // 次回の論理演奏時間
  return waitTime;
}

function getMidiEventName(i) {
  switch (i & 0xF0) {
  case 0x90: return 'noteOn';
  case 0x80: return 'noteOff';
  case 0xB0: return 'ControlChange';
  }
}

function calcStepTimeMsec(bpm, beatnote) {
  return 1000 * 60 * 4 / bpm / beatnote;
}

function allNoteOff() {
  for (let ch = 0; ch < 16; ch++) {
    seq.sendMidiMessage([new Uint8Array([0xB0 | ch, 0x7B, 0])]);
  }
}

function allSoundOff() {
  for (let ch = 0; ch < 16; ch++) {
    seq.sendMidiMessage([new Uint8Array([0xB0 | ch, 0x78, 0])]);
  }
}

export { seq };
