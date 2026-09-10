import React, { forwardRef } from "react";

const Button = forwardRef(function Button(
  {
    children,
    type = "button",
    bgColour = "bg-indigo-600",
    textColour = "text-white",
    className = "",
    disabled = false,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
      } ${bgColour} ${textColour} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
