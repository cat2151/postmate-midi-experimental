function postmateChild() {
  const handshake = new Postmate.Model({
    // Expose your model to the Parent. Property values may be functions, promises, or regular values
    height: () => document.height || document.body.offsetHeight,
    onCompleteHandshakeParent: onCompleteHandshakeParent,
    onChangeParent: onChangeParent
  });

  handshake.then(parent => {
    console.log('child : handshake is complete');
    parent.emit('onCompleteHandshakeChild', '"Hello, World!" by child');

    textarea.addEventListener("input", onChangeTextarea);
    function onChangeTextarea() {
      console.log(`child : onChangeTextarea : emit data : [${textarea.value}]`);
      parent.emit('onChangeChild', textarea.value);
    }
  });

  // parentとの双方向通信のtest用
  const textarea = document.querySelector("#textarea");

  // parentからcallされる
  function onCompleteHandshakeParent(data) {
    console.log(`child : onCompleteHandshakeParent : received data : [${data}]`);
  }
  function onChangeParent(data) {
    console.log(`child : onChangeParent : received data : [${data}]`);
    textarea.value = data;
    playTonejs();
  }
}

function initTonejs() {
  const button = document.querySelector('button');
  button.onclick = async ()=>{
    await Tone.start();
    playTonejs();
  };
}
function playTonejs() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("C4", "8n");
}

initTonejs();
postmateChild();
