import inquirer from "inquirer" //標準入力、出力を便利に扱えるモジュール
import * as fs from "fs"
import { parse } from "csv-parse/sync"
import * as path from "path"
import { Buffer } from "node:buffer"
import * as iconv from "iconv-lite"
import * as jschardet from "jschardet"

const csvInputDir: string = "./csv_input"
const csvOutputDir: string = "./csv_output"
let csvInputFileName: string

async function main() {
  //csvファイルのリストを取得。rootから相対的に参照。
  const csvFileList = fs.readdirSync(csvInputDir)
  //ユーザーから操作するcsvファイルを入力受付
  const ansSelectCsv = await inquirer.prompt([
    {
      type: "list", //ユーザーに求める入力のタイプ
      name: "feature",
      message: "操作するcsvファイルの選択",
      loop: false,
      choices: csvFileList,
    },
  ])
  //選択されたcsvファイル名を変数に格納
  csvInputFileName = ansSelectCsv.feature
  //csvファイルを読み込み
  const csvRawReaded = fs.readFileSync(csvInputDir + "/" + csvInputFileName) //入力値の値はnameで指定したプロパティに入る（中味は選択肢のvalue、valueが無かったら選択肢の文字列がそのまま入る）
  //csvファイルのエンコードを検出
  let tmp: string = ""
  const ENCODE = jschardet.detect(csvRawReaded).encoding
  switch (ENCODE) {
    case "ascii":
      tmp = iconv.decode(csvRawReaded, "UTF-8")
      break
    case "UTF-8":
      tmp = iconv.decode(csvRawReaded, "UTF-8")
      break
    case "SHIFT_JIS":
      tmp = iconv.decode(csvRawReaded, "SJIS")
      break
  }

  // //CSVデータをオブジェクトとして読み込み
  const records = parse(tmp, {
    //bom: true, from: 2, //などココにoptionを追加
  })

  //操作の参考のために１行目を表示
  console.log("csvの１行目はこちら")
  console.log(records[0])

  //次の質問の選択肢を作成
  const column_num = []
  const choicesSwapCol = []
  for (let i = 0; i < records[0].length; i++) {
    choicesSwapCol.push({ name: records[0][i], value: i + 1 })
    column_num.push(i + 1)
  }

  //ユーザーから入れ替える列番号を入力受付
  const ans_change_column = await inquirer.prompt([
    {
      type: "checkbox", //ユーザーに求める入力のタイプ
      name: "feature",
      message: "入れ替える列を選択してください",
      loop: false,
      choices: choicesSwapCol,
      //要素の選択は２つのみに制限
      validate: (selectedItems) => {
        if (selectedItems.length === 2) {
          // true/falseを返すとOK/NGのみを表現
          return true
        }
        // 文字列を返すとエラーメッセージになる
        return "列2つを選んでください"
      },
    },
  ])

  //入れ替え後の２次元配列を作成
  const dataSwaped = swapCsvColumn(records, ans_change_column.feature[0] - 1, ans_change_column.feature[1] - 1)
  console.log("入れ替え後の列構成はこちら")
  console.log(dataSwaped[0])

  //出力ファイルのパスを作成
  const outputFilePath = path.join(csvOutputDir, csvInputFileName.slice(0, -4) + "_swaped.csv") //sliceは".csv"を削除するため
  //配列をCSV形式の文字列に変換
  const csvSwaped = dataSwaped.map((row) => row.join(",")).join("\n")
  //元ファイルの文字コードでエンコード
  const csvEncoded: Buffer = iconv.encode(csvSwaped, ENCODE)
  //ファイルをcsv出力
  fs.writeFileSync(outputFilePath, Buffer.from(csvEncoded))
  console.log("入れ替え操作は完了しました")
}

function swapCsvColumn(data: string[][], col1: number, col2: number): string[][] {
  let dataSwaped: string[][] //加工後の行列
  let recordSwaped: string[] //加工後のレコード

  dataSwaped = data.map((record) => {
    recordSwaped = record.map((v) => v) //配列のディープコピー（値渡し）
    recordSwaped[col1] = record[col2]
    recordSwaped[col2] = record[col1]
    return recordSwaped
  })
  return dataSwaped
}

main()
