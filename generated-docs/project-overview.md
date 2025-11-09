Last updated: 2025-11-10

# Project Overview

## プロジェクト概要
- Web標準技術とPostMessageを活用し、複数のブラウザページ間でMIDIとオーディオデータをリアルタイムに送受信する実験的ライブラリ。
- さまざまなユースケースを網羅するデモを通じて、将来の本格的なMIDI・オーディオWebアプリケーション開発のための基盤を検証。
- ブラウザ完結型の軽量なMIDI/オーディオ通信ライブラリの実現を目指し、継続的な機能追加と仕様検証を進めている。

## 技術スタック
- フロントエンド: HTML5, CSS3, JavaScript (ES Modules, Promise/Async/Await) - ブラウザ上で動作するユーザーインターフェースとロジックを実装します。
- 音楽・オーディオ: Web MIDI API (MIDIデバイス連携), Web Audio API (ブラウザでの高度な音声処理), Tone.js (Web Audio API上に構築されたオーディオフレームワークで、シンセサイザーやエフェクト、シーケンサー機能を提供)。
- ブラウザ間通信: Postmate.js - iframeやWindow間で安全なメッセージ通信を行う軽量ライブラリ。
- 開発支援: GitHub Pages - デモンストレーションサイトのホスティングに利用されています。

