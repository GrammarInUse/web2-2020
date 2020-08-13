import React, { Component } from 'react'

export default class OutTransaction extends Component {
    render() {
        return (
            <div className="content-holder">
                <h1>Xin chào, TO VAN NGUYEN</h1>
                {/* InstanceBeginEditable name="main" */}
                <h4>Chuyển khoản ngoài hệ thống ngân hàng</h4>
                <div className="ruler" />
                <form name="extrtxn" method="post" action="Request" className="margin:0px;">
                <input type="hidden" name="dse_sessionId" defaultValue="L0Yelg0RcFoMuu9vOKUnz7X" />
                <input type="hidden" name="dse_applicationId" defaultValue={-1} />
                <input type="hidden" name="dse_operationName" defaultValue="ibkextFundTransProc" />
                <input type="hidden" name="dse_pageId" defaultValue={6} />
                <input type="hidden" name="dse_processorState" defaultValue="extFundTransPage" />
                <input type="hidden" name="dse_processorId" defaultValue="FCBUBXFMDWGKFUHKHGCOIGFKHVDYELJQBEEMABDS" />
                <input type="hidden" name="dse_errorPage" defaultValue="ibk/fundtrans/extrtxn.jsp" />
                <table className="table-form">
                    {/*<tr>
                                <td height="20" align="right" style="padding-left:25px; padding-right:25px;">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td width="50%" align="left">&nbsp;</td>
                                    <td width="50%" align="right"><a href="#" class="trogiup"> Tr&#7907; giúp</a></td>
                                </tr>
                                </table>
                                    <a href="#" class="trogiup"></a></td>
                                </tr>
        */}
                    <tbody><tr>
                        <td align="left" className="white_tieude_2">THÔNG TIN ĐƠN VỊ CHUYỂN TIỀN</td>
                    </tr>
                    <tr>
                        <td align="left">
                        <table cellSpacing={0} cellPadding={0}>
                            <tbody><tr>
                                <td className="caption">Chọn tài khoản trích tiền</td>
                                <td><select name="AccountNbrNo" id="AccountNbrNo">
                                    <option value selected="selected" />
                                    <option value={11845157}>11845157</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td />
                                <td><span className="alert">
                                </span></td>
                            </tr>
                            <tr>
                                <td />
                                <td><span className="alert">
                                </span></td>
                            </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" className="white_tieude">THÔNG TIN ĐƠN VỊ THỤ HƯỞNG</td>
                    </tr>
                    <tr>
                        <td align="left">
                        <table cellSpacing={0} cellPadding={0}>
                            <tbody><tr>
                                <td className="caption">
                                <input type="radio" name="IsDonViThuHuong" defaultValue="true" defaultChecked="checked" id="IsDonViThuHuong1" />
                                Tài khoản thụ hưởng đã lưu
                                </td>
                                <td><select name="Tempt" id="Tempt" data-select2-id="Tempt" tabIndex={-1} className="select2-hidden-accessible" aria-hidden="true">
                                    <option value selected="selected" data-select2-id={2} />
                                </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id={1} style={{width: '335px'}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-labelledby="select2-Tempt-container"><span className="select2-selection__rendered" id="select2-Tempt-container" role="textbox" aria-readonly="true"><span className="select2-selection__placeholder" /></span><span className="select2-selection__arrow" role="presentation"><b role="presentation" /></span></span></span><span className="dropdown-wrapper" aria-hidden="true" /></span>
                                <a href="Request?&dse_sessionId=L0Yelg0RcFoMuu9vOKUnz7X&dse_applicationId=-1&dse_pageId=6&dse_operationName=ibktkThuhuongExtProc&dse_errorPage=chuyentien.jsp&dse_processorState=initial&dse_nextEventName=start" className="hpl
        ">
                                    Đăng ký TKTH mới
                                </a>
                                </td>
                            </tr>
                            <tr>
                                <td />
                                <td colSpan={2}>
                                <span className="copyright">TK đánh dấu</span> (<span className="note-red">*</span>) <span className="copyright">là TK thụ hưởng tin cậy</span> </td>
                            </tr>
                            <tr>
                                <td className="caption">
                                <input type="radio" name="IsDonViThuHuong" defaultValue="false" id="IsDonViThuHuong2" />
                                Tài khoản thụ hưởng mới
                                </td>
                                <td><input type="text" name="AccountNbrCo" defaultValue size={30} id="AccountNbrCo" maxLength={25} readOnly /></td>
                            </tr>
                            <tr>
                                <td>Tên đơn vị thụ hưởng</td>
                                <td><input type="text" name="AccountNameCo" defaultValue size={30} id="AccountNameCo" maxLength={70} readOnly /></td>
                            </tr>
                            <tr className="TKLuu">
                                <td>Tỉnh/ Thành phố</td>
                                <td><input type="text" name="ProvinceNameCo" defaultValue size={30} id="ProvinceNameCo" maxLength={60} readOnly="readonly" /></td>
                            </tr>
                            <tr className="TKLuu">
                                <td>Tại ngân hàng</td>
                                <td><input type="text" name="BankName" defaultValue size={30} id="BankName" maxLength={60} readOnly="readonly" /></td>
                            </tr>
                            <tr className="TKLuu">
                                <td>Chi nhánh</td>
                                <td><input type="text" name="BranchNameCo" defaultValue size={30} id="BranchNameCo" maxLength={60} readOnly="readonly" />
                                <input type="hidden" name="BranchNbrCo" defaultValue size={30} id="BranchNbrCo" maxLength={60} readOnly="readonly" />
                                </td>
                            </tr>
                            <tr className="TKMoi" style={{display: 'none'}}>
                                <td>Tỉnh/ Thành phố</td>
                                <td><select name="tinh" id="dsTinh" data-select2-id="dsTinh" tabIndex={-1} className="select2-hidden-accessible" aria-hidden="true">
                                    <option value="..." data-select2-id={4}>...</option>
                                    <option value={74}>An Giang</option>
                                    <option value={69}>Ba Ria-Vung Tau</option>
                                    <option value={15}>Bac Can</option>
                                    <option value={26}>Bac Giang</option>
                                    <option value={84}>Bac Lieu</option>
                                    <option value={27}>Bac Ninh</option>
                                    <option value={77}>Ben Tre</option>
                                    <option value={54}>Binh Dinh</option>
                                    <option value={65}>Binh Duong</option>
                                    <option value={66}>Binh Phuoc</option>
                                    <option value={58}>Binh Thuan</option>
                                    <option value={85}>Ca Mau</option>
                                    <option value={80}>Can Tho</option>
                                    <option value={13}>Cao Bang</option>
                                    <option value={51}>Da Nang</option>
                                    <option value={62}>Dac Lac</option>
                                    <option value={57}>Dak Nong</option>
                                    <option value={19}>Dien Bien</option>
                                    <option value={68}>Dong Nai</option>
                                    <option value={72}>Dong Thap</option>
                                    <option value={60}>Gia Lai</option>
                                    <option value={12}>Ha Giang</option>
                                    <option value={32}>Ha Nam</option>
                                    <option value={10}>Ha Noi</option>
                                    <option value={30}>Ha Tay</option>
                                    <option value={38}>Ha Tinh</option>
                                    <option value={24}>Hai Duong</option>
                                    <option value={23}>Hai Phong</option>
                                    <option value={64}>Hau Giang</option>
                                    <option value={50}>Ho Chi Minh</option>
                                    <option value={31}>Hoa Binh</option>
                                    <option value={25}>Hung Yen</option>
                                    <option value={680}>Khac</option>
                                    <option value={56}>Khanh Hoa</option>
                                    <option value={82}>Kien Giang</option>
                                    <option value={61}>Kon Tum</option>
                                    <option value={22}>Lai Chau</option>
                                    <option value={63}>Lam Dong</option>
                                    <option value={14}>Lang Son</option>
                                    <option value={18}>Lao Cai</option>
                                    <option value={70}>Long An</option>
                                    <option value={33}>Nam Dinh</option>
                                    <option value={37}>Nghe An</option>
                                    <option value={34}>Ninh Binh</option>
                                    <option value={59}>Ninh Thuan</option>
                                    <option value={28}>Phu Tho</option>
                                    <option value={55}>Phu Yen</option>
                                    <option value={39}>Quang Binh</option>
                                    <option value={52}>Quang Nam</option>
                                    <option value={53}>Quang Ngai</option>
                                    <option value={21}>Quang Ninh</option>
                                    <option value={40}>Quang Tri</option>
                                    <option value={81}>Soc Trang</option>
                                    <option value={20}>Son La</option>
                                    <option value={67}>Tay Ninh</option>
                                    <option value={35}>Thai Binh</option>
                                    <option value={16}>Thai Nguyen</option>
                                    <option value={36}>Thanh Hoa</option>
                                    <option value={41}>Thua Thien Hue</option>
                                    <option value={76}>Tien Giang</option>
                                    <option value={79}>Tra Vinh</option>
                                    <option value={11}>Tuyen Quang</option>
                                    <option value={78}>Vinh Long</option>
                                    <option value={29}>Vinh Phuc</option>
                                    <option value={17}>Yen Bai</option>
                                </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id={3} style={{width: '335px'}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-labelledby="select2-dsTinh-container"><span className="select2-selection__rendered" id="select2-dsTinh-container" role="textbox" aria-readonly="true" title="...">...</span><span className="select2-selection__arrow" role="presentation"><b role="presentation" /></span></span></span><span className="dropdown-wrapper" aria-hidden="true" /></span></td>
                            </tr>
                            <tr className="TKMoi" style={{display: 'none'}}>
                                <td>Tại ngân hàng</td>
                                <td><select name="nganhang" id="dsnganhang" data-select2-id="dsnganhang" tabIndex={-1} className="select2-hidden-accessible" aria-hidden="true">
                                </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id={5} style={{width: '335px'}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-labelledby="select2-dsnganhang-container"><span className="select2-selection__rendered" id="select2-dsnganhang-container" role="textbox" aria-readonly="true"><span className="select2-selection__placeholder" /></span><span className="select2-selection__arrow" role="presentation"><b role="presentation" /></span></span></span><span className="dropdown-wrapper" aria-hidden="true" /></span></td>
                            </tr>
                            <tr className="TKMoi" style={{display: 'none'}}>
                                <td>Chi nhánh</td>
                                <td><select name="chinhanh" id="dsCN">
                                </select></td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                <input type="checkbox" name="LuuTT" defaultValue="true" id="LuuTT" disabled="disabled" /> Lưu đơn vị thụ hưởng mới
                                </td>
                            </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" className="white_tieude">THÔNG TIN CHUYỂN KHOẢN</td>
                    </tr>
                    <tr>
                        <td align="left">
                        <table cellSpacing={0} cellPadding={0}>
                            <tbody><tr>
                                <td className="caption">Số tiền</td>
                                <td><input type="text" name="Amount" defaultValue size={30} id="Amount" onkeypress="return isNumberKey(event);" onchange="this.value = changeAmount(this.value);" maxLength={18} /></td>
                            </tr>
                            <tr>
                                <td className="caption">Số tiền bằng chữ</td>
                                <td><textarea name="AmountWord" cols rows wrap="soft" className="text_sotien" id="AmountWord" readOnly defaultValue={""} /></td>
                            </tr>
                            <tr>
                                <td className="caption">Phí giao dịch</td>
                                <td><input type="text" name="AmountFee" defaultValue size={30} id="AmountFee" readOnly /></td>
                            </tr>
                            <tr>
                                <td>Số tiền phí bằng chữ</td>
                                <td><input type="text" name="AmountFeeWord" defaultValue id="AmountFeeWord" readOnly /></td>
                            </tr>
                            <tr>
                                <td />
                                <td id="chiuphi" style={{display: 'none'}}><input type="radio" name="NhanChiuPhiYN" defaultValue="N" defaultChecked="checked" id="isnhan1" /> Đơn vị chuyển tiền chịu phí
                                <input type="radio" name="NhanChiuPhiYN" defaultValue="Y" id="isnhan2" /> Đơn vị thụ hưởng chịu phí</td>
                            </tr>
                            <tr>
                                <td>Nội dung giao dịch<input type="hidden" name="glbHoTenKH" defaultValue="TO VAN NGUYEN" /></td>
                                <td><textarea name="Description" cols rows wrap="soft" className="text_noidung" onkeyup="return checkLength(this.form);" id="Description" defaultValue={""} /></td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" name="ChooseEmail1" defaultValue="true" id="ChooseEmail1" />Nhận email kết quả giao dịch
                                <input type="hidden" name="ChooseEmail" id="ChooseEmail" defaultValue /></td>
                                <td>
                                <input type="text" name="getEmail" defaultValue size={30} id="getEmail" maxLength={500} disabled="disabled" />
                                </td>						
                            </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" className="white_tieude">THỜI GIAN CHUYỂN</td>
                    </tr>
                    <tr>
                        <td align="left">
                        <table cellSpacing={0} cellPadding={0}>
                            <tbody><tr>
                                <td className="caption"><input type="radio" name="IsFundAfter" defaultValue="false" defaultChecked="checked" id="isfund1" /> Chuyển khoản ngay</td>
                                <td colSpan={2}>&nbsp;</td>
                            </tr>
                            <tr>
                                <td><input type="radio" name="IsFundAfter" defaultValue="true" id="isfund2" /> Chuyển khoản sau vào ngày</td>
                                <td><input type="text" name="TransDate" defaultValue size={20} id="TransDate" maxLength={10} className="hasDatepicker" disabled /><img className="ui-datepicker-trigger" src="img/calendar.png" alt="Chọn ngày" title="Chọn ngày" style={{opacity: '0.5', cursor: 'default'}} />&nbsp;dd/mm/yyyy</td>
                                <td />
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
                    <tr>
                        <td align="left" className="white_tieude">PHƯƠNG PHÁP XÁC THỰC</td>
                    </tr>
                    <tr>
                        <td align="left">
                        <table cellSpacing={0} cellPadding={0}>
                            <tbody><tr>
                                <td className="caption">Chọn phương pháp xác thực</td>
                                <td><select name="AuthTyp">
                                    <option value selected="selected" />
                                    <option value="PWD">Mật khẩu tĩnh</option>
                                    <option value="SMS">Mật khẩu tĩnh + OTP SMS</option>
                                </select></td>
                            </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                        <input type="hidden" name="dse_nextEventName" defaultValue id="dse_nextEventName" /> <input name="button" type="button" className="nut1 button-blue" id="button" defaultValue="Đồng ý" onclick="dosubmit('ok');" /> <input name="button2" type="button" className="nut1 button-white" id="button2" defaultValue="Hủy" onclick="dosubmit('cancel');" /></td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                        <span className="note-red">Lưu ý:</span><br />
                        - <span className="copyright">Nếu có nhiều email thì cách nhau bằng dấu chấm (;).
                            Đối với giao dịch thành công, Ủy nhiệm chi sẽ được đính kèm trong email
                        </span><br />
                        - <span className="copyright">Phí chuyển khoản, chuyển tiền được tính theo thời gian ký xác nhận lệnh. Vui lòng tham khảo biểu phí </span><a href="http://acb.com.vn/wps/portal/Home/fee" target="blank_">tại đây</a><br />
                        - <span className="copyright">Khi chọn Đơn vị thụ hưởng chịu phí, số tiền phí sẽ được trừ vào số tiền chuyển.</span>
                        </td>
                    </tr>
                    </tbody></table>
                </form>
                {/* InstanceEndEditable */}
            </div>
        )
    }
}
