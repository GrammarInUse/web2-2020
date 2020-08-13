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


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      fullName: "",
      email: "",
      phone: "",
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

                        this.setState({
                            fullName: result.customer.fullName,
                            id: store.currentUser,
                            email: result.customer.email,
                            phone: result.customer.phone,
                            login: true
                        });
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
  }

  render(){
    return (
      <div className="App">
        <HamburberButton />
        <NavMenu />

        <Router>
          <Switch>
            <Route path="/profile">
              <Clients id={this.state.id} fullName={this.state.fullName} email={this.state.email} phone={this.state.phone} login={this.state.login}/>
            </Route>
            <Route path="/home">
              <Intros />
            </Route>
            <Route path="/">
              <Intros />
            </Route>
          </Switch>
        </Router>
        <Aboutus />
        <Services />
        <Team />
        <Contact />
        {/* <Footer />  */}
      </div>
    );
  }
}

export default App;
