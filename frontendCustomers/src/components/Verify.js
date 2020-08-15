import React, { Component } from 'react'

export default class Verify extends Component {
    constructor(props){
        super(props);
        
        this.state={
            
        }
    }
    render() {
        return (
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
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="Avatar" />
                                <div className="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>   
            </div>
        )
    }
}
