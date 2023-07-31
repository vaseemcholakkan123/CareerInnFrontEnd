import SimpleNav from '../../User/Navbar/SimpleNav'
import Company from '../Company/Company'
import ListJob from '../ListJob/ListJob'
import Recruiters from '../Recruiters/Recruiters'
import Sidebar from './Sidebar'
import './main.css'

import { useState } from 'react'

function EmployerHome() {

  const [ActiveLayout,setActiveLayout] = useState('jobs')

  return (
    <div>
        <SimpleNav />
        <div className="row">
            <Sidebar SetActiveLayout={setActiveLayout} ActiveLayout={ActiveLayout} />
            {
              ActiveLayout == 'jobs' ? 
                <ListJob />
              :
              ActiveLayout == 'company' ?
                <Company />
              :
              ActiveLayout == 'recruiters' ? 
                <Recruiters />
              :
              null

            }
        </div>

    </div>
  )
}

export default EmployerHome