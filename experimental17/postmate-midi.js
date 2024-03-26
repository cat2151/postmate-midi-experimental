// usage : parent.js / child.js を参照ください
const postmateMidi = {
  registerParent,
  children: [], isStartTone: [], isCompleteHandshakeAllChildren: false, // parentのみが保持するもの
  registerChild,
  parent: null, childId: null,   // childのみが保持するもの
  midiOutputIds: [], sendToSamplerIds: [],
  ch: Array.from({ length: 16 }, () => ({ noteOn: null, noteOff: null, controlChange: [] })),
  ui: { registerPlayButton, isIpad, isSmartPhone, visualizeCurrentSound, visualizeGeneratedSound },
  seq: { registerSeq }, // register時、seqそのものが外部sqに上書きされる
  isAllSynthReady: false, // 名前が紛らわしいが、seqが持つfncとは別。parentとchildそれぞれが保持する変数。seqが持つfncは外部からこれにアクセスする用のアクセサ。
  tonejs: { isStartTone: false, synth: null, initBaseTimeStampAudioContext, baseTimeStampAudioContext: 0, initTonejsByUserAction,
      generator: { registerGenerator } // register時、generatorそのものが外部gnに上書きされる
    } };

let isParent = false; // ひとまず非公開、postmateMidiをシンプルにする優先
let isChild  = false;

