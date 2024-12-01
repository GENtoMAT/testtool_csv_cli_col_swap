# コマンドライン CSV 列入れ替えツール

自己学習を目的として作成したコマンドラインでローカル CSV ファイルの列を入れ替えるツールです。2202

## 簡単な説明

このツールは、Node.js と TypeScript を用いて開発された、対話型の CSV ファイル操作ツールです。ローカルに保存された CSV ファイルの任意の 2 つの列を入れ替えることができます。

**_デモ_**

<img src="https://github.com/user-attachments/assets/5c6221f0-fc8e-477d-ba5c-6830043b23bb" width="800">

## 機能

対話式操作: コマンドライン上で、入れ替えたい CSV ファイルと列を指定するだけで、簡単に操作できます。

CSV 列入れ替え: 指定した CSV ファイルの任意の 2 つの列の順序を入れ替えます。

## 使い方

1. 下記インストールを行う
2. フォルダ "./csv_input" に操作したい csv ファイルを保存。
3. 次のコマンドを実行

```
npx ts-node ./src/index_iconv.ts
```

5. 対話に従ってコマンドラインで入力
6. 加工後の csv ファイルが "./csv_output" に保存されます

## インストール

```
git clone git@github.com:GENtoMAT/testtool_csv_cli_col_swap.git
cd testtool_csv_cli_col_swap
```

## その他

入力する CSV ファイルは日本語も対応可能です。
