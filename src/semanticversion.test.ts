import { SemanticVersion } from "./semanticversion";

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
