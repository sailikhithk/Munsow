import React from 'react'
import App from '../layouts/App'
import MetaData from '../components/MetaData'
const PageNotFound = () => {
    return (
        <App>
            <MetaData title="Page Not Found" />
            <div className="card">
                <div className="card-header border-0 bg-primary ">
                    <h1 className='text-white'>404 - Page Not Found !</h1>
                </div>
                <div className="card-body">
                    <p>Looks like this page went on vacation...</p>
                </div>
            </div>

        </App >
    )
}

export default PageNotFound
