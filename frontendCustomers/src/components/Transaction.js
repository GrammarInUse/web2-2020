import React, { Component } from 'react'

export default class Transaction extends Component {
    constructor(props){
        super(props);
        this.state ={
            id : "",
            cOT : "1",
            sender : "",
            receiver : "",
            comment : "",
            status : "123",
            password : "s",
            NameOfReceiver : ""
        }
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    submitHandler = (e) => {
        e.preventDefault();
        const store = JSON.parse(localStorage.getItem("login"));
        if(store && store.login){
            const token = store.token;
            const url = "http://localhost:8080/customers/chuyentien";
            const optionFetch ={
                method: "POST",
                headers:{
                    "Accept":"application/json",
                    "Content-type":"application/json",
                    "Authorization":token
                },
                body: JSON.stringify(this.state)
            }
            fetch(url,optionFetch).then((response) =>{
                response.json().then((result)=>{
                    this.setState({
                        status : result.userMessage
                    }, () => {
                        alert(this.state.status);
                        window.location.reload();
                    });
                })
            }).catch((err)=>{
                alert (err)
            })
        }
        else console.log("abc");
    }
    checkHandler = (e) =>{
        e.preventDefault();
        this.storeCollector();
        const a = document.getElementById("Amount")
        const store = JSON.parse(localStorage.getItem("login"))
        const token = store.token
        const url = "http://localhost:8080/customers/" + this.state.receiver;
        const optFetchs = {
            method: "GET",
            headers:{
                "Accept" : "application/json",
                "Content-type" : "application/json",
                "Authorization" : token
            }
        }
        fetch(url,optFetchs)
        .then((response) =>{
            if(response){
                response.json()
                .then((result)=>{
                    this.setState({
                        NameOfReceiver : result.customer.fullName
                    }, () => {
                        a.value=this.state.NameOfReceiver
                    })
                })
                .catch((err) => {
                    console.log("RESULT FETCH RECEIVER: ");
                    console.error(err);
                })
            }
        })
        .catch((err) => {
            console.log("FETCH CHECK RECEIVER");
            console.error(err);
        })
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
        this.storeCollector();
    }
    render() {
        console.log(this.state);
        return (
            <div className="container emp-profile">
                <form onSubmit={this.submitHandler}>
                    <div className="row">
                        <div>
                        <table className="table-form">
                            <tbody>
                            <tr>
                                <td className="white_tieude">
                                THÔNG TIN CHUYỂN KHOẢN
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td className="caption">Tài Khoản TH</td>
                                        <td>
                                            <input type="text" name="receiver" onChange={this.changeHandler} />
                                        </td>
                                        <td>
                                            <input onClick={this.checkHandler} type="button" className="profile-edit-btn" name="btnAddMore" value="Check" />
                                        </td>
                                        <td>
                                            <input disabled type="text" name="NameOfReceiver" id="Amount" onChange={this.changeHandler} />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <table>
                                    <tbody><tr>
                                        <td className="caption">Số tiền</td>
                                        <td><input type="text" name="cOT" onChange={this.changeHandler} maxLength={18} /></td>
                                    </tr>
                                    <tr>
                                        <td>Nội dung gửi</td>
                                        <td><textarea rows="4" cols="50" type="text" name="comment" onChange={this.changeHandler} /></td>
                                    </tr>
            
                    
                                    </tbody></table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <div id="ppxt_tkdttt">
                                    <table>
                                    <tbody><tr>
                                <td className="caption">Nhập lại MK</td>
                                <td><input type="password" name="password" defaultValue size={30} onChange={this.changeHandler} /></td>
                            </tr>
                                    </tbody></table>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="center">
                                <input name="button" type="submit" className="nut1 button-blue" id="button" defaultValue="Đồng ý" /> <input name="button2" type="button" className="nut1 button-white" id="button2" defaultValue="Hủy" /></td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                <span className="note-red">Lưu ý:</span><br />
                                - <span className="copyright">Khi chọn Đơn vị thụ hưởng chịu phí, số tiền phí sẽ được trừ vào số tiền chuyển.</span><br />
                                - <span className="copyright">Giao dịch chuyển khoản cho cá nhân nước ngoài: chỉ thực hiện giao dịch chuyển lương và công tác phí. Các giao dịch này phải có chứng từ chứng minh theo quy định
                                </span></td>
                            </tr>
                            </tbody></table>
                        </div>

                    </div>
                    
                </form>          
            </div>
        )
    }
}