function registerParent(urlParams, textareaSelector, textareaSeqFnc, textareaTemplateDropDownListSelector, textareaTemplatesFnc, setupSeqByTextareaFnc) {
  isParent = true;
  console.log(`${getParentOrChild()} : registerParent start : time : ${Date.now() % 10000}`)
  const ui = postmateMidi.ui;
  const urls = urlParams.urls;
  postmateMidi.midiOutputIds = getMidiOutputIds(urlParams.midiOutput);
  postmateMidi.sendToSamplerIds = getMidiOutputIds(urlParams.sendToSampler);
  postmateMidi.isStartTone = Array.from({ length: urls.length + 1 }, () => (false));
  let isCompleteHandshake;
  (async () => {
    for (let childId = 0; childId < urls.length; childId++) {
      isCompleteHandshake = false;
      doHandshake(childId);
      let i = 0;
      while (!isCompleteHandshake) {
        /*sleep*/await new Promise(resolve => setTimeout(resolve, 16));
        if (i++ > 60) {
          const s = `child${childId + 1} : handshake : 時間切れ`;
          console.log(s);
          alert(s);
          break;
        }
      }
      /*sleep*/await new Promise(resolve => setTimeout(resolve, 100)); // 次のchildとのhandshakeを成功させる用。handshake成功のちさらにwaitが必要、でないと次のhandshakeがエラーとなることが多かった。16msecだとエラーになることがあった。
    }

    postmateMidi.isCompleteHandshakeAllChildren = true;
    console.log(`${getParentOrChild()} : handshake complete all children : time : ${Date.now() % 10000}`);
    for (let i = 0; i < postmateMidi.children.length; i++) {
      postmateMidi.children[i].call('onCompleteHandshakeAllChildren');
    }
  })();

  function doHandshake(childId) {
    const childName = `child${childId + 1}(${urls[childId]})`;
    console.log(`parent : start handshake to ${childName}`);

    const baseUrl = urls[childId];
    const urlParams = rison2.stringify({ childId }); // risonの用途は、URLを常時読みやすくして開発効率化する用
    const url = `${baseUrl}?query=${urlParams}`;
    const selector = '#child' + (childId + 1);
    const container = document.querySelector(selector);
    console.log(`parent : container : `, container);
    if (!container) alert(`index.htmlに ${selector} を書いてください`)
    const handshake = new Postmate({
      container,
      url
    });

    handshake.then(child => {
      console.log(`parent : handshake is complete : to ${childName}`);
      child.call('onCompleteHandshakeParent', `"Hello, ${childName}!" by parent`);

      child.get('height')
      .then(height => child.frame.style.height = `${height * 1.5}px`);
        // ↑ 見切れる。原因不明。取り急ぎ height * 1.5 した

      // Listen to a particular event from the child
      child.on('onCompleteHandshakeChild' + (childId + 1), data => {
        console.log(`parent : onCompleteHandshakeChild : from ${childName} : received data : [${data}]`);
        isCompleteHandshake = true;
      });
      child.on('onChangeTextarea' + (childId + 1), data => {
        console.log(`parent : onChangeTextarea : from ${childName} : received data : [${data}]`);
        // textareaのlink用。例えば child1-seq, child2-seq がそれぞれ個別のtextareaを持ち、片方を変更したときは、両方のseqを同時play開始する用。
        // parentのぶん
        if (textareaSeqFnc) textareaSeqFnc(ui.textarea.value);
        // このchild以外のすべてのchildのぶん ※このchildに送信すると無限loopになってしまうはず
        for (let i = 0; i < postmateMidi.children.length; i++) {
          if (i == childId) continue;
          postmateMidi.children[i].call('onChangeAnyTextarea');
        }

        // childからparentにtextarea内容を反映する用途のとき用。その用途はpostmate-midiとしてはほぼない考え。ひとまずコメントアウトしておく。また、もし必要になったら別のeventに切り出す考え。
        // ui.textarea.value = data;
      });
      child.on('onClickPlayButton' + (childId + 1), data => {
        console.log(`parent : onClickPlayButton : from ${childName}`);
        // parentのぶん
        onClickPlayButton();
        // このchild以外のすべてのchildのぶん ※このchildに送信すると無限loopになってしまうはず
        for (let i = 0; i < postmateMidi.children.length; i++) {
          if (i == childId) continue;
          postmateMidi.children[i].call('onClickPlayButton');
        }
      });
      child.on('onStartPlaying' + (childId + 1), data => {
        console.log(`parent : onStartPlaying : from ${childName} : received data : [${data}]`);
        // parentのぶん
        onStartPlaying(data);
        // このchild以外のすべてのchildのぶん ※このchildに送信すると無限loopになってしまうはず
        for (let i = 0; i < postmateMidi.children.length; i++) {
          if (i == childId) continue;
          postmateMidi.children[i].call('onStartPlaying', data);
        }
      });
      child.on('onSynthReady' + (childId + 1), data => {
        console.log(`parent : onSynthReady : from ${childName} : received data : [${data}]`);
        postmateMidi.isStartTone[childId + 1] = true;
        checkAllSynthReady();
      });
      child.on('onmidimessage' + (childId + 1), data => { // onmidimessage1 ～ : child1からcallされた場合は、onmidimessage1 となる
        console.log(`parent : onmidimessage : from ${childName} : received data : [${data}]`);
        // child1～n がrecvしたMIDImessageを、一度ここparentに集約したのち、振り分けてMIDIoutする
        sendMidiMessageFromDevice(data[0], data[1], /*deviceId=*/childId + 1);
      });
      child.on('sendToSampler' + (childId + 1), data => { // sendToSampler1 ～ : child1からcallされた場合は、sendToSampler1 となる。意味は、わかりづらいが sendToSampler from child1 である。
        console.log(`parent : sendToSampler : from ${childName} : received data : [`, data, `]`);
        // child1～n がgenerateした wav を、一度ここparentに集約したのち、振り分けて sendToSampler する
        sendToSamplerFromDevice(data, /*deviceId=*/childId + 1);
      });

      // 備忘、ここでは textareaSelector から textareaSeqFnc への接続をしない。なぜならここはchildごとの処理なので、child1,child2,...でそれぞれui.textareaを同じ内容で上書きしていくのはムダなので。

      postmateMidi.children[childId] = child;
    });
  }

  // parentにtextareaがある場合用 & standalone用
  if (textareaSelector) {
    ui.textarea = document.querySelector(textareaSelector);
    ui.textarea.addEventListener("input", onChangeTextarea);
    if (textareaTemplateDropDownListSelector) {
      setupDropDownListForTextareaTemplate(textareaTemplateDropDownListSelector, textareaTemplatesFnc, onChangeTextarea, setupSeqByTextareaFnc);
    }

    function onChangeTextarea() {
      if (textareaSeqFnc) {
        textareaSeqFnc(ui.textarea.value);
      }
    }
  }

  function getMidiOutputIds(midiOutput) {
    // 例 : midiOutput: {"parent":["parent","child1"],"child1":["child2"],"child2":[]} → midiOutputIds: [[0,1],[2],[]]
    let ids = [];
    for (const property in midiOutput) {
      // console.log(`${property}: ${midiOutput[property]}`);
      if (property == 'parent') {
        ids[0] = getOutputIds(midiOutput.parent);
        // console.log(`ids: parent: ${ids}`);
      } else {
        const nameArr = property.split('child');
        const index = parseInt(nameArr[1]);
        // console.log(`nameArr: ${nameArr} i: ${id}`);
        if (nameArr[0] == '' && Number.isInteger(index) && index >= 1) {
          ids[index] = getOutputIds(midiOutput[property])
        } else {
          alert(`ERROR : getMidiOutputIds : property = [${property}]`);
        }
      }
      // console.log(`ids: ${ids}`);
    }
    console.log(`midiOutput: ${JSON.stringify(midiOutput)} → midiOutputIds: ${JSON.stringify(ids)}`);
    return ids;

    function getOutputIds(deviceNames) {
      let ids = [];
      for (let i = 0; i < deviceNames.length; i++) {
        ids[i] = getOutputId(deviceNames[i]);
      }
      return ids;

      function getOutputId(deviceName) {
        // console.log(`deviceName : ${deviceName}`)
        if (deviceName == 'parent') return 0;
        const nameArr = deviceName.split('child');
        const outputId = parseInt(nameArr[1]);
        if (nameArr[0] == '' && Number.isInteger(outputId) && outputId >= 1) {
          return outputId;
        }
        alert(`ERROR : getOutputId : deviceName = [${deviceName}]`);
      }
    }
  }
}

