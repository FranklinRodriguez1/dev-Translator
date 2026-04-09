import { NextResponse } from "next/server";
import { explainCode } from "../../../lib/gemini";
import type { GeminiRequest } from "../../../types/gemini";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GeminiRequest;
    const code = body.code?.trim();
    const personality = body.personality?.trim();

    if (!code) {
      return NextResponse.json(
        { error: "El código es requerido." },
        { status: 400 }
      );
    }

    if (!personality) {
      return NextResponse.json(
        { error: "La personalidad es requerida." },
        { status: 400 }
      );
    }

    const result = await explainCode({ code, personality });
    return NextResponse.json({ explanation: result.text });
  } catch (error) {
    console.error("API /api/gemini error:", error);
    return NextResponse.json(
      { error: "Error interno al procesar la solicitud." },
      { status: 500 }
    );
  }
}
