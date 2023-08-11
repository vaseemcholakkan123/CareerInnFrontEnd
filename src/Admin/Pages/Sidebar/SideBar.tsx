import './../../admin.css'

import { Dispatch, SetStateAction } from 'react'

function AdminSidebar({ ActiveLayout, SetActiveLayout, ShowMenu, SetShowMenu }: { ShowMenu: boolean, SetShowMenu: Dispatch<SetStateAction<boolean>>, ActiveLayout: string, SetActiveLayout: Dispatch<SetStateAction<string>> }) {

    return (
        <div className={ShowMenu ? 'col-md-2 col-sm-4 col-6 ps-0 employee-sidebar app-shadow sidebar-mobile show-sidebar h-100' : 'h-100 col-md-2 col-4  employee-sidebar app-shadow sidebar-mobile'}>
            <div className="w-100 d-flex a-center">
                <h1 className='p-md-2 ps-2 pt-2 resize-heading'>Menu</h1>
                <svg onClick={() => SetShowMenu(!ShowMenu)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="d-md-none ms-auto bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
            </div>
            <div className="sidebar-container mt-2">
                <div className={ActiveLayout == 'news' ? "active side-item" : "side-item"} onClick={() => SetActiveLayout('news')}>
                    <h5 className=''>News</h5>
                </div>

                <div className={ActiveLayout == 'department' ? "active side-item" : "side-item"} onClick={() => SetActiveLayout('department')}>

                    <h5 className=''>Department</h5>

                </div>

                <div className={ActiveLayout == 'reports' ? "active side-item" : "side-item"} onClick={() => SetActiveLayout('reports')}>

                    <h5 className=''>Reports</h5>

                </div>

                <div className={ActiveLayout == 'users' ? "active side-item" : "side-item"} onClick={() => SetActiveLayout('users')}>

                    <h5 className=''>Users</h5>

                </div>

                <div className={ActiveLayout == 'orders' ? "active side-item" : "side-item"} onClick={() => SetActiveLayout('orders')}>

                    <h5 className=''>Orders</h5>

                </div>


            </div>
        </div>
    )
}

export default AdminSidebar