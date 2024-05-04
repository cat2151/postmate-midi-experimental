// import * as Tone from 'tone'; // コメントアウトする。index.htmlでTone.jsをsrcする。そうしないとバンドラーを使わない別projectにおいてソースをそのまま利用できず不便だったので。

function initSynth(ch, instrumentArgsArray) {
  for (const a of instrumentArgsArray) {
    const s = ch[a.ch];
    switch (a.instrument) {
    case 'PolySynth':
      let voice;
      switch (a.voice) {
      case 'Synth': voice = Tone.Synth; break;
      default:
        const msg = `voice ${a.voice} を実装してください`;
        alert(msg);
        console.error(msg);
        break;
      }
      initSynthPoly(s, Tone.PolySynth, voice, a.voiceArgs, a.volume);
      break;
    case 'Sampler':
      initSampler(s, a.samples, a.volume);
      break;
    default:
      const msg = `instrument ${a.instrument} を実装してください`;
      alert(msg);
      console.error(msg);
      break;
    }
  }
}

function initSynthPoly(s, synthFnc, voice, voiceArgs, volume) {
  s.synth = new synthFnc(voice, voiceArgs);
  initSynthCommon(s, volume);
}

function initSampler(s, samples, volume) {
  console.log(`initSampler : ${samples}, ${volume}`);
  if (samples) {
    s.synth = new Tone.Sampler(samples);
  } else {
    s.synth = new Tone.Sampler(); // あとでaddする用
  }
  initSynthCommon(s, volume);
}

function initSynthCommon(s, volume) {
  const synth = s.synth;
  const filter = new Tone.Filter({type: "lowpass", frequency: 2400});
  const panner = new Tone.Panner();
  const vol = new Tone.Volume(volume);

  synth.connect(filter);
  filter.connect(panner);
  panner.connect(vol);
  vol.toDestination();

  s.noteOn = noteOn;
  s.noteOff = noteOff;
  s.controlChange[74] = cutoff;
  s.controlChange[10] = panpot;

  function noteOn(noteNum, timestamp) {
    // console.log(`synth : noteOn : noteNum = ${noteNum}, timestamp = ${timestamp}`);
    synth.triggerAttack(Tone.Midi(noteNum).toFrequency(), timestamp);
  };

  function noteOff(noteNum, timestamp) {
    synth.triggerRelease(Tone.Midi(noteNum).toFrequency(), timestamp);
  };

  function cutoff(v) {
    const mul = v2mul(90 + v * 0.5);
    const hz = 200 + mul;
    console.log(`cutoff : v:${v} -> Hz:${Math.floor(hz)}`);
    filter.set({frequency: hz});
  };
  function v2mul(v) {
    return Math.pow(2, 1 / 12 * v);
  }

  function panpot(v, timestamp) {
    v = v.clamp(1, 127); // MIDI RP-036
    v -= 64;
    v /= 63; // Pan Law設定の実装は後回しにする
    panner.pan.setValueAtTime(v, timestamp);
  }
  Number.prototype.clamp = function (_min, _max) {
    return Math.min(Math.max(this, _min), _max);
  };
}

export { initSynth };
