import React, { Component } from 'react'
import "./style.css";

export default class ManagerAccount extends Component {
    render() {
        return (
            <div className="main-right">
                <h4>Thay đổi mật khẩu đăng nhập</h4>
                <div className="ruler" />
                <form name="changepassrtxn" method="post" action="Request" className="margin:0px;">
                <input type="hidden" name="dse_sessionId" defaultValue="6_Ltorc3NTJPEfawX7ea-r3" />
                <input type="hidden" name="dse_applicationId" defaultValue={-1} />
                <input type="hidden" name="dse_operationName" defaultValue="ibkchangePassProc" />
                <input type="hidden" name="dse_pageId" defaultValue={5} />
                <input type="hidden" name="dse_processorState" defaultValue="changePassPage" />
                <input type="hidden" name="dse_processorId" defaultValue="DEDYENGEBMHTBXAOGCEYIOIODSABIJDOFIDPALGT" />
                <input type="hidden" name="dse_errorPage" defaultValue="/ibk/option/changepassrtxn.jsp" />
                <table className="table-form">
                    <tbody><tr>
                        <td className="white_tieude_2">THÔNG TIN MẬT KHẨU </td>
                    </tr>
                    <tr>
                        <td>
                        <table>
                            <tbody><tr>
                                <td className="caption">
                                Tên truy cập </td>
                                <td><input type="text" name="UserNameNew" defaultValue={11845157} size={25} id="UserNameNew" disabled="disabled" />
                                </td>
                            </tr>
                            <tr>
                                <td>Mật khẩu mới</td>
                                <td>
                                <div>{/*201908017*/}
                                    <input type="password" name="NewPass" defaultValue size={25} id="NewPass" oncontextmenu="return false" oncopy="return false" onpaste="return false" oncut="return false" onkeyup="checkNewPass()" />
                                    {/*201908017*/}<span toggle="#NewPass" className="fa fa-eye-slash toggle-password" style={{float: 'inherit', marginLeft: '-23px'}} />
                                    <div className="validNewPass" style={{display: 'none'}}>
                                    <img src="/acbib/img/icon/valid.png" width="16px" style={{borderStyle: 'none', verticalAlign: 'bottom'}} />
                                    </div>
                                    <div className="failNewPass" style={{display: 'none'}}>
                                    <img src="/acbib/img/icon/fail.png" width="16px" style={{borderStyle: 'none', verticalAlign: 'bottom'}} />
                                    </div>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Xác nhận mật khẩu mới</td>
                                <td>
                                <div>
                                    <input type="password" name="ReNewPass" defaultValue size={25} id="ReNewPass" oncontextmenu="return false" oncopy="return false" onpaste="return false" oncut="return false" onkeyup="checkReNewPass()" />
                                    {/*201908017*/}<span toggle="#ReNewPass" className="fa fa-eye-slash toggle-re-password" style={{float: 'inherit', marginLeft: '-23px'}} />
                                    <div className="validReNewPass" style={{display: 'none'}}>
                                    <img src="/acbib/img/icon/valid.png" width="16px" style={{borderStyle: 'none', verticalAlign: 'bottom'}} />
                                    </div>
                                    <div className="failReNewPass" style={{display: 'none'}}>
                                    <img src="/acbib/img/icon/fail.png" width="16px" style={{borderStyle: 'none', verticalAlign: 'bottom'}} />
                                    </div>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="caption">Chọn phương pháp xác thực</td>
                                <td><select name="AuthTyp">
                                    <option value selected="selected" />
                                    <option value="SMS">Mật khẩu tĩnh + OTP SMS</option>
                                </select></td>
                            </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} align="center"><input type="hidden" name="dse_nextEventName" defaultValue="ok" id="dse_nextEventName" /> <input name="button" type="button" className="nut1 button-blue" id="button" defaultValue="Đồng ý" onclick="dosubmit('ok');" /> <input name="button2" type="button" className="nut1 button-white" id="button2" defaultValue="Hủy" onclick="dosubmit('cancel');" />
                        </td>
                    </tr>
                    <tr>
                        <td><p>
                            <span className="note-red" style={{textDecoration: 'underline'}}>Lưu ý:</span><br /><span className="copyright">
                            &nbsp;&nbsp;&nbsp;&nbsp;• Mật khẩu đăng nhập có độ dài từ 6 đến 20 ký tự. Bao gồm tối thiểu “chữ thường + chữ Hoa + chữ số” (ví dụ: ACBOnline123) hoặc “chữ thường + chữ số + ký tự đặc biệt, trừ ký tự \ &lt; &gt; (ví dụ: @cbonline123). Mật khẩu đăng nhập không được giống với mật khẩu đã sử dụng lần gần nhất. Thời gian hiệu lực của mật khẩu tối đa là 12 tháng.<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;• Để đảm bảo tính an toàn, bảo mật, Quý khách không cung cấp Tên truy cập &amp; Mật khẩu cho bất kỳ ai và dưới bất kỳ hình thức nào (ngoại trừ website/ ứng dụng chính thức của ACB).<br />
                            </span></p>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>&nbsp;</td>
                    </tr>
                    </tbody></table>
                </form>
            </div>
        )
    }
}
