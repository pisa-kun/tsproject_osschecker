import * as fs from "fs";
import * as path from "path";

/**
 * 検索対象のルートディレクトリ
 * @type {string}
 */
const seekRootDir = "C:\\Develop\\typescript\\programming_ts_oreilly";

/**
 * 取得したいファイル名
 * @type {string}
 */
const targetFileName = "package.json"

/**
 * 検索対象のファイル名を全て出力する
 * https://kuroeveryday.blogspot.com/2018/03/recursive-directory-search-with-nodejs.html
 * @param {string} dir 検索するディレクトリのパス
 * @return {Array<string>} ファイルのパスのリスト
 */
const getAllFiles = (dir: string): string[] => {
    const strArray: string[] = [];

    const filenames = fs.readdirSync(dir);
    filenames.forEach((filename) => {
        const fullPath = path.join(dir, filename);
        const stats = fs.statSync(fullPath);
        if(stats.isFile()) {
            strArray.push(fullPath);
        }else if(stats.isDirectory()){
            strArray.push(...getAllFiles(fullPath));
        }
    });
    return strArray;
}

const main = () => {
    const p = process.cwd();
    getAllFiles(p).filter(file => path.basename(file) === targetFileName)
    .forEach(file => console.log(file));
}

main();