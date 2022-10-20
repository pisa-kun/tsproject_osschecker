### typescript OSSチェックツール

指定したディレクトリ以下にある全ての**package.json**をチェックして、OSSの最小と最大バージョンを表示する

#### install procedure

> npm init --yes  
> npm install --save/dev typescript @types/node  
> npx tsc --init

> npm install ts-node --save-dev  
> npm install nodemon --save-dev

> npm i --save-dev jest @types/jest ts-jest
---

npx jest --init で初期設定

https://zenn.dev/zaki_yama/scraps/ab67ac109f2286

#### jest.config.js
```json
export default {
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};
```


#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "esnext",
    "sourceMap": true,
    "moduleResolution": "node",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [
    "./src/**/*.ts"
  ],
}

```
#### package.json
**"type":"module"** が必要
```json
{
  "name": "chap7",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "type":"module",
  "scripts": {
    "start": "npm run build:live",
    "build": "tsc -p .",
    "build:live": "nodemon --watch 'src/**/*.ts' --exec \"ts-node\" src/index.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/node": "^17.0.31",
    "typescript": "^4.6.4"
 }
}
```
**"type": "module",** が必要

> npm run start

[参考](https://typescript-jp.gitbook.io/deep-dive/nodejs)

#### JSDocコメントの書き方

[先頭のアスタリスクを2つ記載し/** ◯◯ */とし、型情報等を@typeや@paramというキーワードとともに記述します。](https://ics.media/entry/6789/)

```js
/**
 * スマートフォンのアクセスであるかを示す真偽値です。
 * @type {boolean}
 */
const isSmartphoneAccess = true;

/**
 * 指定したディレクトリ配下のすべてのファイルをリストアップする
 * @param {string} dirPath 検索するディレクトリのパス
 * @return {Array<string>} ファイルのパスのリスト
 */
const listFiles = dirPath => {}
```

#### omake memo

> TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension

**package.json**から**"type":"module"**を削除する