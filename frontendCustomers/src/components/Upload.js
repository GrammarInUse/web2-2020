import React, { Component } from "react";
import axios from "axios";

export default class upload extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      avatar: "",
      currentUser: "",
    };
  }

  onChange = (e) => {
    e.preventDefault();

    this.setState({
      file: e.target.files[0],
    });
  };

  onSubmit = (e) => {
    //FrontSIDE IDENTIFY
    e.preventDefault();

    if (!this.state.file) {
      alert("ban chua chon file");
      return;
    }
    const formData = new FormData();
    formData.append("file", this.state.file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        
      }
    };
       
    const url = "http://localhost:8080/upload";
    axios
      .post("http://localhost:8080/upload", formData, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err + "");
      });

    // const url = "http://localhost:8080/customers/upload/" + this.props.nameOfPhoto + "/" + this.state.currentUser;
    // fetch(url, config)
    // .then((response) => {
    //   console.log(response);
    // })
    // .catch((err) => {
    //   console.log(err + "HERE");
    // }); 
}

  clickHandler = (e) => {
    e.preventDefault();
    const data = {
      currentUser: "2121",
      nameOfPhoto: this.props.nameOfPhoto
    }
    const url = "http://localhost:8080/customers/getImages";
    const fetchOpts = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }

    fetch(url, fetchOpts)
    .then((response) => {
      response.json()
      .then((result) => {
        const b64 = Buffer.from(result.data.data).toString("base64");
        this.setState({
          avatar: "data:image/jpeg;base64, " + b64
        }, () => {
          console.log(b64);
        })
      })
      .catch();
    })
    .catch((err) => {
      console.error(err);
    })
  };

  storeCollectorCustomer = () => {
    console.log("STORE COLLECTOR!!!");
    try{
        const store = JSON.parse(localStorage.getItem("login"));
        //console.log(store);
        if(store && store.login){
            this.setState({
                currentUser: store.currentUser
            });
        }else{
            console.log("FAILED");
        }
    }catch(error){
        console.log("Something went wrong when you retrieve store from local storage!" + error);
    }
  }

  componentDidMount() {
    this.storeCollectorCustomer();
  }
  
  render() {
    console.log(this.state.currentUser);
    console.log(this.state.file);
    return (
      <div>
        <a href="#" onClick={this.clickHandler}>CHECK</a>
        <div>
            <div className="profile-img">
                <img src= {this.state.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"} alt="Avatar" />
                <div className="file btn btn-lg btn-primary">
                  Change Photo
                  <form encType="multipart/form-data" onSubmit={this.onSubmit}>
                    <input style={{width: "100%", cursor: "pointer"}} encType="multipart/form-data" name="file" type="file" onChange={this.onChange}/>
                    <button type="submit">upload</button>
                  </form>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
