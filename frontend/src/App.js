import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import NavMenu from "./components/NavMenu";
import Footer from "./components/Footer";
import Clients from "./components/Clients";
import Intros from "./components/Intros";
import LeftSideBarMenu from "./components/User/LeftSideBarMenu";

import Verify from "./components/Staff/Verify";
import NotFound from "./components/NotFound";
import StaffManager from "./components/Staff/StaffManager";
import PaymentAccount from "./components/Staff/PaymentAccount";
import Rate from "./components/Staff/Rate";
import FindUser from "./components/Staff/FindUser";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      fullName: "",
      email: "",
      phone: "",
      login: false,
      // profession: "" ⚠ Updated later
    };
  }

  storeCurrentUserCollector = () => {
    console.log("STORE COLLECTOR!!!");
    try {
      const store = JSON.parse(localStorage.getItem("login"));
      console.log(store);

      if (store && store.login) {
        this.setState({
          login: true,
          token: store.token,
          id: store.currentUser,
        });

        const url =
          "https://s-ebanking-api.herokuapp.com/customers/" + store.currentUser;

        fetch(url, {
          method: "GET",
          headers: {
            Authorization: store.token,
          },
        })
          .then((response) => {
            response.json().then((result) => {
              console.log(result);

              this.setState({
                fullName: result.customer.fullName,
                id: store.currentUser,
                email: result.customer.email,
                phone: result.customer.phone,
                login: true,
              });
            });
          })
          .catch((error) => {
            console.log(
              "Something went wrong when you fetch a customer: " + error
            );
          });
      } else {
        console.log("FAILED");
      }
    } catch (error) {
      console.log(
        "Something went wrong when you retrieve store from local storage!" +
          error
      );
    }
  };

  componentDidMount() {
    this.storeCurrentUserCollector();
    this.getSomething();
  }

  getSomething = () => {
    const url = "http://localhost:8080/customers/signup/1593933313090/BDEA14";
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((result) => {
          console.log(result);
        });
      })
      .catch((error) => {
        console.log("Something went wrong when you fetch a customer: " + error);
      });
    console.log("GET SOMETHING");
  };

  render() {
    return (
      <div className="App">
        <NavMenu fullName={this.state.fullName} />

        <Switch>
          <Route path="/test">
            <LeftSideBarMenu />
          </Route>
          <Route path="/profile">
            <Clients
              id={this.state.id}
              fullName={this.state.fullName}
              email={this.state.email}
              phone={this.state.phone}
              login={this.state.login}
            />
          </Route>
          <Route path="/home">
            <Intros />
          </Route>
          <Route exact path="/">
            <Intros />
          </Route>
          <Route path="/verify">
            <Verify />
          </Route>
          <Route path="/staffmanager">
            <StaffManager />
          </Route>
          <Route path="/spend-account">
            <PaymentAccount />
          </Route>
          <Route path="/rate">
            <Rate />
          </Route>
          <Route path="/find-user">
            <FindUser />
          </Route>
          <Route component={NotFound} />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default App;
