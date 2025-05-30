## ChronoLog 拡張機能 仕様書 (案)

### 1. 概要

- **名称:** VS Code ChronoLog
- **目的:** 独自形式「ChronoLog (`.clog`)」で記述された時系列メモを VS Code 上で効率的に扱い、その内容をタイムラインとグラフで可視化する拡張機能。
- **ターゲットユーザー:** 調査記録、研究ノート、プロジェクトログ、思考メモなどを時系列で管理したい VS Code ユーザー。
- **開発言語:** TypeScript

### 2. ファイル形式: ChronoLog (`.clog`)

Chronologの書き方・ファイル仕様については [docs/clog-format-specification.md](./clog-format-specification.md) を参照してください。

### 3. 機能要件

1.  **エディタ連携:**
    - 入力エディタには[Lexical](https://lexical.dev/)ベースのリッチテキストエディタを利用。
    - `.clog` ファイルに対するシンタックスハイライト (メタデータ、グラフ定義、コメントなどを色分け)。
    - コマンドパレット (`Ctrl+Shift+P`) から `ChronoLog: Preview` コマンドを実行、またはエディタ右上のアイコンクリックでプレビューパネルを開閉。
    - (将来) `@time:` の自動挿入や、メモテンプレートのスニペット提供。
2.  **プレビュー機能 (Webview):**
    - 現在アクティブな `.clog` ファイルの内容を解析し、プレビュー表示。
    - ファイルの変更（保存時）を検知し、プレビューを自動更新。
    - **タイムライン表示:**
      - 垂直タイムライン形式（最新が上、古いものが下）。
      - 各メモをノード（円やカード）で表現。ノードには時刻、トピック名の一部などを表示。
      - ノードのホバー/クリックで、メモの全文、メタデータ（リンク含む）をポップアップや別パネルに表示。
      - 表示する時間範囲の調整機能（任意）。
    - **グラフ表示:**
      - ファイル内のグラフ構造定義 (`[A] -> [B]: label`) を解析。
      - ノードと、関係性を示すラベル付きのエッジ（線）を描画。
      - タイムライン上のノードとグラフ上のノードを連動させる（例: クリックでハイライト）。
      - グラフのレイアウトアルゴリズムを選択可能にする（任意）。
    - **インタラクション:**
      - プレビュー内の `@link:` をクリックしてブラウザや関連ファイルを開く。
      - (将来) プレビュー上のノードから、エディタの対応するメモ箇所へジャンプ。
      - (将来) メモ内容のキーワード検索機能。
      - (将来) トピック、タグ、期間によるメモのフィルタリング機能。
3.  **設定:**
    - (将来) プレビューの外観（色、ノードサイズ、タイムライン密度など）に関する設定項目。
    - (将来) 時刻の自動挿入フォーマットやデフォルトトピックなどの設定。

### 4. 技術仕様

- **開発言語:** TypeScript
- **プラットフォーム:** VS Code Extension API
- **プレビュー (Webview):**
  - HTML / CSS / TypeScript (JavaScript)
  - **UI フレームワーク (推奨):** React, Vue, Svelte など
  - **グラフ可視化ライブラリ (必須):** `vis-network`, `Mermaid`, `D3.js` などを検討。メモ間の関連性描画に使用。
  - **タイムライン UI:** 自作、または `vis-timeline` (vis-network と同じシリーズ) や他のライブラリを活用。
- **ChronoLog パーサー:**
  - 正規表現や文字列処理によるカスタムパーサーを実装。
- **ChronologMemoPreview コンポーネント:**

  - ChronologMemo オブジェクトの内容（日時・タイトル・タグ・プロパティ・本文）を受け取り、プレビュー表示する React コンポーネント。
  - 単体テスト可能な形で `src/lib/ChronologMemoPreview.tsx` に実装。

- **TypeScript 設定:**

  - `tsconfig.json` の `jsx` オプションは `"react-jsx"` を指定し、React 18 以降の新しい JSX 変換方式に対応。
  - これにより、各 `.tsx` ファイルでの `import React from "react";` は不要となるため、順次削除する。

- **状態管理:**

  - Extension Host (Node.js) と Webview (Browser) 間でのデータ通信には VS Code API の `Webview.postMessage()` と `window.addEventListener('message')` を使用。

- **CI/CD:**
  - GitHub Actionsを利用し、CI（`npm run ci`によるテスト・Lint）とGitHub Pagesへの自動デプロイを実施。
  - `.github/workflows/ci.yml`でワークフローを管理。
    - mainブランチへのpushまたはPRでCIを実行。
    - mainブランチへのpush時はビルド成果物（`out/`）をGitHub Pagesにデプロイ。

### 5. 開発ステップ

開発手順やセットアップの詳細は [docs/development.md](./development.md) を参照してください。
