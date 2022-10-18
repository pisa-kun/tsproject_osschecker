import * as fs from "fs";
import * as path from "path";

/**
 * OSS名
 * @type {string}
 */
interface OssVersionArray {
    [oss: string]: string;
}

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
 * マイナーバージョンを格納する連想配列
 * @interface {OssVersionArray}
 */
const ossMinorVer: OssVersionArray = {}

/**
 * メジャーバージョンを格納する連想配列
 * @interface {OssVersionArray}
 */
const ossMajorVer: OssVersionArray = {}

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

/**
 * 連想配列内のメジャー、マイナーバージョンを更新する
 * @param {OssVersionArray} minor マイナーバージョンを格納する連想配列
 * @param {OssVersionArray} major メジャーバージョンを格納する連想配列
 * @param {string} name oss名
 * @param {string} ver バージョン(x.x.x)
 */
const setMajorAndMinorOss = (minor: OssVersionArray, major: OssVersionArray, name: string, ver: string) => {
    if(!minor[name] || minor[name] > ver) {
        minor[name] = ver;
    }
    
    if(!major[name] || major[name] < ver){
        major[name] = ver
    }
}

const main = () => {
    const p = process.cwd();

    getAllFiles(p).filter(file => path.basename(file) === targetFileName)
    .forEach(file => {
        const from_json = JSON.parse(fs.readFileSync(file, 'utf8'));

        const name = from_json["name"];
        const version = from_json["version"];
        if(name && version) {
            setMajorAndMinorOss(ossMinorVer, ossMajorVer, name, version);
        }
    });
    
    console.log("oss, Minor X.X.X, Major X.X.X");
    for(const oss in ossMinorVer){
        console.log(`${oss}, ${ossMinorVer[oss]}, ${ossMajorVer[oss]}`);
    }
}

main();