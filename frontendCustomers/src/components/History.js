import React, { Component } from 'react'

export default class History extends Component {
    constructor(props){
        super(props);
        this.state ={
            userMessage: "",
            listOfTransactions : [],
            currentUser: ""
        }
    }

    transCollector(){
        this.storeCollector();
        const store = JSON.parse(localStorage.getItem("login"));
        console.log("STORE");
        if(store && store.login){
            this.setState({
                currentUser: store.currentUser
            });
            const token = store.token;
            const url = "http://localhost:8080/customers/history/" + store.currentUser;
            const fetchOpts = {
                method: "GET",
                headers:{
                    "Accept" : "application/json",
                    "Content-type" : "application/json",
                    "Authorization" : token
                }
            }
            fetch(url,fetchOpts)
            .then((response) =>{
                if(response){
                    console.log(response);
                    response.json()
                    .then((result)=>{
                        this.setState({
                            listOfTransactions: result.listOfTrans,
                            userMessage: result.userMessage
                        }, () => {
                            //DO SOMETHING
                        })
                    })
                    .catch((err) => {
                        console.log("ERROR FETCH TRANSITIONS: ");
                        console.error(err);
                    })
                }
            })
            .catch((err) => {
                console.log("FETCH TRANSITIONS ERROR: ");
                console.error(err);
            })
        }
    }
    storeCollector = (e) => {
        console.log("STORE COLLECTOR!!!");
        try{
            const store = JSON.parse(localStorage.getItem("login"));
            //console.log(store);
            if(store && store.login){
                this.setState({
                    sender: store.currentUser
                });
            }else{
                console.log("FAILED");
            }
        }catch(error){
            console.log("Something went wrong when you retrieve store from local storage!" + error);
        }
    }
    componentDidMount() {
        this.transCollector();
    }
    
    render() {
        console.log(this.state.listOfTransactions);
        return (
            this.state.currentUser?
            <div className="container emp-profile">
                <form onSubmit={this.submitHandler}>
                    <table style={{border: "1px solid black"}} align="center" className="table-style-double" cellSpacing={1} cellPadding={0} id="table">
                        <tbody>
                            <tr style={{borderBottom: "1px solid black"}} className="table-style-double tr-header">
                                <th style={{width: "10%"}} className="table-style-double" align="center">Mã GD</th>
                                <th style={{width: "10%"}} className="table-style-double" align="center">Ngày</th>
                                <th style={{width: "10%"}} className="table-style-double" align="center">Giờ</th>
                                <th style={{width: "20%"}} className="table-style-double" align="center">STK Người nhận</th>
                                <th style={{width: "10%"}} className="table-style-double" align="center">Số tiền</th>
                                <th style={{width: "10%"}} className="table-style-double" align="center">Trạng thái</th>
                                <th style={{width: "30%"}} className="table-style-double" align="center">Nội dung gửi </th>
                            </tr>
                            {
                                this.state.listOfTransactions ? this.state.listOfTransactions.map((element) => {
                                    return (
                                        <tr style={{borderBottom: "1px solid black"}} key={element.id} className="table-style-double odd">
                                            <td className="table-style-double" align="center">{element.id}</td>
                                            <td className="table-style-double" align="center">{element.date}</td>
                                            <td className="table-style-double" align="center">{element.time}</td>
                                            <td className="table-style-double" align="center">{element.receiverId}</td>
                                            <td className="table-style-double" align="center">{element.deposit}</td>
                                            <td className="table-style-double" align="center">{element.status}</td>
                                            <td className="table-style-double" align="center">{element.content}</td>
                                        </tr>
                                    )
                                }): <tr></tr>
                            }
                        </tbody>
                    </table>
                </form>          
            </div>:<div>Sorry you have not logged in ...</div>
        )
    }
}
