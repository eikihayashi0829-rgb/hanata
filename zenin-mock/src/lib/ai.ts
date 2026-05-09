/**
 * OpenAI Vision-based diagnosis of a repair photo.
 *
 * Falls back to a scripted result if no OPENAI_API_KEY is set, so that
 * the demo works out-of-the-box and the LINE Bot still replies sensibly.
 */

export type Diagnosis = {
  device: string;
  symptom: string;
  urgency: "高" | "中" | "低";
  cause: string;
};

const FALLBACK: Diagnosis = {
  device: "エアコン (推定)",
  symptom: "冷風が出ない / 動作不良",
  urgency: "中",
  cause: "冷媒漏れ / 圧縮機劣化の可能性",
};

export async function diagnoseFromText(text: string): Promise<Diagnosis> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return inferFromKeyword(text);

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: text },
        ],
      }),
    });
    if (!res.ok) return inferFromKeyword(text);
    const json = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    return parseDiagnosis(json.choices[0]?.message?.content ?? "") ?? inferFromKeyword(text);
  } catch {
    return inferFromKeyword(text);
  }
}

export async function diagnoseFromImage(
  imageBase64: string,
  contentType: string,
  userText?: string,
): Promise<Diagnosis> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return FALLBACK;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: userText
                  ? `入居者からの説明: 「${userText}」\nこの写真を見て故障内容を判定してください。`
                  : "この写真を見て故障内容を判定してください。",
              },
              {
                type: "image_url",
                image_url: { url: `data:${contentType};base64,${imageBase64}` },
              },
            ],
          },
        ],
      }),
    });
    if (!res.ok) return FALLBACK;
    const json = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    return parseDiagnosis(json.choices[0]?.message?.content ?? "") ?? FALLBACK;
  } catch {
    return FALLBACK;
  }
}

const SYSTEM_PROMPT = `あなたは不動産管理会社の修繕受付担当のAIです。
入居者から送られた説明や写真をもとに、設備故障の内容を以下のJSON形式で正確に判定してください。

{
  "device": "故障している設備名 (例: エアコン, 給湯器, 換気扇)",
  "symptom": "症状を1文で",
  "urgency": "高 | 中 | 低 のいずれか",
  "cause": "推定される原因を1文で"
}

判定が難しい場合でも、もっともらしい推定値を返してください。出力はJSONのみ。`;

function parseDiagnosis(s: string): Diagnosis | null {
  try {
    const obj = JSON.parse(s) as Partial<Diagnosis>;
    if (!obj.device || !obj.symptom) return null;
    return {
      device: String(obj.device),
      symptom: String(obj.symptom),
      urgency: (["高", "中", "低"] as const).includes(obj.urgency as never)
        ? (obj.urgency as "高" | "中" | "低")
        : "中",
      cause: String(obj.cause ?? "詳細は現地調査で確認"),
    };
  } catch {
    return null;
  }
}

function inferFromKeyword(text: string): Diagnosis {
  const t = text.toLowerCase();
  if (/(エアコン|冷房|暖房|冷えない|温まらない)/.test(text)) {
    return { device: "エアコン", symptom: "冷暖房不調", urgency: "中", cause: "冷媒漏れ / 圧縮機劣化の可能性" };
  }
  if (/(給湯|お湯|シャワー)/.test(text)) {
    return { device: "給湯器", symptom: "お湯が出ない", urgency: "高", cause: "点火不良 / ガス供給異常の可能性" };
  }
  if (/(水漏れ|漏水|蛇口|洗面|キッチン|トイレ)/.test(text)) {
    return { device: "水回り", symptom: "水漏れ", urgency: "高", cause: "パッキン劣化 / 配管接続不良" };
  }
  if (/(鍵|ドア|玄関)/.test(text)) {
    return { device: "玄関ドア・鍵", symptom: "施錠不良", urgency: "中", cause: "シリンダー摩耗" };
  }
  if (/(換気|ファン|異音)/.test(text)) {
    return { device: "換気扇", symptom: "異音発生", urgency: "低", cause: "モーター部の経年劣化" };
  }
  return { device: t || "不明", symptom: "詳細確認が必要", urgency: "中", cause: "現地調査が必要" };
}
