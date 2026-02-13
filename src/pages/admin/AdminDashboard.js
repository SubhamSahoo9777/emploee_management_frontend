import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import api from "../../api/axiosInstance";
import { Users, CheckCircle, Clock, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/analytics/summary");
        console.log(data);
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Employees",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Present Today",
      value: stats?.presentToday || 0,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Pending Leaves",
      value: stats?.pendingLeaves || 0,
      icon: Clock,
      color: "bg-amber-500",
    },
    {
      title: "Monthly Expense",
      value: `$${stats?.totalPayroll || 0}`,
      icon: DollarSign,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-8 text-slate-800">
        Administrator Console
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4"
          >
            <div className={`${card.color} p-3 rounded-lg text-white`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase font-semibold">
                {card.title}
              </p>
              <h3 className="text-2xl font-bold">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-6 text-slate-800">
          Payroll Trend (USD)
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats?.chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
