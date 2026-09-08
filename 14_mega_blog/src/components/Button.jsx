import React from "react";

function Button({
  children,
  type = "button",
  bgColour = "bg-blue-600",
  textColour = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg 
   ${bgColour} ${textColour} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
