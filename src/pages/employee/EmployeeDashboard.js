import React, { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import { Calendar, UserCheck, MapPin } from 'lucide-react';
import moment from 'moment';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get('/attendance/history');
      setHistory(data.slice(0, 5));
      const today = moment().format('YYYY-MM-DD');
      setAttendance(data.find(a => a.date === today));
    };
    fetchData();
  }, []);

  const handleAction = async (action) => {
    try {
      await api.post(`/attendance/${action}`);
      const { data } = await api.get('/attendance/history');
      setHistory(data.slice(0, 5));
      const today = moment().format('YYYY-MM-DD');
      setAttendance(data.find(a => a.date === today));
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating attendance');
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
        <p className="opacity-90">{user?.department} Department</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <UserCheck className="mr-2" /> Daily Attendance
          </h2>
          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase">Current Date</p>
                <p className="text-lg font-bold">{moment().format('MMMM Do, YYYY')}</p>
              </div>
              <MapPin className="text-indigo-600" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAction('check-in')}
                disabled={!!attendance}
                className="p-4 rounded-xl border-2 border-green-500 text-green-700 font-bold disabled:opacity-50"
              >
                CHECK IN
                <p className="text-sm font-normal">
                  {attendance?.checkIn ? moment(attendance.checkIn).format('HH:mm') : '--:--'}
                </p>
              </button>
              <button
                onClick={() => handleAction('check-out')}
                disabled={!attendance || !!attendance.checkOut}
                className="p-4 rounded-xl border-2 border-red-500 text-red-700 font-bold disabled:opacity-50"
              >
                CHECK OUT
                <p className="text-sm font-normal">
                  {attendance?.checkOut ? moment(attendance.checkOut).format('HH:mm') : '--:--'}
                </p>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Calendar className="mr-2" /> Recent Logs
          </h2>
          <div className="space-y-4">
            {history.map((log) => (
              <div key={log._id} className="flex justify-between items-center text-sm border-b pb-2">
                <span className="font-medium">{log.date}</span>
                <span className={`px-2 py-1 rounded text-xs ${log.status === 'PRESENT' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
