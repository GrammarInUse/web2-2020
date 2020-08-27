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
import ServerError from "./components/ServerError";
import ModalErr from "./components/ModalErr";
import History from "./components/Staff/History";
import WithDrawMoney from "./components/Staff/WithDrawMoney";

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
    let token = localStorage.getItem("token");
    let isLogin = token ? true : false;
    super();
    this.state = {
      isLogin,
    };
  }
  onIsLogin = (data) => {
    if (data) {
      localStorage.setItem("token", data);
    }
    this.setState({
      isLogin: true,
    });
  };
  onIsLogout = () => {
    localStorage.removeItem("token");
    this.setState({
      isLogin: false,
    });
  };
  render() {
    let { isLogin } = this.state;

    return (
      <div className="App">
        <NavMenu isLogin={isLogin} onIsLogout={this.onIsLogout} />

        <Switch>
          <Route exact path="/">
            <LoginForm isLogin={isLogin} onIsLogin={this.onIsLogin} />
          </Route>

          <Route exact path="/503page">
            <ServerError />
          </Route>
          <Route path="/login">
            <LoginForm isLogin={isLogin} onIsLogin={this.onIsLogin} />
          </Route>
          <PrivateRoute path="/verify" component={Verify} isLogin={isLogin} />
          <PrivateRoute path="/history" component={History} isLogin={isLogin} />
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
          <PrivateRoute
            path="/withDraw"
            component={WithDrawMoney}
            isLogin={isLogin}
          />

          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
