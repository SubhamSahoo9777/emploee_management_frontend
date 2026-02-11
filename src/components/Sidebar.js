import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, UserCheck, CalendarDays, Wallet, Users, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const links = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Attendance', path: '/attendance', icon: UserCheck },
    { name: 'Leaves', path: '/leaves', icon: CalendarDays },
    { name: 'Salary', path: '/salary', icon: Wallet },
  ];

  if (user?.role === 'ADMIN') {
    links.push({ name: 'Employees', path: '/employees', icon: Users });
  }

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-8 px-4">EMS PRO</h1>
      <nav className="flex-1 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive ? 'bg-indigo-600' : 'hover:bg-slate-800'
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>
      <button
        onClick={logout}
        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-600 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
