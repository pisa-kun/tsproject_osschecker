/**
 * セマンティックバージョンを表すバリュークラス
 * @param {string} X.X.X表記の文字列
 */
export class SemanticVersion {
  private readonly major: number;
  private readonly minor: number;
  private readonly patch: number;
  //private readonly pre: string;

  constructor(private readonly value: string) {
    if (!value) {
      throw new Error("value is undefined");
    }
    if (!/^\d+.\d+.\d+(-..*)?$/.test(value)) {
      throw new Error(`value(${value}) is not semantic pattern`);
    }
    const separate = value.split(/[.-]/);
    const [major, minor, patch, _] = [...separate];
    this.major = Number(major);
    this.minor = Number(minor);
    this.patch = Number(patch);
  }
  /**
   * バージョンを文字列で返す
   */
  getValue = (): string => this.value;
  /**
   * メジャーバージョンを数字で返す
   */
  getMajor = (): number => this.major;
  /**
   * マイナーバージョンを数字で返す
   */
  getMinor = (): number => this.minor;
  /**
   * パッチバージョンを数字で返す
   */
  getPatch = (): number => this.patch;
}