function registerChild(urlParams, textareaSelector, textareaSeqFnc, textareaTemplateDropDownListSelector, textareaTemplatesFnc, setupSeqByTextareaFnc) {
  isChild = true;
  const ui = postmateMidi.ui;
  const childId = urlParams.childId;

  const handshake = new Postmate.Model({
    // Expose your model to the Parent. Property values may be functions, promises, or regular values
    height: () => document.height || document.body.offsetHeight,
    onCompleteHandshakeParent,
    onCompleteHandshakeAllChildren,
    onChangeAnyTextarea,
    onClickPlayButton,
    onStartPlaying,
    onAllSynthReady,
    onmidimessage,
    sendToSampler
  });

  handshake.then(parent => {
    console.log(`child${childId + 1} : handshake is complete`);
    parent.emit('onCompleteHandshakeChild' + (childId + 1), `"Hello, World!" by child${childId + 1}`);

    if (textareaSelector) {
      ui.textarea = document.querySelector(textareaSelector);
      ui.textarea.addEventListener("input", onChangeTextarea);
      if (textareaTemplateDropDownListSelector) {
        setupDropDownListForTextareaTemplate(textareaTemplateDropDownListSelector, textareaTemplatesFnc, onChangeTextarea, setupSeqByTextareaFnc);
      }

      function onChangeTextarea() {
        if (textareaSeqFnc) {
          console.log(`child${childId + 1} : onChangeTextarea : textareaSeqFnc`);
          textareaSeqFnc(ui.textarea.value);
        }

        console.log(`child${childId + 1} : onChangeTextarea`);
        parent.emit('onChangeTextarea' + (childId + 1));

        // childからparentにtextarea内容を反映する用途のとき用。その用途はpostmate-midiとしてはほぼない考え。ひとまずコメントアウトしておく。
        // console.log(`child${childId + 1} : onChangeTextarea : emit data : [${ui.textarea.value}]`);
        // parent.emit('onChangeChildTextarea' + (childId + 1), ui.textarea.value);
      }
    }

    postmateMidi.parent = parent;
    postmateMidi.childId = childId;
  });

  // parentからcallされる
  function onCompleteHandshakeParent(data) {
    console.log(`child${childId + 1} : onCompleteHandshakeParent : received data : [${data}]`);
  }
  function onCompleteHandshakeAllChildren(data) {
    console.log(`child${childId + 1} : onCompleteHandshakeAllChildren : received data : [${data}] : time : ${Date.now() % 10000}`);

    // generator用
    sendWavAfterHandshakeAllChildren();
  }
  function onAllSynthReady() {
    console.log(`child${childId + 1} : onAllSynthReady`);
    postmateMidi.isAllSynthReady = true;
  }
  function onChangeAnyTextarea(data) {
    // textareaのlink用。例えば child1-seq, child2-seq がそれぞれ個別のtextareaを持ち、片方を変更したときは、両方のseqを同時play開始する用。
    console.log(`child${childId + 1} : onChangeAnyTextarea`);
    if (textareaSeqFnc) {
      console.log(`child${childId + 1} : onChangeAnyTextarea : textareaSeqFnc`);
      textareaSeqFnc(ui.textarea.value);
    }
  }
}

