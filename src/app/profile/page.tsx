// app/profile/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";

interface IUser {
  _id: string;
  username: string;
  password: string;
  lovedOne: string;
  relationshipYears: number;
  age: number;
  gender: string;
  comingOnlineTime: string;
  nextDatePlan: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<IUser | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [form, setForm] = useState({
    username: "",
    password: "",
    lovedOne: "",
    relationshipYears: "",
    age: "",
    gender: "",
    comingOnlineTime: "",
    nextDatePlan: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Load the logged-in user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setProfile(user);
      setForm({
        username: user.username || "",
        password: "",
        lovedOne: user.lovedOne || "",
        relationshipYears: user.relationshipYears ? String(user.relationshipYears) : "",
        age: user.age ? String(user.age) : "",
        gender: user.gender || "",
        comingOnlineTime: user.comingOnlineTime || "",
        nextDatePlan: user.nextDatePlan || "",
      });
    }
  }, []);

  // Fetch list of all users
  const fetchUsers = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    const res = await fetch(`/api/user/${profile._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Profile updated successfully.");
      setProfile(data);
      localStorage.setItem("user", JSON.stringify(data));
      fetchUsers();
    } else {
      setMessage(data.error || "Error updating profile");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Profile</h1>
        {message && <p className="mb-4 text-green-600">{message}</p>}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
            title="Username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Leave blank to keep unchanged"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Loved One</label>
            <input
              name="lovedOne"
              type="text"
              value={form.lovedOne}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your loved one's username"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Years in Relationship</label>
            <input
            title="Years in Relationship"
              name="relationshipYears"
              type="number"
              value={form.relationshipYears}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Age</label>
            <input
            title="Age"
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Gender</label>
            <input
            title="gender"
              name="gender"
              type="text"
              value={form.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Coming Online Time</label>
            <input
              name="comingOnlineTime"
              type="text"
              value={form.comingOnlineTime}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g. 8:00 PM"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Next Date Plan</label>
            <input
              name="nextDatePlan"
              type="text"
              value={form.nextDatePlan}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your next date plan"
            />
          </div>
          <button type="submit" className="w-full py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
            Update Profile
          </button>
        </form>

        <h2 className="text-2xl font-bold text-pink-600 mb-4">All Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((u) => {
            // Determine if u is coupled with the current user.
            // We consider them coupled if:
            // (a) u.lovedOne equals the current user's username AND current user's lovedOne equals u.username.
            const isCoupled =
              (u.lovedOne && profile?.lovedOne && u.lovedOne === profile.username && profile.lovedOne === u.username) ||
              false;
            // Also show "Engaged" if the user has a lovedOne but not matched with current user.
            const isEngaged = u.lovedOne && !isCoupled;
            return (
              <div key={u._id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{u.username}</span>
                  {isCoupled && (
                    <span className="text-red-500" title="Coupled">
                      ♥
                    </span>
                  )}
                  {isEngaged && !isCoupled && (
                    <span className="text-gray-500 text-xs">(Engaged)</span>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {u.lovedOne ? `Loves: ${u.lovedOne}` : "No partner yet"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
