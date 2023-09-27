import React, { useState } from 'react'
import App from '../layouts/App'
import MetaData from '../components/MetaData'
const Practice = () => {
    const [level, setLevel] = useState(12);
    return (
        <App>
            <MetaData title="Practice" />
            <div className="row">
                <div className="col-xl-12 col-xxl-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Practice</h4>
                        </div>
                        <div className="card-body">
                            <div id="smartwizard" className="form-wizard order-create">
                                <ul className="nav nav-wizard">
                                    <li><a className="nav-link" href="#skill">
                                        <span>1</span>
                                    </a></li>
                                    <li><a className="nav-link" href="#role">
                                        <span>2</span>
                                    </a></li>
                                    <li><a className="nav-link" href="#level">
                                        <span>3</span>
                                    </a></li>
                                    <li><a className="nav-link" href="#check">
                                        <span>4</span>
                                    </a></li>
                                </ul>
                                <div className="tab-content">
                                    <div id="skill" className="tab-pane" role="tabpanel">
                                        <div className="row p-5">
                                            <div className="col-lg-4 offset-4 mb-2">
                                                <h2 className='text-primary'>Skill Specific</h2>
                                                <p>Choose your mock interview</p>
                                                <div className="form-check mb-2">
                                                    <input type="checkbox" style={{ width: 40, height: 40 }} className="form-check-input" id="check1" value="" checked />
                                                    <label className="form-check-label pt-2 custom_label" for="check1">Hard Skills</label>
                                                </div>
                                                <br clear="all" />
                                                <div className="form-check mb-2">
                                                    <input type="checkbox" style={{ width: 40, height: 40 }} className="form-check-input" id="check2" value="" />
                                                    <label className="form-check-label pt-2 custom_label" for="check2">Soft Skills</label>
                                                </div>
                                            </div>

                                        </div>
                                        <br /><br />
                                    </div>
                                    <div id="role" className="tab-pane" role="tabpanel">
                                        <div className="row p-5">
                                            <div className="col-lg-4 offset-4 mb-2">
                                                <h2 className='text-primary'>Role Specific</h2>
                                                <p>Choose your mock interview</p>
                                                <div className="form-check mb-2">
                                                    <input type="checkbox" style={{ width: 40, height: 40 }} className="form-check-input" id="check1" value="" checked />
                                                    <label className="form-check-label pt-2 custom_label" for="check1">Choose Role</label>
                                                </div>
                                                <br clear="all" />
                                                <div className="form-check mb-2">
                                                    <input type="checkbox" style={{ width: 40, height: 40 }} className="form-check-input" id="check2" value="" />
                                                    <label className="form-check-label pt-2 custom_label" for="check2">Choose Company</label>
                                                </div>
                                            </div>

                                        </div>
                                        <br /><br />
                                    </div>
                                    <div id="level" className="tab-pane" role="tabpanel">
                                        <div className="row p-5 text-center ">
                                            <div className="col-lg-8 offset-2 mb-2">
                                                <h2 className='text-primary'>Level</h2>
                                                <div className="slider-container">
                                                    <input type="radio" name="slider" id="low" className="slider-radio" />
                                                    <input type="radio" name="slider" id="medium" className="slider-radio" />
                                                    <input type="radio" name="slider" id="high" className="slider-radio" />
                                                    <div className="slider">
                                                        <div className="slider-handle" style={{left:`${level}%`}}></div>
                                                    </div>

                                                    <div className='row mt-5'>
                                                        <div className='col '>
                                                            <button className='btn btn-success' onClick={() => setLevel(12)}>Low</button>
                                                        </div>
                                                        <div className='col'>
                                                            <button className='btn btn-warning' onClick={() => setLevel(47)}>Medium</button>
                                                        </div>
                                                        <div className='col text-right'>
                                                            <button className='btn btn-danger' onClick={() => setLevel(82)}>High</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br />
                                                Or
                                                <br />
                                                <div className="mb-3 row">
                                                    <h5 className='text-primary'>Choose your Experience level</h5>
                                                    <div className="col-sm-12">
                                                        <select name="" className='form-control'>
                                                            <option value="">Choose</option>
                                                            <option value="">1</option>
                                                            <option value="">2</option>
                                                        </select>
                                                    </div>
                                                </div>




                                            </div>

                                        </div>
                                        <br /><br /><br />

                                    </div>
                                    <div id="check" className="tab-pane" role="tabpanel">
                                        <div className="row p-5 text-center ">
                                            <div className="col-lg-4 offset-4 mb-2">
                                                <i className='fas fa-laptop' style={{ fontSize: 60, marginBottom: 30 }}></i>
                                                <h2 className='text-primary mb-3 '>System Checks</h2>
                                                <p>Please complete this 3 minutes walk through to confirm your device/system is ready for a Validity test.</p>


                                                <div className="mb-3">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" checked />
                                                        <label className="form-check-label">I'm completing ths check on this device and Wi-Fi network where i will participate.</label>
                                                    </div>
                                                </div>
                                                <button className='btn btn-primary  w-100 '>Begin</button>
                                            </div>

                                        </div>
                                        <br /><br /><br />

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

export default Practice