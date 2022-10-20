import { SemanticVersion } from "./semanticversion";

test('create instance', () => {
    new SemanticVersion("1.1.1");
    new SemanticVersion("1.2.1");
    new SemanticVersion("1.1.11");
    new SemanticVersion("11.1.1");
    new SemanticVersion("1.11.1");
    new SemanticVersion("1.1.1-β");
    new SemanticVersion("1.1.1-beta");
    new SemanticVersion("1.1.1-beta-beta"); 
});

test("throw assert", () => {
    expect(() => {new SemanticVersion("1.1.1-")}).toThrow();
    expect(() => {new SemanticVersion("1.1.1beta-beta")}).toThrow();
    expect(() => {new SemanticVersion(".1.1-")}).toThrow();
})