import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutbBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const logoutHandler = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const status = await authService.logout();

      if (status) {
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout :: error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={logoutHandler}
      disabled={loading}
      className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 hover:text-red-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
    >
      <svg
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M21 19V5a2 2 0 00-2-2h-6" />
      </svg>

      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}

export default LogoutbBtn;
