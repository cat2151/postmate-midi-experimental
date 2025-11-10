Last updated: 2025-11-11

# 開発状況生成プロンプト（開発者向け）

## 生成するもの：
- 現在openされているissuesを3行で要約する
- 次の一手の候補を3つlistする
- 次の一手の候補3つそれぞれについて、極力小さく分解して、その最初の小さな一歩を書く

## 生成しないもの：
- 「今日のissue目標」などuserに提案するもの
  - ハルシネーションの温床なので生成しない
- ハルシネーションしそうなものは生成しない（例、無価値なtaskや新issueを勝手に妄想してそれをuserに提案する等）
- プロジェクト構造情報（来訪者向け情報のため、別ファイルで管理）

## 「Agent実行プロンプト」生成ガイドライン：
「Agent実行プロンプト」作成時は以下の要素を必ず含めてください：

### 必須要素
1. **対象ファイル**: 分析/編集する具体的なファイルパス
2. **実行内容**: 具体的な分析や変更内容（「分析してください」ではなく「XXXファイルのYYY機能を分析し、ZZZの観点でmarkdown形式で出力してください」）
3. **確認事項**: 変更前に確認すべき依存関係や制約
4. **期待する出力**: markdown形式での結果や、具体的なファイル変更

### Agent実行プロンプト例

**良い例（上記「必須要素」4項目を含む具体的なプロンプト形式）**:
```
対象ファイル: `.github/workflows/translate-readme.yml`と`.github/workflows/call-translate-readme.yml`

実行内容: 対象ファイルについて、外部プロジェクトから利用する際に必要な設定項目を洗い出し、以下の観点から分析してください：
1) 必須入力パラメータ（target-branch等）
2) 必須シークレット（GEMINI_API_KEY）
3) ファイル配置の前提条件（README.ja.mdの存在）
4) 外部プロジェクトでの利用時に必要な追加設定

確認事項: 作業前に既存のworkflowファイルとの依存関係、および他のREADME関連ファイルとの整合性を確認してください。

期待する出力: 外部プロジェクトがこの`call-translate-readme.yml`を導入する際の手順書をmarkdown形式で生成してください。具体的には：必須パラメータの設定方法、シークレットの登録手順、前提条件の確認項目を含めてください。
```

**避けるべき例**:
- callgraphについて調べてください
- ワークフローを分析してください
- issue-noteの処理フローを確認してください

## 出力フォーマット：
以下のMarkdown形式で出力してください：

```markdown
# Development Status

## 現在のIssues
[以下の形式で3行でオープン中のissuesを要約。issue番号を必ず書く]
- [1行目の説明]
- [2行目の説明]
- [3行目の説明]

## 次の一手候補
1. [候補1のタイトル。issue番号を必ず書く]
   - 最初の小さな一歩: [具体的で実行可能な最初のアクション]
   - Agent実行プロンプト:
     ```
     対象ファイル: [分析/編集する具体的なファイルパス]

     実行内容: [具体的な分析や変更内容を記述]

     確認事項: [変更前に確認すべき依存関係や制約]

     期待する出力: [markdown形式での結果や、具体的なファイル変更の説明]
     ```

2. [候補2のタイトル。issue番号を必ず書く]
   - 最初の小さな一歩: [具体的で実行可能な最初のアクション]
   - Agent実行プロンプト:
     ```
     対象ファイル: [分析/編集する具体的なファイルパス]

     実行内容: [具体的な分析や変更内容を記述]

     確認事項: [変更前に確認すべき依存関係や制約]

     期待する出力: [markdown形式での結果や、具体的なファイル変更の説明]
     ```

3. [候補3のタイトル。issue番号を必ず書く]
   - 最初の小さな一歩: [具体的で実行可能な最初のアクション]
   - Agent実行プロンプト:
     ```
     対象ファイル: [分析/編集する具体的なファイルパス]

     実行内容: [具体的な分析や変更内容を記述]

     確認事項: [変更前に確認すべき依存関係や制約]

     期待する出力: [markdown形式での結果や、具体的なファイル変更の説明]
     ```
```


