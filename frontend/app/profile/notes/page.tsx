"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

interface Note {
  _id?: string;
  title: string;
  content: string;
  createdAt?: string;
}

export default function NotesPage() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [localUser, setLocalUser] = useState<any>(null);

  // 🟣 Lấy thông tin user từ localStorage hoặc session NextAuth
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setLocalUser(parsed);
      fetchNotes(parsed._id);
    } else if (session?.user) {
      setLocalUser(session.user);
      fetchNotes((session.user as any).id || session.user.email);
    }
  }, [session]);

  // 🟢 Lấy ghi chú
  const fetchNotes = async (userId: string) => {
    if (!userId) return;
    const res = await fetch(`/api/notes?userId=${userId}`);
    const data = await res.json();
    setNotes(data);
  };

  // 🟢 Thêm ghi chú
  const handleAddNote = async () => {
    if (!title || !content) {
      toast.error("Please fill all fields");
      return;
    }

    const userId =
      localUser?._id || (session?.user as any)?.id || (session?.user as any)?.email;

    if (!userId) {
      toast.error("You must be logged in!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          title,
          content,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add note");

      setNotes([data, ...notes]);
      setTitle("");
      setContent("");
      toast.success("📝 Note added successfully!");
    } catch (err) {
      toast.error("Failed to save note");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Xóa ghi chú
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    await fetch(`/api/notes?id=${id}`, { method: "DELETE" });
    setNotes(notes.filter((n) => n._id !== id));
    toast.success("🗑️ Note deleted");
  };

  // 🟢 Cập nhật ghi chú
  const handleUpdate = async (id: string, newTitle: string, newContent: string) => {
    const res = await fetch("/api/notes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title: newTitle, content: newContent }),
    });

    if (res.ok) {
      toast.success("✅ Note updated");
      fetchNotes(localUser?._id || (session?.user as any)?.id);
    } else {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen text-white px-4 pt-[130px] pb-16">
      <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">
        My Notes
      </h1>

      <div className="max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-3 rounded-md bg-black/40 border border-pink-400 text-pink-200 placeholder-pink-300"
        />
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-4 p-3 h-40 rounded-md bg-black/40 border border-pink-400 text-pink-200 placeholder-pink-300"
        />
        <button
          onClick={handleAddNote}
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold py-3 rounded-md shadow-lg hover:opacity-90 transition"
        >
          {loading ? "Adding..." : "Add Note"}
        </button>
      </div>

      <div className="max-w-2xl mx-auto mt-8 space-y-4">
        {notes.length === 0 && (
          <p className="text-center text-pink-300 italic mt-10">No notes yet ✍️</p>
        )}

        {notes.map((note) => (
          <div
            key={note._id}
            className="p-4 rounded-lg bg-black/40 border border-pink-400 shadow-md hover:shadow-pink-500/30 transition"
          >
            <div className="flex justify-between items-center mb-2">
              <input
                type="text"
                value={note.title}
                onChange={(e) =>
                  handleUpdate(note._id!, e.target.value, note.content)
                }
                className="w-full bg-transparent text-xl font-semibold outline-none text-pink-300"
              />
              {note.createdAt && (
                <span className="text-xs text-yellow-400 ml-2">
                  {new Date(note.createdAt).toLocaleString()}
                </span>
              )}
            </div>
            <textarea
              value={note.content}
              onChange={(e) =>
                handleUpdate(note._id!, note.title, e.target.value)
              }
              className="w-full bg-transparent text-pink-200 outline-none resize-none"
            />
            <button
              onClick={() => handleDelete(note._id!)}
              className="text-red-400 hover:text-red-600 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
