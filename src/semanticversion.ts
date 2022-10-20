/**
 * セマンティックバージョンを表すバリュークラス
 * @param {string} X.X.X表記の文字列
 * TODO: 2.0.0-next.3 のような値への対応
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