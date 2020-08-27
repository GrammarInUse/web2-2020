import React, { Component } from 'react';
import Upload from './Upload';
import Resizer from 'react-image-file-resizer';

export default class Verify extends Component {
    constructor(props){
        super(props);
        
        this.state={
            identifyId: "", 
            dOIssurance: "",
            front: null,
            back: null,
            verifiedImageFront: "",
            verifiedImageBack: ""
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeFront = (e) => {
        e.preventDefault();

        this.setState({
            front: e.target.files[0],
        },() => {
            const file = this.state.front;
            console.log(file);
            Resizer.imageFileResizer(file, 320, 240, 'jpeg', 100, 0, (uri) => {
                if(uri){
                    this.setState({
                        verifiedImageFront: uri
                    }, async () => {
                        //DO SOMETHING
                    })
                }
            }, 'base64');
        });    
    };

    onChangeBack = (e) => {
        e.preventDefault();

        this.setState({
            back: e.target.files[0],
        },() => {
            const file = this.state.back;
            console.log(file);
            Resizer.imageFileResizer(file, 320, 240, 'jpeg', 100, 0, (uri) => {
                if(uri){
                    this.setState({
                        verifiedImageBack: uri
                    }, async () => {
                        //DO SOMETHING
                    })
                }
            }, 'base64');
        });    
    };

    submitHandler = async (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem("login")).token;
        const data = {
            identifyId: this.state.identifyId,
            dOI: this.state.dOIssurance,
            currentUser: this.props.currentUser,
            front: this.state.verifiedImageFront,
            back: this.state.verifiedImageBack
        }
        const url = "http://localhost:8080/customers/verify";
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
                console.log(result);
                alert(result.userMessage);
            })
            .catch(err => {
                console.error(err);
            });
        })
        .catch(err => {
            console.error(err);
        });
        
    }

    render() {
        return (
            this.props.currentUser?
            <form className="container emp-profile">
                <div>
                    <div className="row">
                        <div className="col-md-4">
                            <img src= {this.state.verifiedImageFront || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"} alt="Avatar" />
                            <input style={{width: "100%", cursor: "pointer"}} name="front" type="file" onChange={this.onChangeFront}/>
                            <button type="submit">upload</button>
                        </div>
                        <div className="col-md-4">
                            Chứng minh nhân dân mặt trước - Đây có phải là hình ảnh chứng minh nhân dân mặt trước của bạn không?
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <img src= {this.state.verifiedImageBack || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"} alt="Avatar" />
                            <input style={{width: "100%", cursor: "pointer"}} name="back" type="file" onChange={this.onChangeBack}/>
                            <button type="submit">upload</button>
                        </div>
                        <div className="col-md-4">
                            Chứng minh nhân dân mặt sau - Đây có phải là hình ảnh chứng minh nhân dân mặt sau của bạn không?
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <p style={{width: "20%", display: "inline-block"}}>Số CMND: </p>
                            <input onChange={this.changeHandler} style={{width: "80%", display: "inline-block"}} type="text" name="identifyId" className="form-control" id="identifyId" placeholder="Identify Code: "/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <p style={{width: "20%", display: "inline-block"}}>Ngày cấp: </p>
                            <input onChange={this.changeHandler} style={{width: "80%", display: "inline-block"}}type="date" name="dOIssurance" className="form-control" id="dOIssurance" required />
                            <div className="validation" />
                        </div>
                    </div>
                    <div className="text-center">
                        <button onClick={this.submitHandler} type="submit">Verify</button>
                    </div>
                </div>   
            </form>:<div>Sorry, you have not logged in ...</div>
        )
    }
}
