import { useNavigate } from 'react-router-dom'
import './../../admin.css'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../AppMain/AppConfig/Redux/store'
import { check_admin } from '../Helper'
import { validation } from '../../../User/Splits/Profile/UserProfile/Includes/Projects/Helper'
import AdminSidebar from '../Sidebar/SideBar'
import News from '../News/News'
import Department from '../Department/Department'
import Reports from '../Reports/Reports'
import Users from '../Users/Users'
import Orders from '../Orders/Orders'


function AdminHomePage() {
    const router = useNavigate()
    const [ActiveLayout, SetActiveLayout] = useState('news')
    const [Showmenu, SetshowMenu] = useState(false)


    useEffect(() => {

        check_admin().catch(() => {
            validation("Authorization Revoked")
            router('/admin/login')
        })


    })

    return (
        <div className='row app-font'>
            <AdminSidebar ShowMenu={Showmenu} SetShowMenu={SetshowMenu} ActiveLayout={ActiveLayout} SetActiveLayout={SetActiveLayout} />
            <div className="w-100 d-block d-md-none">
                <div className="d-flex a-center gap-1 ps-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list mt-0" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                    <p className='weight-600 p-2 ps-0' onClick={() => SetshowMenu(!Showmenu)}>Menu</p>
                </div>
            </div>
            <div className="col-md-10 col-12">
                {
                    ActiveLayout === 'news' ?

                        <News />

                        : ActiveLayout === 'department' ?

                            <Department />

                            : ActiveLayout === 'reports' ?

                                <Reports />

                                : ActiveLayout === 'users' ?

                                    <Users />

                                    :

                                    ActiveLayout === 'orders' ?

                                        <Orders />

                                        :
                                        null


                }
            </div>

        </div>
    )
}

export default AdminHomePage