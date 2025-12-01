Last updated: 2025-12-02

# Development Status

## 現在のIssues
オープン中のIssueはありません。

## 次の一手候補
1. [新規タスク] `experimental`ディレクトリの整理と`postmate-midi.js`のライブラリ化
   - 最初の小さな一歩: `experimental21/postmate-midi.js` を中心に、これまでの`experimental`ディレクトリ群での改善点を抽出し、コア機能とUI/ユーティリティの分離方針を検討する。
   - Agent実行プロンプト:
     ```
     対象ファイル:
     - `experimental03/postmate-midi.js`
     - `experimental04/postmate-midi.js`
     - `experimental05/postmate-midi.js`
     - `experimental06/postmate-midi.js`
     - `experimental07/postmate-midi.js`
     - `experimental08/postmate-midi.js`
     - `experimental09/postmate-midi.js`
     - `experimental10/postmate-midi.js`
     - `experimental11/postmate-midi.js`
     - `experimental12/postmate-midi.js`
     - `experimental13/postmate-midi.js`
     - `experimental14/postmate-midi.js`
     - `experimental15/postmate-midi.js`
     - `experimental16/postmate-midi.js`
     - `experimental17/postmate-midi.js`
     - `experimental18/postmate-midi.js`
     - `experimental19/postmate-midi.js`
     - `experimental20/postmate-midi.js`
     - `experimental21/postmate-midi.js`
     - `doc/roadmap.md`

     実行内容: `experimental`ディレクトリ内の各`postmate-midi.js`ファイル間の機能進化を比較分析し、Postmate MIDIライブラリのコア機能として残すべき要素と、分離または廃止すべき実験的機能を特定してください。その上で、今後のライブラリ構造に関する提案をmarkdown形式で出力してください。

     確認事項: `postmate-midi.js`が担当する役割（Postmateによるiframe間通信、Web MIDI APIラッパーなど）を明確にし、不必要な機能の重複や複雑化を避けることを考慮してください。また、`doc/roadmap.md`に記載されている長期的な目標と整合しているかを確認してください。

     期待する出力:
     - `postmate-midi.js`の主要機能の進化履歴と現状の課題点。
     - コアライブラリとして必要な機能のリストとその理由。
     - 提案されるライブラリ構造（例: `src/core/postmate-midi.js`, `src/modules/synth.js`など）。
     - 整理・統合のロードマップ案をmarkdown形式で出力してください。
     ```

2. [新規タスク] Postmate MIDIコア機能の単体テスト導入
   - 最初の小さな一歩: `experimental21/postmate-midi.js`の基本的なMIDIメッセージ送受信機能（`onMidiMessage`, `sendMidiMessage`など）を対象に、軽量なテストフレームワーク（例: Jest）を導入し、最初のテストケースを作成する。
   - Agent実行プロンプト:
     ```
     対象ファイル:
     - `experimental21/postmate-midi.js`
     - `package.json` (プロジェクトルートのものが存在しない場合は新規作成)

     実行内容: `experimental21/postmate-midi.js`の主要なMIDI通信機能を対象に、Jestを使用した単体テスト環境をセットアップし、最低2つのテストケースを実装してください。具体的には、`postmate-midi.js`がMIDIメッセージを適切に送受信できるかを確認するテストを記述してください。

     確認事項: テスト環境のセットアップが既存のプロジェクト構成に与える影響が最小限であることを確認してください。また、テストがブラウザ環境なしで実行可能であるか、あるいはMockを使用して対応可能か検討してください。

     期待する出力:
     - `package.json`にJestの依存関係とテストスクリプトが追加された内容。
     - `experimental21/postmate-midi.test.js`のようなテストファイルが新規作成され、`onMidiMessage`や`sendMidiMessage`をテストするコードが記述された内容。
     - Jestコマンドの実行方法と、その実行結果（成功/失敗）のスクリーンショット（またはテキスト出力）をmarkdown形式で出力してください。
     ```

3. [新規タスク] 開発状況レポート生成プロンプトの改善
   - 最初の小さな一歩: 現在の`development-status-prompt.md`が、オープンなIssueがない場合でも有益な「次の一手候補」を生成できるよう、具体例やヒントを追加する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `.github/actions-tmp/.github_automation/project_summary/prompts/development-status-prompt.md`

     実行内容: 現在の`development-status-prompt.md`をレビューし、「次の一手候補」がオープンなIssueに依存しない、より汎用的でプロジェクトの健全な進捗を促す内容になるように改善してください。特に、現在の開発フェーズ（実験段階からライブラリ化へ）を考慮し、コード品質、ドキュメント、テスト、リファクタリングなどに関する候補を導き出しやすくする指示を追加してください。

     確認事項: プロンプトの変更がハルシネーションの増加につながらないよう、具体的な指示や制約を明記してください。また、現在の「生成しないもの」のルールは維持してください。

     期待する出力:
     - 改善された`development-status-prompt.md`の全文をmarkdown形式で出力してください。
     - 変更点の概要と、なぜその変更が有益であるかを説明した短い要約を追記してください。

---
Generated at: 2025-12-02 07:07:16 JST
