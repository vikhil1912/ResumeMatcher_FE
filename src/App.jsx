// src/App.jsx
import {
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { CandidateDashboard } from "./pages/CandidateDashboard";
import { RecruiterDashboard } from "./pages/RecruiterDashboard";
import { ErrorPage } from "./pages/ErrorPage";
import { AuthProvider } from "./contexts/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DarkModeProvider } from "./contexts/DarkModeProvider";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import EntryPage from "./pages/EntryPage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const { data: userData, isLoading } = useQuery({
    queryKey: ["userdata"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/user/me");
        setUser(JSON.parse(localStorage.getItem("user")));
        return response;
      } catch (error) {
        if (error?.response?.status === 401) {
          setUser(null);
        }
        return null;
      }
    },
  });
  useEffect(() => {
    const t = userData;
    console.log(t);
  }, []);

  return (
    <AuthProvider>
      <DarkModeProvider>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              !user ? (
                <EntryPage />
              ) : (
                <Navigate
                  to={`/${user.role == "HR" ? "recruiter" : "student"}`}
                />
              )
            }
          />
          <Route path="/auth" element={<HomePage />} />
          <Route
            path="/student"
            element={
              <ProtectedRoute requiredRole="Student" user={user}>
                <CandidateDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter"
            element={
              <ProtectedRoute requiredRole="HR" user={user}>
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={user ? <Navigate to={"/"} /> : <LoginPage />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to={"/"} /> : <SignUpPage />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </DarkModeProvider>
    </AuthProvider>
  );
}
