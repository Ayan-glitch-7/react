import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { login as authLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import { Button, Input, Logo } from "./index";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const login = async (data) => {
    setError("");
    setLoading(true);

    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          {/* Top Accent */}
          <div className="h-1.5 bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-600" />

          <div className="p-7 sm:p-10">
            {/* Logo */}
            <div className="mb-7 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 p-3">
                <Logo width="100%" />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Welcome back
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to continue to your BlogSpace account.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(login)} className="mt-8">
              <div className="space-y-5">
                <div>
                  <Input
                    label="Email"
                    placeholder="you@example.com"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />

                  {errors.email && (
                    <p className="mt-1.5 pl-1 text-xs font-medium text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />

                  {errors.password && (
                    <p className="mt-1.5 pl-1 text-xs font-medium text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-indigo-600 py-3.5 font-semibold shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>

            {/* Signup */}
            <div className="mt-7 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Your account information is securely handled by Appwrite.
        </p>
      </div>
    </div>
  );
}

export default Login;