## ファイル階層ツリー
```
📄 LICENSE
📖 README.md
📄 _config.yml
📁 doc/
  📖 problems-postmate-midi-solves.md
  📖 roadmap.md
  📖 why-postmate-midi.md
📁 experimental01/
  🌐 child.html
  📜 child.js
  🌐 index.html
  📜 parent.js
📁 experimental02/
  🌐 child.html
  📜 child.js
  🌐 index.html
  📜 parent.js
📁 experimental03/
  🌐 child.html
  📜 child.js
  🌐 index.html
  📜 parent.js
  📜 postmate-midi.js
  📜 saw.js
📁 experimental04/
  🌐 child.html
  📜 child.js
  🌐 index.html
  📜 parent.js
  📜 postmate-midi.js
  📜 saw.js
📁 experimental05/
  🌐 child.html
  📜 child.js
  🌐 index.html
  📜 parent.js
  📜 postmate-midi.js
  📜 saw.js
  📜 seq.js
📁 experimental06/
  🌐 child.html
  📜 child.js
  🌐 index.html
  📜 parent.js
  📜 poly.js
  📜 postmate-midi.js
  📜 seq.js
📁 experimental07/
  🌐 child.html
  📜 child.js
  🌐 index.html
  📜 parent.js
  📜 postmate-midi.js
  📜 saw-poly.js
  📜 seq.js
📁 experimental08/
  🌐 child.html
  📜 child.js
  🌐 index.html
  📜 parent.js
  📜 postmate-midi.js
  📜 saw-poly.js
  📜 seq.js
📁 experimental09/
  🌐 child.html
  📜 child.js
  🌐 index.html
  📜 keyboard.js
  📜 parent.js
  📜 postmate-midi.js
  📜 synth-poly.js
📁 experimental10/
  🎨 index.css
  🌐 index.html
  📁 knob/
    🌐 index.html
    📜 knob-child.js
    📜 knob.js
  📜 postmate-midi.js
  📁 seq/
    🌐 index.html
    📜 seq-parent.js
    📜 seq.js
  📁 synth/
    🌐 index.html
    📜 synth-child.js
    📜 synth-poly.js
📁 experimental11/
  🎨 index.css
  🌐 index.html
  📜 postmate-midi.js
  📁 seq/
    🌐 index.html
    📜 seq-parent.js
    📜 seq.js
  📁 synth/
    🌐 index.html
    📜 synth-child.js
    📜 synth-poly.js
📁 experimental12/
  🎨 index.css
  🌐 index.html
  📁 midifilter/
    🌐 index.html
    📜 midifilter-child.js
    📜 midifilter.js
  📜 postmate-midi.js
  📁 seq/
    🌐 index.html
    📜 seq-parent.js
    📜 seq.js
  📁 synth/
    🌐 index.html
    📜 synth-child.js
    📜 synth-poly.js
📁 experimental13/
  🎨 index.css
  🌐 index.html
  📜 postmate-midi.js
  📁 seq-and-synth-saw/
    🌐 index.html
    📜 parent-or-child.js
    📜 seq.js
    📜 synth-poly.js
  📁 seq-and-synth-sine/
    🌐 index.html
    📜 parent-or-child.js
    📜 seq.js
    📜 synth-poly.js
📁 experimental14/
  🎨 index.css
  🌐 index.html
  📁 parent/
    🌐 index.html
    📜 parent.js
  📜 postmate-midi.js
  📁 seq/
    🌐 index.html
    📜 seq-child.js
    📜 seq.js
  📁 synth/
    🌐 index.html
    📜 synth-child.js
    📜 synth-poly.js
📁 experimental15/
  🎨 index.css
  🌐 index.html
  📁 parent/
    🌐 index.html
    📜 parent.js
  📜 postmate-midi.js
  📁 seq1/
    🌐 index.html
    📜 seq-child.js
    📜 seq.js
  📁 seq2/
    🌐 index.html
    📜 seq-child.js
    📜 seq.js
  📁 synth/
    🌐 index.html
    📜 synth-child.js
    📜 synth-poly.js
📁 experimental16/
  🎨 index.css
  🌐 index.html
  📁 parent/
    🌐 index.html
    📜 parent.js
  📜 postmate-midi.js
  📁 sampler/
    🌐 index.html
    📜 sampler-child.js
    📜 sampler.js
  📁 seq1/
    🌐 index.html
    📜 seq-child.js
    📜 seq.js
  📁 seq2/
    🌐 index.html
    📜 seq-child.js
    📜 seq.js
📁 experimental17/
  📁 generator/
    📜 generator-child.js
    📜 generator.js
    🌐 index.html
  🎨 index.css
  🌐 index.html
  📁 parent/
    🌐 index.html
    📜 parent.js
  📜 postmate-midi.js
  📁 sampler/
    🌐 index.html
    📜 sampler-child.js
    📜 sampler.js
  📁 seq/
    🌐 index.html
    📜 seq-child.js
    📜 seq.js
📁 experimental18/
  🎨 index.css
  🌐 index.html
  📁 parent/
    🌐 index.html
    📜 parent.js
  📜 postmate-midi.js
  📁 sampler/
    🌐 index.html
    📜 sampler-child.js
    📜 sampler.js
  📁 seq/
    🌐 index.html
    📜 seq-child.js
    📜 seq.js
  📁 synth/
    🌐 index.html
    📜 synth-child.js
    📜 synth.js
📁 experimental19/
  🎨 index.css
  🌐 index.html
  📁 parent/
    🌐 index.html
    📜 parent.js
  📜 postmate-midi.js
  📁 sampler/
    🌐 index.html
    📜 sampler-child.js
    📜 sampler.js
  📁 seq/
    🌐 index.html
    📜 seq-child.js
    📜 seq.js
  📁 synth/
    🌐 index.html
    📜 synth-child.js
    📜 synth.js
📁 experimental20/
  🎨 index.css
  🌐 index.html
  📁 parent/
    🌐 index.html
    📜 parent.js
  📜 postmate-midi.js
  📁 sampler/
    🌐 index.html
    📜 sampler-child.js
    📜 sampler.js
  📁 seq1/
    🌐 index.html
    📜 seq-child.js
    📜 seq.js
  📁 seq2/
    🌐 index.html
    📜 seq-child.js
    📜 seq.js
  📁 synth/
    🌐 index.html
    📜 synth-child.js
    📜 synth-poly.js
📁 experimental21/
  📖 README.md
  📁 doc/
    📖 20と21の比較.md
    📖 USAGE.md
    📖 課題_セルフサンプリング.md
  🎨 index.css
  🌐 index.html
  📁 parent/
    🌐 index.html
    📜 parent.js
  📜 postmate-midi.js
  📜 prerenderer.js
  📁 sampler/
    🌐 index.html
    📜 sampler-child.js
  📁 seq1/
    🌐 index.html
    📜 seq-child.js
    📜 seq.js
  📁 seq2/
    🌐 index.html
    📜 seq-child.js
  📁 synth/
    🌐 index.html
    📜 synth-child.js
    📜 synth-poly.js
📁 generated-docs/
```

