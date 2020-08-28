import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';



import NavMenu from './components/NavMenu';
import Footer from './components/Footer';
import Clients from './components/Clients';
import Intros from './components/Intros';
import Aboutus from './components/Aboutus';
import Services from './components/Services';
import Team from './components/Team';
import HamburberButton from './components/HamburberButton';
import Contact from './components/Contact';
import Transaction from './components/Transaction';
import History from './components/History';
import Verify from './components/Verify';
import Rates from './components/Rates';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      fullName: "",
      email: "",
      phone: "",
      dOB: "",
      balance: "",
      isVerified: "",
      currencyUnitId: "",
      login: false
      // profession: "" ⚠ Updated later
    }
  }

  storeCurrentUserCollector = () => {
    console.log("STORE COLLECTOR!!!");
        try{
            const store = JSON.parse(localStorage.getItem("login"));
            //console.log(store);
            if(store && store.login){
                this.setState({
                    login: true,
                    token: store.token,
                    id: store.currentUser
                });
                const url = "http://localhost:8080/customers/" + store.currentUser;
                fetch(url, {
                    method: "GET",
                    headers: {
                        "Authorization": store.token
                    }
                })
                .then((response) => {
                    response.json()
                    .then((result) => {
                        console.log(result);

                        if(result.customer){
                          this.setState({
                            fullName: result.customer.fullName,
                            id: result.customer.id,
                            email: result.customer.email,
                            phone: result.customer.phone,
                            dOB: result.customer.dOB,
                            balance: result.customer.balance,
                            isVerified: result.customer.isVerified,
                            currencyUnitId: result.customer.currencyUnitId,
                            login: true
                          });
                        }
                    });
                })
                .catch((error) => {
                    console.log("Something went wrong when you fetch a customer: " + error);
                });
            }else{
                console.log("FAILED");
            }
        }catch(error){
            console.log("Something went wrong when you retrieve store from local storage!" + error);
        }
  }

  componentDidMount(){
    this.storeCurrentUserCollector();

    // setTimeout(() => {
    //   localStorage.removeItem("login");
    //   window.location.reload();
    // }, 5 * 60 * 1000)
  }

  render(){
    return (
      <div className="App">
        <HamburberButton />
        <NavMenu />      
        <Router>
          <Switch>
            <Route path="/rates">
              <Rates />
            </Route>
            <Route path="/transform">
              <Transaction />
            </Route>
            <Route path="/activity-log">
              <History />
            </Route>
            <Route path="/verify-id">
              <Verify currentUser={this.state.id}/>
            </Route>
            <Route path="/profile">
              <Clients id={this.state.id} fullName={this.state.fullName} email={this.state.email} phone={this.state.phone} login={this.state.login} dOB={this.state.dOB} balance={this.state.balance} isVerified={this.state.isVerified} currencyUnit={this.state.currencyUnitId===1?"VND":"Dollar"} />
            </Route>
            <Route path="/home">
              <Intros />
              <Aboutus />
              <Services />
              <Team />
              <Contact />
            </Route>
            <Route path="/">
              <Intros />
              <Aboutus />
              <Services />
              <Team />
              <Contact />
            </Route>
          </Switch>
        </Router>
        <Footer /> 
      </div>
    );
  }
}

export default App;
