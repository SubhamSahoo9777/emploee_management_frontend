import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";

const DashboardRedirect = () => {
  const { user } = useAuth();
  return user?.role === "ADMIN" ? <AdminDashboard /> : <EmployeeDashboard />;
};

const Layout = ({ children }) => (
  <div className="flex bg-gray-50 min-h-screen">
    <Sidebar />
    <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">{children}</main>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <Layout>
                  <DashboardRedirect />
                </Layout>
              }
            />
            <Route
              path="/attendance"
              element={
                <Layout>
                  <EmployeeDashboard />
                </Layout>
              }
            />
            {/* Additional shared routes would go here */}
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            {/* Admin only routes */}
            <Route
              path="/employees"
              element={
                <Layout>
                  <AdminDashboard />
                </Layout>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
