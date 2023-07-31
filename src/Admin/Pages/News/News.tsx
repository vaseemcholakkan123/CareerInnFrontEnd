import './../../admin.css'

import React from 'react'

function News() {
    return (
        <div className='w-100'>
            <header className='w-100 d-flex p-1 p-md-4 a-center'>
                <h3>CareerInn News</h3>

                <div className='d-flex a-center gap-2 ms-auto'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="18" height="18" focusable="false">
                        <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"></path>
                    </svg>
                    <p>Add New</p>
                </div>
            </header>

            <div className="row p-1 m-md-2 m-1 gy-2 container-height-admin">


                <div className='col-6 p-1 p-md-4 r-7 app-shadow d-flex'>
                    <div>
                        <h5>NBFCs disburse more personal loans</h5>
                        <p className="f-small">Posted 2day ago</p>
                    </div>

                    <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto me-1 bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>

                    <ul className="dropdown-menu dropdown-menu-end app-font">
                        <li><p className="dropdown-item weight-700" onClick={() => { }} >Edit News</p></li>
                        <li className='dropdown-item c-pointer'>Delete news</li>
                    </ul>
                </div>

                <div className='col-6 p-1 p-md-4 r-7 app-shadow d-flex'>
                    <div>
                        <h5>NBFCs disburse more personal loans</h5>
                        <p className="f-small">Posted 2day ago</p>
                    </div>

                    <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto me-1 bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>

                    <ul className="dropdown-menu dropdown-menu-end app-font">
                        <li><p className="dropdown-item weight-700" onClick={() => { }} >Edit News</p></li>
                        <li className='dropdown-item c-pointer'>Delete news</li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default News