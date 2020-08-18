import React, { Component } from 'react';
import Upload from './Upload';

export default class Verify extends Component {
    constructor(props){
        super(props);
        
        this.state={
            
        }
    }
    render() {
        console.log(this.state);
        return (
            <div className="container emp-profile">
                <form>
                    <div className="row">
                        <div className="col-md-4">
                            <Upload nameOfPhoto="frontSideIdentify" />
                        </div>
                        <div className="col-md-4">
                            Chứng minh nhân dân mặt trước
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <Upload nameOfPhoto="backSideIdentify" />
                        </div>
                        <div className="col-md-4">
                            Chứng minh nhân dân mặt sau
                        </div>
                    </div>
                    <div className="form">
                        <div id="sendmessage"></div>
                        <div id="errormessage" />
                        <form method="post" role="form" className="contactForm">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                <input type="text" name="name" className="form-control" id="name" placeholder="Full Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                <div className="validation" /></div>
                                <div className="form-group col-md-6">
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Identity Card Number" data-rule="email" data-msg="Please enter a valid email" />
                                    <div className="validation" /></div></div>
                                    <div className="form-row"><div className="form-group col-md-6">
                                <input type="text" name="name" className="form-control" id="name" placeholder="DOB" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                <div className="validation" /></div>
                                <div className="form-group col-md-6">
                                    <input type="email" className="form-control" name="email" id="email" placeholder="SEX" data-rule="email" data-msg="Please enter a valid email" />
                                    <div className="validation" /></div></div>
                                    <div className="form-group"><input type="text" className="form-control" name="subject" id="subject" placeholder="National" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                                    <div className="validation" /></div>
                                    <div className="form-group"><input type="text" className="form-control" name="subject" id="subject" placeholder="Home Town" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                                    <div className="validation" /></div>
                                    <div className="form-group"><input type="text" className="form-control" name="subject" id="subject" placeholder="Address" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                                    <div className="validation" /></div>
                                    <div className="form-group"><input type="text" className="form-control" name="subject" id="subject" placeholder="Date Issuance" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                                    <div className="validation" /></div>
                                    <div className="form-group"><textarea className="form-control" name="message" rows={5} data-rule="required" data-msg="Please write something for us" placeholder="Characteristic" defaultValue={""} />
                                    <div className="validation" /></div><div className="text-center"><button type="submit">Send Form Verified</button>
                            </div>
                        </form>
                    </div>
                </form>   
            </div>
        )
    }
}
