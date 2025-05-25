import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Assets from "./pages/Assets";
import Purchases from "./pages/Purchases";
import Transfers from "./pages/Transfers";
import Assignments from "./pages/Assignments";
import Expenditures from "./pages/Expenditures";
import Logs from "./pages/Logs";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
console.log("User in App.js:", user); // ✅ Debug here

  return (
    <Router>
      {user && <Navbar />}
       {user && <Sidebar role={user.role} />}
      <div className="app-layout">
        {/* {user && <Sidebar role={user.role} />} */}
        {/* Main content container with margin-left for sidebar */}
        <main className="main-content">
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/login" replace />} />
            <Route
              path="/dashboard"
              element={
                user ? (
                  <ProtectedRoute allowedRoles={['Admin', 'BaseCommander', 'LogisticsOfficer']}>
                    <Dashboard />
                  </ProtectedRoute>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assets"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'BaseCommander']}>
                  <Assets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchases"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'BaseCommander', 'LogisticsOfficer']}>
                  <Purchases />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transfers"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'BaseCommander', 'LogisticsOfficer']}>
                  <Transfers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assignments"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'BaseCommander']}>
                  <Assignments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expenditures"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'BaseCommander']}>
                  <Expenditures />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logs"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <Logs />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
