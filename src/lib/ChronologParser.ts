// Chronolog (.clog) ファイル仕様に基づくパーサ
export interface ChronologMemo {
  /** ISO8601ファイル名から解釈した日時 */
  datetime: Date;
  /** メモタイトル（必須） */
  title: string;
  /** 本文（見出し1不可） */
  body: string;
  /** タグ（#tag） */
  tags: string[];
  /** プロパティ（@key:value または @key=true） */
  properties: Record<string, string | boolean>;
}

export class ChronologParser {
  /**
   * ファイル名と内容から ChronologMemo を生成
   * @param filename ISO8601形式のファイル名（拡張子含む）
   * @param text .clogファイルの内容
   */
  static parse(text: string, filename?: string): ChronologMemo {
    // ファイル名から日時を抽出（なければ現在日時）
    let datetime: Date = new Date();
    if (filename) {
      const iso = filename.replace(/\.clog$/, "");
      if (/^\d{8}$/.test(iso)) {
        // YYYYMMDD
        datetime = new Date(`${iso}T00:00:00`);
      } else if (!isNaN(Date.parse(iso))) {
        // ISO8601
        datetime = new Date(iso);
      }
      // それ以外は現在日時
      if (isNaN(datetime.getTime())) {
        datetime = new Date();
      }
    }

    const lines = text.split(/\r?\n/);
    // 1行目: タイトル
    const titleLine = lines.find((line) => line.trim().startsWith("#"));
    if (!titleLine) throw new Error("タイトル行（#）が必要です");
    const title = (titleLine ?? "").replace(/^#/, "").trim();

    // 本文（タイトル行以外、見出し1不可）
    const bodyLines = lines.filter(
      (line) => line.trim() !== "" && !line.trim().startsWith("#"), // タイトル以外の見出し1不可
    );
    const body = bodyLines.join("\n");

    // タグ抽出
    const tagRegex = /(?:^|\s)(#[^\s#]+)(?=\s|$)/g;
    const tags: string[] = [];
    for (const line of lines) {
      let match;
      while ((match = tagRegex.exec(line)) !== null) {
        if (match[1] !== undefined) {
          tags.push(match[1]);
        }
      }
    }

    // プロパティ抽出
    const propRegex = /(?:^|\s)@([^\s@:]+)(?::([^\s]+))?/g;
    const properties: Record<string, string | boolean> = {};
    for (const line of lines) {
      let match;
      while ((match = propRegex.exec(line)) !== null) {
        const key = match[1];
        const value = match[2] !== undefined ? match[2] : true;
        if (key !== undefined) {
          properties[key] = value;
        }
      }
    }

    return {
      datetime,
      title,
      body,
      tags,
      properties,
    };
  }
}
