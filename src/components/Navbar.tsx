// components/Navbar.tsx
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <nav className="bg-white shadow-md z-50 relative">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-pink-500">Couple Journal</div>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLinks user={user} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 py-4 border-t shadow-md space-y-3">
          <NavLinks user={user} isMobile />
        </div>
      )}
    </nav>
  );
}

// NavLinks Component
function NavLinks({ user, isMobile = false }: { user: any; isMobile?: boolean }) {
  const linkClass = `block ${isMobile ? "py-2" : ""} text-gray-700 hover:text-pink-500 transition`;

  return (
    <>
      <Link href="/" className={linkClass}>
        Home
      </Link>
      <Link href="/journal" className={linkClass}>
        Journal
      </Link>
      <Link href="/todo" className={linkClass}>
        Todo List
      </Link>
      <Link href="/couple-goals" className={linkClass}>
        Couple Goals
      </Link>

      {!user ? (
        <>
          <Link href="/auth/login" className={linkClass}>
            Login
          </Link>
          <Link href="/auth/signup" className={linkClass}>
            Sign Up
          </Link>
        </>
      ) : (
        <>
          <span className="text-gray-700">
            Welcome, <span className="font-semibold">{user.username}</span>
          </span>
          <Link href="/profile" className={linkClass}>
            Profile
          </Link>
        </>
      )}
    </>
  );
}
