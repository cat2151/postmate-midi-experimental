// usage : parent.js / child.js を参照ください
const postmateMidi = {};

postmateMidi.registerParent = function(url, textareaSelector, textareaSeqFnc, textareaTemplateDropDownListSelector, textareaTemplatesFnc, setupSeqByTextareaFnc) {
  const handshake = new Postmate({
    url
  });

  handshake.then(child => {
    console.log('parent : handshake is complete');
    child.call('onCompleteHandshakeParent', '"Hello, World!" by parent');

    child.get('height')
    .then(height => child.frame.style.height = `${height * 1.5}px`);
      // ↑ 見切れる。原因不明。取り急ぎ height * 1.5 した

    // Listen to a particular event from the child
    child.on('onCompleteHandshakeChild', data => {
      console.log(`parent : onCompleteHandshakeChild : received data : [${data}]`);
    });
    child.on('onChangeChild', data => {
      console.log(`parent : onChangeChild : received data : [${data}]`);
      textarea.value = data;
    });
    child.on('onmidimessage', data => {
      // console.log(`parent : onmidimessage : received data : [${data}]`);
      postmateMidi.onMidiMessage(data);
    });

    // childとの双方向通信のtest用
    if (textareaSelector) {
      const textarea = document.querySelector(textareaSelector);
      textarea.addEventListener("input", onChangeTextarea);
      function onChangeTextarea() {
        if (textareaSeqFnc) {
          textareaSeqFnc(textarea.value);
        } else {
          console.log(`parent : onChangeTextarea : call data : [${textarea.value}]`);
          child.call('onChangeParent', textarea.value);
        }
      }

      if (textareaTemplateDropDownListSelector) {
        setupSelect(textareaTemplateDropDownListSelector, textareaTemplatesFnc, onChangeTextarea, setupSeqByTextareaFnc);
      }
    }

    postmateMidi.child = child;
  });
}

postmateMidi.registerChild = function(textareaSelector, textareaSeqFnc, textareaTemplateDropDownListSelector, textareaTemplatesFnc, setupSeqByTextareaFnc) {
  const handshake = new Postmate.Model({
    // Expose your model to the Parent. Property values may be functions, promises, or regular values
    height: () => document.height || document.body.offsetHeight,
    onCompleteHandshakeParent,
    onChangeParent,
    onmidimessage
  });

  handshake.then(parent => {
    console.log('child : handshake is complete');
    parent.emit('onCompleteHandshakeChild', '"Hello, World!" by child');

    // parentとの双方向通信のtest用
    if (textareaSelector) {
      const textarea = document.querySelector(textareaSelector);
      textarea.addEventListener("input", onChangeTextarea);
      function onChangeTextarea() {
        if (textareaSeqFnc) {
          textareaSeqFnc(textarea.value);
        } else {
          console.log(`child : onChangeTextarea : emit data : [${textarea.value}]`);
          parent.emit('onChangeChild', textarea.value);
        }
      }

      if (textareaTemplateDropDownListSelector) {
        setupSelect(textareaTemplateDropDownListSelector, textareaTemplatesFnc, onChangeTextarea, setupSeqByTextareaFnc);
      }
    }

    postmateMidi.parent = parent;
  });

  // parentからcallされる
  function onCompleteHandshakeParent(data) {
    console.log(`child : onCompleteHandshakeParent : received data : [${data}]`);
  }
  function onChangeParent(data) {
    console.log(`child : onChangeParent : received data : [${data}]`);
    textarea.value = data;
  }
  function onmidimessage(data) {
    // console.log(`child : onmidimessage : received data : [${data}]`);
    postmateMidi.onMidiMessage(data);
  }
}

////////////////////////////////////////////////
// ドロップダウンリスト textareaのtemplate用
function setupSelect(textareaTemplateDropDownListSelector, textareaTemplatesFnc, onChangeTextarea, setupSeqByTextareaFnc) {
  const select = document.querySelector(textareaTemplateDropDownListSelector);
  select.addEventListener('change', onChangeSelect);
  for (const t of textareaTemplatesFnc()) {
    addOptionToSelect(t[1], t[0]);
  }
  const options = document.querySelectorAll(textareaTemplateDropDownListSelector + " option");
  textarea.value = options[1].value;     // playボタンですぐ音を鳴らす用
  setupSeqByTextareaFnc(textarea.value); // 〃

  function onChangeSelect() {
    textarea.value = options[select.selectedIndex].value;
    onChangeTextarea();
  }

  function addOptionToSelect(value, text) {
    const opt = document.createElement("option");
    opt.value = removeIndent(value);
    opt.text = text;
    select.add(opt);

    function removeIndent(rawString) {
      const lines = rawString.split('\n');
      const trimmedLines = lines.map(line => line.trim());
      return trimmedLines.join('\n');
    }
  }
}

////////////////////
// MIDI
postmateMidi.registerSeq = (seq) => {
  postmateMidi.seq = seq;
  postmateMidi.seq.sendMidiMessage = postmateMidi.sendMidiMessage;
}

postmateMidi.sendMidiMessage = (event) => {
  if (postmateMidi.child) {
    postmateMidi.child.call('onmidimessage', event);
    return;
  }
  if (postmateMidi.parent) {
    postmateMidi.parent.emit('onmidimessage', event);
    return;
  }
}

postmateMidi.onMidiMessage = function (events) {
  for (const event of events) {
    // console.log(event);
    switch (event[0]) {
    // note on
    case 0x90: postmateMidi.noteOn(event[1]); break;
    // note off
    case 0x80: postmateMidi.noteOff(event[1]); break;
    // control change
    case 0xB0: postmateMidi.controlChange(event[1], event[2]); break;
    }
  }
};

////////////////////
// synth by Tone.js
// 用途、各種Tone.js系synth js（以下synth js）のコードのうち共通部分をここに集約することで、synth jsの実装をシンプルにする。
//  必要に応じてsynth js側でそれらを上書きしてよい。
//  注意、ただしnote onと、セットとなるnote offだけは、synth js側で実装必須とする。そうしないとsynth js側単体でnote onできなくなり、わかりづらいため。
postmateMidi.registerTonejsStarter = function(buttonSelector, playButtonFnc) {
  const button = document.querySelector(buttonSelector);
  button.onclick = function() {
    postmateMidi.initTonejsByUserAction();
    playButtonFnc();
  };
}
postmateMidi.initTonejsByUserAction = function() {
  // if (Tone.context.state === "running") return; // ここでは用途にマッチしない。LiveServerのライブリロード後は常時runningになるため。
  if (postmateMidi.isStartTone) return;

  async () => {
    await Tone.start();
  }
  postmateMidi.isStartTone = true;
}
postmateMidi.noteOn = function(noteNum) {
  alert("noteOnを実装してください");
}
postmateMidi.noteOff = function(noteNum) {
  alert("noteOffを実装してください");
}
postmateMidi.controlChange = function(controller, v) {
  switch (controller) {
  case 0x7B: postmateMidi.allNoteOff(); break;
  }
}
postmateMidi.allNoteOff = function() {
  // PolySynthは明示的にnoteNumの指定をしないとエラーになった。また、タイミング次第では1回で不足のことがあったので、ひとまず4回noteOffとした。
  for (let noteNum = 0; noteNum < 128; noteNum++) {
    for (let i = 0; i < 4; i++) {
      postmateMidi.synth.triggerRelease(Tone.Midi(noteNum).toFrequency());
    }
  }
}

////////////////////
export { postmateMidi };
