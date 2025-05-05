"use client";
import { useState } from "react";
import { ChronologParser, ChronologMemo } from "../lib/ChronologParser";

export default function Home() {
  const [input, setInput] = useState("");
  let memo: ChronologMemo | null = null;
  try {
    memo = input.trim()
      ? ChronologParser.parse(input, "20250101.clog")
      : null;
  } catch {
    memo = null;
  }

  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-8">
      <h1 className="text-2xl font-bold mb-4">Chronolog Preview</h1>
      <textarea
        className="w-full max-w-2xl h-48 border rounded p-2 font-mono"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="clog テキストを入力してください"
      />
      <div className="w-full max-w-2xl border rounded p-4 bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">プレビュー</h2>
        {!memo ? (
          <div className="text-gray-400">パース結果なし</div>
        ) : (
          <div className="space-y-2">
            <div>
              <span className="font-bold">日時:</span> {memo.datetime.toISOString()}
            </div>
            <div>
              <span className="font-bold">タイトル:</span> {memo.title}
            </div>
            <div>
              <span className="font-bold">タグ:</span> {memo.tags.join(", ") || "-"}
            </div>
            <div>
              <span className="font-bold">プロパティ:</span>{" "}
              {Object.keys(memo.properties).length === 0
                ? "-"
                : Object.entries(memo.properties)
                    .map(([k, v]) => `${k}=${v}`)
                    .join(", ")}
            </div>
            <div>
              <span className="font-bold">本文:</span>
              <pre className="whitespace-pre-wrap mt-1">{memo.body}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
