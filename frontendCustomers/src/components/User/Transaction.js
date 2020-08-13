import React, { Component } from 'react'

export default class transaction extends Component {
    render() {
        return (
            <div>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <title>Shards Dashboard Lite - Free Bootstrap Admin Template – DesignRevision</title>
                <meta name="description" content="A high-quality & free Bootstrap admin dashboard template pack that comes with lots of templates and components." />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
                <link rel="stylesheet" id="main-stylesheet" data-version="1.1.0" href="styles/shards-dashboards.1.1.0.min.css" />
                <link rel="stylesheet" href="styles/extras.1.1.0.min.css" />
                <div className="color-switcher animated">
                <h5>Accent Color</h5>
                <ul className="accent-colors">
                    <li className="accent-primary active" data-color="primary">
                    <i className="material-icons">check</i>
                    </li>
                    <li className="accent-secondary" data-color="secondary">
                    <i className="material-icons">check</i>
                    </li>
                    <li className="accent-success" data-color="success">
                    <i className="material-icons">check</i>
                    </li>
                    <li className="accent-info" data-color="info">
                    <i className="material-icons">check</i>
                    </li>
                    <li className="accent-warning" data-color="warning">
                    <i className="material-icons">check</i>
                    </li>
                    <li className="accent-danger" data-color="danger">
                    <i className="material-icons">check</i>
                    </li>
                </ul>
                <div className="actions mb-4">
                    <a className="mb-2 btn btn-sm btn-primary w-100 d-table mx-auto extra-action" href="https://designrevision.com/downloads/shards-dashboard-lite/">
                    <i className="material-icons">cloud</i> Download</a>
                    <a className="mb-2 btn btn-sm btn-white w-100 d-table mx-auto extra-action" href="https://designrevision.com/docs/shards-dashboard-lite">
                    <i className="material-icons">book</i> Documentation</a>
                </div>
                <div className="social-wrapper">
                    <div className="social-actions">
                    <h5 className="my-2">Help us Grow</h5>
                    <div className="inner-wrapper">
                        <a className="github-button" href="https://github.com/DesignRevision/shards-dashboard" data-icon="octicon-star" data-show-count="true" aria-label="Star DesignRevision/shards-dashboard on GitHub">Star</a>
                        {/* <iframe style="width: 91px; height: 21px;"src="https://yvoschaap.com/producthunt/counter.html#href=https%3A%2F%2Fwww.producthunt.com%2Fr%2Fp%2F112998&layout=wide" width="56" height="65" scrolling="no" frameborder="0" allowtransparency="true"></iframe> */}
                    </div>
                    </div>
                    <div id="social-share" data-url="https://designrevision.com/downloads/shards-dashboard-lite/" data-text="🔥 Check out Shards Dashboard Lite, a free and beautiful Bootstrap 4 admin dashboard template!" data-title="share" />
                    <div className="loading-overlay">
                    <div className="spinner" />
                    </div>
                </div>
                <div className="close">
                    <i className="material-icons">close</i>
                </div>
                </div>
                <div className="color-switcher-toggle animated pulse infinite">
                <i className="material-icons">settings</i>
                </div>
                <div className="container-fluid">
                <div className="row">
                    {/* Main Sidebar */}
                    <aside className="main-sidebar col-12 col-md-3 col-lg-2 px-0">
                    <div className="main-navbar">
                        <nav className="navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0">
                        <a className="navbar-brand w-100 mr-0" href="#" style={{lineHeight: '25px'}}>
                            <div className="d-table m-auto">
                            <img id="main-logo" className="d-inline-block align-top mr-1" style={{maxWidth: '25px'}} src="images/shards-dashboards-logo.svg" alt="Shards Dashboard" />
                            <span className="d-none d-md-inline ml-1">Shards Dashboard</span>
                            </div>
                        </a>
                        <a className="toggle-sidebar d-sm-inline d-md-none d-lg-none">
                            <i className="material-icons"></i>
                        </a>
                        </nav>
                    </div>
                    <form action="#" className="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none">
                        <div className="input-group input-group-seamless ml-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                            <i className="fas fa-search" />
                            </div>
                        </div>
                        <input className="navbar-search form-control" type="text" placeholder="Search for something..." aria-label="Search" /> </div>
                    </form>
                    <div className="nav-wrapper">
                        <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link " href="index.html">
                            <i className="material-icons">edit</i>
                            <span>Blog Dashboard</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="components-blog-posts.html">
                            <i className="material-icons">vertical_split</i>
                            <span>Verifying User</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="add-new-post.html">
                            <i className="material-icons">note_add</i>
                            <span>Add New Post</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="form-components.html">
                            <i className="material-icons">view_module</i>
                            <span>Forms &amp; Components</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="tables.html">
                            <i className="material-icons">table_chart</i>
                            <span>Tables</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="user-profile-lite.html">
                            <i className="material-icons">person</i>
                            <span>User Profile</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="errors.html">
                            <i className="material-icons">error</i>
                            <span>Errors</span>
                            </a>
                        </li>
                        </ul>
                    </div>
                    </aside>
                    {/* End Main Sidebar */}
                    <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
                    <h1>Xin chào</h1>
                        {/* InstanceBeginEditable name="main" */}
                        <h4>Chuyển khoản trong hệ thống ngân hàng</h4>
                        <div className="ruler" />
                        <form name="intrtxn" method="post" action="Request" className="margin:0px;">
                        <input type="hidden" name="dse_sessionId" defaultValue="NtUJvDNjrK0__TG7lXafjFc" />
                        <input type="hidden" name="dse_applicationId" defaultValue={-1} />
                        <input type="hidden" name="dse_operationName" defaultValue="ibkintFundTransProc" />
                        <input type="hidden" name="dse_pageId" defaultValue={5} />
                        <input type="hidden" name="dse_processorState" defaultValue="intFundTransPage" />
                        <input type="hidden" name="dse_processorId" defaultValue="CCBFCZCPDQBPAYAMESHXIXDUFIDEHOCLGTJGDLFM" />
                        <input type="hidden" name="dse_errorPage" defaultValue="ibk/fundtrans/intrtxn.jsp" />
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
                            <tbody><tr>
                                <td className="white_tieude_2">
                                Tài khoản trích tiền 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <table>
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
                                    <tr>
                                        <td />
                                        <td><span className="alert">
                                        </span></td>
                                    </tr>
                                    </tbody></table>
                                </td>
                            </tr>
                            <tr>
                                <td className="white_tieude">
                                TÀI KHOẢN THỤ HƯỞNG
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <table>
                                    <tbody><tr>
                                        <td className="caption"><input type="radio" name="IsAcctFromList" defaultValue="false" defaultChecked="checked" id="tkl1" /> Lấy từ danh sách</td>
                                        <td><select name="AccountNbrCo1" id="AccountNbrCo1" data-select2-id="AccountNbrCo1" tabIndex={-1} className="select2-hidden-accessible" aria-hidden="true">
                                            <option value selected="selected" data-select2-id={2} />
                                            <option value={184905669}>CTY CP GIAI PHAP THANH TOAN VIET NAM-184905669</option>
                                        </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id={1} style={{width: '335px'}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-labelledby="select2-AccountNbrCo1-container"><span className="select2-selection__rendered" id="select2-AccountNbrCo1-container" role="textbox" aria-readonly="true"><span className="select2-selection__placeholder" /></span><span className="select2-selection__arrow" role="presentation"><b role="presentation" /></span></span></span><span className="dropdown-wrapper" aria-hidden="true" /></span></td>
                                    </tr>
                                    <tr>
                                        <td />
                                        <td colSpan={2}>
                                        <span className="copyright">TK đánh dấu</span> (<span className="note-red">*</span>) <span className="copyright">là TK thụ hưởng tin cậy</span> </td>
                                    </tr>
                                    <tr>
                                        <td><input type="radio" name="IsAcctFromList" defaultValue="true" id="tkl2" /> Nhập số tài khoản</td>
                                        <td><input type="text" name="AccountNbrCo" defaultValue size={30} id="AccountNbrCo" onkeypress="return isNumberKey(event);" style={{visibility: 'hidden'}} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td />
                                        <td><span className="alert">
                                        </span></td>
                                    </tr>
                                    {/*<tr>
                                            <td>Ti&#7873;n t&#7879;</td>
                                            <td><select name="Currency" id="select2"
                                                style="width: 205px;">
                                                <option>
                                                    VND
                                                </option>
                                            </select></td>
                                        </tr>
                                    */}</tbody></table>
                                </td>
                            </tr>
                            <tr>		
                                <td>
                                <input type="hidden" name="AuthStatus" defaultValue id="AuthStatus" />								
                                <input type="hidden" name="cungchu" defaultValue id="cungchu" />
                                <input type="hidden" name="AuthTypePWD" defaultValue id="AuthTypePWD" />									
                                </td>
                            </tr>
                            <tr>
                                <td className="white_tieude">
                                THÔNG TIN CHUYỂN KHOẢN
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <table>
                                    <tbody><tr>
                                        <td className="caption">Số tiền</td>
                                        <td><input type="text" name="Amount" defaultValue size={30} id="Amount" onkeypress="return isNumberKey(event);" onchange="this.value = changeAmount(this.value);" maxLength={18} /></td>
                                    </tr>
                                    <tr>
                                        <td>Số tiền bằng chữ</td>
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
                                        <td><textarea name="Description" cols rows wrap="soft" className="text_noidung" onkeyup="return checkLength(this.form);" defaultValue={""} /></td>
                                    </tr>
                                    <tr>
                                        <td>Số tham chiếu</td>
                                        <td><input type="text" name="EdtRef" defaultValue maxLength={30} size={30} /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" name="ChooseEmail1" defaultValue="true" id="ChooseEmail1" />Nhận email kết quả giao dịch
                                        <input type="hidden" name="ChooseEmail" id="ChooseEmail" defaultValue /></td>
                                        <td>
                                        <input type="text" name="getEmail" defaultValue size={30} id="getEmail" maxLength={500} disabled="disabled" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                        <span className="note-red">Lưu ý:</span>
                                        <span className="copyright">Nếu có nhiều email thì cách nhau bằng dấu chấm (;).
                                            Đối với giao dịch thành công, Ủy nhiệm chi sẽ được đính kèm trong email
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                        <span className="copyright">Số tham chiếu (nếu đơn vị thụ hưởng yêu cầu cung cấp) là số hợp đồng tín dụng, số hóa đơn, số hợp đồng bảo hiểm…Số tham chiếu không bắt buộc nhập.
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                        <span className="copyright">
                                            Khách hàng có nhu cầu nộp tiền chứng khoán. Vui lòng thực hiện tại màn hình
                                            <a href="Request?&dse_sessionId=NtUJvDNjrK0__TG7lXafjFc&dse_applicationId=-1&dse_pageId=5&dse_operationName=ibkStockTopUpProc&dse_errorPage=/ibk/login.jsp&dse_processorState=initial&dse_nextEventName=start">
                                            Nạp tiền 
                                            </a>
                                        </span>
                                        </td>
                                    </tr>
                                    </tbody></table>
                                </td>
                            </tr>
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
                                        <span className="copyright">Thời gian chuyển khoản sau trong vòng 30 ngày
                                        </span></td>
                                    </tr>
                                    </tbody></table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <div id="ppxt_tkdttt">
                                    <table>
                                    <tbody><tr>
                                        <td colSpan={2} className="white_tieude">
                                            PHƯƠNG PHÁP XÁC THỰC
                                        </td>
                                        </tr>
                                        <tr>
                                        <td className="caption">Chọn phương pháp xác thực</td>
                                        <td><select name="AuthTyp" id="AuthTyp">
                                            <option value selected="selected" />
                                            <option value="PWD">Mật khẩu tĩnh</option>
                                            <option value="SMS">Mật khẩu tĩnh + OTP SMS</option>
                                            </select></td>
                                        </tr>
                                    </tbody></table>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="center">
                                <input type="hidden" name="dse_nextEventName" defaultValue id="dse_nextEventName" /> <input name="button" type="button" className="nut1 button-blue" id="button" defaultValue="Đồng ý" onclick="dosubmit('ok');" /> <input name="button2" type="button" className="nut1 button-white" id="button2" defaultValue="Hủy" onclick="dosubmit('cancel');" /></td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                <span className="note-red">Lưu ý:</span><br />
                                - <span className="copyright">Khi chọn Đơn vị thụ hưởng chịu phí, số tiền phí sẽ được trừ vào số tiền chuyển.</span><br />
                                - <span className="copyright">Giao dịch chuyển khoản cho cá nhân nước ngoài: chỉ thực hiện giao dịch chuyển lương và công tác phí. Các giao dịch này phải có chứng từ chứng minh theo quy định
                                </span></td>
                            </tr>
                            </tbody></table>
                        </form>
                    </main>
                </div>
                </div>
            </div>
        )
    }
}
