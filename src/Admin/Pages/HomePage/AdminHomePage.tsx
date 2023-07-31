import { useNavigate } from 'react-router-dom'
import './../../admin.css'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../AppMain/AppConfig/Redux/store'
import { check_admin } from '../Helper'
import { validation } from '../../../User/Splits/Profile/UserProfile/Includes/Projects/Helper'
import AdminSidebar from '../Sidebar/SideBar'
import News from '../News/News'


function AdminHomePage() {
    const router = useNavigate()
    const [ActiveLayout, SetActiveLayout] = useState('news')


    useEffect(() => {
        console.log('rendering');

        if (!localStorage.getItem("user") && !localStorage.getItem("admin")) {
            router('/admin/login')
        } else {
            check_admin().catch(() => {
                validation("Authorization Revoked")
                router('/admin/login')
            })
        }
    })

    return (
        <div className='row app-font'>
            <AdminSidebar ActiveLayout={ActiveLayout} SetActiveLayout={SetActiveLayout} />

            <div className="col-10">
                {
                    ActiveLayout === 'news' ?

                        <News />

                        : ActiveLayout === 'department' ?

                            <p>department page</p>

                            : ActiveLayout === 'reports' ?

                                <p>reports page</p>

                                : ActiveLayout === 'users' ?

                                    <p>users Page</p>

                                    :
                                    null


                }
            </div>

        </div>
    )
}

export default AdminHomePage