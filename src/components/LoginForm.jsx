import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { api } from "./Staff/api";
import Notification from "./Staff/Notification";
export default class LoginForm extends PureComponent {
  constructor() {
    super();
    let isLogin = false;
    if (localStorage.getItem("token")) {
      isLogin = true;
    }
    this.state = {
      username: "",
      password: "",

      nameErr: "",
      passErr: "",
      isLogin,
    };
  }

  onChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
      nameErr: "",
      passErr: "",
    });
  };
  isValid = () => {
    let { username, password } = this.state;
    let nameErr = "";
    let passErr = "";
    if (username === "") {
      nameErr = "user name is not valid";
    }
    if (password === "") {
      passErr = "user name is not valid";
    }
    if (nameErr !== "" || passErr !== "") {
      this.setState({
        nameErr,
        passErr,
      });
      return false;
    }
    return true;
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      api
        .post("/login", this.state)
        .then((res) => {
          if (res.data.data) {
            if (res.data.data.isBlocked) {
              Notification("Account is blocked!!!", "error", false);
              return;
            }
          }
          if (res.data.accessToken) {
            localStorage.setItem("token", res.data.accessToken);
            this.setState({
              isLogin: true,
            });
          } else if (res.data.message === "Wrong password!") {
            this.setState({
              passErr: res.data.message,
              isLogin: false,
            });
          }
        })
        .catch((err) => {
          console.log(err + "");
          if (err.response) {
            if (err.response.status === 401) {
              this.setState({
                passErr: "name or password Wrong!",
                isLogin: false,
              });
            } else if (err.response.status === 429) {
              Notification("Plese dont submit too fast!!!", "default", 3000);
            }
          }
        });
    }
  };
  render() {
    const { username, password, nameErr, passErr, isLogin } = this.state;

    if (isLogin) {
      return <Redirect to="/staffmanager" />;
    }
    return (
      <div
        style={{
          width: "50%",
          height: "60%",
          marginLeft: "25%",
          marginTop: 150,
          backgroundColor: "#e8ded2",
        }}
      >
        <h2>Login Form</h2>
        <form
          style={{
            height: "300px",
          }}
          onSubmit={this.onSubmit}
        >
          <label>Username</label>
          <input
            class="form-control"
            type="text"
            name="username"
            value={username}
            onChange={this.onChange}
          />
          <span style={{ color: "red" }}>{nameErr}</span>
          <br />
          <label>Password</label>
          <input
            class="form-control"
            type="password"
            name="password"
            value={password}
            onChange={this.onChange}
          />
          <span style={{ color: "red" }}>{passErr}</span>
          <br />
          <button
            style={{ marginTop: 15 }}
            className="btn btn-primary"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}
