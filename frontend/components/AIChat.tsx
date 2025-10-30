"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // ✅ Gửi tin nhắn
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user" as const, text: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      const aiReply = data.reply || "🤖 Sorry, I didn’t understand.";

      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Unable to connect to AI server." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Auto scroll xuống cuối
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <>
      {/* Nút mở chat */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-yellow-400 text-white p-4 rounded-full shadow-[0_0_20px_rgba(255,192,203,0.6)] hover:scale-110 transition-all z-50 flex items-center justify-center"
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
      </motion.button>

      {/* Khung chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 18 }}
            className="fixed bottom-24 right-6 w-[420px] h-[450px] bg-gradient-to-br from-black/85 to-pink-950/60 border border-pink-500/40 rounded-3xl shadow-[0_0_25px_rgba(255,192,203,0.3)] backdrop-blur-xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="relative p-4 bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold text-center text-lg shadow-lg">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="animate-pulse" size={18} />
                <span>AI Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-3 text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nội dung chat */}
            <div
              ref={chatRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 text-sm scrollbar-thin scrollbar-thumb-pink-500/40 scrollbar-track-transparent"
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-pink-300 italic">
                  <Sparkles size={20} className="mb-2 animate-spin" />
                  <p>Hi there 👋<br />Ask me anything!</p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-md ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-pink-500/70 to-yellow-400/60 text-white"
                          : "bg-white/10 text-pink-100 border border-pink-400/20"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))
              )}

              {isLoading && (
                <div className="flex items-center gap-2 text-yellow-300 text-sm animate-pulse">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
                  <span className="ml-2">Thinking...</span>
                </div>
              )}
            </div>

            {/* Ô nhập tin nhắn */}
            <div className="p-3 border-t border-pink-500/30 flex items-center gap-2 bg-black/30">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-black/20 border border-pink-500/30 rounded-xl px-4 py-2 text-white placeholder-pink-300 outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-300 transition-all"
              />
              <motion.button
                onClick={handleSend}
                disabled={isLoading}
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white p-2 rounded-xl hover:shadow-[0_0_10px_rgba(255,192,203,0.6)] transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
