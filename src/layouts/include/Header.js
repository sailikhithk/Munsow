import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <React.Fragment>
            <div className="nav-header">
                <a href="/dashboard" className="brand-logo">
                    MS
                    <div className="brand-title">
                        <h2 className="">MUNSOW</h2>
                    </div>
                </a>
                <div className="nav-control">
                    <div className="hamburger">
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                    </div>
                </div>
            </div>
            <div>
                <div className="header">
                    <div className="header-content">
                        <nav className="navbar navbar-expand">
                            <div className="collapse navbar-collapse justify-content-between">
                                <div className="header-left">
                                    <div className="dashboard_bar">
                                        Dashboard
                                    </div>
                                </div>
                                <ul className="navbar-nav header-right">
                                    <li className="nav-item d-flex align-items-center">
                                        <div className="input-group search-area">
                                            <input type="text" className="form-control" placeholder="Search here..." />
                                            <span className="input-group-text"><a href="javascript:void(0)"><i className="flaticon-381-search-2"></i></a></span>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown notification_dropdown">
                                        <Link className="nav-link " to="javascript:void(0);">
                                            <i className="fas fa-heart"></i>
                                            <span className="badge light text-white bg-secondary rounded-circle">76</span>
                                        </Link>
                                    </li>



                                    <li className="nav-item dropdown  header-profile">
                                        <Link className="nav-link" to="javascript:void(0);" role="button" data-bs-toggle="dropdown">
                                            <img src="/images/user.jpg" width="56" alt="" />
                                        </Link>
                                        <div className="dropdown-menu dropdown-menu-end">
                                            <Link to="/profile" className="dropdown-item ai-icon">
                                                <i className="fas fa-user"></i>
                                                <span className="ms-2">Profile </span>
                                            </Link>
                                            <Link to="/password" className="dropdown-item ai-icon">
                                                <i className="fas fa-lock"></i>
                                                <span className="ms-2">Password </span>
                                            </Link>
                                            <Link to="/logout" className="dropdown-item ai-icon">
                                                <i className="fas fa-sign-out-alt"></i>
                                                <span className="ms-2">Logout </span>
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header
