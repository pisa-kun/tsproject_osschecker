/**
 * セマンティックバージョンを表すバリュークラス
 * @param {string} X.X.X表記の文字列
 */
 export class SemanticVersion {
    constructor(private readonly value: string) {
      if (!value) {
        throw new Error("value is undefined");
      }
      if (!/^\d+.\d+.\d+(-..*)?$/.test(value)) {
        throw new Error(`value(${value}) is not semantic pattern`);
      }
    }
  
    getValue(): string {
      return this.value;
    }
  }