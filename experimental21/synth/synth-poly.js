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
      initSynthPoly(s, Tone.PolySynth, voice, a.voiceArgs, a.volume, a.isUsingPan);
      break;
    case 'Sampler':
      initSampler(s, a.samples, a.volume, a.isUsingPan);
      break;
    default:
      const msg = `instrument ${a.instrument} を実装してください`;
      alert(msg);
      console.error(msg);
      break;
    }
  }
}

function initSynthPoly(s, synthFnc, voice, voiceArgs, volume, isUsingPan) {
  s.synth = new synthFnc(voice, voiceArgs);
  initSynthCommon(s, volume, isUsingPan);
}

function initSampler(s, samples, volume, isUsingPan) {
  console.log(`initSampler : ${samples}, ${volume}`);
  if (samples) {
    s.synth = new Tone.Sampler(samples);
  } else {
    s.synth = new Tone.Sampler(); // あとでaddする用
  }
  initSynthCommon(s, volume, isUsingPan);
}

function initSynthCommon(s, volume, isUsingPan) {
  const synth = s.synth;
  const filter = new Tone.Filter({type: "lowpass", frequency: 2400});
  const vol = new Tone.Volume(volume);
  const split = new Tone.Split();
  const panner = new Tone.Panner();

  synth.connect(filter);
  synth.connect(split);
  filter.connect(vol);
  if (isUsingPan) {
    vol.connect(panner);
    panner.toDestination();
  } else {
    vol.toDestination(); // stereo wavをsamplerでstereoのまま鳴らす用。Tone.Panner はstereo wavをmonoにしてパンニングする仕様なので。
  }

  s.noteOn = noteOn;
  s.noteOff = noteOff;
  s.controlChange[74] = cutoff;
  s.controlChange[10] = panpot;

  function noteOn(noteNum, timestamp) {
    // console.log(`synth : noteOn : noteNum = ${noteNum}, timestamp = ${timestamp}`);
    // console.log(`synth : channelCount : ${synth.channelCount} ${filter.channelCount} ${vol.channelCount} ${Tone.getContext().destination.channelCount}`);
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
    if (!isUsingPan) return;
    // console.log(`panpot : ${v}`);
    v = v.clamp(1, 127); // MIDI RP-036
    v -= 64;
    v /= 63; // Pan Law設定の実装は後回しにする
    // console.log(`panpot : ${v}`);
    panner.pan.setValueAtTime(v, timestamp);
  }
  Number.prototype.clamp = function (_min, _max) {
    return Math.min(Math.max(this, _min), _max);
  };
}

export { initSynth };
