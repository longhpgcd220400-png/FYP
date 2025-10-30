"use client";

import { Toaster, ToastBar, toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

export default function GlobalToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2500,
        style: {
          borderRadius: "12px",
          padding: "10px 16px",
          fontWeight: 600,
          color: "white",
          backdropFilter: "blur(12px)",
        },
      }}
    >
      {(t) => (
        <AnimatePresence>
          {t.visible && (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -40, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { type: "spring", stiffness: 400, damping: 18 },
              }}
              exit={{
                opacity: 0,
                scale: 0.85,
                y: -20,
                transition: { duration: 0.2 },
              }}
              className={`relative flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border-l-4
                ${t.type === "success"
                  ? "bg-green-600/80 border-green-400 shadow-green-400/40"
                  : t.type === "error"
                  ? "bg-red-600/80 border-red-400 shadow-red-400/40"
                  : "bg-gray-700/80 border-gray-400"
                } animate-toast-pop`}
            >
              {t.type === "success" && (
                <CheckCircle className="w-5 h-5 text-green-200" />
              )}
              {t.type === "error" && (
                <AlertCircle className="w-5 h-5 text-red-200" />
              )}
              {!["success", "error"].includes(t.type) && (
                <Info className="w-5 h-5 text-blue-300" />
              )}

              <motion.span
                initial={{ scale: 0.9 }}
                animate={{ scale: [1.02, 1, 1.02, 1] }}
                transition={{
                  repeat: 2,
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="text-sm tracking-wide"
              >
                {t.message as string}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Toaster>
  );
}

// 💥 Hiệu ứng "rung nhẹ" custom bằng Tailwind + animation keyframes
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes toast-pop {
      0% { transform: translateY(-10px) scale(0.95); opacity: 0.5; }
      40% { transform: translateY(2px) scale(1.02); opacity: 1; }
      60% { transform: translateY(-2px) scale(0.98); }
      100% { transform: translateY(0) scale(1); }
    }
    .animate-toast-pop {
      animation: toast-pop 0.4s ease-out;
    }
  `;
  document.head.appendChild(style);
}
