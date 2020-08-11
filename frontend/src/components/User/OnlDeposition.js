import React, { Component } from 'react'

export default class OnlDeposition extends Component {
    render() {
        return (
            <div className="content-holder">
            <h1>Xin chào, TO VAN NGUYEN</h1>
            {/* InstanceBeginEditable name="main" */}
            <h4>Chuyển tiền vào thẻ SEBanking</h4>
            <div className="ruler" />
            <form name="cardrtxn" method="post" action="Request" className="margin:0px;">
            <input type="hidden" name="dse_sessionId" defaultValue="AObIKFc_3nq42IYd6UD1ucE" />
            <input type="hidden" name="dse_applicationId" defaultValue={-1} />
            <input type="hidden" name="dse_operationName" defaultValue="ibkcardFundTransProc" />
            <input type="hidden" name="dse_pageId" defaultValue={5} />
            <input type="hidden" name="dse_processorState" defaultValue="cardFundTransPage" />
            <input type="hidden" name="dse_processorId" defaultValue="HYGHDDHSAPELEBIDDTGRBSAKAAFZFCCKBCICELER" />
            <input type="hidden" name="dse_errorPage" defaultValue="ibk/fundtrans/cardrtxn.jsp" />
            <table className="table-form">
                {/*
                        <tr>
                            <td height="20" align="right" style="padding-left:25px; padding-right:25px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td width="50%" align="left">&nbsp;</td>
                                <td width="50%" align="right"><a href="#" class="trogiup">Tr&#7907; giúp</a></td>
                            </tr>
                            </table>
                        </td>
                            </tr>
                */}
                <tbody><tr> <td align="left" className="white_tieude_2"> THÔNG TIN CHUYỂN TIỀN VÀO THẺ </td>
                </tr>
                <tr>
                    <td align="left">
                    <table cellSpacing={0} cellPadding={0}>
                        <tbody><tr>
                            <td className="caption"> Tài khoản trích tiền</td>
                            <td>
                            <select name="AccountNbrNo" id="AccountNbrNo">
                                <option value selected="selected" />
                                <option value={11845157}>11845157</option>
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <td />
                            <td><span className="alert">
                            </span></td>
                        </tr>
                        <tr>
                            <td className="caption"> Số thẻ nhận tiền</td>
                            <td>
                            <select name="AccountNbrCo" id="AccountNbrCo">
                                <option value selected="selected" />
                            </select>
                            <a href="Request?&dse_sessionId=AObIKFc_3nq42IYd6UD1ucE&dse_applicationId=-1&dse_pageId=5&dse_operationName=ibkthethuhuongProc&dse_errorPage=chuyentien.jsp&dse_processorState=initial&dse_nextEventName=start" className="hpl
    ">
                                Đăng ký thẻ thụ hưởng
                            </a>
                            </td>
                        </tr>
                        <tr>
                            <td>Số tiền</td>
                            <td><input type="text" name="Amount" defaultValue size={30} id="Amount" onkeypress="return isNumberKey(event);" onchange="this.value = changeAmount(this.value);" maxLength={18} /></td>
                        </tr>	                     
                        <tr>
                            <td>Số tiền bằng chữ</td>
                            <td><textarea name="AmountWord" cols rows wrap="soft" className="text_sotien" id="AmountWord" readOnly defaultValue={""} /></td>
                        </tr>
                        <tr>
                            <td>Nội dung chuyển tiền vào thẻ</td>
                            <td><textarea name="Description" cols rows wrap="soft" className="text_noidung" onkeyup="return checkLength(this.form);" defaultValue={""} /></td>
                        </tr>
                        </tbody></table></td>
                </tr>
                {/* ck sau  */}
                <tr>
                    <td className="white_tieude">
                    THỜI GIAN CHUYỂN
                    </td>
                </tr>
                <tr>
                    <td>
                    <table>
                        <tbody><tr>
                            <td className="caption"><input type="radio" name="IsFundAfter" defaultValue="false" defaultChecked="checked" id="isfund1" /> Chuyển khoản ngay</td>
                            <td colSpan={2}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><input type="radio" name="IsFundAfter" defaultValue="true" id="isfund2" /> Chuyển khoản sau vào ngày</td>
                            <td><input type="text" name="TransDate" defaultValue className="date-picker hasDatepicker" size={20} id="TransDate" maxLength={10} onkeyup="DateFormat(this,this.value,event,false,'3')" disabled /><img className="ui-datepicker-trigger" src="img/calendar.png" alt="Chọn ngày" title="Chọn ngày" style={{opacity: '0.5', cursor: 'default'}} />&nbsp;dd/mm/yyyy</td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td />
                            <td colSpan={2}>
                            <span className="note-red">*</span>
                            <span className="copyright">Thời gian chuyển khoản sau trong  vòng 30 ngày
                            </span></td>
                        </tr>
                        </tbody></table>
                    </td>
                </tr>
                {/*  */}
                <tr> <td align="left" className="white_tieude"> PHƯƠNG PHÁP XÁC THỰC</td>
                </tr>
                <tr>
                    <td align="left"><table cellSpacing={0} cellPadding={0}>
                        <tbody><tr>
                            <td className="caption">Chọn phương pháp xác thực</td>
                            <td><select name="AuthTyp">
                                <option value selected="selected" />
                                <option value="SMS">Mật khẩu tĩnh + OTP SMS</option>
                            </select></td>
                        </tr>
                        </tbody></table></td>
                </tr>
                <tr>
                    <td className="error" align="left">
                    Giao dịch chuyển tiền vào thẻ sau 16h45' (thứ 2 - thứ 6) và sau 11h15' (thứ 7) sẽ được xử lý vào ngày làm việc kế tiếp.
                    </td>
                </tr>
                <tr><td>&nbsp;</td></tr>              
                <tr>
                    <td align="center">
                    <input type="hidden" name="dse_nextEventName" defaultValue id="dse_nextEventName" />
                    <input name="button" type="button" className="nut1 button-blue" id="button" defaultValue="Đồng ý" onclick="dosubmit('ok');" />
                    <input name="button2" type="button" className="nut1 button-white" id="button2" defaultValue="Hủy" onclick="dosubmit('cancel');" /></td>
                </tr>
                </tbody></table>
            </form>
            {/* InstanceEndEditable */}
        </div>
        )
    }
}
