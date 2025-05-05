import { ChronologMemo } from "./ChronologParser";

type ChronologMemoPreviewProps = {
  memo: ChronologMemo | null;
};

export function ChronologMemoPreview({ memo }: ChronologMemoPreviewProps) {
  if (!memo) {
    return <div className="text-gray-400">パース結果なし</div>;
  }
  return (
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
  );
}
