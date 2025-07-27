import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { mutate: loginMutation, isPending: isLoading } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/user/login", data);
      if (response?.status == 200 || response?.status == 201) {
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
      }
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("User Logged in");
      setEmail("");
      setPassword("");
      queryClient.invalidateQueries({ queryKey: ["userdata"] });
      window.location.href = "/";
    },
    onError: (error) => {
      toast.error("something went wrong");
      toast.error(error?.response?.data?.message || "something went wrong");
    },
  });
  const handleSubmit = () => {
    if (!email || !password) {
      toast.error("All fields are required");
    } else {
      loginMutation({
        email: email,
        password: password,
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-sans">
      <div className="backdrop-blur-lg bg-white/10 border border-white/30 rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Resume Matcher</h2>

        <form>
          <div className="mb-4">
            <label className="block text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 rounded-lg transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
