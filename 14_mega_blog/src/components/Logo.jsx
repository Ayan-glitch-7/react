import React from "react";

function Logo({ width = "120px" }) {
  return (
    <div
      style={{ width }}
      className="group inline-flex items-center gap-3"
      aria-label="BlogSpace"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-200 transition-transform duration-200 group-hover:scale-105">
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          <path d="M8 7h8" />
          <path d="M8 11h6" />
        </svg>
      </div>

      <span className="whitespace-nowrap text-xl font-extrabold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-indigo-600">
        Blog<span className="text-indigo-600">Space</span>
      </span>
    </div>
  );
}

export default Logo;