# 開発状況情報
- 以下の開発状況情報を参考にしてください。
- Issue番号を記載する際は、必ず [Issue #番号](../issue-notes/番号.md) の形式でMarkdownリンクとして記載してください。

## プロジェクトのファイル一覧
- .github/actions-tmp/.github/workflows/call-callgraph.yml
- .github/actions-tmp/.github/workflows/call-daily-project-summary.yml
- .github/actions-tmp/.github/workflows/call-issue-note.yml
- .github/actions-tmp/.github/workflows/call-translate-readme.yml
- .github/actions-tmp/.github/workflows/callgraph.yml
- .github/actions-tmp/.github/workflows/check-recent-human-commit.yml
- .github/actions-tmp/.github/workflows/daily-project-summary.yml
- .github/actions-tmp/.github/workflows/issue-note.yml
- .github/actions-tmp/.github/workflows/translate-readme.yml
- .github/actions-tmp/.github_automation/callgraph/codeql-queries/callgraph.ql
- .github/actions-tmp/.github_automation/callgraph/codeql-queries/codeql-pack.lock.yml
- .github/actions-tmp/.github_automation/callgraph/codeql-queries/qlpack.yml
- .github/actions-tmp/.github_automation/callgraph/config/example.json
- .github/actions-tmp/.github_automation/callgraph/docs/callgraph.md
- .github/actions-tmp/.github_automation/callgraph/presets/callgraph.js
- .github/actions-tmp/.github_automation/callgraph/presets/style.css
- .github/actions-tmp/.github_automation/callgraph/scripts/analyze-codeql.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/callgraph-utils.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/check-codeql-exists.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/check-node-version.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/common-utils.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/copy-commit-results.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/extract-sarif-info.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/find-process-results.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/generate-html-graph.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/generateHTML.cjs
- .github/actions-tmp/.github_automation/check_recent_human_commit/scripts/check-recent-human-commit.cjs
- .github/actions-tmp/.github_automation/project_summary/docs/daily-summary-setup.md
- .github/actions-tmp/.github_automation/project_summary/prompts/development-status-prompt.md
- .github/actions-tmp/.github_automation/project_summary/prompts/project-overview-prompt.md
- .github/actions-tmp/.github_automation/project_summary/scripts/ProjectSummaryCoordinator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/development/DevelopmentStatusGenerator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/development/GitUtils.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/development/IssueTracker.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/generate-project-summary.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/CodeAnalyzer.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectAnalysisOrchestrator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectDataCollector.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectDataFormatter.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectOverviewGenerator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/shared/BaseGenerator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/shared/FileSystemUtils.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/shared/ProjectFileUtils.cjs
- .github/actions-tmp/.github_automation/translate/docs/TRANSLATION_SETUP.md
- .github/actions-tmp/.github_automation/translate/scripts/translate-readme.cjs
- .github/actions-tmp/.gitignore
- .github/actions-tmp/.vscode/settings.json
- .github/actions-tmp/LICENSE
- .github/actions-tmp/README.ja.md
- .github/actions-tmp/README.md
- .github/actions-tmp/_config.yml
- .github/actions-tmp/generated-docs/callgraph.html
- .github/actions-tmp/generated-docs/callgraph.js
- .github/actions-tmp/generated-docs/development-status-generated-prompt.md
- .github/actions-tmp/generated-docs/development-status.md
- .github/actions-tmp/generated-docs/project-overview-generated-prompt.md
- .github/actions-tmp/generated-docs/project-overview.md
- .github/actions-tmp/generated-docs/style.css
- .github/actions-tmp/issue-notes/10.md
- .github/actions-tmp/issue-notes/11.md
- .github/actions-tmp/issue-notes/12.md
- .github/actions-tmp/issue-notes/13.md
- .github/actions-tmp/issue-notes/14.md
- .github/actions-tmp/issue-notes/15.md
- .github/actions-tmp/issue-notes/16.md
- .github/actions-tmp/issue-notes/17.md
- .github/actions-tmp/issue-notes/18.md
- .github/actions-tmp/issue-notes/19.md
- .github/actions-tmp/issue-notes/2.md
- .github/actions-tmp/issue-notes/20.md
- .github/actions-tmp/issue-notes/21.md
- .github/actions-tmp/issue-notes/22.md
- .github/actions-tmp/issue-notes/23.md
- .github/actions-tmp/issue-notes/24.md
- .github/actions-tmp/issue-notes/25.md
- .github/actions-tmp/issue-notes/26.md
- .github/actions-tmp/issue-notes/27.md
- .github/actions-tmp/issue-notes/28.md
- .github/actions-tmp/issue-notes/29.md
- .github/actions-tmp/issue-notes/3.md
- .github/actions-tmp/issue-notes/30.md
- .github/actions-tmp/issue-notes/4.md
- .github/actions-tmp/issue-notes/7.md
- .github/actions-tmp/issue-notes/8.md
- .github/actions-tmp/issue-notes/9.md
- .github/actions-tmp/package-lock.json
- .github/actions-tmp/package.json
- .github/actions-tmp/src/main.js
- .github/workflows/call-daily-project-summary.yml
- .github/workflows/call-issue-note.yml
- .github/workflows/call-translate-readme.yml
- LICENSE
- README.md
- _config.yml
- doc/problems-postmate-midi-solves.md
- doc/roadmap.md
- doc/why-postmate-midi.md
- experimental01/child.html
- experimental01/child.js
- experimental01/index.html
- experimental01/parent.js
- experimental02/child.html
- experimental02/child.js
- experimental02/index.html
- experimental02/parent.js
- experimental03/child.html
- experimental03/child.js
- experimental03/index.html
- experimental03/parent.js
- experimental03/postmate-midi.js
- experimental03/saw.js
- experimental04/child.html
- experimental04/child.js
- experimental04/index.html
- experimental04/parent.js
- experimental04/postmate-midi.js
- experimental04/saw.js
- experimental05/child.html
- experimental05/child.js
- experimental05/index.html
- experimental05/parent.js
- experimental05/postmate-midi.js
- experimental05/saw.js
- experimental05/seq.js
- experimental06/child.html
- experimental06/child.js
- experimental06/index.html
- experimental06/parent.js
- experimental06/poly.js
- experimental06/postmate-midi.js
- experimental06/seq.js
- experimental07/child.html
- experimental07/child.js
- experimental07/index.html
- experimental07/parent.js
- experimental07/postmate-midi.js
- experimental07/saw-poly.js
- experimental07/seq.js
- experimental08/child.html
- experimental08/child.js
- experimental08/index.html
- experimental08/parent.js
- experimental08/postmate-midi.js
- experimental08/saw-poly.js
- experimental08/seq.js
- experimental09/child.html
- experimental09/child.js
- experimental09/index.html
- experimental09/keyboard.js
- experimental09/parent.js
- experimental09/postmate-midi.js
- experimental09/synth-poly.js
- experimental10/index.css
- experimental10/index.html
- experimental10/knob/index.html
- experimental10/knob/knob-child.js
- experimental10/knob/knob.js
- experimental10/postmate-midi.js
- experimental10/seq/index.html
- experimental10/seq/seq-parent.js
- experimental10/seq/seq.js
- experimental10/synth/index.html
- experimental10/synth/synth-child.js
- experimental10/synth/synth-poly.js
- experimental11/index.css
- experimental11/index.html
- experimental11/postmate-midi.js
- experimental11/seq/index.html
- experimental11/seq/seq-parent.js
- experimental11/seq/seq.js
- experimental11/synth/index.html
- experimental11/synth/synth-child.js
- experimental11/synth/synth-poly.js
- experimental12/index.css
- experimental12/index.html
- experimental12/midifilter/index.html
- experimental12/midifilter/midifilter-child.js
- experimental12/midifilter/midifilter.js
- experimental12/postmate-midi.js
- experimental12/seq/index.html
- experimental12/seq/seq-parent.js
- experimental12/seq/seq.js
- experimental12/synth/index.html
- experimental12/synth/synth-child.js
- experimental12/synth/synth-poly.js
- experimental13/index.css
- experimental13/index.html
- experimental13/postmate-midi.js
- experimental13/seq-and-synth-saw/index.html
- experimental13/seq-and-synth-saw/parent-or-child.js
- experimental13/seq-and-synth-saw/seq.js
- experimental13/seq-and-synth-saw/synth-poly.js
- experimental13/seq-and-synth-sine/index.html
- experimental13/seq-and-synth-sine/parent-or-child.js
- experimental13/seq-and-synth-sine/seq.js
- experimental13/seq-and-synth-sine/synth-poly.js
- experimental14/index.css
- experimental14/index.html
- experimental14/parent/index.html
- experimental14/parent/parent.js
- experimental14/postmate-midi.js
- experimental14/seq/index.html
- experimental14/seq/seq-child.js
- experimental14/seq/seq.js
- experimental14/synth/index.html
- experimental14/synth/synth-child.js
- experimental14/synth/synth-poly.js
- experimental15/index.css
- experimental15/index.html
- experimental15/parent/index.html
- experimental15/parent/parent.js
- experimental15/postmate-midi.js
- experimental15/seq1/index.html
- experimental15/seq1/seq-child.js
- experimental15/seq1/seq.js
- experimental15/seq2/index.html
- experimental15/seq2/seq-child.js
- experimental15/seq2/seq.js
- experimental15/synth/index.html
- experimental15/synth/synth-child.js
- experimental15/synth/synth-poly.js
- experimental16/index.css
- experimental16/index.html
- experimental16/parent/index.html
- experimental16/parent/parent.js
- experimental16/postmate-midi.js
- experimental16/sampler/index.html
- experimental16/sampler/sampler-child.js
- experimental16/sampler/sampler.js
- experimental16/seq1/index.html
- experimental16/seq1/seq-child.js
- experimental16/seq1/seq.js
- experimental16/seq2/index.html
- experimental16/seq2/seq-child.js
- experimental16/seq2/seq.js
- experimental17/generator/generator-child.js
- experimental17/generator/generator.js
- experimental17/generator/index.html
- experimental17/index.css
- experimental17/index.html
- experimental17/parent/index.html
- experimental17/parent/parent.js
- experimental17/postmate-midi.js
- experimental17/sampler/index.html
- experimental17/sampler/sampler-child.js
- experimental17/sampler/sampler.js
- experimental17/seq/index.html
- experimental17/seq/seq-child.js
- experimental17/seq/seq.js
- experimental18/index.css
- experimental18/index.html
- experimental18/parent/index.html
- experimental18/parent/parent.js
- experimental18/postmate-midi.js
- experimental18/sampler/index.html
- experimental18/sampler/sampler-child.js
- experimental18/sampler/sampler.js
- experimental18/seq/index.html
- experimental18/seq/seq-child.js
- experimental18/seq/seq.js
- experimental18/synth/index.html
- experimental18/synth/synth-child.js
- experimental18/synth/synth.js
- experimental19/index.css
- experimental19/index.html
- experimental19/parent/index.html
- experimental19/parent/parent.js
- experimental19/postmate-midi.js
- experimental19/sampler/index.html
- experimental19/sampler/sampler-child.js
- experimental19/sampler/sampler.js
- experimental19/seq/index.html
- experimental19/seq/seq-child.js
- experimental19/seq/seq.js
- experimental19/synth/index.html
- experimental19/synth/synth-child.js
- experimental19/synth/synth.js
- experimental20/index.css
- experimental20/index.html
- experimental20/parent/index.html
- experimental20/parent/parent.js
- experimental20/postmate-midi.js
- experimental20/sampler/index.html
- experimental20/sampler/sampler-child.js
- experimental20/sampler/sampler.js
- experimental20/seq1/index.html
- experimental20/seq1/seq-child.js
- experimental20/seq1/seq.js
- experimental20/seq2/index.html
- experimental20/seq2/seq-child.js
- experimental20/seq2/seq.js
- experimental20/synth/index.html
- experimental20/synth/synth-child.js
- experimental20/synth/synth-poly.js
- experimental21/README.md
- experimental21/doc/20と21の比較.md
- experimental21/doc/USAGE.md
- experimental21/doc/課題_セルフサンプリング.md
- experimental21/index.css
- experimental21/index.html
- experimental21/parent/index.html
- experimental21/parent/parent.js
- experimental21/postmate-midi.js
- experimental21/prerenderer.js
- experimental21/sampler/index.html
- experimental21/sampler/sampler-child.js
- experimental21/seq1/index.html
- experimental21/seq1/seq-child.js
- experimental21/seq1/seq.js
- experimental21/seq2/index.html
- experimental21/seq2/seq-child.js
- experimental21/synth/index.html
- experimental21/synth/synth-child.js
- experimental21/synth/synth-poly.js

## 現在のオープンIssues
オープン中のIssueはありません

## ドキュメントで言及されているファイルの内容


## 最近の変更（過去7日間）
### コミット履歴:
8b5172a Update project summaries (overview & development status) [auto]
bd68c5e github-actionsリポジトリの共通ワークフローを導入
ae39008 jekyll settings

### 変更されたファイル:
.github/workflows/call-daily-project-summary.yml
.github/workflows/call-issue-note.yml
.github/workflows/call-translate-readme.yml
.github/workflows/issue-note.yml
README.md
_config.yml
doc/problems-postmate-midi-solves.md
doc/roadmap.md
doc/why-postmate-midi.md
experimental21/README.md
"experimental21/doc/20\343\201\25021\343\201\256\346\257\224\350\274\203.md"
"experimental21/doc/21\343\201\256\343\203\255\343\203\274\343\203\211\343\203\236\343\203\203\343\203\227.md"
"experimental21/doc/\343\203\226\343\203\254\343\202\244\343\203\263\343\202\271\343\203\210\343\203\274\343\203\237\343\203\263\343\202\260.md"
generated-docs/development-status-generated-prompt.md
generated-docs/development-status.md
generated-docs/project-overview-generated-prompt.md
generated-docs/project-overview.md


---
Generated at: 2025-11-11 07:07:43 JST
