import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NavMenu from "./components/NavMenu";
import NotFound from "./components/NotFound";
import FindUser from "./components/Staff/FindUser";

import Rate from "./components/Staff/Rate";
import StaffManager from "./components/Staff/StaffManager";
import Verify from "./components/Staff/Verify";
import LoginForm from "./components/LoginForm";
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.isLogin ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);
class App extends Component {
  constructor() {
    super();
    const token = localStorage.getItem("token");
    const isLogin = token !== null ? true : false;

    this.state = {
      isLogin,
    };
  }
  onIsLogin = () => {
    this.setState({
      isLogin: true,
    });
  };
  render() {
    let { isLogin } = this.state;
    return (
      <div className="App">
        <NavMenu isLogin={isLogin} />

        <Switch>
          <Route exact path="/">
            <LoginForm onIsLogin={this.onIsLogin} isLogin={isLogin} />
          </Route>
          <Route path="/login">
            <LoginForm onIsLogin={this.onIsLogin} isLogin={isLogin} />
          </Route>
          <PrivateRoute path="/verify" component={Verify} isLogin={isLogin} />
          <PrivateRoute
            path="/staffmanager"
            component={StaffManager}
            isLogin={isLogin}
          />
          <PrivateRoute
            path="/find-user"
            component={FindUser}
            isLogin={isLogin}
          />
          <PrivateRoute path="/rate" component={Rate} isLogin={isLogin} />

          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
