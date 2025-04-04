// app/todo/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

interface Todo {
  _id: string;
  task: string;
  completed: boolean;
}

export default function TodoPage() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const res = await fetch("/api/todo");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });
    if (res.ok) {
      setTask("");
      fetchTodos();
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Daily Todo List</h1>
        <form onSubmit={addTodo} className="flex mb-4">
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button type="submit" className="bg-pink-500 text-white px-4 rounded-r-md">
            Add
          </button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="p-2 border-b border-gray-200 flex justify-between items-center"
            >
              <span className={`${todo.completed ? "line-through" : ""}`}>
                {todo.task}
              </span>
              {/* Optionally add a button to mark tasks complete */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
