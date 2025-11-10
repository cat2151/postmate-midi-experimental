Last updated: 2025-11-11


# プロジェクト概要生成プロンプト（来訪者向け）

## 生成するもの：
- projectを3行で要約する
- プロジェクトで使用されている技術スタックをカテゴリ別に整理して説明する
- プロジェクト全体のファイル階層ツリー（ディレクトリ構造を図解）
- プロジェクト全体のファイルそれぞれの説明
- プロジェクト全体の関数それぞれの説明
- プロジェクト全体の関数の呼び出し階層ツリー

## 生成しないもの：
- Issues情報（開発者向け情報のため）
- 次の一手候補（開発者向け情報のため）
- ハルシネーションしそうなもの（例、存在しない機能や計画を勝手に妄想する等）

## 出力フォーマット：
以下のMarkdown形式で出力してください：

```markdown
# Project Overview

## プロジェクト概要
[以下の形式で3行でプロジェクトを要約]
- [1行目の説明]
- [2行目の説明]
- [3行目の説明]

## 技術スタック
[使用している技術をカテゴリ別に整理して説明]
- フロントエンド: [フロントエンド技術とその説明]
- 音楽・オーディオ: [音楽・オーディオ関連技術とその説明]
- 開発ツール: [開発支援ツールとその説明]
- テスト: [テスト関連技術とその説明]
- ビルドツール: [ビルド・パース関連技術とその説明]
- 言語機能: [言語仕様・機能とその説明]
- 自動化・CI/CD: [自動化・継続的統合関連技術とその説明]
- 開発標準: [コード品質・統一ルール関連技術とその説明]

## ファイル階層ツリー
```
[プロジェクトのディレクトリ構造をツリー形式で表現]
```

## ファイル詳細説明
[各ファイルの役割と機能を詳細に説明]

## 関数詳細説明
[各関数の役割、引数、戻り値、機能を詳細に説明]

## 関数呼び出し階層ツリー
```
[関数間の呼び出し関係をツリー形式で表現]
```
```


以下のプロジェクト情報を参考にして要約を生成してください：

## プロジェクト情報
名前: 
説明: # postmate-midi-experimental

## demos
- [MIDIキーボード : マウスドラッグ](https://cat2151.github.io/postmate-midi-experimental/experimental09/)
- [カットオフツマミ : 下のボタンを押したあと数秒待ち、playを押してからknob上でマウスを動かす](https://cat2151.github.io/postmate-midi-experimental/experimental10/)
- [サンプラー : ボタンを押したあとダイアログが出るまで待ち、ダウンロードやskipを2回行い、playを押す](https://cat2151.github.io/postmate-midi-experimental/experimental21/)
- ※うまく動かない場合はリロード

## notes
- postmate-midiとは：
  - シンプルで軽量なライブラリを目指しています
  - MIDI送受信とオーディオ送受信をします
  - ブラウザだけで完結します
  - 複数のwebpageを、postMessageで接続します
  - まだ実験段階であり、破壊的な仕様変更が日々あります
  - 今後experimental30くらいまでいったら、あとexperimentalいくつで本番リリースできるかがわかるかもしれません
- 進め方は：
  - 今後仕様が固まった後は、別リポジトリの postmate-midi を新たに用意してそちらを進めてここをアーカイブする想定で進める。
  - experimentalは、できるだけ鳴ることを維持することを優先する。言い換えると、何年も音が鳴らないまま放置、をできるだけ防止する。ベストエフォート。
- 本番と、このexperimentalの位置付けは：
  - 今後の本番postmate-midiリリース時は、多数のexampleを用意するつもりである。それぞれが、できるだけ鳴ることを維持するつもりである。ベストエフォート。
  - そのリリース後は、もし仕様変更すると作業負荷が大きそうである。なぜならexample多数それぞれに影響がある場合にすべてを修正テストするつもりのためである。
  - そのため、そのリリース前に、当experimentalにおいて、できるだけ想定できる用途を網羅し、仕様を網羅していくことを狙う。

# DEMO & 仕様の網羅用

## 1. Web MIDI
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental01/)
- Web MIDI API未実装の環境によっては、postmate実行がされない等の不具合が発生します。それの確認用など。

## 2. Tone.js
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental02/)
- Postmate + Tone.js という組み合わせで鳴ることの確認用。
- シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。以降のExperimentalも同様です。

## 3. 疑似MIDI
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental03/)
- Postmate + Tone.js + 疑似midimessage で鳴ることの確認用。

## 4. 土台
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental04/)
- Postmate + Tone.js + 疑似midimessage + 簡易Seq で鳴ることの確認用。
- Experimental5の土台用。seq部分のみの実装。

## 5. 送受信
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental05/)
- Postmate + Tone.js + 疑似midimessage + 簡易Seq で鳴ることの確認用。
- Experimental4を土台に、実際に擬似midimessage送受信を実装。

## 6. 和音
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental06/)
- Postmate + Tone.js + 疑似midimessage + 簡易Seq で鳴ることの確認用。
- 和音を鳴らせるようにしました。

## 7. 曲データ
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental07/)
- Postmate + Tone.js + 疑似midimessage + 簡易Seq で鳴ることの確認用。
- 簡易的な曲データをJSONで入力できるようにしました。

## 8. 発音タイミング
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental08/)
- Postmate + Tone.js + 疑似midimessage + 簡易Seq で鳴ることの確認用。
- Experimental7の課題であった発音タイミングのヨレやズレを、シンプル優先の範囲内でできるだけ改善しました。

## 9. MIDIキーボード
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental09/)
- Postmate + Tone.js + 疑似midimessage + 簡易仮想MIDIキーボード で鳴ることの確認用。
- iPadだけはplayボタン必須。それ以外はplayボタンなしで、mouseやtouchで音が鳴ります。

## 10. カットオフツマミ
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental10/)
- Postmate + Tone.js + 疑似midimessage + 簡易Seq + 簡易仮想Cutoffツマミ で鳴ることの確認用。
- knobをmouseやtouchでカットオフ周波数が変化します。

## 11. マルチティンバー
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental11/)
- Postmate + Tone.js + 疑似midimessage + 簡易Seq で鳴ることの確認用。
- 16chのマルチティンバーシンセです。ch1,2,3が別の音色です。テンプレートで同時発音数12まで確認できます、それ以上もその場でtextareaに書けば確認できるかもしれません。

## 12. MIDIフィルター
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental12/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq + 簡易MIDIfilter で鳴ることの確認用。
- 簡易MIDIfilterをseqとsynthの間に挟み込んで、単音を3和音に変換します。また、parent1つに対してchild2つを接続しています。

