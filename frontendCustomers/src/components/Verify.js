import React, { Component } from 'react';
import Upload from './Upload';

export default class Verify extends Component {
    constructor(props){
        super(props);
        
        this.state={
            identifyId: "", 
            dOIssurance: ""
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault();

        const data = {
            identifyId: this.state.identifyId,
            dOI: this.state.dOIssurance,
            currentUser: this.props.currentUser
        }

        console.log(data);
        
    }

    render() {
        return (
            this.props.currentUser?
            <div className="container emp-profile">
                <form>
                    <div className="row">
                        <div className="col-md-4">
                            <Upload nameOfPhoto="frontSideIdentify" />
                        </div>
                        <div className="col-md-4">
                            Chứng minh nhân dân mặt trước - Bấm check để kiểm tra
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <Upload nameOfPhoto="backSideIdentify" />
                        </div>
                        <div className="col-md-4">
                            Chứng minh nhân dân mặt sau - Bấm check để kiểm tra
                        </div>
                    </div>
                    <div style={{marginTop: "50px"}} className="form">
                        <div id="sendmessage">

                        </div>
                        <div id="errormessage" />
                        <form onSubmit={this.submitHandler} role="form" className="contactForm">
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
                                <button type="submit">Verify</button>
                            </div>
                        </form>
                    </div>
                </form>   
            </div>:<div>Sorry, you have not logged in ...</div>
        )
    }
}
