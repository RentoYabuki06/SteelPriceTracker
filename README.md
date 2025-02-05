# iwamoto_cost_estimation

# 日本経済新聞・主要相場・鋼材情報表示アプリ

## 概要
このアプリケーションは、日本経済新聞が運営する「[日本経済新聞・主要相場・鋼材](http://shuyousoubakouzai.sblo.jp/)」から毎日1回、材料情報を取得し、時系列グラフとして表示するWebアプリケーションです。材料の仕入れ担当者にとって非常に便利なサービスです。

## 特徴
1. **最新データの自動取得**
   - 毎日1回、日本経済新聞から材料情報を自動で取得します。

2. **時系列データ表示**
   - 材料価格の推移をグラフで可視化し、過去データとの比較が容易にできます。

3. **シンプルな操作性**
   - サイドバーによるナビゲーションで、簡単に各機能にアクセス可能です。

4. **カスタマイズ性**
   - グラフの表示範囲や価格帯をスライダーで調整できます。

5. **モバイル対応**
   - レスポンシブデザインにより、スマートフォンやタブレットからも快適に利用可能です。

---

## 利用者向けガイド
### 必要環境
- **対応ブラウザ**：Google Chrome, Firefox, Microsoft Edge, Safari
- **インターネット接続**：データ取得にはネット接続が必要です。

### 主な機能
1. **データ表示機能**
   - トップページから材料価格の一覧と時系列グラフを閲覧できます。

2. **フィルタリング機能**
   - 1週間、1ヶ月、1年など期間別の価格推移を表示可能。

3. **価格変動通知機能（開発予定）**
   - 価格変動が大きい場合のアラート通知を予定。

### URL
- 本番環境：[http://shuyousoubakouzai.sblo.jp/](http://shuyousoubakouzai.sblo.jp/)

---

## 開発者向けガイド
### 必要環境
- Node.js (v18以上推奨)
- npm または yarn

### セットアップ手順
1. リポジトリをクローン
```
git clone https://github.com/your-repository/material-price-tracker.git
cd material-price-tracker
```

2. パッケージインストール
```
npm install
```
または
```
yarn install
```

3. 環境変数設定
`.env.local` ファイルを作成し、以下を記述してください：
```
NEXT_PUBLIC_API_URL=http://shuyousoubakouzai.sblo.jp/
```

4. 開発サーバー起動
```
npm run dev
```
または
```
yarn dev
```
- アクセス：[http://localhost:3000](http://localhost:3000)

### ディレクトリ構成
```
src/
  ├── app/
  │   ├── api/
  │   ├── data/
  │   │   ├── page.tsx           # データ表示ページ
  │   ├── settings/
  │   │   ├── page.tsx          # 設定ページ
  │   ├── staff/
  │   │   ├── page.tsx          # 人件費ページ
  │   ├── test/
  │   │   ├── page.tsx          # テスト用ページ
  │   ├── layout.tsx           # レイアウト管理
  │   ├── page.tsx             # トップページ
  ├── components/
  │   ├── Sidebar.tsx          # サイドバーメニュー
  ├── lib/
  │   ├── prisma.ts            # Prisma 設定ファイル
  ├── models/Materials/
  │   ├── utils/
  │   │   ├── fetchAndSaveMaterialPrices.ts # データ取得と保存
  │   ├── const.ts             # 定数管理
  │   ├── scraping.ts          # スクレイピング処理
  │   ├── service.ts           # サービスロジック
  │   ├── type.ts              # 型定義
  ├── styles/
  │   ├── globals.css          # グローバルスタイル
  ├── .env                     # 環境変数設定
```

---

## 今後の機能追加予定
1. **価格変動通知機能**
   - 急激な価格変動時のメール通知機能。
2. **価格比較機能**
   - 異なる材料間の価格比較グラフ。
3. **ダークモード対応**
   - ユーザーインターフェースのカスタマイズオプション。

---

## ライセンス
MIT License

---

## お問い合わせ
このアプリに関するお問い合わせや不具合報告は、以下のコーポレートサイトよりご連絡ください。
- **コーポレートサイト**: https://www.nozomi-ai.co.jp/

