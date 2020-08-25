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

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.isLogin ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);
const token = localStorage.getItem("token");
class App extends Component {
  constructor() {
    super();

    const isLogin = token !== null ? true : false;

    this.state = {
      staff: {
        id: null,
        name: "",
        salary: 0,
        position: "",
        role: null,
      },
      isLogin,
    };
  }
  onIsLogin = (data) => {
    this.setState({
      staff: data,
      isLogin: true,
    });
  };
  onIsLogout = () => {
    this.setState({
      isLogin: false,
    });
  };
  componentDidMount() {}
  render() {
    let { isLogin } = this.state;

    return (
      <div className="App">
        <NavMenu isLogin={isLogin} onIsLogout={this.onIsLogout} />

        <Switch>
          <Route exact path="/">
            <LoginForm onIsLogin={this.onIsLogin} isLogin={isLogin} />
          </Route>
          <Route exact path="/test">
            <ModalErr content="xxxxxxxxxxxxxxxx" />
          </Route>
          <Route exact path="/503page">
            <ServerError />
          </Route>
          <Route path="/login">
            <LoginForm onIsLogin={this.onIsLogin} isLogin={isLogin} />
          </Route>
          <PrivateRoute path="/verify" component={Verify} isLogin={isLogin} />
          <PrivateRoute
            path="/staffmanager"
            onIsLogout={this.onIsLogout}
            component={StaffManager}
            token={token}
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
