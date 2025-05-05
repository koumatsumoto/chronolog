import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChronologMemoPreview } from "./ChronologMemoPreview";
import { ChronologMemo } from "./ChronologParser";

describe("ChronologMemoPreview", () => {
  const sampleMemo: ChronologMemo = {
    datetime: new Date("2025-05-05T12:34:56Z"),
    title: "テストタイトル",
    tags: ["tag1", "tag2"],
    properties: { foo: "bar", baz: "qux" },
    body: "本文テスト",
  };

  it("renders all memo fields", () => {
    render(<ChronologMemoPreview memo={sampleMemo} />);
    expect(screen.getByText("日時:")).toBeInTheDocument();
    expect(screen.getByText(sampleMemo.datetime.toISOString())).toBeInTheDocument();
    expect(screen.getByText("タイトル:")).toBeInTheDocument();
    expect(screen.getByText(sampleMemo.title)).toBeInTheDocument();
    expect(screen.getByText("タグ:")).toBeInTheDocument();
    expect(screen.getByText("tag1, tag2")).toBeInTheDocument();
    expect(screen.getByText("プロパティ:")).toBeInTheDocument();
    expect(screen.getByText("foo=bar, baz=qux")).toBeInTheDocument();
    expect(screen.getByText("本文:")).toBeInTheDocument();
    expect(screen.getByText("本文テスト")).toBeInTheDocument();
  });

  it("renders placeholder when memo is null", () => {
    render(<ChronologMemoPreview memo={null} />);
    expect(screen.getByText("パース結果なし")).toBeInTheDocument();
  });

  it("renders '-' for empty tags and properties", () => {
    const emptyMemo: ChronologMemo = {
      datetime: new Date("2025-01-01T00:00:00Z"),
      title: "Empty",
      tags: [],
      properties: {},
      body: "",
    };
    render(<ChronologMemoPreview memo={emptyMemo} />);
    const dashes = screen.getAllByText("-");
    expect(dashes).toHaveLength(2);
  });
});
