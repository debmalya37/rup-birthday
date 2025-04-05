// app/auth/signup/page.tsx
"use client";
import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "", // ✅ added
    lovedOne: "",
    relationshipYears: "",
    age: "",
    gender: "",
    comingOnlineTime: "",
    nextDatePlan: "",
  });
  
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/auth/login");
    } else {
      setError(data.error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">Sign Up</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            name="lovedOne"
            type="text"
            placeholder="Whom do you love?"
            value={form.lovedOne}
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            name="relationshipYears"
            type="number"
            placeholder="Years in relationship"
            value={form.relationshipYears}
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            name="age"
            type="number"
            placeholder="Your age"
            value={form.age}
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            name="gender"
            type="text"
            placeholder="Gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            name="comingOnlineTime"
            type="text"
            placeholder="Timing of coming online"
            value={form.comingOnlineTime}
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            name="nextDatePlan"
            type="text"
            placeholder="Next date plan"
            value={form.nextDatePlan}
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
