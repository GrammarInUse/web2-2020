import React, { Component } from "react";
import { PureComponent } from "react";

export default class NotFound extends PureComponent {
  render() {
    return (
      <div
        style={{ marginTop: 150, backgroundColor: "#ffffdd", minHeight: 400 }}
      >
        <h1
          style={{ color: "#ff5f40", marginTop: 200, display: "inline-block" }}
        >
          Không tìm thấy trang :(
        </h1>
      </div>
    );
  }
}
