import React, { Component } from 'react'

export default class profile extends Component {
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
                    <div className="main-navbar sticky-top bg-white">
                        {/* Main Navbar */}
                        <nav className="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
                        <form action="#" className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
                            <div className="input-group input-group-seamless ml-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                <i className="fas fa-search" />
                                </div>
                            </div>
                            <input className="navbar-search form-control" type="text" placeholder="Search for something..." aria-label="Search" /> </div>
                        </form>
                        <ul className="navbar-nav border-left flex-row ">
                            <li className="nav-item border-right dropdown notifications">
                            <a className="nav-link nav-link-icon text-center" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className="nav-link-icon__wrapper">
                                <i className="material-icons"></i>
                                <span className="badge badge-pill badge-danger">2</span>
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-small" aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item" href="#">
                                <div className="notification__icon-wrapper">
                                    <div className="notification__icon">
                                    <i className="material-icons"></i>
                                    </div>
                                </div>
                                <div className="notification__content">
                                    <span className="notification__category">Analytics</span>
                                    <p>Your website’s active users count increased by
                                    <span className="text-success text-semibold">28%</span> in the last week. Great job!</p>
                                </div>
                                </a>
                                <a className="dropdown-item" href="#">
                                <div className="notification__icon-wrapper">
                                    <div className="notification__icon">
                                    <i className="material-icons"></i>
                                    </div>
                                </div>
                                <div className="notification__content">
                                    <span className="notification__category">Sales</span>
                                    <p>Last week your store’s sales count decreased by
                                    <span className="text-danger text-semibold">5.52%</span>. It could have been worse!</p>
                                </div>
                                </a>
                                <a className="dropdown-item notification__all text-center" href="#"> View all Notifications </a>
                            </div>
                            </li>
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-nowrap px-3" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                <img className="user-avatar rounded-circle mr-2" src="images/avatars/0.jpg" alt="User Avatar" />
                                <span className="d-none d-md-inline-block">Sierra Brooks</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-small">
                                <a className="dropdown-item" href="user-profile-lite.html">
                                <i className="material-icons"></i> Profile</a>
                                <a className="dropdown-item" href="components-blog-posts.html">
                                <i className="material-icons">vertical_split</i> Blog Posts</a>
                                <a className="dropdown-item" href="add-new-post.html">
                                <i className="material-icons">note_add</i> Add New Post</a>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item text-danger" href="#">
                                <i className="material-icons text-danger"></i> Logout </a>
                            </div>
                            </li>
                        </ul>
                        <nav className="nav">
                            <a href="#" className="nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center border-left" data-toggle="collapse" data-target=".header-navbar" aria-expanded="false" aria-controls="header-navbar">
                            <i className="material-icons"></i>
                            </a>
                        </nav>
                        </nav>
                    </div>
                    {/* / .main-navbar */}
                    <div className="alert alert-success alert-dismissible fade show mb-0" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                        <i className="fa fa-check mx-2" />
                        <strong>Success!</strong> Your profile has been updated! </div>
                    <div className="main-content-container container-fluid px-4">
                        {/* Page Header */}
                        <div className="page-header row no-gutters py-4">
                        <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                            <span className="text-uppercase page-subtitle">Overview</span>
                            <h3 className="page-title">User Profile</h3>
                        </div>
                        </div>
                        {/* End Page Header */}
                        {/* Default Light Table */}
                        <div className="row">
                        <div className="col-lg-4">
                            <div className="card card-small mb-4 pt-3">
                            <div className="card-header border-bottom text-center">
                                <div className="mb-3 mx-auto">
                                <img className="rounded-circle" src="images/avatars/0.jpg" alt="User Avatar" width={110} /> </div>
                                <h4 className="mb-0">Sierra Brooks</h4>
                                <span className="text-muted d-block mb-2">Project Manager</span>
                                <button type="button" className="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2">
                                <i className="material-icons mr-1">person_add</i>Follow</button>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item px-4">
                                <div className="progress-wrapper">
                                    <strong className="text-muted d-block mb-2">Workload</strong>
                                    <div className="progress progress-sm">
                                    <div className="progress-bar bg-primary" role="progressbar" aria-valuenow={74} aria-valuemin={0} aria-valuemax={100} style={{width: '74%'}}>
                                        <span className="progress-value">74%</span>
                                    </div>
                                    </div>
                                </div>
                                </li>
                                <li className="list-group-item p-4">
                                <strong className="text-muted d-block mb-2">Description</strong>
                                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?</span>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card card-small mb-4">
                            <div className="card-header border-bottom">
                                <h6 className="m-0">Account Details</h6>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item p-3">
                                <div className="row">
                                    <div className="col">
                                    <form>
                                        <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="feFirstName">First Name</label>
                                            <input type="text" className="form-control" id="feFirstName" placeholder="First Name" defaultValue="Sierra" /> </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="feLastName">Last Name</label>
                                            <input type="text" className="form-control" id="feLastName" placeholder="Last Name" defaultValue="Brooks" /> </div>
                                        </div>
                                        <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="feEmailAddress">Email</label>
                                            <input type="email" className="form-control" id="feEmailAddress" placeholder="Email" defaultValue="sierra@example.com" /> </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="fePassword">Password</label>
                                            <input type="password" className="form-control" id="fePassword" placeholder="Password" /> </div>
                                        </div>
                                        <div className="form-group">
                                        <label htmlFor="feInputAddress">Address</label>
                                        <input type="text" className="form-control" id="feInputAddress" placeholder="1234 Main St" /> </div>
                                        <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="feInputCity">City</label>
                                            <input type="text" className="form-control" id="feInputCity" /> </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="feInputState">State</label>
                                            <select id="feInputState" className="form-control">
                                            <option selected>Choose...</option>
                                            <option>...</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-2">
                                            <label htmlFor="inputZip">Zip</label>
                                            <input type="text" className="form-control" id="inputZip" /> </div>
                                        </div>
                                        <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="feDescription">Description</label>
                                            <textarea className="form-control" name="feDescription" rows={5} defaultValue={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"} />
                                        </div>
                                        </div>
                                        <button type="submit" className="btn btn-accent">Update Account</button>
                                    </form>
                                    </div>
                                </div>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </div>
                        {/* End Default Light Table */}
                    </div>
                    <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
                        <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Products</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Blog</a>
                        </li>
                        </ul>
                        <span className="copyright ml-auto my-auto mr-2">Copyright © 2018
                        <a href="https://designrevision.com" rel="nofollow">DesignRevision</a>
                        </span>
                    </footer>
                    </main>
                </div>
                </div>
                <div className="promo-popup animated">
                <a href="http://bit.ly/shards-dashboard-pro" className="pp-cta extra-action">
                    <img src="https://dgc2qnsehk7ta.cloudfront.net/uploads/sd-blog-promo-2.jpg" /> </a>
                <div className="pp-intro-bar"> Need More Templates?
                    <span className="close">
                    <i className="material-icons">close</i>
                    </span>
                    <span className="up">
                    <i className="material-icons">keyboard_arrow_up</i>
                    </span>
                </div>
                <div className="pp-inner-content">
                    <h2>Shards Dashboard Pro</h2>
                    <p>A premium &amp; modern Bootstrap 4 admin dashboard template pack.</p>
                    <a className="pp-cta extra-action" href="http://bit.ly/shards-dashboard-pro">Download</a>
                </div>
                </div>
            </div>
        )
    }
}