## 13. URL引数
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental13/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。
- seq + synth。URL引数次第で、以下の4つそれぞれの動作をするサンプルです。「postMessageを使わないスタンドアロンpage」「parentが、自分と同一pageをchild synthとして呼び出すpage」「URL引数によってparent seqになるpage」「URL引数によってchild synthになるpage」

## 14. 複数child
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental14/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。
- seq + synth。seqがchildで、synthもchildの場合のサンプルです。

## 15. 複数seq
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental15/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。
- seq1 + seq2 + synth。複数のseqを同時に鳴らすサンプルです。

## 16. サンプラー
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental16/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。
- seq1 + seq2 + sampler。URL指定でsamplerを鳴らすのと、audioをゼロからFloat32Arrayにレンダリングしてsamplerで鳴らすサンプルです。

## 17. 通信
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental17/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。
- seq + tone generator + sampler。audioをゼロからFloat32Arrayにレンダリングしたものを、別pageのsamplerに通信で転送して鳴らすサンプルです。

## 18. context
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental18/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。
- seq + tone generator + sampler。audioをゼロからFloat32Arrayにレンダリングしたものを、別pageのsamplerに通信で転送して鳴らすサンプルです。
- Tone.jsの演奏そのものをOfflineContextでプリレンダリングするサンプルです。
- Tone.jsのdefault contextをそのままにして、すべてのsynth等のコンストラクタに明示的にcontextを指定する場合のサンプルです。（default contextを変更するサンプルは、切り分けて別途やります）

## 19. default context書き換え
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental19/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。
- seq + tone generator + sampler。audioをゼロからFloat32Arrayにレンダリングしたものを、別pageのsamplerに通信で転送して鳴らすサンプルです。
- Tone.jsの演奏そのものをOfflineContextでプリレンダリングするサンプルです。
- Tone.jsのdefault contextを書き換える場合のサンプルです。

## 20. データ化
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental20/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。
- seq + prerenderer + sampler。2つのフレーズをプリレンダリングして2つのwavを生成し、それをsamplerで同時に鳴らすサンプルです。
- 19との違いは、プリレンダリングするフレーズや音色も、samplerで演奏するフレーズも、ハードコード側からデータ側に移動を進めたことです。

