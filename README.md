# コマンドライン CSV 列入れ替えツール

自己研鑽を目的として作成したコマンドラインでローカルCSVファイルの列を入れ替えるツールです。

## 簡単な説明

このツールは、Node.jsとTypeScriptを用いて開発された、対話型のCSVファイル操作ツールです。ローカルに保存されたCSVファイルの任意の2つの列を入れ替えることができます。

***デモ***

<img src="https://github.com/user-attachments/assets/5c6221f0-fc8e-477d-ba5c-6830043b23bb" width="800">

## 機能

対話式操作: コマンドライン上で、入れ替えたいCSVファイルと列を指定するだけで、簡単に操作できます。

CSV列入れ替え: 指定したCSVファイルの任意の2つの列の順序を入れ替えます。


## 使い方

1. 下記インストールを行う
2. フォルダ "./csv_input" に操作したいcsvファイルを保存。
3. 次のコマンドを実行

```
npx ts-node ./src/index_iconv.ts
```

5. 対話に従ってコマンドラインで入力
6. 加工後のcsvファイルが "./csv_output" に保存されます

## インストール

```
git clone git@github.com:GENtoMAT/testtool_csv_cli_col_swap.git
cd testtool_csv_cli_col_swap
```

## その他

入力するCSVファイルは日本語も対応可能です。
