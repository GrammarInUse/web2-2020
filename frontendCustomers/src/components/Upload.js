import React, { Component } from "react";
import axios from "axios";

export default class upload extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      avatar: ""
    };
  }
  
  onChange = (e) => {
    e.preventDefault();

    this.setState({
      file: e.target.files[0],
    });
  };

  onSubmit = (e) => {
    //FrontSIDE IDENTIFY
    e.preventDefault();

    if (!this.state.file) {
      alert("ban chua chon file");
      return;
    }
    const formData = new FormData();
    formData.append("file", this.state.file);

    console.log(formData.get("file"));
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      }
    };
    //console.log(formData);
    axios
      .post("http://localhost:8080/customers/upload/1111", formData.get("file"), config)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err + "HERE");
      });
  };

  clickHandler = (e) => {
    e.preventDefault();
    const data = {
      currentUser: "2121"
    }
    const url = "http://localhost:8080/customers/getImages";
    const fetchOpts = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }

    fetch(url, fetchOpts)
    .then((response) => {
      response.json()
      .then((result) => {
        const b64 = Buffer.from(result.data.data).toString("base64");
        this.setState({
          avatar: "data:image/jpeg;base64, " + b64
        }, () => {
          console.log(b64);
        })
      })
      .catch();
    })
    .catch((err) => {
      console.error(err);
    })
  };
  
  render() {
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

        <a href="#" onClick={this.clickHandler}>CLICK VO</a>
        <img width="300" height="300" src={this.state.avatar} alt="AVATAR"/>
      </div>
    );
  }
}
