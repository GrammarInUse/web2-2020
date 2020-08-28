import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { api } from "./Staff/api";
export default class NavMenu extends Component {
  render() {
    return (
      <header id="header">
        <div className="container-fluid">
          <div id="logo" className="pull-left">
            <h1>
              <Link to="/" className="scrollto">
                ADMIN PAGE
              </Link>
            </h1>
          </div>
          {this.props.isLogin ? (
            <nav id="nav-menu-container" style={{ color: "black" }}>
              <ul className="nav-menu">
                <li>
                  <Link to="/verify"> Verify </Link>
                </li>
                <li>
                  <Link to="/staffmanager"> Staff Manager </Link>
                </li>
                <li>
                  <Link to="/rate">Rate</Link>
                </li>
                <li>
                  <Link to="/find-user">List User</Link>
                </li>
                <li>
                  <Link to="/history">History</Link>
                </li>
                <li>
                  <Link to="/withDraw">Withdraw Cash</Link>
                </li>
                <li>
                  <button
                    className="btn btn-danger"
                    onClick={this.props.onIsLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          ) : (
            ""
          )}
        </div>
      </header>
    );
  }
}
