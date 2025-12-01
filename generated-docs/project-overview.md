Last updated: 2025-12-02

# Project Overview

## プロジェクト概要
- このプロジェクトは、Web MIDI APIとPostmate.jsを用いて、複数のWebページ間でMIDIとオーディオを送受信する実験的なライブラリです。
- Tone.jsを基盤に、仮想キーボード、シーケンサー、サンプラーなど多様な音楽アプリケーションのユースケースを検証しています。
- 将来の安定版「postmate-midi」リリースに向け、広範な機能と仕様を網羅するための実験と実証を目的としています。

## 技術スタック
- フロントエンド: HTML5 (構造), CSS3 (スタイル), JavaScript (ES6+を用いた動的処理)
- 音楽・オーディオ: Web MIDI API (MIDIデバイスとの連携), Web Audio API (ブラウザでの音声処理), Tone.js (Web Audio APIをラップした高レベルなオーディオ処理ライブラリ), MIDI (音楽情報をデジタルで表現するプロトコル)
- 開発ツール: GitHub Pages (デモサイトのホスティング)
- テスト: (プロジェクト情報からはテスト関連技術の利用は確認できませんでした。)
- ビルドツール: (プロジェクト情報からは専用のビルドツールは確認できませんでした。主にVanilla JavaScriptで構成されています。)
- 言語機能: JavaScript ES6+ (モジュール import/export, Promise/async/await を利用した非同期処理, アロー関数など)
- 自動化・CI/CD: (プロジェクト情報からはCI/CDツールの利用は確認できませんでした。)
- 開発標準: (プロジェクト情報からは特定のコード品質・統一ルール関連技術の利用は確認できませんでした。)

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
🌐 googled947dc864c270e07.html
```

## ファイル詳細説明
- `LICENSE`: プロジェクトのライセンス情報が記載されています。
- `README.md`: プロジェクトの概要、デモ、注意事項などの主要な情報が記述されています。
- `_config.yml`: GitHub PagesのJekyll設定ファイルです。
- `doc/problems-postmate-midi-solves.md`, `doc/roadmap.md`, `doc/why-postmate-midi.md`: プロジェクトの目的、解決する問題、将来の計画に関するドキュメント（編集中）。
- `experimentalXX/index.html`: 各デモのルートとなるHTMLファイルです。Parent/Childページのiframeを埋め込んだり、UI要素を配置したりします。
- `experimentalXX/child.html`: 各デモでPostmateの"child"として機能するiframe用のHTMLファイルです。
- `experimentalXX/child.js`: `child.html`にロードされ、Postmateの子側として親ページとの通信やMIDI/オーディオ処理を行います。
- `experimentalXX/parent.js`: `index.html`にロードされ、Postmateの親側として子ページを生成し、MIDI/オーディオデータや制御コマンドを送信します。
- `experimentalXX/postmate-midi.js`: このプロジェクトの核となる共通ライブラリです。Postmate.jsを利用してWebページ間のハンドシェイク、MIDIメッセージの送受信、オーディオデータのルーティング、UI要素（テキストエリア、ドロップダウンなど）との連携、Tone.jsの初期化・制御など、多岐にわたる機能を提供します。
- `experimentalXX/saw.js`, `experimentalXX/poly.js`, `experimentalXX/synth-poly.js`, `experimentalXX/synth/synth-poly.js`, `experimentalXX/synth/synth.js`: Tone.jsを用いて各種シンセサイザーの音源を定義するスクリプトです。ノコギリ波シンセ、ポリフォニックシンセ、カットオフフィルタ付きシンセなど、多様な音色や機能を提供します。
- `experimentalXX/seq.js`, `experimentalXX/seq/seq.js`: MIDIシーケンサーのロジックを実装しています。定義されたMIDIノートシーケンスを時間通りに再生し、MIDIメッセージとして送信します。
- `experimentalXX/keyboard.js`: 仮想MIDIキーボードのUI要素と、マウス/タッチ操作をMIDIノートイベントに変換して送信するロジックを扱います。
- `experimentalXX/knob/knob.js`: 仮想コントロールノブ（ツマミ）のUI要素と、マウス/タッチ操作をMIDIコントロールチェンジメッセージ（CC）に変換して送信するロジックを扱います。
- `experimentalXX/midifilter/midifilter.js`: 受信したMIDIメッセージを加工・変換するフィルタリングロジックを実装しています（例: 単音を和音に変換）。
- `experimentalXX/sampler/sampler.js`: サンプラーの機能を提供します。オーディオデータの読み込み、再生、MIDIノートイベントへの応答などを管理します。
- `experimentalXX/generator/generator.js`: オーディオデータ（WAV形式）を生成するためのロジックを含みます。主にTone.jsのOfflineContextを利用して音声をプリレンダリングします。
- `experimentalXX/prerenderer.js`: `experimental21`に特化したモジュールで、音声のプリレンダリング機能、WAVファイルのエクスポート/インポート機能、生成された音声の波形可視化機能などを提供します。
- `experimentalXX/index.css`: 各デモページのデザインを定義するスタイルシートです。
- `googled947dc864c270e07.html`: Googleサイト所有権確認のためのHTMLファイルです。

## 関数詳細説明
- `onChangeTextarea(event)`: テキストエリアの内容が変更された際に呼び出されます。イベントオブジェクトを引数にとり、更新された内容を親/子ページ間で同期したり、関連するロジックをトリガーしたりします。戻り値はありません。
- `onCompleteHandshakeParent()`: Postmateの親ページと子ページ間のハンドシェイクが完了した際に呼び出されます。初期設定や通信開始後の処理を実行します。戻り値はありません。
- `onChangeParent(data)`: 親ページからデータが変更されたことを示すメッセージを受信した際に呼び出されます。受信したデータに基づいてUIやオーディオの状態を更新します。引数としてデータオブジェクトを受け取ります。戻り値はありません。
- `initTonejs()`: Tone.jsのAudioContextを初期化し、オーディオエンジンを準備します。戻り値はありません。
- `playTonejs()`: Tone.jsの再生を開始します。戻り値はありません。
- `initSynthSaw(context)`: Tone.jsのAudioContextを引数にとり、基本的なノコギリ波シンセサイザーを初期化します。戻り値として初期化されたシンセサイザーオブジェクトを返します。
- `noteOn(midiNote, velocity, time)`: 指定されたMIDIノート番号、ベロシティ、タイミングで音を発します。引数: `midiNote` (数値), `velocity` (数値), `time` (時間指定)。戻り値はありません。
- `noteOff(midiNote, time)`: 指定されたMIDIノート番号、タイミングで音を停止します。引数: `midiNote` (数値), `time` (時間指定)。戻り値はありません。
- `seqPlay()`: シーケンサーの再生を開始または制御します。戻り値はありません。
- `calcNextTime(currentTime)`: 現在時刻を基に、シーケンスの次のステップの再生時刻を計算します。引数: `currentTime` (数値)。戻り値として次の再生時刻を数値で返します。
- `sendNoteOn(noteNum, velocity, time)`: 指定されたノートオンメッセージをMIDI出力に送信します。引数: `noteNum` (MIDIノート番号), `velocity` (音量), `time` (タイミング)。戻り値はありません。
- `sendNoteOff(noteNum, time)`: 指定されたノートオフメッセージをMIDI出力に送信します。引数: `noteNum` (MIDIノート番号), `time` (タイミング)。戻り値はありません。
- `sendMidiMessage(portId, message)`: 特定のMIDI出力ポートにMIDIメッセージを送信します。引数: `portId` (文字列、MIDIポートID), `message` (MIDIメッセージデータ)。戻り値はありません。
- `initSynthPoly(context)`: Tone.jsのAudioContextを引数にとり、ポリフォニックなシンセサイザーを初期化します。戻り値として初期化されたシンセサイザーオブジェクトを返します。
- `setupSelect()`: ドロップダウンリストのUIを初期設定します。戻り値はありません。
- `onChangeSelect(event)`: ドロップダウンリストの選択が変更された際に呼び出されます。イベントオブジェクトを引数にとり、選択された項目に基づいて処理を行います。戻り値はありません。
- `addOptionToSelect(selectElement, value, text)`: 指定されたドロップダウンリストにオプション項目を追加します。引数: `selectElement` (HTML Select要素), `value` (オプションの値), `text` (表示テキスト)。戻り値はありません。
- `removeIndent(text)`: テキストからインデントを削除します。引数: `text` (文字列)。戻り値として整形された文字列を返します。
- `allNoteOff()`: 現在発音中のすべてのノートを停止します。戻り値はありません。
- `isParent()`: 現在のページがPostmateの親ページかどうかを判定します。戻り値として真偽値を返します。
- `isChild()`: 現在のページがPostmateの子ページかどうかを判定します。戻り値として真偽値を返します。
- `getParentOrChild()`: 現在のページが親か子かを判定し、対応するPostmateインスタンスを返します。戻り値としてPostmateインスタンスを返します。
- `initOnStartPlaying()`: 再生開始時の初期設定を行います。戻り値はありません。
- `onStartPlaying()`: 再生開始時に呼び出されるハンドラです。オーディオコンテキストの開始などをトリガーします。戻り値はありません。
- `getMidiEventName(midiMessage)`: MIDIメッセージのタイプ（例: Note On, Note Off）を示す文字列を取得します。引数: `midiMessage` (MIDIメッセージデータ)。戻り値としてイベント名を表す文字列を返します。
- `allSoundOff()`: すべての音を停止します（緊急停止など）。戻り値はありません。
- `isIpad()`: 現在のデバイスがiPadであるかどうかを判定します。戻り値として真偽値を返します。
- `startTonejs()`: Tone.jsオーディオエンジンを開始します。戻り値はありません。
- `afterTonejsStart()`: Tone.jsオーディオエンジン開始後に実行される処理です。戻り値はありません。
- `onSynthReady()`: シンセサイザーが利用可能になった際に呼び出されます。戻り値はありません。
- `isSynthReady()`: シンセサイザーが準備完了状態にあるかを確認します。戻り値として真偽値を返します。
- `isAllSynthReady()`: すべてのシンセサイザーが準備完了状態にあるかを確認します。戻り値として真偽値を返します。
- `checkAllSynthReady()`: すべてのシンセサイザーの準備完了状態をチェックし、必要に応じて処理を進めます。戻り値はありません。
- `onmousedownOrTouchStart(event)`: マウスボタンの押し下げまたはタッチ開始イベントを処理します。引数: `event` (イベントオブジェクト)。戻り値はありません。
- `onmousemoveOrTouchMove(event)`: マウス移動またはタッチ移動イベントを処理します。引数: `event` (イベントオブジェクト)。戻り値はありません。
- `onmouseupOrTouchEnd(event)`: マウスボタンの離上またはタッチ終了イベントを処理します。引数: `event` (イベントオブジェクト)。戻り値はありません。
- `getMouseNoteNum(event)`: マウスイベントの座標から仮想キーボードのノート番号を取得します。引数: `event` (イベントオブジェクト)。戻り値としてMIDIノート番号を数値で返します。
- `getKeyboardNoteNum(event)`: キーボードイベントからノート番号を取得します。引数: `event` (イベントオブジェクト)。戻り値としてMIDIノート番号を数値で返します。
- `cc74(value)`: コントロールチェンジ74（カットオフ周波数）の値を設定します。引数: `value` (0-127の数値)。戻り値はありません。
- `initCh(channel, synthType)`: 指定されたMIDIチャンネルにシンセサイザーを初期化します。引数: `channel` (数値), `synthType` (シンセの種類を示す文字列)。戻り値はありません。
- `midifilter(midiMessage)`: 受信したMIDIメッセージをフィルタリングし、変換されたMIDIメッセージを返します。引数: `midiMessage` (MIDIメッセージデータ)。戻り値として変換後のMIDIメッセージデータを返します。
- `addShiftedNotes(originalNote, shiftSemitones)`: 元のノートから指定された半音数だけシフトしたノートを追加生成します。引数: `originalNote` (数値), `shiftSemitones` (数値)。戻り値としてシフトされたノートの配列を返します。
- `getShiftedNote(originalNote, shiftSemitones)`: 元のノートから指定された半音数だけシフトしたノートを計算します。引数: `originalNote` (数値), `shiftSemitones` (数値)。戻り値としてシフトされたノート番号を数値で返します。
- `registerParent(options)`: Postmateの親インスタンスを登録します。引数: `options` (設定オブジェクト)。戻り値として登録された親インスタンスを返します。
- `registerChild(options)`: Postmateの子インスタンスを登録します。引数: `options` (設定オブジェクト)。戻り値として登録された子インスタンスを返します。
- `initSampler(context, sampleUrl)`: Tone.jsのAudioContextとサンプル音声のURLを引数にとり、サンプラーを初期化します。戻り値として初期化されたサンプラーオブジェクトを返します。
- `createWav(buffer, channels, sampleRate)`: オーディオバッファからWAVファイルデータを生成します。引数: `buffer` (Float32Array), `channels` (数値), `sampleRate` (数値)。戻り値としてWAVファイルのBlobを返します。
- `renderContextAsync(context, duration)`: Tone.jsのOfflineContextを使用して、指定されたAudioContextと期間で音声を非同期にレンダリングします。引数: `context` (Tone.js AudioContext), `duration` (レンダリング期間)。戻り値としてレンダリングされたオーディオバッファのPromiseを返します。
- `saveWavByDialog(wavData, filename)`: 生成されたWAVデータをブラウザのダウンロードダイアログを通じて保存します。引数: `wavData` (BlobまたはURL), `filename` (文字列)。戻り値はありません。
- `getFloat32ArrayFromWavFileAsync(file)`: WAVファイルオブジェクトからFloat32Array形式のオーディオデータを非同期で読み込みます。引数: `file` (Fileオブジェクト)。戻り値としてFloat32ArrayのPromiseを返します。
- `isAutoStartPrerender()`: プリレンダリングを自動で開始するかどうかを判定します。戻り値として真偽値を返します。
- `autoExecPrerender()`: プリレンダリング処理を自動で実行します。戻り値はありません。
- `createPreRenderSeqData()`: プリレンダリング用のシーケンスデータを生成します。戻り値としてシーケンスデータオブジェクトを返します。
- `generatedSoundVisualizer_dispWavs(wavs)`: 生成されたWAVデータ（複数）を視覚化して表示します。引数: `wavs` (WAVデータの配列)。戻り値はありません。

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
Generated at: 2025-12-02 07:08:01 JST
