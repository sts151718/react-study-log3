# Study Log

学習時間を記録するアプリケーションを作成しました。
学習時間の合計を自動計算しており、可視化しております。

[sts151718/react-study-log2](https://github.com/sts151718/react-study-log2)の完成版です。

sts151718/react-study-log2との主な違いは下記です。

- Chakra UI を利用したスタイリングの追加
- 学習記録の編集機能

# アプリ画面

![Image](https://github.com/user-attachments/assets/9c4d304f-5cec-460c-868b-b912b19a27f2)

# 環境設定

1. このリポジトリをクローンしてください。

   ```
   git@github.com:sts151718/react-study-log3.git
   ```

2. 依存関係のインストールをしてください。

   ```
   npm ci
   ```

3. `.env.template`から`.env`ファイルを作成してください。

4. Supabase(https://supabase.com/)でテーブル・レコードを作成してください。
   1. study-recordという名前でプロジェクト名を作成してください。
   2. study-recordという名前のテーブルを作成し、以下のカラムを作成してください。
   3. プロジェクトURLとプロジェクトキーを`.env`内のVITE_SUPABASE_URLとVITE_SUPABASE_ANON_KEY変数にコピー&ペーストしてください。

# 起動方法

```
npm run dev
```

http://localhost:5173/ をURLバーに入力するか、ターミナルでURLをCtrl(Command (⌘) ) + クリックすると、開くことができます。

# ホスティング

[Firebase](https://firebase.google.com/?hl=ja)のプロジェクトを作成して、ホスティングしてください。

1. Firebaseにプロジェクトとアプリを作成してください。 その際に、Firebase CLIをインストールする必要があります。

   ```
    npm install -g firebase-tools
   ```

2. Firebase CLIでログインして、デプロイしてください。
   ```
    firebase login
    make deploy
   ```

# テーブル

## study_record

| カラム名 | 型      | option   |
| -------- | ------- | -------- |
| id       | uuid    |          |
| title    | varchar | non null |
| time     | int4    | non null |
