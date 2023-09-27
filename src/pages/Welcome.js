import React from 'react'
import App from '../layouts/App'
import MetaData from '../components/MetaData'
import { Chart } from "react-google-charts";

const data = [
    ["Task", "Hours per Day"],
    ["TeamWork", 5],
    ["Excel", 3],
];

const options = {
    colors: ['#ad86f1', '#5b4da5'],
    pieHole: 0.4,
    is3D: false,
    pieSliceText: 'none',
    tooltip: {
        text: 'value'
    }
};
const Welcome = () => {
    return (
        <App>
            <MetaData title="Welcome" />
            <div className="card">
                <div className="card-header border-0 bg-primary ">
                    <h1 className='text-white custom__heading__wel'>Welcome Arpitha!</h1>
                </div>
                <div className="card-body">
                    <div className='row p-5 text-center '>
                        <div className='col'>
                            <button className='btn btn-primary  btn-lg rounded-1'>START MOCK INTERVIEW</button>
                        </div>
                        <div className='col'>
                            <button className='btn btn-primary  btn-lg rounded-1'>VIEW MOCK INTERVIEW</button>
                        </div>
                    </div>
                    <div className='row p-5 text-center '>
                        <h2><b>KEY HIGHLIGHTS</b></h2>
                    </div>


                    <div className='row'>
                        <div class="col">
                            <div class="widget-stat card bg-primary" style={{ height: "auto " }}>
                                <div class="card-body  p-4">
                                    <div class="media">
                                        <span class="me-3">
                                            <i class="fa fa-check"></i>
                                        </span>
                                        <div class="media-body text-white text-end">
                                            <h4 class="mb-1 text-white">Improvement area Identified</h4>
                                            <h3 class="text-white">5</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <h4 class="mb-1 text-dark">Average Interview Score</h4>
                            <h2 class="text-primary">74/100</h2>
                            <h4 class="mb-1 text-dark">Skill Gap rate</h4>
                            <h2 class="text-primary">23%</h2>

                        </div>
                        <div class="col">
                            <h4 class="mb-1 text-dark">Critical Improvement Area</h4>
                            <Chart
                                chartType="PieChart"
                                data={data}
                                options={options}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </App >
    )
}

export default Welcome
