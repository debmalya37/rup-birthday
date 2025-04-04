// components/Navbar.tsx
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-pink-500">Couple Journal</div>
        <div className="space-x-4">
          <Link href="/">
            <span className="cursor-pointer text-gray-700 hover:text-pink-500">Home</span>
          </Link>
          <Link href="/journal">
            <span className="cursor-pointer text-gray-700 hover:text-pink-500">Journal</span>
          </Link>
          <Link href="/todo">
            <span className="cursor-pointer text-gray-700 hover:text-pink-500">Todo List</span>
          </Link>
          <Link href="/couple-goals">
            <span className="cursor-pointer text-gray-700 hover:text-pink-500">Couple Goals</span>
          </Link>
          {!user && (
            <>
              <Link href="/auth/login">
                <span className="cursor-pointer text-gray-700 hover:text-pink-500">Login</span>
              </Link>
              <Link href="/auth/signup">
                <span className="cursor-pointer text-gray-700 hover:text-pink-500">Sign Up</span>
              </Link>
            </>
          )}
          {user && <> <span className="text-gray-700">Welcome, 
              
            {user.username}</span>
            <Link href="/profile">
              <span className="cursor-pointer text-gray-700 hover:text-pink-500">Profile</span>
            </Link>
            </>
            }
        </div>
      </div>
    </nav>
  );
}
