// usage : parent.js / child.js を参照ください
const postmateMidi = {};

postmateMidi.registerParent = function(url, textareaSelector, textareaSeqFnc) {
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
    }

    postmateMidi.child = child;
  });
}

postmateMidi.registerChild = function(textareaSelector, textareaSeqFnc) {
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

postmateMidi.onMidiMessage = function (event) {
  // console.log(event);
  switch (event[0]) {
  // note on
  case 0x90: postmateMidi.noteOn(event[1]); break;
  // note off
  case 0x80: postmateMidi.noteOff(event[1]); break;
  }
};

postmateMidi.registerTonejsStarter = function(buttonSelector, playFnc) {
  const button = document.querySelector(buttonSelector);
  button.onclick = function() {
    postmateMidi.initTonejsByUserAction();
    playFnc();
  };
}
let defaultSynth; // postmateMidiのプロパティにしない。影響範囲を狭くする用。
postmateMidi.initTonejsByUserAction = function() {
  // if (Tone.context.state === "running") return; // ここでは用途にマッチしない。LiveServerのライブリロード後は常時runningになるため。
  if (defaultSynth) return;

  async () => {
    await Tone.start();
  }

  createDefaultSynth();
}
function createDefaultSynth() {
  defaultSynth = new Tone.PolySynth(Tone.Synth, {oscillator: {type: 'sine'}}); // polyとする。poly用のseqを鳴らすときに、monoのsynthだと混乱したので。
  const vol = new Tone.Volume(-12);

  defaultSynth.connect(vol);
  vol.toDestination();
}
postmateMidi.noteOn = function(noteNum) {
  postmateMidi.initTonejsByUserAction();
  defaultSynth.triggerAttack(Tone.Midi(noteNum).toFrequency());
}
postmateMidi.noteOff = function(noteNum) {
  defaultSynth.triggerRelease(Tone.Midi(noteNum).toFrequency());
}

export { postmateMidi };
