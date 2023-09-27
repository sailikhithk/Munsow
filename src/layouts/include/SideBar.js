import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
    return (
        <div className="dlabnav">
            <div className="dlabnav-scroll">
                <ul className="metismenu" id="menu">

                    <li>
                        <a href="/dashboard" aria-expanded="false">
                            <i className="fas fa-th-large"></i>
                            <span className="nav-text">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="/practice" aria-expanded="false">
                            <i className="fas fa-clone"></i>
                            <span className="nav-text">Practice Now</span>
                        </a>
                    </li>
                    <li>
                        <a href="/reports" aria-expanded="false">
                            <i className="fas fa-chart-line"></i>
                            <span className="nav-text">My Reports</span>
                        </a>
                    </li>
                    <li>
                        <a href="/notification" aria-expanded="false">
                            <i className="fas fa-bell"></i>
                            <span className="nav-text">Notification</span>
                        </a>
                    </li>
                    <br /><br /><br />
                    <li>
                        <a href="/profile" aria-expanded="false">
                            <i className="fas fa-user"></i>
                            <span className="nav-text">My Profile</span>
                        </a>
                    </li>
                    <li>
                        <a href="/settings" aria-expanded="false">
                            <i className="fas fa-cog"></i>
                            <span className="nav-text">Settings</span>
                        </a>
                    </li>
                    <br /><br />
                    <li>
                        <a href="/help-and-support" aria-expanded="false">
                            <i className="fas fa-question-circle"></i>
                            <span className="nav-text">Help & Support</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar
