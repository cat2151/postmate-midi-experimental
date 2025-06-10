# postmate-midi-experimental

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
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。
- seq + prerenderer + sampler。2つのフレーズをプリレンダリングして2つのwavを生成し、それをsamplerで同時に鳴らすサンプルです。
- 20との違いは、プリレンダリング結果をwav保存できること（ファイル保存ダイアログが自動で2回開きます）、samplerに任意のwavをimportできることです。
