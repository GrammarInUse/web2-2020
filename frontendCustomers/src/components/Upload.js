import React, { Component } from "react";
import axios from "axios";
import Resizer from 'react-image-file-resizer';

export default class upload extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      verifiedImage: "",
      currentUser: "",
    };
  }

  onChange = (e) => {
    e.preventDefault();

    this.setState({
      file: e.target.files[0],
    });
  };

//   onSubmit = (e) => {
//     // IDENTIFY
//     e.preventDefault();
//     if (!this.state.file) {
//       alert("ban chua chon file");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("file", this.state.file);
//     const config = {
//       headers: {
//         "content-type": "multipart/form-data",
//       }
//     };
//     const url = "http://localhost:8080/customers/upload/" + this.props.nameOfPhoto + "/" + this.state.currentUser;
//     axios
//       .post(url, formData.get("file"), config)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err + " ERRR");
//       });
// }

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.file) {
      alert("ban chua chon file");
      return;
    }
    const token = JSON.parse(localStorage.getItem("login")).token;
    const url = "http://localhost:8080/customers/uploadVerifiedImage";
    const file = this.state.file;
    Resizer.imageFileResizer(file, 230, 280, 'jpeg', 100, 0, (uri) => {
        if(uri){
            this.setState({
              verifiedImage: uri
            }, async () => {
                //DO SOMETHING
                await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({
                        verifiedImage: uri,
                        currentUser: this.state.currentUser,
                        nameOfPhoto: this.props.nameOfPhoto
                    })
                })
                .then(async (response) => {
                    await response.json()
                    .then((result) => {
                        console.log(result.userMessage);
                        this.getFrontIdentify();
                        this.getBackIdentify();
                    })
                    .catch(err => {
                        console.log(err);
                    })
                })
                .catch(err => {
                    console.log(err);
                });
            })
        }
    }, 'base64');    
  }

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

  getFrontIdentify = async () => {
    if(this.props.nameOfPhoto === "frontOfIdentify"){
      const token = JSON.parse(localStorage.getItem("login")).token;
      const url = "http://localhost:8080/customers/getFrontIdentify";
      const data = {
          currentUser: this.state.currentUser,
          nameOfPhoto: this.props.nameOfPhoto
      }
      const fetchOpts = {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": token
          },
          body: JSON.stringify(data)
      };

      await fetch(url, fetchOpts)
      .then((response) => {
          response.json()
          .then((result) => {
              this.setState({
                verifiedImage: result.data
              }, () => {
                  //DOING SOMETHING
                  console.log("FETCH DONE");
              })
          })
          .catch((err) => {
              console.log("Something went wrong when you parse response from fetch");
              console.error(err);
          });
      })
      .catch((err) => {
          console.log("Something went wrong when you storeAvatar from server");
          console.error(err);
      });
    }
  }

  getBackIdentify = async () => {
    if(this.props.nameOfPhoto === "backOfIdentify"){
      const token = JSON.parse(localStorage.getItem("login")).token;
      const url = "http://localhost:8080/customers/getBackIdentify";
      const data = {
          currentUser: this.state.currentUser,
          nameOfPhoto: this.props.nameOfPhoto
      }
      const fetchOpts = {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": token
          },
          body: JSON.stringify(data)
      };

      await fetch(url, fetchOpts)
      .then((response) => {
          response.json()
          .then((result) => {
              this.setState({
                verifiedImage: result.data
              }, () => {
                  //DOING SOMETHING
                  console.log("FETCH DONE");
              })
          })
          .catch((err) => {
              console.log("Something went wrong when you parse response from fetch");
              console.error(err);
          });
      })
      .catch((err) => {
          console.log("Something went wrong when you storeAvatar from server");
          console.error(err);
      });
    }else{
        console.log("CC");
    }
  }

  componentDidMount() {
    this.storeCollectorCustomer();
    setTimeout(() => {
      this.getFrontIdentify();
      this.getBackIdentify();
    }, 50);
  }
  
  render() {
    return (
        <div style={{marginBottom: "40px"}}>
            <div className="profile-img">
                <img src= {this.state.verifiedImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"} alt="Avatar" />
                <div className="file btn btn-lg btn-primary">
                  Change Photo
                  <form encType="multipart/form-data">
                    <input style={{width: "100%", cursor: "pointer"}} name="file" type="file" onChange={this.onChange}/>
                    <button type="submit">upload</button>
                  </form>
                </div>
            </div>
        </div>
    );
  }
}
