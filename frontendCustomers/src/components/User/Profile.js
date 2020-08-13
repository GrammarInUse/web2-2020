import React, { Component } from 'react'

export default class profile extends Component {
    render() {
        return (
            <div className="main-right">
                {/***********************/}
                {/*Ph?n header ph?a tr?n b?n ph?i */}
                {/***********************/}
                <div className="header">
                <div className="timer">Thứ 3, ngày 11 tháng 08 năm 2020</div>
                <div className="header-right">
                    <a href="Request?&dse_sessionId=6_Ltorc3NTJPEfawX7ea-r3&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkLogoutOp&dse_errorPage=ibk/login.jsp&dse_processorState=initial" className="marginright">
                    <img src="img/icon/logout_web.png" alt="" />Thoát</a>
                    {/*<a href="javascript:void(0)" class="marginright"> <img
            src="img/icon/help.png" alt="" />Tr&#7907; gi�p</a> 
        */}
                    <a href="Request?&dse_sessionId=6_Ltorc3NTJPEfawX7ea-r3&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkTroGiupProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start" className="marginright">
                    <img src="img/icon/help.png" alt="" />Trợ giúp
                    </a>
                    <a href="Request?&dse_sessionId=6_Ltorc3NTJPEfawX7ea-r3&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkHopThuProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start" className="marginright">
                    Hộp thư
                    </a>
                    <a href="javascript:void(0)">  <img src="img/support.jpg" height="40px" style={{marginRight: '-5px!important'}} /></a>
                </div>
                </div>
                {/***********************/}
                {/*Phần nội dung chính*/}
                {/***********************/}
                <div className="content-holder">
                <h1>Xin chào, TO VAN NGUYEN</h1>
                {/* InstanceBeginEditable name="main" */}
                <h4>Thông tin tài khoản</h4>
                <div className="ruler" />
                <div className="news-item">   
                    <iframe src="https://online.acb.com.vn/news/index.php/quang-cao-tai-khoan-khcn" frameBorder={0} width="100%" height="40px" scrolling="no" marginHeight="0px" marginWidth="0px"> </iframe>
                </div>
                <h5>Nhấp chọn số tài khoản để xem thông tin chi tiết và in sao kê tài khoản
                </h5>
                <table>
                    <tbody><tr>
                        <td>
                        <table>
                            <tbody><tr>
                                <td align="left" />
                                <td align="right"><a href="Request?&dse_sessionId=6_Ltorc3NTJPEfawX7ea-r3&dse_applicationId=-1&dse_pageId=4&dse_operationName=acctOptionProc&dse_errorPage=/ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                    Chọn cách hiển thị tài khoản
                                </a></td>
                            </tr>
                            {/*<tr>
                                <td align="right" colspan="2"><a href="#" class="trogiup">Ch&#7885;n c&#225;ch hi&#7875;n th&#7883; t&#224;i kho&#7843;n</a></td>
                                </tr>
                            */}</tbody></table>             
                        </td>
                    </tr>
                    {/* NhiLTH, phan trang, 03/07/2018 */}
                    <tr>
                        <form name="choosePage" method="post" action="Request" />
                        <input type="hidden" name="dse_sessionId" defaultValue="6_Ltorc3NTJPEfawX7ea-r3" />
                        <input type="hidden" name="dse_applicationId" defaultValue={-1} />
                        <input type="hidden" name="dse_pageId" defaultValue={4} />
                        <input type="hidden" name="dse_operationName" defaultValue="ibkacctSumProc" />
                        <input type="hidden" name="dse_errorPage" defaultValue="ibk/index.jsp" />
                        <input type="hidden" name="dse_processorState" defaultValue="initial" />
                        <input type="hidden" name="dse_nextEventName" defaultValue="start" />
                        <td>
                        <div style={{width: '50%', float: 'left'}}>
                            <strong>
                            Tìm theo số tài khoản
                            </strong> &nbsp;&nbsp;&nbsp;&nbsp; <input type="text" name="AccountNumber" defaultValue className="padding-top: 8px;" size={20} onkeypress="return checkSubmit(event);" />
                            &nbsp;&nbsp;
                            <a style={{textAlign: 'center'}} className="img_login" href="#" onclick="ChoosePage();"><img src="img/icon/icon_search_rs.png" border={0} height="24px" /></a>
                        </div>
                        <input type="hidden" name="PageCurr" defaultValue id="PageCurr" />
                        <input type="hidden" name="TotalPage" defaultValue={1} /> 
                        </td>
                    </tr>
                    {/* NhiLTH, end phan trang */}
                    <tr>
                        <td align="left">
                        {/* NhiLTH, 16/07/2018, IBKE201807083_ACBO_Inq_AcctBal_TinhDenNgay  */}
                        {/*<table class="table-style" border="0" width="100%" cellspacing="1" cellpadding="0" id="table">
        <caption></caption>
        <tr class="table-style">
            <th class="table-style" align="center">S&#7889; t&#224;i kho&#7843;n</th>
            <th class="table-style" align="center">&#272&#417n v&#7883 m&#7903 TK</th>
            <th class="table-style" align="center">S&#7889; d&#432;</th>
            <th class="table-style" align="center">Tính &#273;&#7871;n ngày</th>
            <th class="table-style" align="center">Ngày &#273;áo h&#7841;n</th>
            <th class="table-style" align="center">S&#7843n ph&#7849m</th>
        </tr>
        <tr class="table-style">
            <td class="table-style" align="right" width="12%"><a href="Request?&dse_sessionId=6_Ltorc3NTJPEfawX7ea-r3&dse_applicationId=-1&dse_pageId=3&dse_operationName=ibkacctDetailProc&dse_errorPage=login.jsp&dse_processorState=initial&dse_nextEventName=start&AccountNbr=11845157" class="acc_bold">11845157</a></td>
            <td class="table-style" align="left" width="21%">ACB - PGD KIEN THIET</td>
            <td class="table-style" align="right" width="32%"><span class="text_bold">375.354</span> (VND) <sup class="chuthich_num"> 1</sup><br /><span class="text_bold">289.100</span> (VND) <sup class="chuthich_num"> 2</sup></td>
            <td class="table-style" align="center" width="10%">11-08-20</td>
            <td class="table-style" align="center" width="10%">&nbsp;</td>
            <td class="table-style" align="left" width="15%">TGTT KHTN (CA NHAN) VND</td>
        </tr>
        </table>
                            
                                */}
                        <table className="table-style" cellSpacing={1} cellPadding={0} id="table">
                            <caption />
                            <tbody><tr className="table-style tr-header">
                                <th className="table-style" align="center">Số tài khoản</th>
                                <th className="table-style" align="center">Đơn vị mở TK</th>
                                <th className="table-style" align="center">Số dư</th>
                                <th className="table-style" align="center">Ngày đáo hạn</th>
                                <th className="table-style" align="center">Sản phẩm</th>
                            </tr>
                            <tr className="table-style odd">
                                <td className="table-style" align="right"><a href="Request?&dse_sessionId=6_Ltorc3NTJPEfawX7ea-r3&dse_applicationId=-1&dse_pageId=3&dse_operationName=ibkacctDetailProc&dse_errorPage=login.jsp&dse_processorState=initial&dse_nextEventName=start&AccountNbr=11845157" className="acc_bold">11845157</a></td>
                                <td className="table-style" align="left">ACB - PGD KIEN THIET</td>
                                <td className="table-style" align="right"><span className="text_bold">375.354</span> (VND) <sup className="chuthich_num"> 1</sup><br /><span className="text_bold">289.100</span> (VND) <sup className="chuthich_num"> 2</sup></td>
                                <td className="table-style" align="center">&nbsp;</td>
                                <td className="table-style" align="left">TGTT KHTN (CA NHAN) VND</td>
                            </tr>
                            </tbody></table>
                        {/* NhiLTH, end */}
                        </td>
                    </tr>
                    <tr>
                        <td />
                    </tr>
                    <tr>
                        <td align="left"><sup className="chuthich_num"> 1 </sup> <span className="red_tieude">SỐ DƯ THỰC (CURRENT BALANCE)</span><br />
                        Là số dư có thực tế trên tài khoản tiền gửi của khách hàng<br />
                        <br />
                        <sup className="chuthich_num"> 2 </sup> <span className="red_tieude"> SỐ DƯ KHẢ DỤNG (AVAILABLE BALANCE)</span><br />
                        Là số dư trên tài khoản tiền gửi thanh toán mà khách hàng được phép sử dụng. 
                        Trong trường hợp khách hàng được cấp hạn mức thấu chi thì số dư khả dụng bằng tổng số dư thực cộng với hạn mức thấu chi trừ đi số tiền bị phong tỏa trên tài khoản (nếu có ).
                        <br /></td>
                    </tr>
                    <tr>
                        <td align="left">&nbsp;</td>
                    </tr>
                    </tbody></table>
                <div id="ZN_5gXroaGs8mlLApf">{/*DO NOT REMOVE-CONTENTS PLACED HERE*/}</div>
                {/*END WEBSITE FEEDBACK SNIPPET*/}
                {/* InstanceEndEditable */}
                </div>
                
            </div>
        )
    }
}