## ファイル詳細説明
- `LICENSE`: プロジェクトのライセンス情報が記述されています。
- `README.md`: プロジェクトの概要、デモ、注意事項などが記載されたメインドキュメントです。
- `_config.yml`: GitHub Pagesのサイト設定ファイルです。
- `doc/`: プロジェクトの背景、解決する課題、ロードマップなどに関するドキュメントが格納されています。
- `experimentalXX/index.html`: 各実験のデモのトップページとなるHTMLファイルです。通常、Postmateの親ページとして子ページを埋め込みます。
- `experimentalXX/parent.js`: 各実験におけるPostmateの親ページ側のJavaScriptロジックを実装します。子ページの生成、イベントの送受信、UI制御などを担当します。
- `experimentalXX/child.html`: 親ページに埋め込まれるPostmateの子ページのHTML構造を定義します。
- `experimentalXX/child.js`: 各実験におけるPostmateの子ページ側のJavaScriptロジックを実装します。親ページからのイベント受信、オーディオ生成、UI更新などを担当します。
- `experimentalXX/postmate-midi.js`: プロジェクトの中心となるライブラリコードです。Postmate通信の管理、MIDIメッセージのルーティング、Tone.jsの初期化・制御、全体的なイベントハンドリングなど、多くの共通機能を提供します。
- `experimentalXX/saw.js` / `poly.js` / `saw-poly.js` / `synth-poly.js`: Tone.jsを使用したシンセサイザーの定義ファイルです。ノコギリ波やポリフォニック発音、カットオフフィルターなどの音色生成・制御ロジックを実装します。
- `experimentalXX/seq/seq.js`: MIDIシーケンスデータの解析と再生ロジックを実装します。音符のタイミング計算、MIDIメッセージの送信などを担当します。
- `experimentalXX/keyboard.js`: 仮想MIDIキーボードのUIロジックと、マウス/タッチ操作によるノートオン/オフイベント送信処理を実装します。
- `experimentalXX/knob/knob.js`: 仮想ツマミ（ノブ）のUIロジックと、マウス/タッチ操作によるCC（コントロールチェンジ）メッセージ生成ロジックを実装します。
- `experimentalXX/midifilter/midifilter.js`: 入力されたMIDIメッセージを加工（例: 単音を和音に変換）するフィルター機能を提供します。
- `experimentalXX/sampler/sampler.js`: サンプラーの初期化、サンプル音源の読み込みと再生、WAVデータ生成ロジックを実装します。
- `experimentalXX/generator/generator.js`: プログラム的にオーディオデータを生成し、Float32Array形式で出力する機能を提供します。
- `experimentalXX/synth/synth.js`: Tone.jsのコンテキスト管理やプリレンダリングに関連するシンセサイザーの初期化ロジックです。
- `experimentalXX/prerenderer.js`: オーディオのプリレンダリング（オフラインレンダリング）管理、WAVファイルのエクスポート/インポート、生成されたサウンドの波形表示機能を提供します。

## 関数詳細説明
- `onChangeTextarea(event)`:
    - 役割: HTMLのテキストエリアの内容が変更された際に呼び出されるイベントハンドラ。
    - 引数: `event` (変更イベントオブジェクト)。
    - 戻り値: なし。
    - 機能: ユーザーが入力したテキストに基づいて動作を更新したり、通信相手に状態変更を通知したりする。
- `onCompleteHandshakeParent(child)`:
    - 役割: 親ページと子ページのPostmateハンドシェイクが完了した際に、親ページ側で呼び出されるコールバック関数。
    - 引数: `child` (子ページのPostmateインスタンス)。
    - 戻り値: なし。
    - 機能: 子ページとの通信チャネルが確立した後に、初期化処理やイベントリスナーの設定を行う。
- `onmidimessage(midiMessage)`:
    - 役割: MIDIメッセージが受信された際に呼び出されるイベントハンドラ。
    - 引数: `midiMessage` (受信したMIDIデータ)。
    - 戻り値: なし。
    - 機能: MIDIデータを解析し、ノートオン/オフ、コントロールチェンジなどのイベントに応じて適切なオーディオ処理（例: シンセサイザーの制御）を実行する。
- `initSynth(context, Tone)`:
    - 役割: Tone.jsライブラリを用いて、サウンドを生成するシンセサイザーインスタンスを初期化する。
    - 引数: `context` (Web Audio APIのAudioContextオブジェクト), `Tone` (Tone.jsライブラリ全体)。
    - 戻り値: 初期化されたシンセサイザーオブジェクト。
    - 機能: シンセサイザーの音源（オシレーター）、エンベロープ、エフェクトなどを設定し、音を鳴らせる状態にする。
- `noteOn(note, velocity, time)`:
    - 役割: 指定されたMIDIノート番号とベロシティ（強さ）で音を発音する。
    - 引数: `note` (MIDIノート番号、例: 60は中央C), `velocity` (0-127の音の強さ), `time` (Web Audio Context上の再生開始時刻)。
    - 戻り値: なし。
    - 機能: シンセサイザーやサンプラーにノートオンイベントを送り、指定した音程と強さで音の再生を開始する。
- `noteOff(note, time)`:
    - 役割: 発音中の音を停止する。
    - 引数: `note` (停止するMIDIノート番号), `time` (Web Audio Context上の停止時刻)。
    - 戻り値: なし。
    - 機能: シンセサイザーやサンプラーにノートオフイベントを送り、指定した音の再生を終了する。
- `seqPlay(seqData, onMidiMessage)`:
    - 役割: 定義されたシーケンスデータに基づいて音楽を再生する。
    - 引数: `seqData` (MIDIノートやイベント情報を含むJSONデータ), `onMidiMessage` (MIDIメッセージを送信するためのコールバック関数)。
    - 戻り値: なし。
    - 機能: シーケンスデータをリアルタイムで処理し、`noteOn`や`noteOff`などのMIDIイベントを適切なタイミングでトリガーする。
- `sendMidiMessage(targetId, midiEvent)`:
    - 役割: Postmateを介して、指定されたターゲット（子ページまたは親ページ）にMIDIメッセージを送信する。
    - 引数: `targetId` (送信先のPostmateインスタンスID), `midiEvent` (送信するMIDIメッセージデータ)。
    - 戻り値: なし。
    - 機能: ページ間のMIDI通信を実現し、リモートのシンセサイザーやエフェクターを制御できるようにする。
- `doPreRenderAsync(seqId, synthId, callback)`:
    - 役割: 指定されたシーケンスとシンセサイザーを用いて、オーディオデータをオフラインでプリレンダリングする非同期処理。
    - 引数: `seqId` (シーケンスの識別子), `synthId` (シンセサイザーの識別子), `callback` (プリレンダリング完了後に呼び出される関数)。
    - 戻り値: Promise (レンダリングされたFloat32Arrayオーディオデータ)。
    - 機能: 実際の再生なしに、高速でオーディオファイルを生成し、ダウンロードや他のページへの転送に利用できるようにする。
- `saveWavByDialog(wavFloat32Array, filename)`:
    - 役割: 指定されたFloat32Array形式のオーディオデータをWAVファイルとしてブラウザのダウンロードダイアログを通じて保存する。
    - 引数: `wavFloat32Array` (保存するオーディオデータ), `filename` (保存ファイル名)。
    - 戻り値: なし。
    - 機能: 生成されたオーディオデータをユーザーがローカルに保存できるようにする。

