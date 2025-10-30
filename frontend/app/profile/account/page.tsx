"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AccountInformation() {
  const { data: session } = useSession();
  const [localUser, setLocalUser] = useState<any>(null);

  useEffect(() => {
    if (!session) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setLocalUser(JSON.parse(storedUser));
      }
    }
  }, [session]);

  const user = session?.user || localUser;

  return (
    <div className="min-h-screen text-white pt-32 px-6">
      <div className="max-w-2xl mx-auto bg-black/40 border border-pink-500/30 rounded-2xl p-8 shadow-lg backdrop-blur-md">
        <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent text-center">
          Account Information
        </h1>

        <div className="space-y-6">
          <div>
            <p className="text-pink-300 font-semibold">Name:</p>
            <p>{user?.name || user?.username || "—"}</p>
          </div>

          <div>
            <p className="text-pink-300 font-semibold">Email:</p>
            <p>{user?.email}</p>
          </div>

          <div>
            <p className="text-pink-300 font-semibold">Login Type:</p>
            <p>
              {session
                ? session.user?.image
                  ? "OAuth (Google/Facebook)"
                  : "NextAuth User"
                : "Local Account"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