## 21. wav export / import
- [Demo](https://cat2151.github.io/postmate-midi-experimental/experimental21/)
- [README 21](experimental21/README.md)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。
- seq + prerenderer + sampler。2つのフレーズをプリレンダリングして2つのwavを生成し、それをsamplerで同時に鳴らすサンプルです。
- 20との違いは、プリレンダリング結果をwav保存できること（ファイル保存ダイアログが自動で2回開きます）、samplerに任意のwavをimportできることです。

# [編集中 : なぜ作ったか](doc/why-postmate-midi.md)
# [編集中 : 何を解決するか](doc/problems-postmate-midi-solves.md)
# [編集中 : ロードマップ](doc/roadmap.md)


依存関係:
{}

## ファイル階層ツリー
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

## ファイル詳細分析
**experimental01/child.html** (11行, 340バイト)
  - 関数: なし
  - インポート: なし

**experimental01/child.js** (30行, 1048バイト)
  - 関数: onChangeTextarea, onCompleteHandshakeParent, onChangeParent
  - インポート: なし

**experimental01/index.html** (11行, 331バイト)
  - 関数: なし
  - インポート: なし

**experimental01/parent.js** (30行, 1001バイト)
  - 関数: onChangeTextarea
  - インポート: なし

**experimental02/child.html** (12行, 332バイト)
  - 関数: なし
  - インポート: なし

**experimental02/child.js** (48行, 1469バイト)
  - 関数: postmateChild, onChangeTextarea, onCompleteHandshakeParent, onChangeParent, initTonejs, playTonejs
  - インポート: なし

**experimental02/index.html** (12行, 334バイト)
  - 関数: なし
  - インポート: なし

**experimental02/parent.js** (48行, 1426バイト)
  - 関数: postmateParent, onChangeTextarea, initTonejs, playTonejs
  - インポート: なし

**experimental03/child.html** (12行, 390バイト)
  - 関数: なし
  - インポート: なし

**experimental03/child.js** (5行, 114バイト)
  - 関数: なし
  - インポート: ./saw.js

**experimental03/index.html** (13行, 394バイト)
  - 関数: なし
  - インポート: なし

**experimental03/parent.js** (5行, 141バイト)
  - 関数: なし
  - インポート: ./saw.js

**experimental03/postmate-midi.js** (118行, 4033バイト)
  - 関数: onChangeTextarea, onCompleteHandshakeParent, onChangeParent, onmidimessage, function, if, switch
  - インポート: なし

**experimental03/saw.js** (39行, 1087バイト)
  - 関数: initSynthSaw, noteOn, noteOff
  - インポート: tone

**experimental04/child.html** (12行, 390バイト)
  - 関数: なし
  - インポート: なし

**experimental04/child.js** (5行, 114バイト)
  - 関数: なし
  - インポート: ./saw.js

**experimental04/index.html** (13行, 394バイト)
  - 関数: なし
  - インポート: なし

**experimental04/parent.js** (5行, 141バイト)
  - 関数: なし
  - インポート: ./saw.js

**experimental04/postmate-midi.js** (145行, 5047バイト)
  - 関数: onChangeTextarea, onCompleteHandshakeParent, onChangeParent, onmidimessage, function, if, switch
  - インポート: なし

**experimental04/saw.js** (39行, 1087バイト)
  - 関数: initSynthSaw, noteOn, noteOff
  - インポート: tone

**experimental05/child.html** (12行, 390バイト)
  - 関数: なし
  - インポート: なし

**experimental05/child.js** (7行, 136バイト)
  - 関数: なし
  - インポート: ./saw.js

**experimental05/index.html** (13行, 394バイト)
  - 関数: なし
  - インポート: なし

**experimental05/parent.js** (7行, 163バイト)
  - 関数: なし
  - インポート: ./saw.js

**experimental05/postmate-midi.js** (122行, 4201バイト)
  - 関数: onChangeTextarea, onCompleteHandshakeParent, onChangeParent, onmidimessage, function, if, switch
  - インポート: なし

**experimental05/saw.js** (39行, 1087バイト)
  - 関数: initSynthSaw, noteOn, noteOff
  - インポート: tone

**experimental05/seq.js** (64行, 1533バイト)
  - 関数: seqPlay, calcNextTime, calcStepTimeMsec, sendNoteOn, sendNoteOff, sendMidiMessage, if
  - インポート: なし

**experimental06/child.html** (11行, 338バイト)
  - 関数: なし
  - インポート: なし

**experimental06/child.js** (9行, 322バイト)
  - 関数: なし
  - インポート: ./postmate-midi.js, ./seq.js, ./poly.js

**experimental06/index.html** (12行, 342バイト)
  - 関数: なし
  - インポート: なし

**experimental06/parent.js** (9行, 349バイト)
  - 関数: なし
  - インポート: ./postmate-midi.js, ./seq.js, ./poly.js

**experimental06/poly.js** (23行, 596バイト)
  - 関数: initSynthPoly, noteOn, noteOff
  - インポート: tone

**experimental06/postmate-midi.js** (152行, 4803バイト)
  - 関数: onChangeTextarea, onCompleteHandshakeParent, onChangeParent, onmidimessage, createDefaultSynth, function, if, switch
  - インポート: なし

**experimental06/seq.js** (73行, 1727バイト)
  - 関数: seqPlay, init, playStep, calcNextTime, calcStepTimeMsec, sendNoteOn, sendNoteOff, if
  - インポート: なし

**experimental07/child.html** (12行, 394バイト)
  - 関数: なし
  - インポート: なし

**experimental07/child.js** (9行, 358バイト)
  - 関数: なし
  - インポート: ./postmate-midi.js, ./seq.js, ./saw-poly.js

**experimental07/index.html** (13行, 398バイト)
  - 関数: なし
  - インポート: なし

**experimental07/parent.js** (9行, 385バイト)
  - 関数: なし
  - インポート: ./postmate-midi.js, ./seq.js, ./saw-poly.js

**experimental07/postmate-midi.js** (206行, 6982バイト)
  - 関数: onChangeTextarea, onCompleteHandshakeParent, onChangeParent, onmidimessage, setupSelect, onChangeSelect, addOptionToSelect, removeIndent, function, if, for, switch
  - インポート: なし

**experimental07/saw-poly.js** (26行, 710バイト)
  - 関数: initSynth, noteOn, noteOff
  - インポート: tone

**experimental07/seq.js** (122行, 3000バイト)
  - 関数: seqPlay, init, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, calcStepTimeMsec, allNoteOff, if, replace, while
  - インポート: なし

**experimental08/child.html** (12行, 394バイト)
  - 関数: なし
  - インポート: なし

**experimental08/child.js** (12行, 438バイト)
  - 関数: なし
  - インポート: ./postmate-midi.js, ./seq.js, ./saw-poly.js

**experimental08/index.html** (13行, 398バイト)
  - 関数: なし
  - インポート: なし

**experimental08/parent.js** (12行, 466バイト)
  - 関数: なし
  - インポート: ./postmate-midi.js, ./seq.js, ./saw-poly.js

**experimental08/postmate-midi.js** (296行, 10372バイト)
  - 関数: onChangeTextarea, onCompleteHandshakeParent, onChangeParentTextarea, isParent, isChild, getParentOrChild, setupDropDownListForTextareaTemplate, onChangeSelect, addOptionToSelect, removeIndent, initOnStartPlaying, onStartPlaying, sendMidiMessage, onmidimessage, getMidiEventName, allSoundOff, allNoteOff, function, if, for, switch
  - インポート: なし

**experimental08/saw-poly.js** (26行, 754バイト)
  - 関数: initSynth, noteOn, noteOff
  - インポート: tone

**experimental08/seq.js** (146行, 3870バイト)
  - 関数: seqPlay, init, clearTimeouts, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, getMidiEventName, calcStepTimeMsec, allNoteOff, allSoundOff, if, replace, while, for, switch
  - インポート: なし

**experimental09/child.html** (12行, 319バイト)
  - 関数: なし
  - インポート: なし

**experimental09/child.js** (12行, 593バイト)
  - 関数: なし
  - インポート: ./postmate-midi.js, ./keyboard.js, ./synth-poly.js

**experimental09/index.html** (13行, 323バイト)
  - 関数: なし
  - インポート: なし

**experimental09/keyboard.js** (226行, 6577バイト)
  - 関数: onmousedownOrTouchStart, onmousemoveOrTouchMove, onmouseupOrTouchEnd, getMouseNoteNum, getKeyboardNoteNum, i2penta, getPenta, semitone2penta, noteOn, noteOff, allNoteOff, sendNoteOn, sendNoteOff, sendAllNoteOff, checkAndSend, while, switch, if
  - インポート: なし

**experimental09/parent.js** (13行, 648バイト)
  - 関数: なし
  - インポート: ./postmate-midi.js, ./keyboard.js, ./synth-poly.js

**experimental09/postmate-midi.js** (389行, 13786バイト)
  - 関数: onChangeTextarea, onCompleteHandshakeParent, onChangeParentTextarea, isParent, isChild, getParentOrChild, setupDropDownListForTextareaTemplate, onChangeSelect, addOptionToSelect, removeIndent, isIpad, initOnStartPlaying, onStartPlaying, sendMidiMessage, onmidimessage, getMidiEventName, startTonejs, afterTonejsStart, onSynthReady, isSynthReady, isAllSynthReady, checkAllSynthReady, allSoundOff, allNoteOff, function, if, for, switch, while
  - インポート: なし

**experimental09/synth-poly.js** (26行, 744バイト)
  - 関数: initSynth, noteOn, noteOff
  - インポート: tone

**experimental10/index.css** (33行, 766バイト)
  - 関数: なし
  - インポート: なし

**experimental10/index.html** (22行, 964バイト)
  - 関数: なし
  - インポート: なし

**experimental10/knob/index.html** (17行, 515バイト)
  - 関数: なし
  - インポート: なし

**experimental10/knob/knob-child.js** (9行, 451バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./knob.js

**experimental10/knob/knob.js** (72行, 2065バイト)
  - 関数: onmousedownOrTouchStart, onmousemoveOrTouchMove, getMouseNoteNum, getKeyboardNoteNum, cc74
  - インポート: なし

**experimental10/postmate-midi.js** (466行, 17758バイト)
  - 関数: doHandshake, onChangeTextarea, onCompleteHandshakeParent, onChangeParentTextarea, isParent, isChild, getParentOrChild, setupDropDownListForTextareaTemplate, onChangeSelect, addOptionToSelect, removeIndent, isIpad, visualizeCurrentSound, initOnStartPlaying, onStartPlaying, sendMidiMessage, onmidimessage, getMidiEventName, startTonejs, afterTonejsStart, onSynthReady, isSynthReady, isAllSynthReady, checkAllSynthReady, allSoundOff, allNoteOff, function, for, while, if, switch
  - インポート: なし

**experimental10/seq/index.html** (20行, 660バイト)
  - 関数: なし
  - インポート: なし

**experimental10/seq/seq-parent.js** (10行, 564バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./seq.js

**experimental10/seq/seq.js** (146行, 3870バイト)
  - 関数: seqPlay, init, clearTimeouts, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, getMidiEventName, calcStepTimeMsec, allNoteOff, allSoundOff, if, replace, while, for, switch
  - インポート: なし

**experimental10/synth/index.html** (15行, 485バイト)
  - 関数: なし
  - インポート: なし

**experimental10/synth/synth-child.js** (11行, 540バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./synth-poly.js

**experimental10/synth/synth-poly.js** (37行, 1034バイト)
  - 関数: initSynth, noteOn, noteOff, cutoff, v2mul
  - インポート: tone

**experimental11/index.css** (33行, 766バイト)
  - 関数: なし
  - インポート: なし

**experimental11/index.html** (20行, 748バイト)
  - 関数: なし
  - インポート: なし

**experimental11/postmate-midi.js** (507行, 19150バイト)
  - 関数: doHandshake, onChangeTextarea, onCompleteHandshakeParent, onChangeParentTextarea, isParent, isChild, getParentOrChild, setupDropDownListForTextareaTemplate, onChangeSelect, addOptionToSelect, removeIndent, isIpad, isSmartPhone, visualizeCurrentSound, getInitialInterval, startVisualization, changeVisualization, initOnStartPlaying, onStartPlaying, sendMidiMessage, onmidimessage, getMidiEventName, startTonejs, afterTonejsStart, onSynthReady, isSynthReady, isAllSynthReady, checkAllSynthReady, initCh, allSoundOff, allNoteOff, function, for, while, if, switch
  - インポート: なし

**experimental11/seq/index.html** (20行, 660バイト)
  - 関数: なし
  - インポート: なし

**experimental11/seq/seq-parent.js** (10行, 564バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./seq.js

**experimental11/seq/seq.js** (157行, 4266バイト)
  - 関数: seqPlay, init, clearTimeouts, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, getMidiEventName, calcStepTimeMsec, allNoteOff, allSoundOff, if, replace, while, for, switch
  - インポート: なし

**experimental11/synth/index.html** (15行, 485バイト)
  - 関数: なし
  - インポート: なし

**experimental11/synth/synth-child.js** (15行, 789バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./synth-poly.js

**experimental11/synth/synth-poly.js** (37行, 1034バイト)
  - 関数: initSynth, noteOn, noteOff, cutoff, v2mul
  - インポート: tone

**experimental12/index.css** (33行, 766バイト)
  - 関数: なし
  - インポート: なし

**experimental12/index.html** (22行, 1084バイト)
  - 関数: なし
  - インポート: なし

**experimental12/midifilter/index.html** (15行, 496バイト)
  - 関数: なし
  - インポート: なし

**experimental12/midifilter/midifilter-child.js** (10行, 481バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./midifilter.js

**experimental12/midifilter/midifilter.js** (23行, 547バイト)
  - 関数: midifilter, addShiftedNotes, getShiftedNote
  - インポート: なし

**experimental12/postmate-midi.js** (579行, 22151バイト)
  - 関数: doHandshake, onChangeTextarea, getMidiOutputIds, getOutputIds, getOutputId, onCompleteHandshakeParent, onAllSynthReady, onChangeParentTextarea, isParent, isChild, getParentOrChild, setupDropDownListForTextareaTemplate, onChangeSelect, addOptionToSelect, removeIndent, isIpad, isSmartPhone, visualizeCurrentSound, getInitialInterval, startVisualization, changeVisualization, initOnStartPlaying, onStartPlaying, sendMidiMessage, sendMidiMessageFromDevice, onmidimessage, getMidiEventName, startTonejs, afterTonejsStart, isSynthReady, isAllSynthReady, checkAllSynthReady, checkAllSynthReadyParent, initCh, allSoundOff, allNoteOff, function, for, while, if, switch
  - インポート: なし

**experimental12/seq/index.html** (20行, 660バイト)
  - 関数: なし
  - インポート: なし

**experimental12/seq/seq-parent.js** (10行, 568バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./seq.js

**experimental12/seq/seq.js** (157行, 4266バイト)
  - 関数: seqPlay, init, clearTimeouts, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, getMidiEventName, calcStepTimeMsec, allNoteOff, allSoundOff, if, replace, while, for, switch
  - インポート: なし

**experimental12/synth/index.html** (15行, 485バイト)
  - 関数: なし
  - インポート: なし

**experimental12/synth/synth-child.js** (15行, 794バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./synth-poly.js

**experimental12/synth/synth-poly.js** (37行, 1034バイト)
  - 関数: initSynth, noteOn, noteOff, cutoff, v2mul
  - インポート: tone

**experimental13/index.css** (33行, 766バイト)
  - 関数: なし
  - インポート: なし

**experimental13/index.html** (30行, 2021バイト)
  - 関数: なし
  - インポート: なし

**experimental13/postmate-midi.js** (595行, 22602バイト)
  - 関数: doHandshake, onChangeTextarea, getMidiOutputIds, getOutputIds, getOutputId, onCompleteHandshakeParent, onAllSynthReady, onChangeParentTextarea, getParentOrChild, setupDropDownListForTextareaTemplate, onChangeSelect, addOptionToSelect, removeIndent, isIpad, isSmartPhone, visualizeCurrentSound, getInitialInterval, startVisualization, changeVisualization, initOnStartPlaying, onStartPlaying, sendMidiMessage, sendMidiMessageFromDevice, onmidimessage, getMidiEventName, startTonejs, afterTonejsStart, isSynthReady, isAllSynthReady, checkAllSynthReady, checkAllSynthReadyParent, initCh, allSoundOff, allNoteOff, function, for, while, if, switch
  - インポート: なし

**experimental13/seq-and-synth-saw/index.html** (20行, 674バイト)
  - 関数: なし
  - インポート: なし

**experimental13/seq-and-synth-saw/parent-or-child.js** (38行, 1756バイト)
  - 関数: if
  - インポート: ../postmate-midi.js, ./seq.js, ./synth-poly.js

**experimental13/seq-and-synth-saw/seq.js** (149行, 3950バイト)
  - 関数: seqPlay, init, clearTimeouts, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, getMidiEventName, calcStepTimeMsec, allNoteOff, allSoundOff, if, replace, while, for, switch
  - インポート: なし

**experimental13/seq-and-synth-saw/synth-poly.js** (37行, 1034バイト)
  - 関数: initSynth, noteOn, noteOff, cutoff, v2mul
  - インポート: tone

**experimental13/seq-and-synth-sine/index.html** (20行, 674バイト)
  - 関数: なし
  - インポート: なし

**experimental13/seq-and-synth-sine/parent-or-child.js** (38行, 1756バイト)
  - 関数: if
  - インポート: ../postmate-midi.js, ./seq.js, ./synth-poly.js

**experimental13/seq-and-synth-sine/seq.js** (149行, 3950バイト)
  - 関数: seqPlay, init, clearTimeouts, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, getMidiEventName, calcStepTimeMsec, allNoteOff, allSoundOff, if, replace, while, for, switch
  - インポート: なし

**experimental13/seq-and-synth-sine/synth-poly.js** (37行, 1034バイト)
  - 関数: initSynth, noteOn, noteOff, cutoff, v2mul
  - インポート: tone

**experimental14/index.css** (33行, 766バイト)
  - 関数: なし
  - インポート: なし

**experimental14/index.html** (20行, 804バイト)
  - 関数: なし
  - インポート: なし

**experimental14/parent/index.html** (17行, 535バイト)
  - 関数: なし
  - インポート: なし

**experimental14/parent/parent.js** (7行, 384バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js

**experimental14/postmate-midi.js** (596行, 22606バイト)
  - 関数: registerParent, doHandshake, onChangeTextarea, getMidiOutputIds, getOutputIds, getOutputId, registerChild, onCompleteHandshakeParent, onAllSynthReady, onChangeParentTextarea, getParentOrChild, setupDropDownListForTextareaTemplate, onChangeSelect, addOptionToSelect, removeIndent, isIpad, isSmartPhone, visualizeCurrentSound, getInitialInterval, startVisualization, changeVisualization, initOnStartPlaying, onStartPlaying, sendMidiMessage, sendMidiMessageFromDevice, onmidimessage, getMidiEventName, startTonejs, afterTonejsStart, isSynthReady, isAllSynthReady, checkAllSynthReady, checkAllSynthReadyParent, initCh, allSoundOff, allNoteOff, for, while, if, function, switch
  - インポート: なし

**experimental14/seq/index.html** (18行, 605バイト)
  - 関数: なし
  - インポート: なし

**experimental14/seq/seq-child.js** (11行, 574バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./seq.js

**experimental14/seq/seq.js** (149行, 3950バイト)
  - 関数: seqPlay, init, clearTimeouts, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, getMidiEventName, calcStepTimeMsec, allNoteOff, allSoundOff, if, replace, while, for, switch
  - インポート: なし

**experimental14/synth/index.html** (15行, 485バイト)
  - 関数: なし
  - インポート: なし

**experimental14/synth/synth-child.js** (10行, 538バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./synth-poly.js

**experimental14/synth/synth-poly.js** (37行, 1034バイト)
  - 関数: initSynth, noteOn, noteOff, cutoff, v2mul
  - インポート: tone

**experimental15/index.css** (33行, 766バイト)
  - 関数: なし
  - インポート: なし

**experimental15/index.html** (20行, 864バイト)
  - 関数: なし
  - インポート: なし

**experimental15/parent/index.html** (18行, 562バイト)
  - 関数: なし
  - インポート: なし

**experimental15/parent/parent.js** (7行, 384バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js

**experimental15/postmate-midi.js** (632行, 24112バイト)
  - 関数: registerParent, doHandshake, onChangeTextarea, getMidiOutputIds, getOutputIds, getOutputId, registerChild, onCompleteHandshakeParent, onAllSynthReady, onChangeAnyTextarea, getParentOrChild, registerPlayButton, linkPlayButton, onClickPlayButton, setupDropDownListForTextareaTemplate, onChangeSelect, addOptionToSelect, removeIndent, isIpad, isSmartPhone, visualizeCurrentSound, getInitialInterval, startVisualization, changeVisualization, registerSeq, initOnStartPlaying, onStartPlaying, sendMidiMessage, sendMidiMessageFromDevice, onmidimessage, getMidiEventName, initTonejsByUserAction, startTonejs, afterTonejsStart, isSynthReady, isAllSynthReady, checkAllSynthReady, checkAllSynthReadyParent, initBaseTimeStampAudioContext, initCh, allSoundOff, allNoteOff, for, while, if, function, switch
  - インポート: なし

**experimental15/seq1/index.html** (18行, 605バイト)
  - 関数: なし
  - インポート: なし

**experimental15/seq1/seq-child.js** (11行, 574バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./seq.js

**experimental15/seq1/seq.js** (145行, 3893バイト)
  - 関数: seqPlay, init, clearTimeouts, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, getMidiEventName, calcStepTimeMsec, allNoteOff, allSoundOff, if, replace, while, for, switch
  - インポート: なし

**experimental15/seq2/index.html** (18行, 605バイト)
  - 関数: なし
  - インポート: なし

**experimental15/seq2/seq-child.js** (11行, 574バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./seq.js

**experimental15/seq2/seq.js** (146行, 3949バイト)
  - 関数: seqPlay, init, clearTimeouts, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, getMidiEventName, calcStepTimeMsec, allNoteOff, allSoundOff, if, replace, while, for, switch
  - インポート: なし

**experimental15/synth/index.html** (15行, 485バイト)
  - 関数: なし
  - インポート: なし

**experimental15/synth/synth-child.js** (11行, 602バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./synth-poly.js

**experimental15/synth/synth-poly.js** (37行, 1034バイト)
  - 関数: initSynth, noteOn, noteOff, cutoff, v2mul
  - インポート: tone

**experimental16/index.css** (33行, 766バイト)
  - 関数: なし
  - インポート: なし

**experimental16/index.html** (20行, 870バイト)
  - 関数: なし
  - インポート: なし

**experimental16/parent/index.html** (18行, 562バイト)
  - 関数: なし
  - インポート: なし

**experimental16/parent/parent.js** (7行, 384バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js

**experimental16/postmate-midi.js** (632行, 24112バイト)
  - 関数: registerParent, doHandshake, onChangeTextarea, getMidiOutputIds, getOutputIds, getOutputId, registerChild, onCompleteHandshakeParent, onAllSynthReady, onChangeAnyTextarea, getParentOrChild, registerPlayButton, linkPlayButton, onClickPlayButton, setupDropDownListForTextareaTemplate, onChangeSelect, addOptionToSelect, removeIndent, isIpad, isSmartPhone, visualizeCurrentSound, getInitialInterval, startVisualization, changeVisualization, registerSeq, initOnStartPlaying, onStartPlaying, sendMidiMessage, sendMidiMessageFromDevice, onmidimessage, getMidiEventName, initTonejsByUserAction, startTonejs, afterTonejsStart, isSynthReady, isAllSynthReady, checkAllSynthReady, checkAllSynthReadyParent, initBaseTimeStampAudioContext, initCh, allSoundOff, allNoteOff, for, while, if, function, switch
  - インポート: なし

**experimental16/sampler/index.html** (15行, 489バイト)
  - 関数: なし
  - インポート: なし

**experimental16/sampler/sampler-child.js** (15行, 879バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./sampler.js

**experimental16/sampler/sampler.js** (46行, 1385バイト)
  - 関数: initSampler, noteOn, noteOff, createWav, if, for
  - インポート: tone

**experimental16/seq1/index.html** (18行, 605バイト)
  - 関数: なし
  - インポート: なし

**experimental16/seq1/seq-child.js** (11行, 574バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./seq.js

**experimental16/seq1/seq.js** (145行, 3893バイト)
  - 関数: seqPlay, init, clearTimeouts, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, getMidiEventName, calcStepTimeMsec, allNoteOff, allSoundOff, if, replace, while, for, switch
  - インポート: なし

**experimental16/seq2/index.html** (18行, 605バイト)
  - 関数: なし
  - インポート: なし

**experimental16/seq2/seq-child.js** (11行, 574バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./seq.js

**experimental16/seq2/seq.js** (146行, 3949バイト)
  - 関数: seqPlay, init, clearTimeouts, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, getMidiEventName, calcStepTimeMsec, allNoteOff, allSoundOff, if, replace, while, for, switch
  - インポート: なし

**experimental17/generator/generator-child.js** (11行, 510バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./generator.js

**experimental17/generator/generator.js** (19行, 711バイト)
  - 関数: createWav, for
  - インポート: tone

**experimental17/generator/index.html** (15行, 479バイト)
  - 関数: なし
  - インポート: なし

**experimental17/index.css** (33行, 766バイト)
  - 関数: なし
  - インポート: なし

**experimental17/index.html** (21行, 968バイト)
  - 関数: なし
  - インポート: なし

**experimental17/parent/index.html** (18行, 562バイト)
  - 関数: なし
  - インポート: なし

**experimental17/parent/parent.js** (7行, 384バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js

**experimental17/postmate-midi.js** (735行, 28385バイト)
  - 関数: registerParent, doHandshake, onChangeTextarea, getMidiOutputIds, getOutputIds, getOutputId, registerChild, onCompleteHandshakeParent, onCompleteHandshakeAllChildren, onAllSynthReady, onChangeAnyTextarea, getParentOrChild, registerPlayButton, linkPlayButton, onClickPlayButton, setupDropDownListForTextareaTemplate, onChangeSelect, addOptionToSelect, removeIndent, isIpad, isSmartPhone, visualizeCurrentSound, getInitialInterval, startVisualization, changeVisualization, visualizeGeneratedSound, registerSeq, initOnStartPlaying, onStartPlaying, sendMidiMessage, sendMidiMessageFromDevice, onmidimessage, getMidiEventName, initTonejsByUserAction, startTonejs, afterTonejsStart, isSynthReady, isAllSynthReady, checkAllSynthReady, checkAllSynthReadyParent, initBaseTimeStampAudioContext, initCh, allSoundOff, allNoteOff, registerGenerator, sendWavAfterHandshakeAllChildren, sendToSamplerFromDevice, sendToSampler, for, while, if, function, switch
  - インポート: なし

**experimental17/sampler/index.html** (15行, 489バイト)
  - 関数: なし
  - インポート: なし

**experimental17/sampler/sampler-child.js** (11行, 528バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./sampler.js

**experimental17/sampler/sampler.js** (28行, 734バイト)
  - 関数: initSampler, noteOn, noteOff, if
  - インポート: tone

**experimental17/seq/index.html** (18行, 588バイト)
  - 関数: なし
  - インポート: なし

**experimental17/seq/seq-child.js** (11行, 564バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./seq.js

**experimental17/seq/seq.js** (145行, 3749バイト)
  - 関数: seqPlay, init, clearTimeouts, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, getMidiEventName, calcStepTimeMsec, allNoteOff, allSoundOff, if, replace, while, for, switch
  - インポート: なし

**experimental18/index.css** (33行, 766バイト)
  - 関数: なし
  - インポート: なし

**experimental18/index.html** (21行, 964バイト)
  - 関数: なし
  - インポート: なし

**experimental18/parent/index.html** (18行, 562バイト)
  - 関数: なし
  - インポート: なし

**experimental18/parent/parent.js** (7行, 384バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js

**experimental18/postmate-midi.js** (762行, 29591バイト)
  - 関数: registerParent, doHandshake, onChangeTextarea, getMidiOutputIds, getOutputIds, getOutputId, registerChild, onCompleteHandshakeParent, onCompleteHandshakeAllChildren, onAllSynthReady, onChangeAnyTextarea, getParentOrChild, registerPlayButton, linkPlayButton, onClickPlayButton, setupDropDownListForTextareaTemplate, onChangeSelect, addOptionToSelect, removeIndent, isIpad, isSmartPhone, visualizeCurrentSound, getInitialInterval, startVisualization, changeVisualization, visualizeGeneratedSound, registerSeq, initOnStartPlaying, onStartPlaying, sendMidiMessage, sendMidiMessageFromDevice, onmidimessage, getMidiEventName, initTonejsByUserAction, startTonejs, afterTonejsStart, isSynthReady, isAllSynthReady, checkAllSynthReady, checkAllSynthReadyParent, initBaseTimeStampAudioContext, initCh, allSoundOff, allNoteOff, registerGenerator, sendWavAfterHandshakeAllChildren, renderContextAsync, sendWavAfterHandshakeAllChildrenSub, sendToSamplerFromDevice, sendToSampler, for, while, if, function, switch
  - インポート: なし

**experimental18/sampler/index.html** (15行, 489バイト)
  - 関数: なし
  - インポート: なし

**experimental18/sampler/sampler-child.js** (11行, 528バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./sampler.js

**experimental18/sampler/sampler.js** (28行, 734バイト)
  - 関数: initSampler, noteOn, noteOff, if
  - インポート: tone

**experimental18/seq/index.html** (18行, 588バイト)
  - 関数: なし
  - インポート: なし

**experimental18/seq/seq-child.js** (11行, 564バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./seq.js

**experimental18/seq/seq.js** (145行, 3749バイト)
  - 関数: seqPlay, init, clearTimeouts, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, getMidiEventName, calcStepTimeMsec, allNoteOff, allSoundOff, if, replace, while, for, switch
  - インポート: なし

**experimental18/synth/index.html** (15行, 475バイト)
  - 関数: なし
  - インポート: なし

**experimental18/synth/synth-child.js** (11行, 506バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./synth.js

**experimental18/synth/synth.js** (25行, 916バイト)
  - 関数: setupTonejsPreRenderer
  - インポート: tone

**experimental19/index.css** (33行, 766バイト)
  - 関数: なし
  - インポート: なし

**experimental19/index.html** (21行, 964バイト)
  - 関数: なし
  - インポート: なし

**experimental19/parent/index.html** (18行, 562バイト)
  - 関数: なし
  - インポート: なし

**experimental19/parent/parent.js** (7行, 384バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js

**experimental19/postmate-midi.js** (764行, 29613バイト)
  - 関数: registerParent, doHandshake, onChangeTextarea, getMidiOutputIds, getOutputIds, getOutputId, registerChild, onCompleteHandshakeParent, onCompleteHandshakeAllChildren, onAllSynthReady, onChangeAnyTextarea, getParentOrChild, registerPlayButton, linkPlayButton, onClickPlayButton, setupDropDownListForTextareaTemplate, onChangeSelect, addOptionToSelect, removeIndent, isIpad, isSmartPhone, visualizeCurrentSound, getInitialInterval, startVisualization, changeVisualization, visualizeGeneratedSound, registerSeq, initOnStartPlaying, onStartPlaying, sendMidiMessage, sendMidiMessageFromDevice, onmidimessage, getMidiEventName, initTonejsByUserAction, startTonejs, afterTonejsStart, isSynthReady, isAllSynthReady, checkAllSynthReady, checkAllSynthReadyParent, initBaseTimeStampAudioContext, initCh, allSoundOff, allNoteOff, registerGenerator, sendWavAfterHandshakeAllChildren, renderContextAsync, sendWavAfterHandshakeAllChildrenSub, sendToSamplerFromDevice, sendToSampler, for, while, if, function, switch
  - インポート: なし

**experimental19/sampler/index.html** (15行, 489バイト)
  - 関数: なし
  - インポート: なし

**experimental19/sampler/sampler-child.js** (11行, 528バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./sampler.js

**experimental19/sampler/sampler.js** (28行, 734バイト)
  - 関数: initSampler, noteOn, noteOff, if
  - インポート: tone

**experimental19/seq/index.html** (18行, 588バイト)
  - 関数: なし
  - インポート: なし

**experimental19/seq/seq-child.js** (11行, 564バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./seq.js

**experimental19/seq/seq.js** (145行, 3749バイト)
  - 関数: seqPlay, init, clearTimeouts, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, getMidiEventName, calcStepTimeMsec, allNoteOff, allSoundOff, if, replace, while, for, switch
  - インポート: なし

**experimental19/synth/index.html** (15行, 475バイト)
  - 関数: なし
  - インポート: なし

**experimental19/synth/synth-child.js** (11行, 506バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./synth.js

**experimental19/synth/synth.js** (25行, 866バイト)
  - 関数: setupTonejsPreRenderer
  - インポート: tone

**experimental20/index.css** (33行, 766バイト)
  - 関数: なし
  - インポート: なし

**experimental20/index.html** (21行, 1019バイト)
  - 関数: なし
  - インポート: なし

**experimental20/parent/index.html** (19行, 589バイト)
  - 関数: なし
  - インポート: なし

**experimental20/parent/parent.js** (7行, 384バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js

**experimental20/postmate-midi.js** (888行, 35043バイト)
  - 関数: registerParent, doHandshake, onChangeTextarea, getMidiOutputIds, getOutputIds, getOutputId, registerChild, onCompleteHandshakeParent, onCompleteHandshakeAllChildren, onAllSynthReady, onChangeAnyTextarea, getParentOrChild, registerPlayButton, linkPlayButton, onClickPlayButton, setupDropDownListForTextareaTemplate, onChangeSelect, addOptionToSelect, removeIndent, isIpad, isSmartPhone, visualizeCurrentSound, getInitialInterval, startVisualization, changeVisualization, visualizeGeneratedSound, getWaveform, getPeakWav, normalizeWav, getPeakAbs, registerSeq, initOnStartPlaying, onStartPlaying, sendMidiMessage, sendMidiMessageFromDevice, onmidimessage, getMidiEventName, initTonejsByUserAction, startTonejs, afterTonejsStart, isSynthReady, isAllSynthReady, checkAllSynthReady, checkAllSynthReadyParent, initBaseTimeStampAudioContext, initCh, allSoundOff, allNoteOff, registerGenerator, sendWavAfterHandshakeAllChildren, isPreRenderSynth, onStartPreRender, isPreRenderSeq, onCompletePreRenderSeq, doPreRenderAsync, schedulingPreRender, renderContextAsync, sendWavAfterHandshakeAllChildrenSub, sendToSamplerFromDevice, sendToSampler, for, while, if, function, switch
  - インポート: なし

**experimental20/sampler/index.html** (15行, 489バイト)
  - 関数: なし
  - インポート: なし

**experimental20/sampler/sampler-child.js** (12行, 585バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./sampler.js

**experimental20/sampler/sampler.js** (28行, 734バイト)
  - 関数: initSampler, noteOn, noteOff, if
  - インポート: tone

**experimental20/seq1/index.html** (18行, 599バイト)
  - 関数: なし
  - インポート: なし

**experimental20/seq1/seq-child.js** (30行, 1066バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./seq.js

**experimental20/seq1/seq.js** (173行, 4495バイト)
  - 関数: seqPlay, init, clearTimeouts, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, getMidiEventName, calcStepTimeMsec, allNoteOff, allSoundOff, if, replace, while, for, switch
  - インポート: なし

**experimental20/seq2/index.html** (18行, 597バイト)
  - 関数: なし
  - インポート: なし

**experimental20/seq2/seq-child.js** (27行, 930バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ./seq.js

**experimental20/seq2/seq.js** (173行, 4495バイト)
  - 関数: seqPlay, init, clearTimeouts, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, getMidiEventName, calcStepTimeMsec, allNoteOff, allSoundOff, if, replace, while, for, switch
  - インポート: なし

**experimental20/synth/index.html** (15行, 475バイト)
  - 関数: なし
  - インポート: なし

**experimental20/synth/synth-child.js** (13行, 655バイト)
  - 関数: function
  - インポート: ../postmate-midi.js, ./synth-poly.js

**experimental20/synth/synth-poly.js** (38行, 1122バイト)
  - 関数: initSynth, noteOn, noteOff, cutoff, v2mul
  - インポート: tone

**experimental21/index.css** (33行, 766バイト)
  - 関数: なし
  - インポート: なし

**experimental21/index.html** (21行, 1027バイト)
  - 関数: なし
  - インポート: なし

**experimental21/parent/index.html** (19行, 589バイト)
  - 関数: なし
  - インポート: なし

**experimental21/parent/parent.js** (7行, 384バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js

**experimental21/postmate-midi.js** (903行, 36002バイト)
  - 関数: registerParent, doHandshake, onChangeTextarea, getMidiOutputIds, getOutputIds, getOutputId, registerChild, onCompleteHandshakeParent, onCompleteHandshakeAllChildren, onAllSynthReady, onChangeAnyTextarea, getParentOrChild, registerPlayButton, removeButton, linkPlayButton, onClickPlayButton, setupDropDownListForTextareaTemplate, onChangeSelect, addOptionToSelect, removeIndent, registerPrerenderButton, registerWavImportButton, openDialogForFileUpload, readFileContentAsync, getFloat32ArrayFromWavFileAsync, isIpad, isSmartPhone, visualizeCurrentSound, getInitialInterval, startVisualization, changeVisualization, registerGeneratedSoundVisualizer, getPeakAbs, registerSeq, initOnStartPlaying, onStartPlaying, sendMidiMessage, sendMidiMessageFromDevice, onmidimessage, getMidiEventName, registerSynth, initTonejsByUserAction, startTonejs, afterTonejsStart, isSynthReady, isAllSynthReady, checkAllSynthReady, checkAllSynthReadyParent, initBaseTimeStampAudioContext, initCh, allSoundOff, allNoteOff, registerPrerenderer, onStartPreRender, isPreRenderSeq, onCompletePreRenderSeq, schedulingPreRender, renderContextAsync, setContextInitSynthAddWav, sendWavAfterHandshakeAllChildrenSub, saveWavByDialog, getWavFileFromFloat32, openDownloadDialog, sendToSamplerFromDevice, sendToSampler, updateGnWavs, samplerAddWavs, checkWavOk, for, while, if, function, switch
  - インポート: なし

**experimental21/prerenderer.js** (416行, 19582バイト)
  - 関数: isAutoStartPrerender, registerPrerenderButton, registerWavImportButton, onCompleteHandshakeAllChildren, autoExecPrerender, onStartPreRender, createPreRenderSeqData, doPreRenderAsync, schedulingPreRender, renderContextAsync, setContextInitSynthAddWav, sendWavAfterHandshakeAllChildrenSub, saveWavByDialog, sendToSampler, updateGnWavs, samplerAddWavs, afterWavFileUploadAsync, getChNum, extractNumberFromStr, registerGeneratedSoundVisualizer, generatedSoundVisualizer_dispWavs, getWaveform, getPeakOfWavs, getPeakOf1wav, combineFloat32Array, getPeakOfSliced, normalizeWav, function, if, for
  - インポート: なし

**experimental21/sampler/index.html** (17行, 580バイト)
  - 関数: なし
  - インポート: なし

**experimental21/sampler/sampler-child.js** (23行, 1109バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ../prerenderer.js, ../synth/synth-poly.js

**experimental21/seq1/index.html** (18行, 599バイト)
  - 関数: なし
  - インポート: なし

**experimental21/seq1/seq-child.js** (34行, 1186バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ../prerenderer.js, ./seq.js

**experimental21/seq1/seq.js** (176行, 4660バイト)
  - 関数: seqPlay, init, clearTimeouts, playStep, setupNoteOff, noteOff, isNoteOn, procNextTime, getMidiEventName, calcStepTimeMsec, allNoteOff, allSoundOff, if, replace, while, for, switch
  - インポート: なし

**experimental21/seq2/index.html** (18行, 597バイト)
  - 関数: なし
  - インポート: なし

**experimental21/seq2/seq-child.js** (30行, 1107バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ../prerenderer.js, ../seq1/seq.js

**experimental21/synth/index.html** (15行, 475バイト)
  - 関数: なし
  - インポート: なし

**experimental21/synth/synth-child.js** (18行, 820バイト)
  - 関数: なし
  - インポート: ../postmate-midi.js, ../prerenderer.js, ./synth-poly.js

**experimental21/synth/synth-poly.js** (103行, 3138バイト)
  - 関数: initSynth, initSynthPoly, initSampler, initSynthCommon, noteOn, noteOff, cutoff, v2mul, panpot, for, switch, if, function
  - インポート: tone

## 関数呼び出し階層
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


## プロジェクト構造（ファイル一覧）
README.md
doc/problems-postmate-midi-solves.md
doc/roadmap.md
doc/why-postmate-midi.md
experimental01/child.html
experimental01/child.js
experimental01/index.html
experimental01/parent.js
experimental02/child.html
experimental02/child.js
experimental02/index.html
experimental02/parent.js
experimental03/child.html
experimental03/child.js
experimental03/index.html
experimental03/parent.js
experimental03/postmate-midi.js
experimental03/saw.js
experimental04/child.html
experimental04/child.js
experimental04/index.html
experimental04/parent.js
experimental04/postmate-midi.js
experimental04/saw.js
experimental05/child.html
experimental05/child.js
experimental05/index.html
experimental05/parent.js
experimental05/postmate-midi.js
experimental05/saw.js
experimental06/child.html
experimental07/child.html
experimental08/child.html
experimental09/child.html
experimental10/index.css
experimental11/index.css
experimental12/index.css
experimental13/index.css
experimental14/index.css
experimental15/index.css
experimental16/index.css
experimental17/generator/generator-child.js
experimental17/index.css
experimental18/index.css
experimental19/index.css
experimental20/index.css
experimental21/README.md

上記の情報を基に、プロンプトで指定された形式でプロジェクト概要を生成してください。
特に以下の点を重視してください：
- 技術スタックは各カテゴリごとに整理して説明
- ファイル階層ツリーは提供された構造をそのまま使用
- ファイルの説明は各ファイルの実際の内容と機能に基づく
- 関数の説明は実際に検出された関数の役割に基づく
- 関数呼び出し階層は実際の呼び出し関係に基づく


---
Generated at: 2025-11-11 07:07:50 JST
