"use client";
import { useState } from "react";
import { ChronologParser, ChronologMemo } from "../parser/ChronologParser";

export default function Home() {
  const [input, setInput] = useState("");
  const memos: ChronologMemo[] = ChronologParser.parse(input);

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
        {memos.length === 0 ? (
          <div className="text-gray-400">パース結果なし</div>
        ) : (
          <ul className="space-y-4">
            {memos.map((memo, idx) => (
              <li key={idx} className="border-b pb-2">
                <div className="text-sm text-gray-600">
                  <span className="font-bold">topic:</span> {memo.metadata.topic ?? "-"}
                  {memo.metadata.time && (
                    <>
                      {" "}
                      <span className="font-bold">time:</span> {memo.metadata.time}
                    </>
                  )}
                  {memo.metadata.links && memo.metadata.links.length > 0 && (
                    <>
                      {" "}
                      <span className="font-bold">links:</span> {memo.metadata.links.join(", ")}
                    </>
                  )}
                  {memo.id && (
                    <>
                      {" "}
                      <span className="font-bold">id:</span> {memo.id}
                    </>
                  )}
                </div>
                <pre className="whitespace-pre-wrap mt-1">{memo.content}</pre>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
