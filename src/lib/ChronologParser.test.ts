// src/lib/ChronologParser.test.ts
import { describe, it, expect } from "vitest";
import { ChronologParser } from "./ChronologParser";

describe("ChronologParser.parse", () => {
  it("parses title, body, tags, and properties", () => {
    const text = `# タイトル
本文1
本文2 #tag1
@key1:value1 @key2
#tag2
`;
    const filename = "20240505.clog";
    const memo = ChronologParser.parse(text, filename);

    expect(memo.title).toBe("タイトル");
    expect(memo.body).toBe("本文1\n本文2 #tag1\n@key1:value1 @key2");
    expect(memo.tags).toEqual(["#tag1", "#tag2"]);
    expect(memo.properties).toEqual({ key1: "value1", key2: true });
    expect(memo.datetime).toBeInstanceOf(Date);
    expect(memo.datetime.getFullYear()).toBe(2025);
    expect(memo.datetime.getMonth()).toBe(4); // May (0-based)
    expect(memo.datetime.getDate()).toBe(5);
  });

  it("parses ISO8601 filename", () => {
    const text = "# タイトル\n本文";
    const filename = "2024-05-05T12:34:56.clog";
    const memo = ChronologParser.parse(text, filename);
    expect(memo.datetime.toISOString()).toBe(new Date("2024-05-05T12:34:56").toISOString());
  });

  it("uses current date if filename is invalid", () => {
    const text = "# タイトル\n本文";
    const filename = "invalid.clog";
    const before = new Date();
    const memo = ChronologParser.parse(text, filename);
    const after = new Date();
    expect(memo.datetime.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(memo.datetime.getTime()).toBeLessThanOrEqual(after.getTime());
  });

  it("throws if title line is missing", () => {
    const text = "本文のみ";
    expect(() => ChronologParser.parse(text)).toThrow("タイトル行（#）が必要です");
  });
});