## 関数呼び出し階層ツリー
```
- if (experimental03/postmate-midi.js)
  - onChangeTextarea (experimental01/child.js)
    - onCompleteHandshakeParent ()
      - onChangeParent ()
      - postmateChild (experimental02/child.js)
      - initTonejs ()
      - playTonejs ()
      - onmidimessage ()
      - function ()
      - noteOn ()
      - initTonejsByUserAction ()
      - noteOff ()
      - calcStepTimeMsec ()
      - createDefaultSynth ()
      - setupSelect ()
      - onChangeSelect ()
      - addOptionToSelect ()
      - removeIndent ()
      - allNoteOff ()
      - sendMidiMessage ()
      - onChangeParentTextarea ()
      - isParent ()
      - isChild ()
      - getParentOrChild ()
      - setupDropDownListForTextareaTemplate ()
      - initOnStartPlaying ()
      - onStartPlaying ()
      - getMidiEventName ()
      - allSoundOff ()
      - initBaseTimeStampAudioContext ()
      - isIpad ()
      - startTonejs ()
      - afterTonejsStart ()
      - onSynthReady ()
      - isSynthReady ()
      - isAllSynthReady ()
      - checkAllSynthReady ()
      - doHandshake (experimental10/postmate-midi.js)
      - visualizeCurrentSound ()
      - isSmartPhone ()
      - getInitialInterval ()
      - startVisualization ()
      - changeVisualization ()
      - initCh ()
      - getMidiOutputIds ()
      - getOutputIds ()
      - getOutputId ()
      - onAllSynthReady ()
      - sendMidiMessageFromDevice ()
      - checkAllSynthReadyParent ()
      - registerParent ()
      - registerChild ()
      - onChangeAnyTextarea ()
      - registerPlayButton ()
      - linkPlayButton ()
      - onClickPlayButton ()
      - registerSeq ()
      - createWav ()
      - onCompleteHandshakeAllChildren ()
      - visualizeGeneratedSound ()
      - registerGenerator ()
      - sendWavAfterHandshakeAllChildren ()
      - sendToSamplerFromDevice ()
      - sendToSampler ()
      - renderContextAsync ()
      - sendWavAfterHandshakeAllChildrenSub ()
      - setupTonejsPreRenderer ()
      - getWaveform ()
      - getPeakWav ()
      - normalizeWav ()
      - getPeakAbs ()
      - isPreRenderSynth ()
      - onStartPreRender ()
      - isPreRenderSeq ()
      - onCompletePreRenderSeq ()
      - doPreRenderAsync ()
      - schedulingPreRender ()
      - removeButton ()
      - registerPrerenderButton ()
      - registerWavImportButton ()
      - openDialogForFileUpload ()
      - readFileContentAsync ()
      - getFloat32ArrayFromWavFileAsync ()
      - registerGeneratedSoundVisualizer ()
      - registerSynth ()
      - registerPrerenderer ()
      - setContextInitSynthAddWav ()
      - saveWavByDialog ()
      - getWavFileFromFloat32 ()
      - openDownloadDialog ()
      - updateGnWavs ()
      - samplerAddWavs ()
      - checkWavOk ()
    - postmateParent (experimental02/parent.js)
  - seqPlay (experimental05/seq.js)
    - calcNextTime ()
      - sendNoteOn ()
      - sendNoteOff ()
      - init ()
      - playStep ()
    - setupNoteOff ()
      - isNoteOn ()
      - procNextTime ()
      - replace ()
      - clearTimeouts ()
  - onmousedownOrTouchStart (experimental09/keyboard.js)
    - onmousemoveOrTouchMove ()
      - onmouseupOrTouchEnd ()
      - getMouseNoteNum ()
      - getKeyboardNoteNum ()
      - i2penta ()
      - getPenta ()
      - semitone2penta ()
      - sendAllNoteOff ()
      - checkAndSend ()
      - cc74 ()
  - initSynth (experimental07/saw-poly.js)
    - cutoff ()
      - v2mul ()
      - initSynthPoly (experimental06/poly.js)
      - initSampler (experimental16/sampler/sampler.js)
      - initSynthCommon ()
      - panpot ()
  - isAutoStartPrerender (experimental21/prerenderer.js)
    - autoExecPrerender ()
      - createPreRenderSeqData ()
      - afterWavFileUploadAsync ()
      - getChNum ()
      - extractNumberFromStr ()
      - generatedSoundVisualizer_dispWavs ()
      - getPeakOfWavs ()
      - getPeakOf1wav ()
      - combineFloat32Array ()
      - getPeakOfSliced ()
- switch (experimental03/postmate-midi.js)
- for (experimental07/postmate-midi.js)
- while (experimental07/seq.js)

---
Generated at: 2025-11-10 08:28:44 JST
