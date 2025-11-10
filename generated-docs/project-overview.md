Last updated: 2025-11-11

# Project Overview

## プロジェクト概要
- ブラウザ上で複数のウェブページ間でのMIDIとオーディオの送受信を可能にする実験的ライブラリです。
- PostmateとWeb Audio/MIDI APIを利用し、シンプルで軽量な実装を目指しています。
- 将来の本格リリースに向け、多様な利用シナリオと技術仕様を網羅するためのデモと検証を行っています。

## 技術スタック
- フロントエンド: HTML, CSS, JavaScript (ブラウザ上で動作するユーザーインターフェースやアプリケーションロジックの実装に使用)
- 音楽・オーディオ: Tone.js (Web Audio APIを抽象化し、シンセサイザー、シーケンサー、エフェクトなどのオーディオ処理機能を提供), Web MIDI API (MIDIデバイスからの入力およびMIDIメッセージの送信機能を提供), Postmate (ブラウザの`postMessage` APIをラップし、親ウィンドウと子iframe間で安全な通信を確立するために使用)
- 開発ツール: (特筆すべき開発ツールは明示されていません。)
- テスト: (特筆すべきテスト関連技術は明示されていません。)
- ビルドツール: Jekyll (GitHub Pagesによる静的サイト生成に利用)
- 言語機能: JavaScript (非同期処理、DOM操作、イベントハンドリングなど、Webブラウザ環境でのプログラミング全般に利用)
- 自動化・CI/CD: GitHub Pages (リポジトリへの変更をトリガーに、自動的にウェブサイトをデプロイするために利用)
- 開発標準: (特筆すべき開発標準は明示されていません。)

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
- `LICENSE`: プロジェクトのライセンス情報（MITライセンス）が記述されています。
- `README.md`: プロジェクトの概要、デモへのリンク、開発に関する注意点などが記載されたメインドキュメントです。
- `_config.yml`: Jekyllサイトの設定ファイルで、GitHub Pagesの生成に使用されます。
- `doc/`: プロジェクトの背景、ロードマップ、解決する問題などに関するドキュメントが格納されています。
    - `problems-postmate-midi-solves.md`: このプロジェクトが解決しようとしている問題について記述されたドキュメントです。
    - `roadmap.md`: プロジェクトのロードマップ（今後の計画）について記述されたドキュメントです。
    - `why-postmate-midi.md`: なぜこのプロジェクトが作られたのか、その背景について記述されたドキュメントです。
- `experimentalXX/ (各ディレクトリ)`: Postmate-MIDIの様々な機能やユースケースを検証するための個別のデモを格納するディレクトリです。各デモは独立しており、それぞれ異なるWeb MIDI/Audio機能の組み合わせを示します。
    - `child.html`: 各デモにおいて、Postmateの子ウィンドウ（iframe）としてロードされるHTMLファイルです。
    - `child.js`: 子ウィンドウ側で動作するJavaScriptロジックが含まれており、Postmateを介して親からのMIDI/オーディオメッセージを受信・処理します。
    - `index.html`: 各デモのメインページとなるHTMLファイルです。通常、Postmateの親ウィンドウとして機能したり、アプリケーション全体を統括したりします。
    - `parent.js`: 親ウィンドウ側で動作するJavaScriptロジックが含まれており、Postmateを介して子ウィンドウへMIDI/オーディオメッセージを送信・制御します。
    - `postmate-midi.js`: Postmate-MIDIライブラリのコアロジックを実装したファイルです。Postmateによる通信、MIDIメッセージの送受信、Tone.jsとの連携、オーディオレンダリング、UI連携など、プロジェクトの中心的な機能を提供します。
    - `saw.js` (experimental03, 04, 05): シンプルなノコギリ波シンセサイザーの初期実装です。Tone.jsを使用して音を生成します。
    - `seq.js` (experimental05以降の各`seq/`ディレクトリ内): 簡易的なシーケンサーのロジックを実装しています。MIDIイベントのスケジュール管理や送出を行います。
    - `poly.js` (experimental06): ポリフォニック（和音）に対応したシンセサイザーの初期実装です。
    - `saw-poly.js` (experimental07, 08): 和音に対応したノコギリ波シンセサイザーの実装です。
    - `keyboard.js` (experimental09): マウスやタッチ操作で音を鳴らせる仮想MIDIキーボードのUIとロジックです。
    - `synth-poly.js` (experimental09, 10, 11, 12, 13, 14, 15, 20, 21): ポリフォニック対応のシンセサイザーの実装です。デモに応じてカットオフ制御やマルチティンバー機能が追加されています。
    - `index.css` (experimental10以降の各ディレクトリ): 各デモページに適用されるスタイルシートです。
    - `knob/knob.js` (experimental10): 仮想的なツマミ（カットオフ周波数など）のUIと、それに応じたMIDIコントロールチェンジ(CC)メッセージ送信ロジックです。
    - `midifilter/midifilter.js` (experimental12): MIDIメッセージをフィルタリングしたり、単音を和音に変換したりするロジックを実装しています。
    - `seq-and-synth-saw/parent-or-child.js` (experimental13): URL引数に基づいて、親シーケンサーまたは子シンセサイザーのいずれかとして機能するスクリプトです。
    - `parent/parent.js` (experimental14以降の各`parent/`ディレクトリ内): 複数の子ウィンドウやモジュールを管理・連携させるための親側のPostmateロジックです。
    - `seq/seq-child.js` (experimental14以降の各`seq/`ディレクトリ内): 親ウィンドウからMIDIメッセージを受け取る子シーケンサーのPostmateロジックです。
    - `sampler/sampler.js` (experimental16, 17, 18, 19, 20): サンプラーのロジックです。WAVファイルのロード、再生、場合によっては生成にも対応しています。
    - `generator/generator.js` (experimental17): プログラムでオーディオデータを生成し、WAV形式で出力するロジックです。
    - `synth/synth.js` (experimental18, 19): Tone.jsのOfflineContextを利用したプリレンダリング機能を特化したシンセサイザーです。
    - `experimental21/README.md`: `experimental21`デモに特化したREADMEドキュメントです。
    - `experimental21/doc/`: `experimental21`デモに関する詳細なドキュメント群です。
        - `20と21の比較.md`: experimental20とexperimental21の機能比較について説明しています。
        - `USAGE.md`: experimental21デモの利用方法を説明しています。
        - `課題_セルフサンプリング.md`: セルフサンプリングに関する課題について記述しています。
    - `prerenderer.js` (experimental21): オーディオのプリレンダリング、WAVファイルのエクスポート・インポート、生成されたサウンドの視覚化など、高度なオーディオ処理を担当する中心的なロジックファイルです。

