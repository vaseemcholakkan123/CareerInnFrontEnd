import { useNavigate } from 'react-router-dom'
import './main.css'

import { Dispatch, SetStateAction } from 'react'

function Sidebar({ ShowMenu, SetShowMenu }: { ShowMenu: boolean, SetShowMenu: Dispatch<SetStateAction<boolean>> }) {
    const router = useNavigate()

    return (
        <div className={ShowMenu ? 'col-md-2 col-sm-4 col-6 ps-0 employee-sidebar app-shadow sidebar-mobile show-sidebar' : 'col-md-2 col-4  employee-sidebar app-shadow sidebar-mobile'}>
            <div className="w-100 d-flex a-center">
                <h1 className='p-md-2 ps-2 pt-2'>Menu</h1>
                <svg onClick={() => SetShowMenu(!ShowMenu)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="d-md-none ms-auto bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
            </div>
            <div className="sidebar-container mt-2">
                <div className={!window.location.pathname.split('/')[2] ? "active side-item" : "side-item"} onClick={() => router('')}>
                    <h5 className='resize-heading'>Jobs</h5>
                </div>

                <div className={window.location.pathname.split('/')[2] == 'company' ? "active side-item" : "side-item"} onClick={() => router('company')}>

                    <h5 className='resize-heading'>Company</h5>

                </div>

                <div className={window.location.pathname.split('/')[2] == 'recruiters' ? "active side-item" : "side-item"} onClick={() => router('recruiters')}>

                    <h5 className='resize-heading'>Recruiters</h5>

                </div>


            </div>
        </div>
    )
}

export default Sidebar