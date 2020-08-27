import React from "react";

export default function ServerError() {
  return (
    <div
      style={{
        marginTop: 150,
        height: "100vh",

        backgroundColor: "#ffffdd",
      }}
    >
      <title>Site Maintenance</title>

      <article>
        <h1 style={{ color: "red" }}>We’ll be back soon!</h1>
        <div>
          <p style={{ fontSize: 50 }}>503 Service Unavailable</p>
          <p>The server is temporarily busy, try again later!</p>
        </div>
      </article>
    </div>
  );
}
