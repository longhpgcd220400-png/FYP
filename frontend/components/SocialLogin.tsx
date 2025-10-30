"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function SocialLogin() {
  return (
    <div className="social-container p-6 bg-white/10 rounded-xl shadow-lg mt-6">
      <h2 className="text-lg font-semibold text-center mb-4 text-white">
        Or continue with
      </h2>

      <div className="flex flex-col gap-3">
        {/* Google */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full py-3 rounded-lg bg-white text-gray-800 font-medium shadow hover:bg-gray-200 flex items-center justify-center gap-3 transition"
        >
          <FcGoogle size={20} /> Google
        </button>

        {/* Facebook */}
        <button
          onClick={() => signIn("facebook", { callbackUrl: "/" })}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 flex items-center justify-center gap-3 transition"
        >
          <FaFacebookF size={18} /> Facebook
        </button>

        {/* Email */}
        <button
          onClick={() => signIn("email", { callbackUrl: "/" })}
          className="w-full py-3 rounded-lg bg-gray-700 text-white font-medium shadow hover:bg-gray-800 flex items-center justify-center gap-3 transition"
        >
          <MdEmail size={20} /> Continue with Email
        </button>

        {/* Guest */}
        <button
          onClick={() => (window.location.href = "/")}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium shadow hover:opacity-90 flex items-center justify-center gap-3 transition"
        >
          <FaUserAlt size={16} /> Continue as Guest
        </button>
      </div>
    </div>
  );
}
