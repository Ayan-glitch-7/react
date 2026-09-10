import React, { forwardRef } from "react";

const Select = forwardRef(function Select(
  { options = [], label, className = "", ...props },
  ref,
) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block pl-1 text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          className={`w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-700 shadow-sm outline-none transition-all duration-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 ${className}`}
          {...props}
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>

        {/* Custom arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
});

export default Select;
