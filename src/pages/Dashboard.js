import React from 'react'
import App from '../layouts/App'
import MetaData from '../components/MetaData'

import { Chart } from "react-google-charts";
const LineData = [
    ['x', 'Mindset/Attitude', 'Knowledge/ Skill', 'Practical Thinking'],
    [0, 0, 0, 0],
    [1, 10, 5, 10],
    [2, 23, 15, 10],
    [3, 17, 9, 10],
    [4, 18, 10, 10],
    [5, 9, 5, 10],
    [6, 11, 15, 11],
    [7, 27, 19, 20],
]
const LineChartOptions = {
    hAxis: {
        title: 'Last 4 scores',
    },
    vAxis: {
        title: 'Interview Score',
    },
    series: {
        1: { curveType: 'Last 4 scores' },
    },
}

const Dashboard = () => {
    return (
        <App>
            <MetaData title="Dashboard" />
            <div className="row">
                <div className="col-xl-12">
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="card tryal-gradient">
                                        <div className="card-body tryal row">
                                            <div className="col-xl-7 col-sm-6">
                                                <h2>Hello Arpitha!!!</h2>
                                                <span>Are you ready for your next interview? </span>
                                                <div className='d-flex  flex-row '>
                                                    <a href="javascript:void(0);" className="btn btn-rounded  fs-18 font-w500">Practice Now</a>

                                                    <a href="javascript:void(0);" style={{ background: "transparent", border: "5px solid #fff", marginLeft: 10, color:"#fff" }} className="btn btn-rounded fs-18 font-w500">View My Reports</a>
                                                </div>
                                            </div>
                                            <div className="col-xl-5 col-sm-6">
                                                <img style={{ position: "absolute", right: 0, bottom: 0 }} src="images/dashboard-image.png" alt="" className="sd-shapea" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="card">
                                        <div className="card-header border-0 flex-wrap">
                                            <h4 className="fs-20 font-w700 mb-2">My Interview Score Trend</h4>
                                            <div className="d-flex align-items-center">
                                                <div className="bg-primary p-2 rounded-circle"></div>&nbsp;
                                                <label className="form-check-label font-w400 fs-16 mb-0">Mindset/Attitude</label>&nbsp;&nbsp;&nbsp;
                                                <div className="bg-danger p-2 rounded-circle"></div>&nbsp;
                                                <label className="form-check-label font-w400 fs-16 mb-0">Knowledge/ Skill</label>&nbsp;&nbsp;&nbsp;
                                                <div className="bg-warning p-2 rounded-circle"></div>&nbsp;
                                                <label className="form-check-label font-w400 fs-16 mb-0">Practical Thinking</label>&nbsp;
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <Chart
                                                width={'100%'}
                                                height={'300px'}
                                                chartType="LineChart"
                                                loader={<div>Loading Chart</div>}
                                                data={LineData}
                                                options={LineChartOptions}
                                                rootProps={{ 'data-testid': '2' }}
                                            />
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                        <div className="col-xl-4">
                            <div className="card" style={{ height: "auto" }}>
                                <div className="card-header p-1">
                                    <h4 className="card-intro-title text-primary text-center  pt-3 pl-3">Hard Skill vs Soft Skill Trend</h4>
                                </div>
                                <div className="card-body px-0">


                                    <div className="d-flex justify-content-between recent-emails">
                                        <div className="d-flex">
                                            <div className="profile-k">
                                                <img src="images/profile/small/pic7.jpg" alt="" />
                                            </div>
                                            <div className="ms-3">
                                                <a href="email-inbox.html"><h4 className="fs-18 font-w500">Hard Skills</h4></a>
                                                <span className="font-w400 d-block">Increased by 6.5%...</span>
                                            </div>
                                        </div>
                                        <div className="email-check">
                                            <label className="like-btn mb-0">
                                                <img className="checkmark"  src="images/rea1.png" alt="" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between recent-emails" style={{borderBottom:"none"}}>
                                        <div className="d-flex">
                                            <div className="profile-k">
                                                <img src="images/profile/small/pic1.jpg" alt="" />
                                            </div>
                                            <div className="ms-3">
                                                <a href="email-inbox.html"><h4 className="fs-18 font-w500">Hard Skills</h4></a>
                                                <span className="font-w400 d-block">Increased by 6.5%...</span>
                                            </div>
                                        </div>
                                        <div className="email-check">
                                            <label className="like-btn mb-0">
                                                <img  className="checkmark" src="images/green1.png" alt="" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="card" style={{ height: "auto" }}>
                                <div className="card-header p-1">
                                    <h4 className="card-intro-title text-primary text-center  pt-3 pl-3">Keep Your Calm</h4>
                                </div>
                                <div className="card-body p-4">
                                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-indicators">
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                        </div>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                We noticed some signs of anxiety during your last mock interview. Remember, deep breaths can help.
                                            </div>
                                            <div className="carousel-item">
                                                We noticed some signs of anxiety during your last mock interview. Remember, deep breaths can help.
                                            </div>
                                            <div className="carousel-item">
                                                We noticed some signs of anxiety during your last mock interview. Remember, deep breaths can help.
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>


                </div>
            </div>
        </App >
    )
}

export default Dashboard
