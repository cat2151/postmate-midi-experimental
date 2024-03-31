const handshake = new Postmate({
  url: './child.html',
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

  // childとの双方向通信のtest用
  let textarea = document.querySelector("#textarea");
  textarea.addEventListener("input", onChangeTextarea);
  function onChangeTextarea() {
    console.log(`parent : onChangeTextarea : call data : [${textarea.value}]`);
    child.call('onChangeParent', textarea.value);
  }
});
