import React from "react";

function Logo({ width = "130px", className = "" }) {
  return (
    <img
      src="/logo.png"
      alt="Ayan"
      width={width}
      className={`h-auto object-contain ${className}`}
    />
  );
}

export default Logo;
