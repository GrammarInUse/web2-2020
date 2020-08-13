import React, { Component } from 'react'

export default class NavMenuUser extends Component {
    render() {
        return (
            <div id="wrapper">
                <div class="main">
                    <div class="main-left">
                        <a className="logo selected" href="javascript:void(0)" rel={1}>
                        <img src="img/logo.jpg" />
                        </a>
                        <h1>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CÁ NHÂN
                        </h1>
                        {/***********************/}
                        {/*Menu ben trai*/}
                        {/***********************/}
                        <ul id="menu">
                        <li><a href="javascript:void(0)" className="selected" rel={1}>Quản lý tài khoản</a>
                            <ul style={{}}>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkacctSumProc&dse_errorPage=/ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start" className="selected" rel={1}>
                                Thông tin tài khoản
                                </a></li>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkTruyVanTKVayProc&dse_errorPage=/ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Truy vấn tài khoản vay
                                </a>
                            </li>			
                            {/* NhiLTH, HS ACB.KHCN-201608059, 19/01/2018, an menu TTCK*/}
                            {/*<li>
                            <a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkttckttProc&dse_errorPage=index.jsp&dse_processorState=initial&dse_nextEventName=start&ttType=chung_khoan_thong_thuong">Thông tin ch&#7913;ng khoán
                            </a></li>
                            */}
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibktransOnlineSumProc&dse_errorPage=/ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Liệt kê giao dịch trực tuyến
                                </a></li>
                            <li><a href="javascript:void(0)">Quản lý chi tiêu</a>
                                <ul style={{display: 'none'}}>             
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkAllotmentListProc&dse_errorPage=/ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                    Lịch thanh toán
                                    </a></li>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkRegAllotmentProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                    Đăng ký thanh toán định kỳ trong ACB
                                    </a></li>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkRegExtAllotmentProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                    Đăng ký thanh toán định kỳ ngoài ACB
                                    </a></li>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkAllotmentInquiryProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                    Liệt kê đăng ký thanh toán định kỳ
                                    </a></li>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkPLGDQLCTProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                    Phân nhóm giao dịch
                                    </a></li>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkPLGDBieuDoProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                    Thống kê
                                    </a></li>
                                </ul>
                            </li>
                            </ul>
                        </li>
                        <li><a href="javascript:void(0)">Chuyển tiền</a>
                            <ul style={{display: 'none'}}>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkintFundTransProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Chuyển khoản trong ACB
                                </a></li>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkcardToCardFundTransProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Chuyển tiền NHANH ngoài ACB
                                </a></li>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkextFundTransProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Chuyển khoản ngoài ACB
                                </a></li>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkcardFundTransProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Chuyển tiền vào thẻ ACB
                                </a></li>			
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkidFundTransProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Chuyển tiền nhận bằng CMND/ Passport
                                </a></li>
                            <li><a href="javascript:void(0)">Chuyển khoản theo danh sách</a>
                                {/*child node c?p 3*/}
                                <ul style={{display: 'none'}}>
                                <li className="no-child"><a target="_blank" href="https://online.acb.com.vn/ibk/vn/duan_mbtt/chuyentheods/prelogin.jsp?user=11845157&lan=vi_VN">Chuyển khoản theo danh sách</a></li>
                                <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkSalarySignProc&dse_errorPage=/ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">Ký xác nhận giao dịch</a></li>
                                <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkSalaryProc&dse_errorPage=/ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">Liệt kê giao dịch</a></li>
                                </ul>
                                {/*end*/}
                            </li>
                            </ul>
                        </li>
                        <li><a href="javascript:void(0)">Thanh toán dịch vụ</a>
                            <ul style={{display: 'none'}}>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibktopUpProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Nạp tiền ĐTDĐ trả trước
                                </a></li>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkGameTopupProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Nạp thẻ game
                                </a></li>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkStockTopUpProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Nạp tiền chứng khoán
                                </a></li>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkbillingProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Thanh toán cước ĐTDĐ trả sau
                                </a></li>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkInternetBillingProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Thanh toán cước Internet ADSL
                                </a></li>
                            <li><a href="javascript:void(0)">Bảo hiểm FWD</a>
                                <ul style={{display: 'none'}}>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=displayPageOp&dse_errorPage=menu.jsp&dse_processorState=initial&pageName=ibk/fwd/landing.jsp#/fwd/landing-page?load=true">Mua bảo hiểm</a></li>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=displayPageOp&dse_errorPage=menu.jsp&dse_processorState=initial&pageName=ibk/fwd/translist.jsp#/fwd/liet-ke-lich-su-giao-dich?load=true">Liệt kê giao dịch</a></li>
                                </ul>
                            </li>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkdtcdbillingProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Thanh toán cước ĐTCĐ
                                </a></li>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkTTCTHBillingProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Thanh toán cước truyền hình
                                </a></li>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkbuypassportProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Thanh toán vé máy bay
                                </a></li>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkVNRBillingProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Thanh toán vé tàu lửa
                                </a></li>			
                            {/* Xuyendtk chinh sua theo ho so ACB.KHCN-201801007_BA_ACBO_SohaPay_OnOff*/}
                            {/* <li><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibksohaPayFundTransProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                            TT &#273;&#417;n hàng SohaPay
                                        </a></li> */}						
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkpaymentProc&dse_errorPage=/ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Thanh toán hóa đơn
                                </a></li>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkTanCangProc&dse_errorPage=/ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Thanh toán dịch vụ Cảng
                                </a></li>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=displayPageOp&dse_errorPage=/ibk/login.jsp&dse_processorState=initial&pageName=ibk/collections/create_txn.jsp#/services/scsc?load=true">
                                Thanh toán dịch vụ
                                </a></li>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkPaymentMerchantProc&dse_errorPage=/ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Thanh toán học phí
                                </a></li>					
                            {/*
                            <li><a href="javascript:void(0)">N&#7897p h&#7885c ph&#237</a>
                                <ul>             
                                    <li class="node-3"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkNopHocPhiProc&dse_errorPage=/ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                            Thanh toán h&#7885;c phí
                                        </a></li>
                                    <li class="node-3"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkEduFeeTransProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                            Li&#7879t k&#234 thanh to&#225n h&#7885c ph&#237
                                    </a></li>
                                </ul>
                            </li>
                        */}
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:void(0)">Western Union</a>
                            <ul style={{display: 'none'}}>
                            <li className="no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkWURegisterProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                Đăng ký
                                </a></li>
                            <li className="no-child"><a href="javascript:void(0)" style={{color: 'gray'}}>Nhận tiền kiều hối</a></li>
                            <li className="no-child"><a href="javascript:void(0)" style={{color: 'gray'}}>Liệt kê giao dịch</a></li>
                            <li className="no-child"><a href="javascript:void(0)" style={{color: 'gray'}}>Tra cứu thông tin</a></li>	 
                            </ul>	
                        </li>
                        <li><a href="javascript:void(0)">Tiền gửi</a>
                            <ul style={{display: 'none'}}>
                            {/* Xuyendtk chinh sua theo ho so ACB.KHCN-201801007_BA_ACBO_SohaPay_OnOff*/}
                            {/* HuyHT ACB.KHCN-201812092 mo lai menu DK CTKM*/}
                            {/*<li><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkReceiveCalendarProc&dse_errorPage=/ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                            &#272;&#259;ng k&#253; tham gia CTKM
                                        </a></li>
                            */}
                            <li><a href="javascript:void(0)">Tiền gửi có kỳ hạn</a>
                                {/*child node c?p 3*/}
                                <ul style={{display: 'none'}}>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkacctTermProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                    Mở tài khoản
                                    </a></li>
                                {/* web201304014 */}	
                                {/* web201304014 */}
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibktaitucTGKHProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">Cập nhật chỉ thị tái tục</a></li>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibktattoanTGKHProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">Tất toán tài khoản
                                    </a></li>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkNewacctTransProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                    Liệt kê giao dịch tiền gửi
                                    </a></li>
                                </ul>
                                {/*end*/}
                            </li>
                            {/*ACB.NHSO-201911029-L2*/}
                            <li><a href="javascript:void(0)">Tiền gửi Tích lũy Tương lai</a>
                                <ul style={{display: 'none'}}>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkAccumulatedSavingAcctInfoProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                    Thông tin tài khoản
                                    </a></li>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkAccumulatedSavingOpenAcctProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">Mở tài khoản</a></li>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkAccumulatedSavingPayInAcctProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">Gửi tiền vào tài khoản
                                    </a></li>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkAccumulatedSavingRegisterOrCancelProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                    Đăng ký/ Hủy tự động gửi tiền
                                    </a></li>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkFinalSettlementAccumulatedSavingProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                    Tất toán tài khoản
                                    </a></li>
                                </ul>
                            </li>
                            <li><a href="javascript:void(0)">Tiền gửi Online kỳ hạn tùy chọn</a>
                                {/*child node c?p 3*/}
                                <ul style={{display: 'none'}}>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkTGOnlineLinhDongProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">Mở tài khoản</a></li>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibktattoanTGOnlineTuyChonProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">Tất toán tài khoản
                                    </a></li>
                                <li className="node-3 no-child"><a href="Request?&dse_sessionId=aWM9pcT8ooKgE9rD8exa6oY&dse_applicationId=-1&dse_pageId=4&dse_operationName=ibkLKTGOnlineTuyChonProc&dse_errorPage=ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                    Liệt kê giao dịch tiền gửi
                                    </a></li>
                                </ul>
                                {/*end*/}
                            </li>
                        </li>
                        </ul>
                    </div>              
                </div>
            </div>
        )
    }
}
