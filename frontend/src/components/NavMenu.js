import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
export default class NavMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      id: null,
      login: false,
      token: null,
      store: null,

      status: "",

      username: null,
      password: null,
      email: null,
      bankBranchId: 1,
      dOB: null,
      sex: 1,
      phone: null,
    };
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log("FETCHING LOGIN: ");
    fetch("https://s-ebanking-api.herokuapp.com/customers/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        response
          .json()
          .then((result) => {
            console.log("RESULT: ");
            console.warn(result);

            this.setState({
              status: result.message,
            });

            if (result.token) {
              localStorage.setItem(
                "login",
                JSON.stringify({
                  token: result.token,
                  login: true,
                  currentUser: result.customerId,
                })
              );
              this.storeCollectorLogin();
              window.location.reload();
            }
            alert(this.state.status);
          })
          .catch(console.log("ERROR"));
      })
      .catch((err) => {
        console.log("Something went wrong when you fetch something!" + err);
      });
  };

  submitSignupHandler = (e) => {
    e.preventDefault();
    console.log("SIGN UP ACCOUNT");
    fetch("https://s-ebanking-api.herokuapp.com/customers/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        response
          .json()
          .then((result) => {
            this.setState({
              message: result.message,
            });
            alert(result.message);
          })
          .catch((err) => {
            console.log("ERROR RESPONSE TO JSON RESULT SIGN UP! " + err);
          });
      })
      .catch((err) => {
        console.log("FETCH ERROR SIGN UP! " + err);
      });
  };

  storeCollectorLogin = () => {
    console.log("STORE COLLECTOR!!!");
    try {
      let store = JSON.parse(localStorage.getItem("login"));

      if (store && store.login) {
        this.setState({
          store,
          login: true,
          status: store.message,
        });
      }
    } catch (err) {
      console.log("FAILED WHEN you use store collector login ");
    }
  };

  logoutHandler = (e) => {
    localStorage.removeItem("login");
    window.location.reload();
  };

  componentDidMount() {
    console.log("COMPONENT DID MOUNT");
    this.storeCollectorLogin();
  }

  render() {
    return (
      <header id="header">
        <div className="container-fluid">
          <div id="logo" className="pull-left">
            <h1>
              <Link to="/intros" className="scrollto">
                E-Banking
              </Link>
            </h1>
            {/* Uncomment below if you prefer to use an image logo */}
            {/* <a href="#intro"><img src="img/logo.png" alt="" title="" /></a>*/}
          </div>
          <nav id="nav-menu-container">
            <ul className="nav-menu">
              <li>
                <Link to="/verify"> Verify </Link>
              </li>
              <li>
                <Link to="/"> Home </Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>

              <li className="menu-has-children">
                {this.state.login ? (
                  <Link to="/profile" style={{ width: "auto" }}>
                    Hello, {this.props.fullName}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      (document.getElementById("id01").style.display = "block")
                    }
                    style={{ width: "auto" }}
                  >
                    Login
                  </button>
                )}
                <LoginForm />
              </li>
              {this.state.login ? (
                <li>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={this.logoutHandler}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      (document.getElementById("id02").style.display = "block")
                    }
                  >
                    Sign Up
                  </button>

                  <SignupForm />
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
