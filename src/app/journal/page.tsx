// app/journal/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

interface JournalEntry {
  _id: string;
  title: string;
  content: string;
  date: string;
}

export default function JournalPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const fetchEntries = async () => {
    const res = await fetch("/api/journal");
    const data = await res.json();
    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const addEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      setTitle("");
      setContent("");
      fetchEntries();
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">Couple Journal</h1>
        <form onSubmit={addEntry} className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Write your thoughts..."
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="w-full py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
            Add Journal Entry
          </button>
        </form>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry._id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800">{entry.title}</h2>
              <p className="text-gray-700 mt-2">{entry.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(entry.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