function getParentOrChild() { // for debug
  if (isParent) return 'parent';
  if (isChild)  return `child${postmateMidi.childId + 1}`;
}

////////
// UI
function registerPlayButton(buttonSelector, playButtonFnc, isRemovePlayButtonAtTonejsStartRunning) {
  const ui = postmateMidi.ui;
  ui.button = document.querySelector(buttonSelector);
  ui.button.onclick = function() {
    postmateMidi.tonejs.initTonejsByUserAction();
    console.log(`${getParentOrChild()} : onclick playButton`);
    linkPlayButton();
    playButtonFnc();
  };
  ui.playButtonFnc = playButtonFnc; // linkPlayButton用
  ui.checkRemovePlayButton = () => {
    // iPadでplayボタンを押さないと音が鳴らない問題の対策に関連して、playボタンを押してさらにTone.jsが問題なくrunningしたあとはplayボタンをremoveしてわかりやすくする用
    if (!isRemovePlayButtonAtTonejsStartRunning) return;
    ui.button.remove();
  }
  ui.button.focus(); // pageを開いてspace keyを押すだけでplay開始できる用。開発時に便利。今後は必要に応じて自動focusのon/offを設定可能にするかも検討予定。
}

// すべてのparentやchildのplayボタンを、postMessage経由で同時に押したことにする用
function linkPlayButton() {
  if (isParent) {
    // childすべてをcallする
    for (let i = 0; i < postmateMidi.children.length; i++) {
      postmateMidi.children[i].call('onClickPlayButton');
    }
  } else {
    postmateMidi.parent.emit('onClickPlayButton' + (postmateMidi.childId + 1));
  }
}

// すべてのparentやchildのplayボタンを、postMessage経由で同時に押したことにする用
function onClickPlayButton() {
  if (postmateMidi.ui.playButtonFnc) {
    postmateMidi.ui.playButtonFnc();
  }
}

function setupDropDownListForTextareaTemplate(textareaTemplateDropDownListSelector, textareaTemplatesFnc, onChangeTextarea, setupSeqByTextareaFnc) {
  const ui = postmateMidi.ui;
  ui.select = document.querySelector(textareaTemplateDropDownListSelector);
  ui.select.addEventListener('change', onChangeSelect);
  for (const t of textareaTemplatesFnc()) {
    addOptionToSelect(t[1], t[0]);
  }
  ui.options = document.querySelectorAll(textareaTemplateDropDownListSelector + " option");
  ui.textarea.value = ui.options[1].value;  // playボタンですぐ音を鳴らす用
  setupSeqByTextareaFnc(ui.textarea.value); // 〃

  function onChangeSelect() {
    ui.textarea.value = ui.options[ui.select.selectedIndex].value;
    onChangeTextarea();
  }

  function addOptionToSelect(value, text) {
    const opt = document.createElement("option");
    opt.value = removeIndent(value);
    opt.text = text;
    ui.select.add(opt);

    function removeIndent(rawString) {
      const lines = rawString.split('\n');
      const trimmedLines = lines.map(line => line.trim());
      return trimmedLines.join('\n');
    }
  }
}

function isIpad() {
  const ua = window.navigator.userAgent.toLowerCase();
  // console.log(`userAgent : ${ua}`);
  if (ua.indexOf('ipad') !== -1 || ua.indexOf('macintosh') !== -1 ) {
    // console.log("playボタン必須。でないと音が鳴らない系")
    return true;
  } else {
    // console.log("mouseやtouchだけで音が鳴る系")
    return false;
  }
}

