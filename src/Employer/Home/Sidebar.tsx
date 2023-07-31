import './main.css'

import {Dispatch,SetStateAction} from 'react'

function Sidebar({SetActiveLayout , ActiveLayout} : {SetActiveLayout : Dispatch<SetStateAction<string>> , ActiveLayout : string}) {
  return (
    <div className='col-2 employee-sidebar app-shadow'>
        <h1 className='p-2'>Menu</h1>
        <div className="sidebar-container mt-2">
            <div className={ActiveLayout == 'jobs' ? "active side-item" : "side-item"} onClick={()=>SetActiveLayout('jobs')}>
                <h5 className=''>Jobs</h5>
            </div>

            <div className={ActiveLayout == 'company' ? "active side-item" : "side-item"} onClick={()=>SetActiveLayout('company')}>
            
                <h5 className=''>Company</h5>

            </div>

            <div className={ActiveLayout == 'recruiters' ? "active side-item" : "side-item"} onClick={()=>SetActiveLayout('recruiters')}>
            
                <h5 className=''>Recruiters</h5>

            </div>


        </div>
    </div>
  )
}

export default Sidebar