## 関数詳細説明
- `onChangeTextarea (experimental01/child.js, experimental01/parent.js など)`: テキストエリアの内容が変更されたときに呼び出されるハンドラ関数です。通常、その変更内容をPostmateを介して相手側に送信するなどの処理を行います。（引数・戻り値は明示されていません）
- `onCompleteHandshakeParent (experimental01/child.js, experimental03/postmate-midi.js など)`: Postmateのハンドシェイクが完了した際に、親から子へ、またはPostmateライブラリ内で呼び出されるコールバック関数です。初期設定やUIの状態更新などが含まれます。（引数・戻り値は明示されていません）
- `onChangeParent (experimental01/child.js, experimental03/postmate-midi.js など)`: 親ウィンドウからデータが変更された際に子ウィンドウ側で呼び出されるコールバック関数です。（引数・戻り値は明示されていません）
- `initTonejs (experimental02/child.js, experimental02/parent.js)`: Tone.jsの初期化を行う関数です。オーディオコンテキストの準備などが含まれます。（引数・戻り値は明示されていません）
- `playTonejs (experimental02/child.js, experimental02/parent.js)`: Tone.jsを使用したサウンド再生を開始する関数です。（引数・戻り値は明示されていません）
- `initSynthSaw (experimental03/saw.js, experimental04/saw.js, experimental05/saw.js)`: ノコギリ波シンセサイザーを初期化する関数です。Tone.jsのシンセインスタンスを生成します。（引数・戻り値は明示されていません）
- `noteOn (experimental03/saw.js, experimental06/poly.js など)`: 指定されたノート番号とベロシティで音を鳴らす関数です。（引数・戻り値は明示されていません）
- `noteOff (experimental03/saw.js, experimental06/poly.js など)`: 指定されたノート番号の音を停止する関数です。（引数・戻り値は明示されていません）
- `seqPlay (experimental05/seq.js, experimental06/seq.js など)`: シーケンサーの再生を開始する関数です。シーケンスデータに基づいてMIDIイベントをスケジュールします。（引数・戻り値は明示されていません）
- `calcNextTime (experimental05/seq.js, experimental06/seq.js など)`: シーケンサーにおいて、次のステップの再生タイミングを計算する関数です。（引数・戻り値は明示されていません）
- `calcStepTimeMsec (experimental05/seq.js, experimental06/seq.js など)`: 1ステップあたりの時間をミリ秒単位で計算する関数です。（引数・戻り値は明示されていません）
- `sendNoteOn (experimental05/seq.js, experimental09/keyboard.js など)`: ノートオンMIDIメッセージを送信する関数です。（引数・戻り値は明示されていません）
- `sendNoteOff (experimental05/seq.js, experimental09/keyboard.js など)`: ノートオフMIDIメッセージを送信する関数です。（引数・戻り値は明示されていません）
- `sendMidiMessage (experimental05/seq.js, experimental06/postmate-midi.js など)`: MIDIメッセージをPostmateを介して送信するための汎用関数です。（引数・戻り値は明示されていません）
- `initSynthPoly (experimental06/poly.js, experimental09/synth-poly.js など)`: ポリフォニックシンセサイザーを初期化する関数です。（引数・戻り値は明示されていません）
- `init (experimental06/seq.js, experimental07/seq.js など)`: シーケンサーなどのモジュールを初期化する関数です。（引数・戻り値は明示されていません）
- `playStep (experimental06/seq.js, experimental07/seq.js など)`: シーケンサーの個々のステップを処理する関数です。MIDIイベントの送出などが含まれます。（引数・戻り値は明示されていません）
- `setupNoteOff (experimental07/seq.js, experimental08/seq.js など)`: ノートオフイベントのタイミングを設定・管理する関数です。（引数・戻り値は明示されていません）
- `isNoteOn (experimental07/seq.js, experimental08/seq.js など)`: 特定のノートが現在アクティブ（鳴っている）かどうかを判定する関数です。（引数・戻り値は明示されていません）
- `procNextTime (experimental07/seq.js, experimental08/seq.js など)`: 次のシーケンスイベントの処理時刻を計算・管理する関数です。（引数・戻り値は明示されていません）
- `allNoteOff (experimental07/seq.js, experimental08/seq.js など)`: 現在鳴っているすべてのノートをオフにする関数です。（引数・戻り値は明示されていません）
- `onChangeParentTextarea (experimental08/postmate-midi.js, experimental09/postmate-midi.js など)`: 親ウィンドウのテキストエリアが変更された際に子側で呼び出されるハンドラです。（引数・戻り値は明示されていません）
- `isParent (experimental08/postmate-midi.js, experimental09/postmate-midi.js など)`: 現在のウィンドウがPostmateの親として動作しているかを判定する関数です。（引数・戻り値は明示されていません）
- `isChild (experimental08/postmate-midi.js, experimental09/postmate-midi.js など)`: 現在のウィンドウがPostmateの子として動作しているかを判定する関数です。（引数・戻り値は明示されていません）
- `getParentOrChild (experimental08/postmate-midi.js, experimental09/postmate-midi.js など)`: 現在のウィンドウが親か子かに応じて適切なPostmateインスタンスを返す関数です。（引数・戻り値は明示されていません）
- `setupDropDownListForTextareaTemplate (experimental08/postmate-midi.js, experimental09/postmate-midi.js など)`: テキストエリアのテンプレートを選択するためのドロップダウンリストを設定する関数です。（引数・戻り値は明示されていません）
- `onChangeSelect (experimental08/postmate-midi.js, experimental09/postmate-midi.js など)`: ドロップダウンリストの選択が変更されたときに呼び出されるハンドラ関数です。（引数・戻り値は明示されていません）
- `addOptionToSelect (experimental08/postmate-midi.js, experimental09/postmate-midi.js など)`: ドロップダウンリストに新しいオプションを追加する関数です。（引数・戻り値は明示されていません）
- `removeIndent (experimental08/postmate-midi.js, experimental09/postmate-midi.js など)`: 文字列からインデントを削除するヘルパー関数です。（引数・戻り値は明示されていません）
- `initOnStartPlaying (experimental08/postmate-midi.js, experimental09/postmate-midi.js など)`: 再生開始時の初期化処理を行う関数です。（引数・戻り値は明示されていません）
- `onStartPlaying (experimental08/postmate-midi.js, experimental09/postmate-midi.js など)`: 再生が開始されたときに呼び出されるハンドラ関数です。（引数・戻り値は明示されていません）
- `onmidimessage (experimental03/postmate-midi.js, experimental04/postmate-midi.js など)`: Web MIDI APIまたはPostmate経由でMIDIメッセージを受信した際に呼び出されるコールバック関数です。受信したMIDIメッセージを解析し、音源の制御などを行います。（引数・戻り値は明示されていません）
- `getMidiEventName (experimental08/postmate-midi.js, experimental09/postmate-midi.js など)`: MIDIイベントのバイトコードから可読なイベント名を取得するヘルパー関数です。（引数・戻り値は明示されていません）
- `allSoundOff (experimental08/postmate-midi.js, experimental08/seq.js など)`: 全ての音を停止する関数です。（引数・戻り値は明示されていません）
- `onmousedownOrTouchStart (experimental09/keyboard.js, experimental10/knob/knob.js)`: マウスダウンまたはタッチ開始イベント時に呼び出され、仮想キーボードのノートオンやツマミ操作を開始する関数です。（引数・戻り値は明示されていません）
- `onmousemoveOrTouchMove (experimental09/keyboard.js, experimental10/knob/knob.js)`: マウス移動またはタッチ移動イベント時に呼び出され、音高の変更やツマミの値変更を処理する関数です。（引数・戻り値は明示されていません）
- `onmouseupOrTouchEnd (experimental09/keyboard.js)`: マウスアップまたはタッチ終了イベント時に呼び出され、仮想キーボードのノートオフをトリガーする関数です。（引数・戻り値は明示されていません）
- `getMouseNoteNum (experimental09/keyboard.js, experimental10/knob/knob.js)`: マウスのY座標から対応するノート番号を計算する関数です。（引数・戻り値は明示されていません）
- `getKeyboardNoteNum (experimental09/keyboard.js, experimental10/knob/knob.js)`: キーボードの押下キーから対応するノート番号を計算する関数です。（引数・戻り値は明示されていません）
- `i2penta (experimental09/keyboard.js)`: 整数値をペンタトニックスケール上の位置に変換する関数です。（引数・戻り値は明示されていません）
- `getPenta (experimental09/keyboard.js)`: 特定のノート番号がペンタトニックスケールに属するかどうかを判定し、スケール上の位置を返す関数です。（引数・戻り値は明示されていません）
- `semitone2penta (experimental09/keyboard.js)`: 半音階のノート番号をペンタトニックスケール上の位置に変換する関数です。（引数・戻り値は明示されていません）
- `sendAllNoteOff (experimental09/keyboard.js)`: 全てのノートオフMIDIメッセージを送信する関数です。（引数・戻り値は明示されていません）
- `checkAndSend (experimental09/keyboard.js)`: MIDIメッセージを送信する前に条件をチェックする関数です。（引数・戻り値は明示されていません）
- `isIpad (experimental09/postmate-midi.js, experimental10/postmate-midi.js など)`: 現在のデバイスがiPadであるかを判定する関数です。（引数・戻り値は明示されていません）
- `startTonejs (experimental09/postmate-midi.js, experimental10/postmate-midi.js など)`: Tone.jsのオーディオコンテキストを起動する関数です。（引数・戻り値は明示されていません）
- `afterTonejsStart (experimental09/postmate-midi.js, experimental10/postmate-midi.js など)`: Tone.jsが起動した後に実行されるコールバック関数です。（引数・戻り値は明示されていません）
- `onSynthReady (experimental09/postmate-midi.js, experimental10/postmate-midi.js など)`: シンセサイザーが準備完了した際に呼び出されるコールバック関数です。（引数・戻り値は明示されていません）
- `isSynthReady (experimental09/postmate-midi.js, experimental10/postmate-midi.js など)`: シンセサイザーが準備完了状態にあるかを判定する関数です。（引数・戻り値は明示されていません）
- `isAllSynthReady (experimental09/postmate-midi.js, experimental10/postmate-midi.js など)`: 全てのシンセサイザーが準備完了状態にあるかを判定する関数です。（引数・戻り値は明示されていません）
- `checkAllSynthReady (experimental09/postmate-midi.js, experimental10/postmate-midi.js など)`: 全てのシンセサイザーの準備状況をチェックし、完了していれば次の処理へ進む関数です。（引数・戻り値は明示されていません）
- `doHandshake (experimental10/postmate-midi.js, experimental11/postmate-midi.js など)`: Postmateのハンドシェイク処理を開始する関数です。（引数・戻り値は明示されていません）
- `visualizeCurrentSound (experimental10/postmate-midi.js, experimental11/postmate-midi.js など)`: 現在鳴っているサウンドを視覚化する機能を開始する関数です。（引数・戻り値は明示されていません）
- `cc74 (experimental10/knob/knob.js)`: MIDIコントロールチェンジ番号74（通常カットオフ周波数）を送信または処理する関数です。（引数・戻り値は明示されていません）
- `cutoff (experimental10/synth/synth-poly.js, experimental11/synth/synth-poly.js など)`: シンセサイザーのカットオフ周波数を設定する関数です。（引数・戻り値は明示されていません）
- `v2mul (experimental10/synth/synth-poly.js, experimental11/synth/synth-poly.js など)`: ベロシティ値を乗算して音量調整などを行うヘルパー関数です。（引数・戻り値は明示されていません）
- `isSmartPhone (experimental11/postmate-midi.js, experimental12/postmate-midi.js など)`: 現在のデバイスがスマートフォンであるかを判定する関数です。（引数・戻り値は明示されていません）
- `getInitialInterval (experimental11/postmate-midi.js, experimental12/postmate-midi.js など)`: サウンド視覚化の初期インターバルを取得する関数です。（引数・戻り値は明示されていません）
- `startVisualization (experimental11/postmate-midi.js, experimental12/postmate-midi.js など)`: サウンド視覚化を開始する関数です。（引数・戻り値は明示されていません）
- `changeVisualization (experimental11/postmate-midi.js, experimental12/postmate-midi.js など)`: サウンド視覚化の状態を変更する関数です。（引数・戻り値は明示されていません）
- `initCh (experimental11/postmate-midi.js, experimental12/postmate-midi.js など)`: MIDIチャンネルごとの初期設定を行う関数です。（引数・戻り値は明示されていません）
- `getMidiOutputIds (experimental12/postmate-midi.js, experimental13/postmate-midi.js など)`: 利用可能なMIDI出力デバイスのIDリストを取得する関数です。（引数・戻り値は明示されていません）
- `getOutputIds (experimental12/postmate-midi.js, experimental13/postmate-midi.js など)`: 特定の種類の出力デバイスIDリストを取得する汎用関数です。（引数・戻り値は明示されていません）
- `getOutputId (experimental12/postmate-midi.js, experimental13/postmate-midi.js など)`: 特定の出力デバイスのIDを取得する関数です。（引数・戻り値は明示されていません）
- `onAllSynthReady (experimental12/postmate-midi.js, experimental13/postmate-midi.js など)`: 全てのシンセサイザーが準備完了した際に呼び出されるコールバック関数です。（引数・戻り値は明示されていません）
- `sendMidiMessageFromDevice (experimental12/postmate-midi.js, experimental13/postmate-midi.js など)`: 外部MIDIデバイスから受信したMIDIメッセージを送信する関数です。（引数・戻り値は明示されていません）
- `checkAllSynthReadyParent (experimental12/postmate-midi.js, experimental13/postmate-midi.js など)`: 親ウィンドウ側で全てのシンセサイザーの準備状況をチェックする関数です。（引数・戻り値は明示されていません）
- `midifilter (experimental12/midifilter/midifilter.js)`: 受信したMIDIメッセージを加工・変換するためのフィルター関数です。例えば、単音を和音に変換します。（引数・戻り値は明示されていません）
- `addShiftedNotes (experimental12/midifilter/midifilter.js)`: 特定のノートに対して、音高をずらしたノート（和音を生成するためなど）を追加する関数です。（引数・戻り値は明示されていません）
- `getShiftedNote (experimental12/midifilter/midifilter.js)`: 指定されたノートからのオフセットに基づいてシフトされたノート番号を取得する関数です。（引数・戻り値は明示されていません）
- `registerParent (experimental14/postmate-midi.js, experimental15/postmate-midi.js など)`: Postmateの親インスタンスを初期化し、登録する関数です。（引数・戻り値は明示されていません）
- `registerChild (experimental14/postmate-midi.js, experimental15/postmate-midi.js など)`: Postmateの子インスタンスを初期化し、登録する関数です。（引数・戻り値は明示されていません）
- `onChangeAnyTextarea (experimental15/postmate-midi.js, experimental16/postmate-midi.js など)`: いずれかのテキストエリアが変更されたときに呼び出される汎用ハンドラ関数です。（引数・戻り値は明示されていません）
- `registerPlayButton (experimental15/postmate-midi.js, experimental16/postmate-midi.js など)`: 再生ボタンを登録し、クリックイベントハンドラを設定する関数です。（引数・戻り値は明示されていません）
- `linkPlayButton (experimental15/postmate-midi.js, experimental16/postmate-midi.js など)`: 複数の再生ボタンの動作を同期させるためのリンク設定を行う関数です。（引数・戻り値は明示されていません）
- `onClickPlayButton (experimental15/postmate-midi.js, experimental16/postmate-midi.js など)`: 再生ボタンがクリックされたときに呼び出されるハンドラ関数です。（引数・戻り値は明示されていません）
- `registerSeq (experimental15/postmate-midi.js, experimental16/postmate-midi.js など)`: シーケンサーモジュールを登録する関数です。（引数・戻り値は明示されていません）
- `initTonejsByUserAction (experimental15/postmate-midi.js, experimental16/postmate-midi.js など)`: ユーザーアクションをトリガーとしてTone.jsのオーディオコンテキストを初期化する関数です。（引数・戻り値は明示されていません）
- `initBaseTimeStampAudioContext (experimental15/postmate-midi.js, experimental16/postmate-midi.js など)`: オーディオコンテキストのベースタイムスタンプを初期化する関数です。（引数・戻り値は明示されていません）
- `initSampler (experimental16/sampler/sampler.js, experimental17/sampler/sampler.js など)`: サンプラーを初期化する関数です。サンプルのロードや再生準備を行います。（引数・戻り値は明示されていません）
- `createWav (experimental16/sampler/sampler.js, experimental17/generator/generator.js)`: 生のオーディオデータからWAVファイル形式のデータを生成する関数です。（引数・戻り値は明示されていません）
- `onCompleteHandshakeAllChildren (experimental17/postmate-midi.js, experimental18/postmate-midi.js など)`: 全ての子ウィンドウとのPostmateハンドシェイクが完了した際に呼び出されるコールバック関数です。（引数・戻り値は明示されていません）
- `visualizeGeneratedSound (experimental17/postmate-midi.js, experimental18/postmate-midi.js など)`: 生成されたサウンドデータを視覚化する機能を開始する関数です。（引数・戻り値は明示されていません）
- `registerGenerator (experimental17/postmate-midi.js, experimental18/postmate-midi.js など)`: オーディオジェネレーターモジュールを登録する関数です。（引数・戻り値は明示されていません）
- `sendWavAfterHandshakeAllChildren (experimental17/postmate-midi.js, experimental18/postmate-midi.js など)`: 全ての子ウィンドウとのハンドシェイク完了後にWAVデータを送信する関数です。（引数・戻り値は明示されていません）
- `sendToSamplerFromDevice (experimental17/postmate-midi.js, experimental18/postmate-midi.js など)`: 外部デバイスから取得したWAVデータをサンプラーへ送信する関数です。（引数・戻り値は明示されていません）
- `sendToSampler (experimental17/postmate-midi.js, experimental18/postmate-midi.js など)`: 指定されたWAVデータをサンプラーへ送信する関数です。（引数・戻り値は明示されていません）
- `renderContextAsync (experimental18/postmate-midi.js, experimental19/postmate-midi.js など)`: Tone.jsのOfflineContextを使用して、指定されたオーディオデータを非同期にレンダリングする関数です。（引数・戻り値は明示されていません）
- `sendWavAfterHandshakeAllChildrenSub (experimental18/postmate-midi.js, experimental19/postmate-midi.js など)`: 全ての子ウィンドウとのハンドシェイク完了後にWAVデータを送信するサブルーチンです。（引数・戻り値は明示されていません）
- `setupTonejsPreRenderer (experimental18/synth/synth.js, experimental19/synth/synth.js)`: Tone.jsのプリレンダラー設定を行う関数です。OfflineContextの準備などが含まれます。（引数・戻り値は明示されていません）
- `getWaveform (experimental20/postmate-midi.js, experimental21/prerenderer.js)`: オーディオデータから波形データを取得する関数です。（引数・戻り値は明示されていません）
- `getPeakWav (experimental20/postmate-midi.js)`: WAVデータのピーク値（最大振幅）を計算する関数です。（引数・戻り値は明示されていません）
- `normalizeWav (experimental20/postmate-midi.js, experimental21/prerenderer.js)`: WAVデータをノーマライズ（正規化）して音量を均一にする関数です。（引数・戻り値は明示されていません）
- `getPeakAbs (experimental20/postmate-midi.js, experimental21/prerenderer.js)`: オーディオデータの絶対値のピークを計算する関数です。（引数・戻り値は明示されていません）
- `isPreRenderSynth (experimental20/postmate-midi.js)`: シンセサイザーがプリレンダリング対応かを判定する関数です。（引数・戻り値は明示されていません）
- `onStartPreRender (experimental20/postmate-midi.js, experimental21/prerenderer.js)`: プリレンダリング開始時に呼び出されるハンドラ関数です。（引数・戻り値は明示されていません）
- `isPreRenderSeq (experimental20/postmate-midi.js)`: シーケンサーがプリレンダリング対応かを判定する関数です。（引数・戻り値は明示されていません）
- `onCompletePreRenderSeq (experimental20/postmate-midi.js)`: シーケンスのプリレンダリングが完了した際に呼び出されるコールバック関数です。（引数・戻り値は明示されていません）
- `doPreRenderAsync (experimental20/postmate-midi.js, experimental21/prerenderer.js)`: 非同期でオーディオプリレンダリングを実行するメイン関数です。（引数・戻り値は明示されていません）
- `schedulingPreRender (experimental20/postmate-midi.js, experimental21/prerenderer.js)`: プリレンダリングのタスクをスケジューリングする関数です。（引数・戻り値は明示されていません）
- `removeButton (experimental21/postmate-midi.js)`: 指定されたHTMLボタン要素を削除する関数です。（引数・戻り値は明示されていません）
- `registerPrerenderButton (experimental21/postmate-midi.js, experimental21/prerenderer.js)`: プリレンダリングを開始するためのボタンを登録する関数です。（引数・戻り値は明示されていません）
- `registerWavImportButton (experimental21/postmate-midi.js, experimental21/prerenderer.js)`: WAVファイルをインポートするためのボタンを登録する関数です。（引数・戻り値は明示されていません）
- `openDialogForFileUpload (experimental21/postmate-midi.js)`: ファイルアップロードダイアログを開く関数です。（引数・戻り値は明示されていません）
- `readFileContentAsync (experimental21/postmate-midi.js)`: 指定されたファイルを非同期で読み込み、その内容を取得する関数です。（引数・戻り値は明示されていません）
- `getFloat32ArrayFromWavFileAsync (experimental21/postmate-midi.js)`: WAVファイルの内容を非同期で読み込み、Float32Array形式のオーディオデータとして取得する関数です。（引数・戻り値は明示されていません）
- `registerGeneratedSoundVisualizer (experimental21/postmate-midi.js, experimental21/prerenderer.js)`: 生成されたサウンドを視覚化するコンポーネントを登録する関数です。（引数・戻り値は明示されていません）
- `registerSynth (experimental21/postmate-midi.js)`: シンセサイザーモジュールをPostmate-MIDIシステムに登録する関数です。（引数・戻り値は明示されていません）
- `registerPrerenderer (experimental21/postmate-midi.js)`: プリレンダラーモジュールをPostmate-MIDIシステムに登録する関数です。（引数・戻り値は明示されていません）
- `setContextInitSynthAddWav (experimental21/postmate-midi.js, experimental21/prerenderer.js)`: 特定のオーディオコンテキストを設定し、シンセサイザーを初期化し、WAVデータを追加する関数です。（引数・戻り値は明示されていません）
- `saveWavByDialog (experimental21/postmate-midi.js, experimental21/prerenderer.js)`: 生成されたオーディオデータをWAVファイルとして保存するためのダイアログを開く関数です。（引数・戻り値は明示されていません）
- `getWavFileFromFloat32 (experimental21/postmate-midi.js)`: Float32Array形式のオーディオデータからWAVファイルデータを生成する関数です。（引数・戻り値は明示されていません）
- `openDownloadDialog (experimental21/postmate-midi.js)`: ファイルダウンロードダイアログを開く関数です。（引数・戻り値は明示されていません）
- `updateGnWavs (experimental21/postmate-midi.js, experimental21/prerenderer.js)`: 生成されたWAVデータを更新し、関連するUI要素に反映させる関数です。（引数・戻り値は明示されていません）
- `samplerAddWavs (experimental21/postmate-midi.js, experimental21/prerenderer.js)`: サンプラーにWAVデータを追加する関数です。（引数・戻り値は明示されていません）
- `checkWavOk (experimental21/postmate-midi.js)`: WAVデータが有効かどうかをチェックする関数です。（引数・戻り値は明示されていません）
- `isAutoStartPrerender (experimental21/prerenderer.js)`: プリレンダリングが自動的に開始される設定になっているかを判定する関数です。（引数・戻り値は明示されていません）
- `autoExecPrerender (experimental21/prerenderer.js)`: プリレンダリングを自動的に実行する関数です。（引数・戻り値は明示されていません）
- `createPreRenderSeqData (experimental21/prerenderer.js)`: プリレンダリングに使用するシーケンスデータを生成する関数です。（引数・戻り値は明示されていません）
- `afterWavFileUploadAsync (experimental21/prerenderer.js)`: WAVファイルのアップロード完了後に実行される非同期処理です。（引数・戻り値は明示されていません）
- `getChNum (experimental21/prerenderer.js)`: MIDIチャンネル番号を取得する関数です。（引数・戻り値は明示されていません）
- `extractNumberFromStr (experimental21/prerenderer.js)`: 文字列から数値を抽出するヘルパー関数です。（引数・戻り値は明示されていません）
- `generatedSoundVisualizer_dispWavs (experimental21/prerenderer.js)`: 生成されたWAVデータを視覚化して表示する関数です。（引数・戻り値は明示されていません）
- `getPeakOfWavs (experimental21/prerenderer.js)`: 複数のWAVデータコレクション全体のピーク値を計算する関数です。（引数・戻り値は明示されていません）
- `getPeakOf1wav (experimental21/prerenderer.js)`: 単一のWAVデータからピーク値を計算する関数です。（引数・戻り値は明示されていません）
- `combineFloat32Array (experimental21/prerenderer.js)`: 複数のFloat32Arrayオーディオデータを結合する関数です。（引数・戻り値は明示されていません）
- `getPeakOfSliced (experimental21/prerenderer.js)`: スライスされた（部分的な）オーディオデータのピーク値を計算する関数です。（引数・戻り値は明示されていません）
- `initSynthCommon (experimental21/synth/synth-poly.js)`: シンセサイザーの共通初期化処理を行う関数です。（引数・戻り値は明示されていません）
- `panpot (experimental21/synth/synth-poly.js)`: 音源のパンポット（左右の定位）を設定する関数です。（引数・戻り値は明示されていません）