function isSmartPhone() {
  return navigator.userAgent.match(/iPhone|Android.+Mobile/);
}

// 用途、synth用。synthはoutputが音であるが、同時に可視化もして、状況把握しやすく使いやすくする用。
function visualizeCurrentSound() {
  const analyser = new Tone.Analyser("waveform", 256);
  Tone.Master.connect(analyser);
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let interval = getInitialInterval();
  let eventId = startVisualization();
  Tone.Transport.start();
  canvas.addEventListener("click", changeVisualization);

  function getInitialInterval() {
    // if (isSmartPhone()) return 5; // AndroidやiPhone用 → 検証した結果、5だとかえって音途切れが増えた、おそらくCPU負荷が下がりすぎた。よってデフォルトは一律60FPSで様子見する
    return 60;                    // PCやiPad用
  }
  function startVisualization() {
    // オシロスコープ
    return Tone.Transport.scheduleRepeat(() => {
      const waveform = analyser.getValue();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = "#0f0"; // dark mode / light 両対応を想定
      for (let i = 0; i < waveform.length; i++) {
        const x = (i / waveform.length) * canvas.width;
        const y = (0.5 * canvas.height) - (waveform[i] * canvas.height * 2); // 多少表示が見切れてもよいので派手に振幅を見せることを優先する用
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }, interval + "hz");
  }
  function changeVisualization(ev) {
    Tone.Transport.clear(eventId);
    switch (interval) {
    case  5: interval = 60; break; // 頻繁     : PCで60Hzで描画更新し、波形のエンベロープ変化等を把握しやすくする用
    case 60: interval =  0; break; // 描画なし : Androidでオシロスコープ表示中に音途切れが発生することがあり、その対策用
    case  0: interval =  5; break; // 軽量     : Androidで同時発音数1～8用
    }
    if (interval) {
      eventId = startVisualization();
      Tone.Transport.start();
    }
  }
}

// 用途、generator(Tone Generator)用。generatorはoutputが波形データであるが、同時に可視化もして、状況把握しやすく使いやすくする用。
function visualizeGeneratedSound() {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  // オシロスコープ
  let eventId = Tone.Transport.scheduleRepeat(() => {
    const gn = postmateMidi.tonejs.generator;
    if (!gn.wav) return; // wavが生成されるまでは、描画しない
    const waveform = gn.wav.slice(0, 256);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "#0f0"; // dark mode / light 両対応を想定
    for (let i = 0; i < waveform.length; i++) {
      const x = (i / waveform.length) * canvas.width;
      const y = (0.5 * canvas.height) - (waveform[i] * canvas.height);
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 一度描画したら描画をとめる
    // console.log(`${getParentOrChild()} : visualizeGeneratedSound : stopped`)
    Tone.Transport.clear(eventId);
  }, "60hz");

  // 定期的に、wav生成済みかチェックし、wav生成完了していたら一度だけ描画する
  Tone.Transport.start();
}

//////////
// MIDI
function registerSeq(sq) {
  postmateMidi.seq = sq;
  postmateMidi.seq.sendMidiMessage = sendMidiMessage;       // 外部sq側から使う用
  postmateMidi.seq.initOnStartPlaying = initOnStartPlaying; // 〃
  postmateMidi.seq.isIpad = isIpad;                         // 〃
  postmateMidi.seq.isSmartPhone = isSmartPhone;             // 〃
  postmateMidi.seq.isSynthReady = isSynthReady;             // 〃
  postmateMidi.seq.isAllSynthReady = isAllSynthReady;       // 〃
}

function initOnStartPlaying() {
  onStartPlaying(); // seq and synth のときは不要だったが、keyboard and synthのときiPad対策で、parent and child all synthの初期化が必要となったので

  // seqから呼ばれ、synth側のbaseTimeStampを更新する用
  if (isParent) {
    // parentがseqだった場合、すべてのchildのbaseTimeStampを更新する用
    for (let childId = 0; childId < postmateMidi.children.length; childId++) {
      console.log(`${getParentOrChild()} : to child${childId + 1} : call onStartPlaying`);
      postmateMidi.children[childId].call('onStartPlaying');
    }
  }
  if (isChild) {
    // childがseqだった場合、以下のemitされたparentにて、parentと自分以外のすべてのchildのbaseTimeStampを更新する用
    console.log(`${getParentOrChild()} : emit onStartPlaying`);
    postmateMidi.parent.emit('onStartPlaying' + (postmateMidi.childId + 1));
  }
}

function onStartPlaying(data) {
  // parentからchild、childからparentへ、相手のbaseTimeStampを更新させる用に呼ばれる
  console.log(`${getParentOrChild()} : onStartPlaying`);
  postmateMidi.tonejs.initTonejsByUserAction();
  postmateMidi.tonejs.initBaseTimeStampAudioContext();
}

function sendMidiMessage(events, playTime) {
  // 外部sqやkbから直接呼ばれる
  if (isParent) {
    sendMidiMessageFromDevice(events, playTime, /*deviceId=*/0);
    return;
  }
  if (isChild) {
    // childからは、必ずparentにsendする。parentのon onmidimessage1～ にて、改めてsendMidiMessageする
    postmateMidi.parent.emit('onmidimessage' + (postmateMidi.childId + 1), [events, playTime]);
    return;
  }
}

function sendMidiMessageFromDevice(events, playTime, deviceId) {
  for (let i = 0; i < postmateMidi.midiOutputIds[deviceId].length; i++) {
    const outputId = postmateMidi.midiOutputIds[deviceId][i];
    if (!outputId) {
      onmidimessage([events, playTime]);
    } else {
      const childId = outputId - 1;
      postmateMidi.children[childId].call('onmidimessage', [events, playTime]);
    }
  }
}

const ofsMsec = 50; // seq側の送信タイミングのジッタを、synth側の発音時刻指定で吸収する用。timestampが過去にならない程度の値とした。過去になると発音やenvelopeが異常となる想定。手元では50msecがそこそこ安定した感触。今後は環境ごとに指定可能にする想定。その場合は「レイテンシなし（ジッタがある）」も選べる想定。
function onmidimessage(data) {
  if (postmateMidi.midiFilter) {
    data = postmateMidi.midiFilter(data);
    sendMidiMessage(data[0], data[1]);
    return;
  }
  const events = data[0];
  const playTimeMsec = data[1];
  const baseMsec = postmateMidi.tonejs.baseTimeStampAudioContext * 1000;
  let timestamp = (baseMsec + playTimeMsec + ofsMsec) / 1000;
  if (isNaN(timestamp)) timestamp = undefined; // NaNのときnoteOnされないのを防止する用
  // console.log(`${getParentOrChild()} : synth : ${getMidiEventName(events[0][0])} ${events[0][1]} ${Math.floor((timestamp - Tone.now()) * 1000)}`); // ofsMsecのチューニング用
  // if (timestamp - Tone.now() < 0) alert(); // timestampが過去になっていないことをチェック
  for (const event of events) {
    const ch = postmateMidi.ch[event[0] & 0x0F];
    switch (event[0] & 0xF0) {
    // note on
    case 0x90: ch.noteOn(event[1], timestamp); break;
    // note off
    case 0x80: ch.noteOff(event[1], timestamp); break;
    // control change
    case 0xB0: ch.controlChange[event[1]](event[2]); break;
    }
  }
};

function getMidiEventName(i) { // for debug
  switch (i & 0xF0) {
  case 0x90: return 'noteOn';
  case 0x80: return 'noteOff';
  case 0xB0: return 'controlChange';
  }
}

/////////////////
// Tone.js utils
// 用途、各種Tone.js系synth js（以下synth js）のコードのうち共通部分をここに集約することで、synth jsの実装をシンプルにする。
//  必要に応じてsynth js側でそれらを上書きしてよい。
//  注意、ただしnote onと、セットとなるnote offだけは、synth js側で実装必須とする。そうしないとsynth jsソースだけ見たとき鳴らし方がわからず、ソースが読みづらいため。
function initTonejsByUserAction() {
  if (postmateMidi.tonejs.isStartTone) return;
    // ↑ 備忘、if (Tone.context.state === "running") return; だと、ここでは用途にマッチしない。LiveServerのライブリロード後は常時runningになるため。
  startTonejs();

  function startTonejs() {
    console.log(`${getParentOrChild()} : Tone.js starting...`);
    // async () => {
    //   await Tone.start();
    //   console.log(`documentとは違い、この行にはいくら待っても到達しない。動作確認済。`);
    // }
    Tone.start();
    (async () => {
      let i = 0;
      while (true) {
        const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
        await sleep(16);
        let state = Tone.context.state;
        console.log(`${getParentOrChild()} : Tone.context.state = ${state}`);
        if (state === "running") { // Tone.start()の完了まで同期待ち、を実現する用
          afterTonejsStart();
          break;
        }
        if (i++ > 60) {
          const s = `${getParentOrChild()} : init Tone.js : 時間切れ`;
          console.log(s);
          alert(s);
          break;
        }
      }
    })();
  }
}

function afterTonejsStart() {
  // 以降の発音を可能にする用のダミー。ないと音が鳴らないことがあった。
  for (let ch = 0; ch < 16; ch++) {
    const synth = postmateMidi.ch[ch].synth;
    if (synth) { // synthがあるときのみとする。seqのみのjsにおいてはsynthがないことがあるので、そのとき落とさない用。
      synth.triggerAttack(Tone.Midi(69).toFrequency(), 0, 0);
      synth.triggerRelease(Tone.Midi(69).toFrequency());
    }
  }

  postmateMidi.tonejs.isStartTone = true; // 名前が紛らわしいが、postmateMidi.isStartTone[] とは別で、parentとchildがそれぞれtonejs配下に保持する。外部sqなどからアクセスする用。
  if (isParent) {
    postmateMidi.isStartTone[0] = true; // 名前が紛らわしいが、postmateMidi.tonejs.isStartTone とは別で、parentがparentと全てのchildのぶんを知っておく用。
    checkAllSynthReady();
  }
  if (isChild) {
    // parentに情報を集約する
    postmateMidi.parent.emit('onSynthReady' + (postmateMidi.childId + 1));
  }
}

function isSynthReady() {
  // sqなど外部からアクセスする用
  const result = postmateMidi.tonejs.isStartTone;
  // console.log(`${getParentOrChild()} : isSynthReady : ${result}`);
  return result;
}

function isAllSynthReady() {
  // sqなど外部からアクセスする用
  return postmateMidi.isAllSynthReady;
}

function checkAllSynthReady() {
  if (!isAllSynthReady()) {
    if (!checkAllSynthReadyParent()) return;
  }

  console.log(`${getParentOrChild()} : parent synth and child synth ready`)
  if (isIpad() && postmateMidi.ui.checkRemovePlayButton) postmateMidi.ui.checkRemovePlayButton(); // playボタンをremoveするのは、iPad向けの仮想キーボード等用。仮想キーボード等においてはiPad対策で音を鳴らすためのユーザーアクション用のplayボタン表示が必須となる。音が鳴ればplayボタンは役目が完了するのでremoveして見た目をわかりやすくする用。
}
function checkAllSynthReadyParent() {
  console.log(`${getParentOrChild()} : isStartTone : `, postmateMidi.isStartTone);
  if (!isParent) return false;
  if (!postmateMidi.isStartTone.length) return false;
  if (!postmateMidi.isStartTone.every(val => val === true)) return false;
  postmateMidi.isAllSynthReady = true;
  // childすべてに伝える
  for (let childId = 0; childId < postmateMidi.children.length; childId++) {
    postmateMidi.children[childId].call('onAllSynthReady');
  }
  return true;
}

function initBaseTimeStampAudioContext() {
  // Bassのヨレ、和音の構成音ごとの発音タイミングズレ、を防止するため、seq側は演奏予定時刻を指定してpostmate-midiにわたす。postmate-midiはそれを加工してTone.jsにわたす。
  //  流れは：
  //   postmateMidiが受信したmidimessageは：
  //     playTimeが付与されている。
  //   postmateMidiの処理は：
  //     受信したらすぐTone.jsをtriggerする。
  //       このとき、演奏予定timestampをわたす。
  //       演奏予定timestampは：
  //         playTimeと、synth側pageのbaseTimeStampAudioContext（seq側pageのbaseTimeStampAudioContextとは別）から算出する。
  //          このとき50msec程度の猶予をもたせることで、seq側のテンポのヨレを吸収して、Tone.js側は正確なタイミングで発音できる。
  postmateMidi.tonejs.baseTimeStampAudioContext = Tone.now(); // 注意、performance.now() と混同しないこと。違う値となることを確認した。Tone.jsのtriggerに使うのでTone.now()のほうを使う。
}

for (let ch = 0; ch < 16; ch++) {
  initCh(postmateMidi.ch[ch]);
}
function initCh(ch) {
  ch.noteOn = (noteNum) => {
    alert("noteOnを実装してください");
  }

  ch.noteOff = (noteNum) => {
    alert("noteOffを実装してください");
  }

  for (let i = 0; i < 128; i++) {
    ch.controlChange[i] = (v) => {}; // noteOnと違って実装を省略可。noteOnのように上書き可。
  }

  ch.controlChange[0x78] = (v) => {
    // 備忘、現状、Tone.jsにtriggerAttack等で発音予約した音を消す方法が見つからない。このため、発音予約直後にstopして次のplayをすぐ行うと演奏が崩れることがある。対策はplayを1秒程度おいて押しなおす等。
    allSoundOff();
    function allSoundOff() {
      const synth = ch.synth;
      if (!synth) return;
      for (let noteNum = 0; noteNum < 128; noteNum++) {
        for (let i = 0; i < 4; i++) {
          synth.triggerRelease(Tone.Midi(noteNum).toFrequency(), /*time=*/0); // 時刻0が過去だからか、すぐ消音される
        }
      }
    }
  };

  ch.controlChange[0x7B] = (v) => {
    allNoteOff();
    function allNoteOff() {
      const synth = ch.synth;
      if (!synth) return;
      // PolySynthは明示的にnoteNumの指定をしないとエラーになった。また、タイミング次第では1回で不足のことがあったので、ひとまず4回noteOffとした。
      for (let noteNum = 0; noteNum < 128; noteNum++) {
        for (let i = 0; i < 4; i++) {
          synth.triggerRelease(Tone.Midi(noteNum).toFrequency());
        }
      }
    }
  };
}

////////
// Tone Generator
//  wav format : Float32Array
function registerGenerator(gn) {
  console.log(`${getParentOrChild()} : gn : `, gn);
  postmateMidi.tonejs.generator = gn; // register時、generatorそのものが外部gnに上書きされる
}

// child用
function sendWavAfterHandshakeAllChildren() {
  const gn = postmateMidi.tonejs.generator;
  if (gn.isSent) return;
  if (!gn.createWav) return;
  if (!gn.wav) {
    gn.noteNum = 60;
    gn.wav = gn.createWav(gn.noteNum);
  }
  if (!postmateMidi.parent) return;
  if (!isChild) return; // 備忘、parentは送受信の対象外にしておく、シンプル優先
  console.log(`${getParentOrChild()} : sendWavAfterHandshakeAllChildren : time : ${Date.now() % 10000}`);
  postmateMidi.parent.emit('sendToSampler' + (postmateMidi.childId + 1), [gn.noteNum, gn.wav]);
}

// parent用
function sendToSamplerFromDevice(data, deviceId) {
  for (let i = 0; i < postmateMidi.sendToSamplerIds[deviceId].length; i++) {
    const outputId = postmateMidi.sendToSamplerIds[deviceId][i];
    if (!outputId) {
      sendToSampler(data);
    } else {
      const childId = outputId - 1;
      postmateMidi.children[childId].call('sendToSampler', data);
    }
  }
}

function sendToSampler(data) {
  console.log(`${getParentOrChild()} : received : ` , data);
  const noteNum = data[0];
  const wav = data[1];
  for (let ch = 1-1; ch < 16; ch++) {
    if (postmateMidi.ch[ch].synth) {
      postmateMidi.ch[ch].synth.add(noteNum, Tone.Buffer.fromArray(wav));
    }
  }
  console.log(`${getParentOrChild()} : wav added to sampler : time : ${Date.now() % 10000}`);
}

/////////////////////////
export { postmateMidi };
