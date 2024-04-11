# postmate-midi-experimental
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

## Experimental1
- [Demo Experimental 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental01/)
- Web MIDI API未実装の環境によっては、postmate実行がされない等の不具合が発生します。それの確認用など。

## Experimental2
- [Demo Experimental2 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental02/)
- Postmate + Tone.js という組み合わせで鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。

## Experimental3
- [Demo Experimental3 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental03/)
- Postmate + Tone.js + 疑似midimessage で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。

## Experimental4
- [Demo Experimental4 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental04/)
- Postmate + Tone.js + 疑似midimessage + 簡易Seq で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。
- Experimental5の土台用。seq部分のみの実装。

## Experimental5
- [Demo Experimental5 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental05/)
- Postmate + Tone.js + 疑似midimessage + 簡易Seq で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。
- Experimental4を土台に、実際に擬似midimessage送受信を実装。

## Experimental6
- [Demo Experimental6 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental06/)
- Postmate + Tone.js + 疑似midimessage + 簡易Seq で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。
- 和音を鳴らせるようにしました。

## Experimental7
- [Demo Experimental7 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental07/)
- Postmate + Tone.js + 疑似midimessage + 簡易Seq で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。
- 簡易的な曲データをJSONで入力できるようにしました。

## Experimental8
- [Demo Experimental8 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental08/)
- Postmate + Tone.js + 疑似midimessage + 簡易Seq で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。
- Experimental7の課題であった発音タイミングのヨレやズレを、シンプル優先の範囲内でできるだけ改善しました。

## Experimental9
- [Demo Experimental9 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental09/)
- Postmate + Tone.js + 疑似midimessage + 簡易仮想MIDIキーボード で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。
- iPadだけはplayボタン必須。それ以外はplayボタンなしで、mouseやtouchで音が鳴ります。

## Experimental10
- [Demo Experimental10 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental10/)
- Postmate + Tone.js + 疑似midimessage + 簡易Seq + 簡易仮想Cutoffツマミ で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。
- knobをmouseやtouchでカットオフ周波数が変化します。

## Experimental11
- [Demo Experimental11 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental11/)
- Postmate + Tone.js + 疑似midimessage + 簡易Seq で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。
- 16chのマルチティンバーシンセです。ch1,2,3が別の音色です。テンプレートで同時発音数12まで確認できます、それ以上もその場でtextareaに書けば確認できるかもしれません。

## Experimental12
- [Demo Experimental12 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental12/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq + 簡易MIDIfilter で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。
- 簡易MIDIfilterをseqとsynthの間に挟み込んで、単音を3和音に変換します。また、parent1つに対してchild2つを接続しています。

## Experimental13
- [Demo Experimental13 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental13/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。
- seq + synth。URL引数次第で、以下の4つそれぞれの動作をするサンプルです。「postMessageを使わないスタンドアロンpage」「parentが、自分と同一pageをchild synthとして呼び出すpage」「URL引数によってparent seqになるpage」「URL引数によってchild synthになるpage」

## Experimental14
- [Demo Experimental14 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental14/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。
- seq + synth。seqがchildで、synthもchildの場合のサンプルです。

## Experimental15
- [Demo Experimental15 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental15/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。
- seq1 + seq2 + synth。複数のseqを同時に鳴らすサンプルです。

## Experimental16
- [Demo Experimental16 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental16/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。
- seq1 + seq2 + sampler。URL指定でsamplerを鳴らすのと、audioをゼロからFloat32Arrayにレンダリングしてsamplerで鳴らすサンプルです。

## Experimental17
- [Demo Experimental17 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental17/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。
- seq + tone generator + sampler。audioをゼロからFloat32Arrayにレンダリングしたものを、別pageのsamplerに通信で転送して鳴らすサンプルです。

## Experimental18
- [Demo Experimental18 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental18/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。
- seq + tone generator + sampler。audioをゼロからFloat32Arrayにレンダリングしたものを、別pageのsamplerに通信で転送して鳴らすサンプルです。
- Tone.jsの演奏そのものをOfflineContextでプリレンダリングするサンプルです。
- Tone.jsのdefault contextをそのままにして、すべてのsynth等のコンストラクタに明示的にcontextを指定する場合のサンプルです。（default contextを変更するサンプルは、切り分けて別途やります）

## Experimental19
- [Demo Experimental19 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental19/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。
- seq + tone generator + sampler。audioをゼロからFloat32Arrayにレンダリングしたものを、別pageのsamplerに通信で転送して鳴らすサンプルです。
- Tone.jsの演奏そのものをOfflineContextでプリレンダリングするサンプルです。
- Tone.jsのdefault contextを書き換える場合のサンプルです。

## Experimental20
- [Demo Experimental20 開発中](https://cat2151.github.io/postmate-midi-experimental/experimental20/)
- Postmate + Tone.js + 疑似MIDImessage + 簡易Seq で鳴ることの確認用。シンプルにとどめます。もしこれ以上機能追加する場合は別dirに切り分けて実施します。
- seq + prerenderer + sampler。2つのフレーズをプリレンダリングして2つのwavを生成し、それをsamplerで同時に鳴らすサンプルです。
- 19との違いは、プリレンダリングするフレーズや音色も、samplerで演奏するフレーズも、ハードコード側からデータ側に移動を進めたことです。