## 関数呼び出し階層ツリー
```
- アプリケーション起動とPostmateハンドシェイク
  - registerParent() (postmate-midi.js)
  - registerChild() (postmate-midi.js)
  - doHandshake() (postmate-midi.js)
  - onCompleteHandshakeParent() (postmate-midi.js)
  - onCompleteHandshakeAllChildren() (postmate-midi.js)
    - initTonejsByUserAction() (postmate-midi.js)
      - startTonejs() (postmate-midi.js)
      - afterTonejsStart() (postmate-midi.js)
      - initBaseTimeStampAudioContext() (postmate-midi.js)
    - registerSynth() (postmate-midi.js)
      - initSynthPoly() (synth-poly.js)
      - initSampler() (sampler.js)
      - initSynthSaw() (saw.js)
        - noteOn() (シンセ/サンプラー)
        - noteOff() (シンセ/サンプラー)
        - cutoff() (synth-poly.js)
        - v2mul() (synth-poly.js)
        - panpot() (synth-poly.js)
        - initSynthCommon() (synth-poly.js)
    - onSynthReady() (postmate-midi.js)
    - isSynthReady() (postmate-midi.js)
    - isAllSynthReady() (postmate-midi.js)
    - checkAllSynthReady() (postmate-midi.js)
    - checkAllSynthReadyParent() (postmate-midi.js)
    - registerSeq() (postmate-midi.js)
    - registerGenerator() (postmate-midi.js)
    - registerPrerenderer() (postmate-midi.js)

- MIDIメッセージの送受信と処理
  - sendMidiMessage() (postmate-midi.js, seq.js)
  - sendMidiMessageFromDevice() (postmate-midi.js)
  - onmidimessage() (postmate-midi.js)
    - noteOn() (シンセ/サンプラー)
    - noteOff() (シンセ/サンプラー)
    - midifilter() (midifilter.js)
      - addShiftedNotes() (midifilter.js)
      - getShiftedNote() (midifilter.js)
    - cutoff() (synth-poly.js)
    - allNoteOff() (postmate-midi.js, seq.js)
    - allSoundOff() (postmate-midi.js, seq.js)
    - getMidiEventName() (postmate-midi.js, seq.js)

- シーケンサーの再生
  - seqPlay() (seq.js)
    - init() (seq.js)
    - clearTimeouts() (seq.js)
    - playStep() (seq.js)
      - procNextTime() (seq.js)
      - calcStepTimeMsec() (seq.js)
      - sendNoteOn() (seq.js)
      - sendNoteOff() (seq.js)
      - setupNoteOff() (seq.js)
        - isNoteOn() (seq.js)

- 仮想キーボード/ノブ操作
  - onmousedownOrTouchStart() (keyboard.js, knob.js)
    - getMouseNoteNum() (keyboard.js, knob.js)
    - getKeyboardNoteNum() (keyboard.js, knob.js)
    - sendNoteOn() (keyboard.js)
    - cc74() (knob.js)
  - onmousemoveOrTouchMove() (keyboard.js, knob.js)
    - cc74() (knob.js)
  - onmouseupOrTouchEnd() (keyboard.js)
    - sendNoteOff() (keyboard.js)
    - sendAllNoteOff() (keyboard.js)
    - checkAndSend() (keyboard.js)
  - i2penta() (keyboard.js)
  - getPenta() (keyboard.js)
  - semitone2penta() (keyboard.js)

- オーディオプリレンダリングとファイル操作 (experimental20, 21)
  - registerPrerenderButton() (prerenderer.js)
  - registerWavImportButton() (prerenderer.js)
  - isAutoStartPrerender() (prerenderer.js)
    - autoExecPrerender() (prerenderer.js)
      - onStartPreRender() (prerenderer.js)
      - createPreRenderSeqData() (prerenderer.js)
      - doPreRenderAsync() (prerenderer.js)
        - schedulingPreRender() (prerenderer.js)
        - renderContextAsync() (prerenderer.js)
          - setContextInitSynthAddWav() (prerenderer.js)
      - sendWavAfterHandshakeAllChildrenSub() (prerenderer.js)
      - saveWavByDialog() (prerenderer.js)
        - getWavFileFromFloat32() (postmate-midi.js)
        - openDownloadDialog() (postmate-midi.js)
      - afterWavFileUploadAsync() (prerenderer.js)
        - openDialogForFileUpload() (postmate-midi.js)
        - readFileContentAsync() (postmate-midi.js)
        - getFloat32ArrayFromWavFileAsync() (postmate-midi.js)
        - samplerAddWavs() (prerenderer.js)
        - updateGnWavs() (prerenderer.js)
      - registerGeneratedSoundVisualizer() (prerenderer.js)
        - generatedSoundVisualizer_dispWavs() (prerenderer.js)
          - getWaveform() (prerenderer.js)
          - getPeakOfWavs() (prerenderer.js)
            - getPeakOf1wav() (prerenderer.js)
            - combineFloat32Array() (prerenderer.js)
            - getPeakOfSliced() (prerenderer.js)
          - normalizeWav() (prerenderer.js)
          - getPeakAbs() (prerenderer.js)

- その他ユーティリティ・ヘルパー (主にpostmate-midi.js内の汎用関数)
  - onChangeTextarea()
  - onChangeParentTextarea()
  - isParent()
  - isChild()
  - getParentOrChild()
  - setupDropDownListForTextareaTemplate()
  - onChangeSelect()
  - addOptionToSelect()
  - removeIndent()
  - isIpad()
  - isSmartPhone()
  - visualizeCurrentSound()
  - getInitialInterval()
  - startVisualization()
  - changeVisualization()
  - visualizeGeneratedSound()
  - getMidiOutputIds()
  - getOutputIds()
  - getOutputId()
  - registerPlayButton()
  - removeButton()
  - linkPlayButton()
  - onClickPlayButton()
  - createWav() (sampler.js, generator.js)
  - isPreRenderSynth()
  - isPreRenderSeq()
  - checkWavOk()
  - getChNum() (prerenderer.js)
  - extractNumberFromStr() (prerenderer.js)

---
Generated at: 2025-11-11 07:10:12 JST
