import React from 'react'
import MetaData from '../components/MetaData'

const Start = () => {
    return (
        <div className='bg-primary-light d-flex align-items-center  justify-content-center vh-100 '>
            <MetaData title={'Start'} />
            <div className="card bg-primary-light" style={{ width: "30%", height: 350, boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset" }}>
                <div className="card-bodyrow">
                    <div className="col-12 p-5">
                        <h2 className='text-center text-white fs-50 mb-4'>START INTERVIEW </h2>
                        <p className='text-center text-white fs-14 mb-4 '>After completion, receive a comprehensive analysis spotlighting your strengths, areas for improvement, and insights on your emotional responses. </p>
                        <p className='text-center text-white fs-14 mb-2'>
                            Get ready to uncover feedback that bridges the gap between preparation and perfection
                        </p>
                        
                        <a href="javascript:void(0);" className="btn bg-white mt-4 fs-18 font-w500 w-100 ">Practice Now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Start
