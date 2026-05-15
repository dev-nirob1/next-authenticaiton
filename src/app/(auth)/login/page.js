"use client";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";

const Login = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const res = await fetch("http://localhost:3000/api/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        alert(data.message);
        router.push("/");
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl mx-auto p-4 space-y-4 border">
        <form onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="block p-2 border"
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className="block p-2 border"
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
            />
          </div>
          <button
            className="cursor-pointer bg-blue-500 text-white p-2 rounded w-full mt-2"
            type="submit"
          >
            Login
          </button>
        </form>
        <div>
          <button className="cursor-pointer bg-red-500 text-white p-2 rounded w-full mt-2">
            Google
          </button>
          <p className="text-center text-sm text-gray-500 mt-2">
            Dont have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
