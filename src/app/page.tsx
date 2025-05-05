"use client";
import { useState } from "react";
import { ChronologParser, ChronologMemo } from "../lib/ChronologParser";
import { LexicalEditor } from "../lib/LexicalEditor";
import { ChronologMemoPreview } from "../lib/ChronologMemoPreview";

export default function Home() {
  const [input, setInput] = useState("");

  let memo: ChronologMemo | null = null;
  try {
    memo = input.trim() ? ChronologParser.parse(input, "20250101.clog") : null;
  } catch {
    memo = null;
  }

  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-8">
      <h1 className="text-2xl font-bold mb-4">Chronolog Preview</h1>
      <div className="w-full max-w-2xl border rounded p-2 font-mono min-h-48 bg-white">
        <LexicalEditor onChange={setInput} placeholder="clog テキストを入力してください" />
      </div>
      <div className="w-full max-w-2xl border rounded p-4 bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">プレビュー</h2>
        <ChronologMemoPreview memo={memo} />
      </div>
    </div>
  );
}
