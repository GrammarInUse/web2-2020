import React, { Component } from 'react'

export default class History extends Component {
    
    render() {
        return (
            <div className="container emp-profile">
                <form onSubmit={this.submitHandler}>
                <table className="table-style-double" cellSpacing={1} cellPadding={0} id="table">
                        <caption />
                        <tbody><tr className="table-style-double tr-header">
                            <th className="table-style-double" align="center">STT</th>
                            <th className="table-style-double" align="center">&nbsp;&nbsp;&nbsp;&nbsp;Ngày&nbsp;&nbsp;&nbsp;&nbsp;</th>
                            <th className="table-style-double" align="center">Tài khoản trích tiền</th>
                            <th className="table-style-double" align="center">Đơn vị thụ hưởng</th>
                            <th className="table-style-double" align="center">Số tiền</th>
                            <th className="table-style-double" align="center">Trạng thái</th>
                            <th className="table-style-double" align="center">Nội dung gửi </th>
                        </tr>
                        <tr className="table-style-double odd">
                            <td className="table-style-double" align="center">1</td>
                            <td className="table-style-double" align="center">10-08-20<br />17:15:42</td>
                            <td className="table-style-double" align="left">11845157</td>
                            <td className="table-style-double" align="left"><span className="acc_bold">NGUYEN HO THANH NHA</span></td>
                            <td className="table-style-double" align="right">390.000</td>
                            <td className="table-style-double" align="left">GD đã hoàn tất</td>
                        </tr>
                        <tr className="table-style-double odd">
                            <td className="table-style-double" align="center">&nbsp;</td>
                            <td className="table-style-double" align="center" /><td className="acctSum" align="left" colSpan={4}><div className="td_desc">TO VAN NGUYEN CHUYEN KHOAN CHO NGUYEN HO THANH NHA</div></td>{/*</td>
                    <td class="table-style-double" align="left" width="13%">&nbsp;</td>
                    <td class="table-style-double" align="left" width="25%">&nbsp;</td>
                    <td class="table-style-double" align="right" width="15%">&nbsp;</td>
                    <td class="table-style-double" align="left" width="25%">&nbsp;</td>
                    <td class="table-style-double" align="center" width="5%">*/}<td className="acctSum" align="left" />
                        </tr>
                        <tr className="table-style-double">
                            <td className="table-style-double" align="center">2</td>
                            <td className="table-style-double" align="center">01-06-20<br />11:49:56</td>
                            <td className="table-style-double" align="left">11845157</td>
                            <td className="table-style-double" align="left"><span className="acc_bold">CTY CP GIAI PHAP THANH TOAN VIET NAM</span></td>
                            <td className="table-style-double" align="right">20.000</td>
                            <td className="table-style-double" align="left">GD đã hoàn tất</td>
                        </tr>
                        <tr className="table-style-double">
                            <td className="table-style-double" align="center">&nbsp;</td>
                            <td className="table-style-double" align="center" /><td className="acctSum" align="left" colSpan={4}><div className="td_desc">35281681 Garena Lien Minh Huyen Thoai 40 RP</div></td>{/*</td>
                    <td class="table-style-double" align="left" width="13%">&nbsp;</td>
                    <td class="table-style-double" align="left" width="25%">&nbsp;</td>
                    <td class="table-style-double" align="right" width="15%">&nbsp;</td>
                    <td class="table-style-double" align="left" width="25%">&nbsp;</td>
                    <td class="table-style-double" align="center" width="5%">*/}<td className="acctSum" align="left" />
                        </tr>
                        <tr className="table-style-double odd">
                            <td className="table-style-double" align="center">3</td>
                            <td className="table-style-double" align="center">01-06-20<br />11:48:49</td>
                            <td className="table-style-double" align="left">11845157</td>
                            <td className="table-style-double" align="left"><span className="acc_bold">CTY CP GIAI PHAP THANH TOAN VIET NAM</span></td>
                            <td className="table-style-double" align="right">50.000</td>
                            <td className="table-style-double" align="left">GD đã hoàn tất</td>
                            
                        </tr>
                        <tr className="table-style-double odd">
                            <td className="table-style-double" align="center">&nbsp;</td>
                            <td className="table-style-double" align="center" /><td className="acctSum" align="left" colSpan={4}><div className="td_desc">35281628 Garena Lien Minh Huyen Thoai 100 RP</div></td>{/*</td>
                    <td class="table-style-double" align="left" width="13%">&nbsp;</td>
                    <td class="table-style-double" align="left" width="25%">&nbsp;</td>
                    <td class="table-style-double" align="right" width="15%">&nbsp;</td>
                    <td class="table-style-double" align="left" width="25%">&nbsp;</td>
                    <td class="table-style-double" align="center" width="5%">*/}<td className="acctSum" align="left" />
                        </tr>
                        <tr className="table-style-double">
                            <td className="table-style-double" align="center">4</td>
                            <td className="table-style-double" align="center">01-06-20<br />11:47:00</td>
                            <td className="table-style-double" align="left">11845157</td>
                            <td className="table-style-double" align="left"><span className="acc_bold">CTY CP GIAI PHAP THANH TOAN VIET NAM</span></td>
                            <td className="table-style-double" align="right">100.000</td>
                            <td className="table-style-double" align="left">GD do ngân hàng từ chối xử lý</td>
                            <td className="table-style-double" align="center">&nbsp;</td>
                        </tr>
                        <tr className="table-style-double">
                            <td className="table-style-double" align="center">&nbsp;</td>
                            <td className="table-style-double" align="center" /><td className="acctSum" align="left" colSpan={4}><div className="td_desc">35281514 Garena Lien Minh Huyen Thoai 210 RP</div></td>{/*</td>
                    <td class="table-style-double" align="left" width="13%">&nbsp;</td>
                    <td class="table-style-double" align="left" width="25%">&nbsp;</td>
                    <td class="table-style-double" align="right" width="15%">&nbsp;</td>
                    <td class="table-style-double" align="left" width="25%">&nbsp;</td>
                    <td class="table-style-double" align="center" width="5%">*/}<td className="acctSum" align="left" />
                        </tr>
                        <tr className="table-style-double odd">
                            <td className="table-style-double" align="center">5</td>
                            <td className="table-style-double" align="center">02-05-20<br />22:16:26</td>
                            <td className="table-style-double" align="left">11845157</td>
                            <td className="table-style-double" align="left"><span className="acc_bold">CTY CP GIAI PHAP THANH TOAN VIET NAM</span></td>
                            <td className="table-style-double" align="right">50.000</td>
                            <td className="table-style-double" align="left">GD đã hoàn tất</td>
                            
                        </tr>
                        <tr className="table-style-double odd">
                            <td className="table-style-double" align="center">&nbsp;</td>
                            <td className="table-style-double" align="center" /><td className="acctSum" align="left" colSpan={4}><div className="td_desc">34411865 Garena Lien Minh Huyen Thoai 100 RP</div></td>{/*</td>
                    <td class="table-style-double" align="left" width="13%">&nbsp;</td>
                    <td class="table-style-double" align="left" width="25%">&nbsp;</td>
                    <td class="table-style-double" align="right" width="15%">&nbsp;</td>
                    <td class="table-style-double" align="left" width="25%">&nbsp;</td>
                    <td class="table-style-double" align="center" width="5%">*/}<td className="acctSum" align="left" />
                        </tr>
                        </tbody></table>  
                    {/* them liet ke giao dich ck sau cua app 
                                <br/><br/>
                                
                                <div id="labeltblAPP"><h4>GIAO D&#7882;CH CHUY&#7874;N KHO&#7842;N SAU C&#7910;A APP</h4></div>
                                <br/><br/>
                                <table class="table-style-double" border="0" width="100%" cellspacing="1" cellpadding="0" id="tableAPP" >
                <caption></caption>
                </table> 	*/}
                </form>          
            </div>
        )
    }
}
