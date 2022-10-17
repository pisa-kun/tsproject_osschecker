import * as fs from "fs";
import * as path from "path";

/**
 * 検索対象のルートディレクトリ
 * @type {string}
 */
const seekRootDir = "C:\\Develop\\typescript\\programming_ts_oreilly";

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
    getAllFiles(seekRootDir).map(files => console.log(files));
}

main();