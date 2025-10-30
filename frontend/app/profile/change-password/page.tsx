"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        toast.error("⚠️ Please log in first!");
        setLoading(false);
        return;
      }

      const { username } = JSON.parse(storedUser);
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, oldPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "❌ Failed to change password");
      } else {
        toast.success("✅ Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
      }
    } catch {
      toast.error("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  text-white p-6">
      <form
        onSubmit={handleChangePassword}
        className="bg-black/60 border border-pink-500/30 rounded-2xl p-8 shadow-lg w-full max-w-md backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
          Change Password
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-pink-300">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black/50 border border-pink-400 text-pink-100 focus:ring-2 focus:ring-pink-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-pink-300">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black/50 border border-pink-400 text-pink-100 focus:ring-2 focus:ring-pink-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-400 font-semibold text-white hover:opacity-90 transition-all disabled:opacity-60"
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                Changing
                <span className="loading-dots">
                  <span>.</span><span>.</span><span>.</span>
                </span>
              </span>
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
