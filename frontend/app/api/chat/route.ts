import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ reply: "⚠️ Invalid message format." });
    }

    // ✅ Gọi API Groq
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // 💪 Model mạnh và miễn phí
        messages: [
          {
            role: "system",
            content:
              "You are Daily HearWrite's AI assistant. You help users learn English by chatting naturally. Always be kind, clear, and explain things like a friendly English tutor. You can also correct grammar mistakes politely.",
          },
          ...messages.map((m: any) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
        ],
        temperature: 0.7, // tạo phản hồi tự nhiên hơn
        max_tokens: 512, // độ dài tối đa mỗi phản hồi
      }),
    });

    const data = await res.json();

    // ✅ Log để debug nếu cần
    console.log("Groq API raw response:", data);

    // ✅ Lấy phản hồi từ API
    const reply =
      data?.choices?.[0]?.message?.content ||
      "🤖 Sorry, I didn’t understand.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({
      reply: "⚠️ Error connecting to AI server.",
    });
  }
}
