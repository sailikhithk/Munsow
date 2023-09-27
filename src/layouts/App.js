import React from 'react'
import Header from './include/Header'
import SideBar from './include/SideBar'
import Footer from './include/Footer'

const App = ({ children }) => {
    return (

        <div id="main-wrapper">
            <Header />
            <SideBar />
            <div className="content-body">
                <div className="container-fluid">
                    {children}
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default App
