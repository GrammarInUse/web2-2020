import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
export default class LoginForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  onChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onIsLogin();
  };
  render() {
    const { username, password } = this.state;
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
          <label>UserName</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.onChange}
          />
          <label>PassWord</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.onChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
