import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { api } from "./Staff/api";
export default class LoginForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",

      nameErr: "",
      passErr: "",
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
          console.log(res);
          if (res.data.accessToken) {
            localStorage.setItem("token", res.data.accessToken);
            this.props.onIsLogin(res.data.data);
          } else if (res.data.message === "Wrong password!") {
            this.setState({
              passErr: res.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err + "");
          if (err.response) {
            if (err.response.status === 401) {
              this.setState({
                passErr: "name or password Wrong!",
              });
            } else if (err.response.status === 429) {
              alert("Please don't submit too fast");
            }
          }
        });
    }
  };
  render() {
    const { username, password, nameErr, passErr } = this.state;
    if (this.props.isLogin) {
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
