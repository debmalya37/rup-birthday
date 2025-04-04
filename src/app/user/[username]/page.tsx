"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
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

// `params` comes from the dynamic route [username]
export default function ProfilePage({ params }: { params: { username: string } }) {
  const [profile, setProfile] = useState<IUser | null>(null);
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
  const [isEditable, setIsEditable] = useState(false);

  const usernameFromParams = params.username;

  useEffect(() => {
    if (usernameFromParams) {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        const parsedUser = JSON.parse(localUser);
        if (parsedUser.username === usernameFromParams) {
          setIsEditable(true);
        }
      }
      fetchUserProfile(usernameFromParams);
    }
  }, [usernameFromParams]);

  const fetchUserProfile = async (username: string) => {
    const res = await fetch(`/api/profile/${username}`);
    const data = await res.json();
    if (res.ok) {
      setProfile(data);
      setForm({
        username: data.username || "",
        password: "",
        lovedOne: data.lovedOne || "",
        relationshipYears: data.relationshipYears ? String(data.relationshipYears) : "",
        age: data.age ? String(data.age) : "",
        gender: data.gender || "",
        comingOnlineTime: data.comingOnlineTime || "",
        nextDatePlan: data.nextDatePlan || "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    if (!isEditable) {
      setMessage("You are not authorized to update this profile.");
      return;
    }

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
    } else {
      setMessage(data.error || "Error updating profile");
    }
  };

  const renderInput = (label: string, name: keyof typeof form, type = "text", placeholder = "", disabled = false) => (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );

  const renderReadonly = (label: string, value: string | number | undefined) => (
    <div className="mb-2">
      <p className="text-gray-600 font-semibold">{label}:</p>
      <p className="text-gray-800 mb-2">{value || "-"}</p>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Profile</h1>
        {message && <p className="mb-4 text-green-600">{message}</p>}
        {profile && (
          isEditable ? (
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-8">
              {renderInput("Username", "username", "text", "", true)}
              {renderInput("Password", "password", "password", "Leave blank to keep unchanged")}
              {renderInput("Loved One", "lovedOne")}
              {renderInput("Years in Relationship", "relationshipYears", "number")}
              {renderInput("Age", "age", "number")}
              {renderInput("Gender", "gender")}
              {renderInput("Coming Online Time", "comingOnlineTime", "text", "e.g. 8:00 PM")}
              {renderInput("Next Date Plan", "nextDatePlan")}
              <button
                type="submit"
                className="w-full py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
              >
                Update Profile
              </button>
            </form>
          ) : (
            <div className="bg-gradient-to-br from-pink-100 via-rose-50 to-red-100 p-6 rounded-3xl shadow-lg border border-pink-200 max-w-2xl mx-auto">
  <div className="text-center mb-6">
    <h2 className="text-4xl font-extrabold text-rose-600 mb-2">💑 {profile.username}&#39;s Love Story</h2>
    <p className="text-rose-500 italic">Celebrating love, one heartbeat at a time 💖</p>
  </div>

  <div className="space-y-4 text-lg">
    {renderReadonly("💘 Username", profile.username)}
    {renderReadonly("❤️ Loved One", profile.lovedOne)}
    {renderReadonly("⏳ Years in Relationship", profile.relationshipYears)}
    {renderReadonly("🎂 Age", profile.age)}
    {renderReadonly("🚻 Gender", profile.gender)}
    {renderReadonly("🕗 Coming Online Time", profile.comingOnlineTime)}
    {renderReadonly("🌹 Next Date Plan", profile.nextDatePlan)}
  </div>

  <div className="mt-8 text-center">
    <p className="text-pink-600 font-semibold text-xl">
      Love is in the air... 💞
    </p>
  </div>
</div>

          )
        )}
      </div>
    </>
  );
}
