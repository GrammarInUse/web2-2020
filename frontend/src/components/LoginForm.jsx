import React, { Component } from "react";
import { PureComponent } from "react";

export default class LoginForm extends PureComponent {
  render() {
    return (
      <div>
        <div id="id01" className="modal">
          <form className="modal-content animate" onSubmit={this.submitHandler}>
            <div className="imgcontainer">
              <span
                onClick={() =>
                  (document.getElementById("id01").style.display = "none")
                }
                className="close"
                title="Close Modal"
              >
                ×
              </span>
              <img
                src="img/clients/client-1.png"
                alt="Avatar"
                className="avatar"
              />
            </div>
            <div className="container row">
              <label htmlFor="uname">
                <b>Username</b>
              </label>
              <input
                type="text"
                onChange={this.changeHandler}
                placeholder="Enter Username"
                name="username"
                required
              />
              <br />
              <label htmlFor="psw">
                <b>Password</b>
              </label>
              <input
                type="password"
                onChange={this.changeHandler}
                placeholder="Enter Password"
                name="password"
                required
              />
              <br />
              <button className="btnSubmit" type="submit">
                Login
              </button>
              <br />
              <label>
                <input
                  type="checkbox"
                  defaultChecked="checked"
                  name="remember"
                />{" "}
                Remember me
              </label>
            </div>
            <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
              <button
                type="button"
                onClick={() =>
                  (document.getElementById("id01").style.display = "none")
                }
                className="cancelbtn"
              >
                Cancel
              </button>
              <span className="psw">
                Forgot{" "}
                <a style={{ color: "black" }} href="#">
                  password?
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
