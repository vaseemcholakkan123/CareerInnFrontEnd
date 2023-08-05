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


function AdminHomePage() {
    const router = useNavigate()
    const [ActiveLayout, SetActiveLayout] = useState('news')


    useEffect(() => {

        check_admin().catch(() => {
            validation("Authorization Revoked")
            router('/admin/login')
        })
        
        
    })

    return (
        <div className='row app-font'>
            <AdminSidebar ActiveLayout={ActiveLayout} SetActiveLayout={SetActiveLayout} />

            <div className="col-10">
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
                                    null


                }
            </div>

        </div>
    )
}

export default AdminHomePage