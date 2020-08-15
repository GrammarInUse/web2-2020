import React, { Component } from "react";
import axios from "axios";

export default class upload extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
    };
  }
  onChange = (e) => {
    e.preventDefault();

    this.setState({
      file: e.target.files[0],
    });
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.file) {
      alert("ban chua chon file");
      return;
    }
    const formData = new FormData();
    formData.append("file", this.state.file);
    fetch("http://localhost:8080/customers/upload", {
      mode: 'no-cors',
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
        "type": "formData"
      },
      body: this.state
    }).then(function (res) {
      if (res.ok) {
        alert("Perfect! ");
      } else if (res.status == 401) {
        alert("Oops! ");
      }
    }, function (e) {
      alert("Error submitting form!");
    });
  }

  render() {
    console.log(this.state.file);
    return (
      <div
        style={{
          marginTop: 150,
          height: "auto",
          minHeight: "100%",
          backgroundColor: "#ffffdd",
        }}
      >
        <form encType="multipart/form-data" onSubmit={this.onSubmit}>
          <input type="file" onChange={this.onChange} multiple />
          <button type="submit">upload</button>
        </form>
      </div>
    );
  }
}
