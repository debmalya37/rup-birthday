// app/couple-goals/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

interface ProgressUpdate {
  user: string;
  option: string;
  comment: string;
  date: string;
}

interface CoupleGoal {
  _id: string;
  goal: string;
  deadline: string;
  progress: any; // updated as a Map in the DB; for display, you may convert it to an object
  updates: ProgressUpdate[];
}

export default function CoupleGoalsPage() {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [coupleGoals, setCoupleGoals] = useState<CoupleGoal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<CoupleGoal | null>(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState<"add" | "history">("add");
  const [user, setUser] = useState<any>(null);

  // Load the logged-in user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchGoals = React.useCallback(async () => {
    if (!user?.username) return;

    const res = await fetch(`/api/couple-goals?username=${user.username}`);
    const data = await res.json();
    setCoupleGoals(data);
  }, [user?.username]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const addGoal = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!user) return;
  
    const res = await fetch("/api/couple-goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        goal,
        deadline,
        creator: user.username,
        lovedOne: user.lovedOne, // assuming you store this in localStorage too
      }),
    });
  
    if (res.ok) {
      setGoal("");
      setDeadline("");
      fetchGoals();
    }
  };
  

  const updateGoalProgress = async () => {
    if (!selectedGoal) return;
    const currentUser = user?.username || "user1";
    const res = await fetch(`/api/couple-goals/${selectedGoal._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ option: selectedOption, comment, user: currentUser }),
    });
    if (res.ok) {
      fetchGoals();
      setSelectedGoal(null);
      setSelectedOption("");
      setComment("");
      setActiveTab("add");
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">Couple Goals</h1>
        <form onSubmit={addGoal} className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Enter your goal..."
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <input
            placeholder="Enter deadline (YYYY-MM-DD)"
            type="date"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <button className="w-full py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
            Add Goal
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coupleGoals.map((cg) => {
            const deadlineDate = new Date(cg.deadline);
            const today = new Date();
            const diffTime = deadlineDate.getTime() - today.getTime();
            const daysLeft = Math.ceil(diffTime / (1000 * 3600 * 24));
            // For display, you can extract progress for current user and others
            const currentUser = user?.username || "User";
            const currentProgress = cg.progress[currentUser] || 0;
            // For simplicity, show progress for "other" as the sum of progress of all other keys
            const otherProgress = Object.entries(cg.progress).reduce(
              (acc, [key, value]) => (key === currentUser ? acc : acc + Number(value)),
              0
            );
            return (
              <div
                key={cg._id}
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                onClick={() => {
                  setSelectedGoal(cg);
                  setActiveTab("add");
                }}
              >
                <h2 className="text-2xl font-semibold text-gray-800">{cg.goal}</h2>
                <p className="text-gray-700 mt-2">
                  Deadline: {new Date(cg.deadline).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mt-2">Days Left: {daysLeft}</p>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    {currentUser}: {currentProgress}% | Other: {otherProgress}%
                  </p>
                  <div className="flex space-x-2 mt-1">
                    <div className="w-1/2 bg-gray-300 rounded-full h-4">
                      <div
                        className="bg-blue-500 h-4 rounded-full"
                        style={{ width: `${currentProgress}%` }}
                      ></div>
                    </div>
                    <div className="w-1/2 bg-gray-300 rounded-full h-4">
                      <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{ width: `${otherProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for updating goal progress */}
        {selectedGoal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 mx-4 md:mx-0 max-w-lg w-full">
              <h2 className="text-2xl font-bold text-pink-600 mb-4">{selectedGoal.goal}</h2>
              <div className="flex border-b border-gray-300 mb-4">
                <button
                  onClick={() => setActiveTab("add")}
                  className={`px-4 py-2 ${
                    activeTab === "add" ? "text-pink-500 border-b-2 border-pink-500" : "text-gray-500"
                  }`}
                >
                  Add Progress
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`px-4 py-2 ${
                    activeTab === "history" ? "text-pink-500 border-b-2 border-pink-500" : "text-gray-500"
                  }`}
                >
                  Progress History
                </button>
              </div>

              {activeTab === "add" && (
                <>
                  <p className="mb-4">Have you done something today to achieve this goal?</p>
                  <div className="space-y-2 mb-4">
                    {["yes", "no", "gonna do", "other"].map((option) => (
                      <div key={option} className="flex items-center">
                        <input
                          type="radio"
                          id={option}
                          name="progressOption"
                          value={option}
                          checked={selectedOption === option}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          className="mr-2"
                        />
                        <label htmlFor={option} className="capitalize">
                          {option === "yes"
                            ? "Yes"
                            : option === "no"
                            ? "No"
                            : option === "gonna do"
                            ? "Gonna do"
                            : "Other"}
                        </label>
                      </div>
                    ))}
                  </div>
                  {selectedOption && (
                    <input
                      type="text"
                      placeholder={
                        selectedOption === "yes"
                          ? "What have you done?"
                          : selectedOption === "no"
                          ? "Why didn't you?"
                          : selectedOption === "gonna do"
                          ? "What are you planning to do?"
                          : "Please specify"
                      }
                      className="w-full p-2 mb-4 border border-gray-300 rounded"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  )}
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setSelectedGoal(null)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={updateGoalProgress}
                      className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
                    >
                      Done
                    </button>
                  </div>
                </>
              )}

              {activeTab === "history" && (
                <div className="max-h-96 overflow-y-auto">
                  {selectedGoal.updates.length === 0 ? (
                    <p className="text-gray-500">No progress updates yet.</p>
                  ) : (
                    selectedGoal.updates.map((update, idx) => (
                      <div key={idx} className="mb-3 p-3 border border-gray-200 rounded">
                        <p className="text-sm text-gray-600">
                          <span className="font-bold">{update.user}</span> - {update.option}
                        </p>
                        <p className="text-gray-700">{update.comment}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(update.date).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setSelectedGoal(null)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
