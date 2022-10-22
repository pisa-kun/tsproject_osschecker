import {
  SemanticVersion,
  compareSemanticVerFirstMoreThanSecond,
} from "./semanticversion";

test("create instance", () => {
  {
    const ver = new SemanticVersion("1.1.1");
    expect(ver.getMajor()).toBe(1);
    expect(ver.getMinor()).toBe(1);
    expect(ver.getPatch()).toBe(1);
  }
  {
    const ver = new SemanticVersion("1.2.1");
    expect(ver.getMajor()).toBe(1);
    expect(ver.getMinor()).toBe(2);
    expect(ver.getPatch()).toBe(1);
  }
  {
    const ver = new SemanticVersion("1.1.11");
    expect(ver.getMajor()).toBe(1);
    expect(ver.getMinor()).toBe(1);
    expect(ver.getPatch()).toBe(11);
  }
  {
    const ver = new SemanticVersion("1.1.1-β");
    expect(ver.getMajor()).toBe(1);
    expect(ver.getMinor()).toBe(1);
    expect(ver.getPatch()).toBe(1);
  }
});

test("throw assert", () => {
  expect(() => {
    new SemanticVersion("1.1.1-");
  }).toThrow();
  expect(() => {
    new SemanticVersion("1.1.1beta-beta");
  }).toThrow();
  expect(() => {
    new SemanticVersion(".1.1-");
  }).toThrow();
});

describe("compare semantic version のUT", () => {
  test("first === second, return false", () => {
    const first = new SemanticVersion("1.1.1");
    const second = new SemanticVersion("1.1.1");
    const result = compareSemanticVerFirstMoreThanSecond(first, second);
    expect(result).toBe(false);
  });

  test("first patch has additional params, first === second, return false", () => {
    const first = new SemanticVersion("1.1.1-beta");
    const second = new SemanticVersion("1.1.1");
    const result = compareSemanticVerFirstMoreThanSecond(first, second);
    expect(result).toBe(false);
  });

  test("second patch has additional params, first === second, return false", () => {
    const first = new SemanticVersion("1.1.1");
    const second = new SemanticVersion("1.1.1-beta");
    const result = compareSemanticVerFirstMoreThanSecond(first, second);
    expect(result).toBe(false);
  });

  test("first Major more than second", () => {
    const first = new SemanticVersion("2.1.1");
    const second = new SemanticVersion("1.1.1");
    const result = compareSemanticVerFirstMoreThanSecond(first, second);
    expect(result).toBe(true);
  });

  test("first Minor more than second", () => {
    const first = new SemanticVersion("1.2.1");
    const second = new SemanticVersion("1.1.1");
    const result = compareSemanticVerFirstMoreThanSecond(first, second);
    expect(result).toBe(true);
  });

  test("first patchr more than second", () => {
    const first = new SemanticVersion("1.1.2");
    const second = new SemanticVersion("1.1.1");
    const result = compareSemanticVerFirstMoreThanSecond(first, second);
    expect(result).toBe(true);
  });

  test("first majorr less than second", () => {
    const first = new SemanticVersion("1.1.1");
    const second = new SemanticVersion("2.1.1");
    const result = compareSemanticVerFirstMoreThanSecond(first, second);
    expect(result).toBe(false);
  });

  test("first minor less than second", () => {
    const first = new SemanticVersion("1.1.1");
    const second = new SemanticVersion("1.2.1");
    const result = compareSemanticVerFirstMoreThanSecond(first, second);
    expect(result).toBe(false);
  });

  test("first patch less than second", () => {
    const first = new SemanticVersion("1.1.1");
    const second = new SemanticVersion("1.1.2");
    const result = compareSemanticVerFirstMoreThanSecond(first, second);
    expect(result).toBe(false);
  });

  test("first major less than second, but minor and patch more than", () => {
    const first = new SemanticVersion("5.7.7");
    const second = new SemanticVersion("6.1.2");
    const result = compareSemanticVerFirstMoreThanSecond(first, second);
    expect(result).toBe(false);
  });

  test("first major is number larger than 10", () => {
    const first = new SemanticVersion("10.7.7");
    const second = new SemanticVersion("6.1.2");
    const result = compareSemanticVerFirstMoreThanSecond(first, second);
    expect(result).toBe(true);
  });
});
