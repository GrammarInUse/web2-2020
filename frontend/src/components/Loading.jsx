import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        marginTop: 150,
        backgroundColor: "while",
      }}
    >
      <div
        className="spinner-border text-danger"
        style={{ width: "10rem", height: "10rem" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
