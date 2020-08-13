import React, { Component } from "react";
import { PureComponent } from "react";
import {api} from "./api"
import { Redirect,useHistory } from "react-router-dom";
export default class LoginForm extends PureComponent {
  constructor(){
    super()
    this.state = {
      username:"",
      password:"",
      
      
    };
  }
  closeForm=()=>{
   this.props.onToggleForm(1);
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler =async (e) => {
    e.preventDefault();
    console.log(this.state)
    await api.post('/customers/login',this.state).then((res)=>{
      localStorage.setItem("token",res.data.token)
      this.closeForm();
    return <Redirect to="/verify" />;
    })

 
  };
  render() {
    return (
      <div>
        <div id="id01" >
          <form className="modal-content animate" onSubmit={this.submitHandler}>
            <div className="imgcontainer">
              <span
               onClick={this.closeForm}
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
              onClick={this.closeForm}
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
