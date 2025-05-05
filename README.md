# ChronoLog for Next.js

ChronoLogは、独自形式「ChronoLog (`.clog`)」で記述された時系列メモをパースし、Web UI上で可視化するアプリケーションです。

## 概要

- **目的:** `.clog` ファイルで時系列メモを管理し、タイムライン形式で可視化
- **ターゲットユーザー:** 調査記録、研究ノート、プロジェクトログ、思考メモなどを時系列で管理したいユーザー
- **開発言語:** TypeScript (Next.js)

## ChronoLog (`.clog`) の仕様

Chronologの書き方・ファイル仕様については [docs/clog-format-specification.md](docs/clog-format-specification.md) を参照してください。

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 開発・セットアップ手順

開発環境のセットアップやフォーマット・テスト・ビルド等の詳細な手順は [docs/development.md](docs/development.md) を参照してください。

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## デプロイ

- 本プロジェクトは GitHub Actions を利用して GitHub Pages へ自動デプロイされています。
- デプロイ先URL: [https://koumatsumoto.github.io/chronolog/](https://koumatsumoto.github.io/chronolog/)
- デプロイフローやCI/CDの詳細は [docs/specification.md](docs/specification.md) を参照してください。
