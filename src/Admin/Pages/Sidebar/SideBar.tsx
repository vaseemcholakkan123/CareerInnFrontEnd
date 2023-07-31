import './../../admin.css'

import {Dispatch , SetStateAction} from 'react'

function AdminSidebar({ ActiveLayout , SetActiveLayout } :{ActiveLayout : string , SetActiveLayout : Dispatch<SetStateAction<string>>}) {
    
  return (
    <div className='col-2 employee-sidebar app-shadow admin-sidebar'>
        <h1 className='p-2'>Menu</h1>
        <div className="sidebar-container mt-2">
            <div className={ActiveLayout == 'news' ? "active side-item" : "side-item"} onClick={()=>SetActiveLayout('news')}>
                <h5 className=''>News</h5>
            </div>

            <div className={ActiveLayout == 'department' ? "active side-item" : "side-item"} onClick={()=>SetActiveLayout('department')}>
            
                <h5 className=''>Department</h5>

            </div>

            <div className={ActiveLayout == 'reports' ? "active side-item" : "side-item"} onClick={()=>SetActiveLayout('reports')}>
            
                <h5 className=''>Reports</h5>

            </div>

            <div className={ActiveLayout == 'users' ? "active side-item" : "side-item"} onClick={()=>SetActiveLayout('users')}>
            
                <h5 className=''>Users</h5>

            </div>


        </div>
    </div>
  )
}

export default AdminSidebar