import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserCheck,
  CalendarDays,
  Wallet,
  Users,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const links = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Attendance", path: "/attendance", icon: UserCheck },
    { name: "Leaves", path: "/leaves", icon: CalendarDays },
    { name: "Salary", path: "/salary", icon: Wallet },
  ];

  if (user?.role === "ADMIN") {
    links.push({ name: "Employees", path: "/employees", icon: Users });
  }

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open sidebar menu"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-slate-900 text-white p-4 flex flex-col transform transition-transform duration-200 lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 min-h-screen`}
        style={{ minHeight: "100vh" }}
      >
        <div className="flex items-center justify-between mb-8 px-4 lg:px-0">
          <h1 className="text-xl font-bold">EMS PRO</h1>
          <button
            className="lg:hidden p-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex-1 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive ? "bg-indigo-600" : "hover:bg-slate-800"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logout}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-600 transition-colors mt-8"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
