import React from "react";

function Logo({ width = "130px", className = "" }) {
  return (
    <img
      src="/logo.webp"
      alt="Ayan Blog"
      width={width}
      className={`object-contain ${className}`}
    />
  );
}

export default Logo;
