import React, { Component } from 'react'

export default class Transaction extends Component {
    constructor(props){
        super(props);
        this.state ={
            id:"",
            cOT:"1",
            sender:"1597397139260",
            receiver:"1597397211824",
            comment:"",
            status:"123",
            password:""
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
                    alert(this.state.status)
                });
                
            })
        }).catch((err)=>{
            alert (err)
        })
        }
        else 
            console.log("abc");
        
    }
    render() {
        return (
            <div className="container emp-profile">
                <form onSubmit={this.submitHandler}>
                    <div className="row">
                        <div>
                        <table className="table-form">
                            {/*<tr>
                                    <td height="20" align="right"
                                        style="padding-left: 25px; padding-right: 25px;">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td width="50%" align="left">&nbsp;</td>
                                            <td width="50%" align="right"><a href="#" class="trogiup">Tr&#7907; giúp</a></td>
                                        </tr>
                                    </table>
                                    <a href="#" class="trogiup"></a></td>
                                </tr>
                                */}
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
                                        <td><input type="text" name="receiver" defaultValue size={30} id="" onkeypress="return isNumberKey(event);" onChange={this.changeHandler} maxLength={18} /></td>
                                        <input onClick={this.displayEditFormHandler} type="button" className="profile-edit-btn" name="btnAddMore" value="Check" />
                                        <td><input disabled type="text" name="NameOfReceiver" defaultValue size={30} id="Amount" onkeypress="return isNumberKey(event);" onChange={this.changeHandler} maxLength={18} /></td>
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
                                        <td><input type="text" name="cOT" defaultValue size={30} id="Amount" onkeypress="return isNumberKey(event);" onChange={this.changeHandler} maxLength={18} /></td>
                                    </tr>
                                    <tr>
                                        <td>Nội dung gửi</td>
                                        <td><textarea rows="4" cols="50" type="text" name="status" defaultValue id="AmountFeeWord" onChange={this.changeHandler} /></td>
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
                                <td><input type="text" name="receiver" defaultValue size={30} id="" onkeypress="return isNumberKey(event);" onChange={this.changeHandler} maxLength={18} /></td>
                            </tr>
                                    </tbody></table>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="center">
                                <input type="hidden" name="dse_nextEventName" defaultValue id="dse_nextEventName" /> <input name="button" type="submit" className="nut1 button-blue" id="button" defaultValue="Đồng ý" onclick="dosubmit('ok');" /> <input name="button2" type="button" className="nut1 button-white" id="button2" defaultValue="Hủy" onclick="dosubmit('cancel');" /></td>
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
