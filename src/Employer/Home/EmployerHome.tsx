import SimpleNav from '../../User/Navbar/SimpleNav'
import Company from '../Company/Company'
import ListJob from '../ListJob/ListJob'
import Recruiters from '../Recruiters/Recruiters'
import Sidebar from './Sidebar'
import './main.css'
import { Routes, Route } from "react-router-dom"

import { useState } from 'react'

function EmployerHome() {

  const [ActiveLayout, setActiveLayout] = useState('jobs')
  const [Showmenu, SetshowMenu] = useState(false)

  return (
    <div>
      <SimpleNav />
      <div className="row">
        <Sidebar ShowMenu={Showmenu} SetShowMenu={SetshowMenu} />
        <div className="w-100 d-block d-md-none">
          <div className="d-flex a-center gap-1 ps-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list mt-0" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
            <p className='weight-600 p-2 ps-0' onClick={() => SetshowMenu(!Showmenu)}>Menu</p>
          </div>
        </div>
        <Routes>
          <Route path='/' element={<ListJob />} />
          <Route path='/company' element={<Company />} />
          <Route path='/recruiters' element={<Recruiters />} />

        </Routes>

      </div>

    </div>
  )
}

export default EmployerHome