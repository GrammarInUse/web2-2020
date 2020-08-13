import React, { Component } from 'react'

export default class Clients extends Component {
    constructor(props){
        super(props);

        this.state = {
            fullName: "",
            phone: "",
            message: "",
            password: "",
            comfirmPassword: ""
        }
    }

    displayEditFormHandler =  (e) => {
        e.preventDefault();
        document.getElementById("formEditCurrentUser").style.display = "block";
    }

    displayEditPasswordHandler = (e) => {
        e.preventDefault();

        document.getElementById('formEditPassword').style.display = 'block';
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    submitHandler = (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem("login")).token;
        const url = "https://s-ebanking-api.herokuapp.com/customers/profile/" + this.props.id;
        fetch(url, {
            method: "PATCH",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "Authorization" : token
            },
            body: JSON.stringify(this.state)
        })
        .then((response) => {
            response.json()
            .then((result) => {
                this.setState({
                    message: result.message
                });
                alert(result.message);
                document.getElementById("formEditCurrentUser").style.display = "none";
            })
            .catch((err) => {
                console.log("ERROR RESPONSE PATCH CLIENT: " + err);
            });
        })
        .catch((err) => {
            console.log("ERROR FETCHING CLIENT: " + err);
        });  
        window.location.reload();
    }

    submitChangePasswordHandler = (e) => {
        e.preventDefault();
        if(this.state.password === this.state.comfirmPassword){
            const token = JSON.parse(localStorage.getItem("login")).token;
            const url = "https://s-ebanking-api.herokuapp.com/customers/password/" + this.props.id;
            fetch(url, {
                method: "PATCH",
                headers: {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json",
                    "Authorization" : token
                },
                body: JSON.stringify(this.state)
            })
            .then((response) => {
                response.json()
                .then((result) => {
                    this.setState({
                        message: result.message
                    });
                    alert(this.state.message);
                    document.getElementById("formEditPassword").style.display = "none";
                })
                .catch((err) => {
                    console.log("ERROR RESPONSE PATCH CLIENT: " + err);
                });
            })
            .catch((err) => {
                console.log("ERROR FETCHING CLIENT: " + err);
            });
        }else{
            this.setState({
                message: "2 passwords aren't match!! PLz check it again!!!"
            });
            alert(this.state.message);
        }
    }

    render() {
        return (
            this.props.login?
            <div className="container emp-profile">
                <form>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="Avatar" />
                                <div className="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>
                                {this.props.fullName}
                                </h5>
                                <h6>
                                Web Developer and Designer
                                </h6>
                                <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <input onClick={this.displayEditFormHandler} type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                            <input onClick={this.displayEditPasswordHandler} type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Password" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p>WORK LINK</p>
                                <a href="#">Website Link</a><br />
                                <a href="#">Bootsnipp Profile</a><br />
                                <a href="#">Bootply Profile</a>
                                <p>SKILLS</p>
                                <a href="#">Web Designer</a><br />
                                <a href="#">Web Developer</a><br />
                                <a href="#">WordPress</a><br />
                                <a href="#">WooCommerce</a><br />
                                <a href="#">Nodejs, React</a><br />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>User Id</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>{this.props.id}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>Name</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>{this.props.fullName}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>Email</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>{this.props.email}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>Phone</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>{this.props.phone}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>Profession</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>Web Developer and Designer</p>
                                    </div>
                                </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>Experience</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>Expert</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>Hourly Rate</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>10$/hr</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>Total Projects</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>230</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>English Level</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>Expert</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>Availability</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>6 months</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                    <label>Your Bio</label><br />
                                    <p>Your detail description</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form> 
                <div id="formEditCurrentUser" className="modal">
                    <form className="modal-content animate" onSubmit={this.submitHandler}>
                        <div className="imgcontainer">
                            <span onClick={() => document.getElementById('formEditCurrentUser').style.display='none'} className="close" title="Close Modal">×</span>
                            <img src="./img/clients/client-2.png" alt="Avatar" className="avatar" />
                        </div>
                        <div className="container row">
                            <label htmlFor="uname"><b>Full-name: </b></label>
                            <input type="text" onChange={this.changeHandler} placeholder="Enter your new  full name" name="fullName" />
                            <label htmlFor="psw"><b>Phone: </b></label>
                            <input type="text" onChange={this.changeHandler} placeholder="Enter your new phone" name="phone"/>
                            <button className="btnSubmit" type="submit">Comfirm</button>
                        </div>
                        <div className="container" style={{backgroundColor: '#f1f1f1'}}>
                            <button type="button" onClick={() => document.getElementById('formEditCurrentUser').style.display='none'} className="cancelbtn">Cancel</button>
                        </div>
                    </form>
                </div>     
                <div id="formEditPassword" className="modal">
                    <form className="modal-content animate" onSubmit={this.submitChangePasswordHandler}>
                        <div className="imgcontainer">
                            <span onClick={() => document.getElementById('formEditPassword').style.display='none'} className="close" title="Close Modal">×</span>
                            <img src="./img/clients/client-2.png" alt="Avatar" className="avatar" />
                        </div>
                        <div className="container row">
                            <label htmlFor="password"><b>New password: </b></label>
                            <input type="password" onChange={this.changeHandler} placeholder="Enter your new  password" name="password" />
                            <label htmlFor="comfirmPassword"><b>Comfirm password: </b></label>
                            <input type="password" onChange={this.changeHandler} placeholder="Comfirm password" name="comfirmPassword"/>
                            <button className="btnSubmit" type="submit">Comfirm</button>
                        </div>
                        <div className="container" style={{backgroundColor: '#f1f1f1'}}>
                            <button type="button" onClick={() => document.getElementById('formEditPassword').style.display='none'} className="cancelbtn">Cancel</button>
                        </div>
                    </form>
                </div>    
            </div>:
            <div style={{marginTop: "100px"}}> YOU HAVEN'T LOGGED IN, SORRY ABOUT THIS PROBLEM!!!</div>
        )
    }
}
