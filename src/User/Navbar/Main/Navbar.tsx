import './nav.css'
import { RootState } from '../../../AppMain/AppConfig/Redux/store'
import { useSelector } from 'react-redux'
import default_user_image from '../../../AppMain/AppConfig/AppConstants'
import { useState, Dispatch, SetStateAction } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../Auth/Auth'
import { useDispatch } from 'react-redux'
import { Adduser } from '../../../AppMain/AppConfig/Redux/userReducer'
import { check_continue } from '../../Splits/Profile/UserProfile/Includes/Jobs/Helper'
import { validation } from '../../Splits/Profile/UserProfile/Includes/Projects/Helper'


function Navbar({ SetActiveLayout, ActiveLayout }: { SetActiveLayout: Dispatch<SetStateAction<string>>, ActiveLayout: string }) {

  const Loggeduser = useSelector((state: RootState) => state.logged_user.value)
  const [show, setVisible] = useState(false)
  const router = useNavigate()
  const dispatcher = useDispatch()
  const routerState = useLocation()


  return (
    <>
      <div className='main-navbar app-font'>
        <h3 className='nav-title app-color' onClick={() => router('/')}>CareerInn</h3>
        <div className="search-navbar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" /></svg>
          <input type="text" className='nav-search app-font' placeholder='Search' />
        </div>
        <div className="nav-items">

          <div className={ActiveLayout === 'posts' ? "nav-item nav-item-active" : "nav-item"} onClick={() => { SetActiveLayout('posts'); router('/') }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width="28" height="28" focusable="false">
              <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z"></path>
            </svg>
            <p className='m-0'>Home</p>
          </div>

          <div className={ActiveLayout === 'jobs' ? "nav-item nav-item-active" : "nav-item"} onClick={() => { SetActiveLayout('jobs'); router('/jobs') }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width="28" height="28" focusable="false">
              <path d="M17 6V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2v4a3 3 0 003 3h14a3 3 0 003-3V6zM9 5a1 1 0 011-1h4a1 1 0 011 1v1H9zm10 9a4 4 0 003-1.38V17a3 3 0 01-3 3H5a3 3 0 01-3-3v-4.38A4 4 0 005 14z"></path>
            </svg>
            <p className="m-0">Jobs</p>
          </div>

          <div className={ActiveLayout === 'profile' ? "nav-item nav-item-active" : "nav-item"} onClick={() => { SetActiveLayout('profile'); router('/profile/connections') }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="var(--primary-color)" className="mercado-match" width="28" height="28" focusable="false">
              <path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z"></path>
            </svg>
            <p className="m-0">My Network</p>
          </div>

          <div className={ActiveLayout === 'notifications' ? "nav-item nav-item-active" : "nav-item"} onClick={() => { SetActiveLayout('notifications'); router('notification') }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width="28" height="28" focusable="false">
              <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z"></path>
            </svg>
            <p className="m-0">Notifications</p>
          </div>

          {
            Loggeduser.user_id ?

              <div className={ActiveLayout === 'profile' ? "nav-item nav-item-active user-on-nav" : "nav-item user-on-nav"} onClick={(() => setVisible(!show))}>
                <img src={Loggeduser.profile ? Loggeduser.profile : default_user_image} alt="prof" width={28} height={28} className='rounded-circle' />
                <div className="d-flex drop-1 a-center ms-1">
                  <p>Me</p>
                  <svg width="15" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" fill="none" width="24" height="24" />
                    <g>
                      <path d="M7 10l5 5 5-5" />
                    </g>
                  </svg>
                </div>
                <div id={!show ? 'hidden' : ''} className="my-dropdown f-medium  app-shadow">

                  <div className="user-profile m-2">
                    <img src={Loggeduser.profile ? Loggeduser.profile : default_user_image} alt="prof" width={50} height={50} className='rounded-circle' />
                    <p className={Loggeduser.profile ? 'mt-1 ms-2 weight-600' : 'mt-1 weight-600'}>{Loggeduser.username}</p>
                  </div>

                  <div className="my-dropdown-item" onClick={() => router('/profile')}>
                    <p className="btn-1 p-1 text-center f-small">View Profile</p>
                  </div>

                  <div className="my-dropdown-item">
                    <p className=''>Manage</p>

                  </div>

                  <div className="my-dropdown-item" onClick={() => router('/profile/posts')}>
                    <p className="ms-1">Posts & Activity</p>
                  </div>

                  <div className="my-dropdown-item" onClick={() => {

                    check_continue().then(res => {
                      if (res.data.var == 'continue') {
                        localStorage.setItem('company_id', res.data.id)
                        router('/employer')
                      }
                      else {
                        validation('Register company from your profile')

                      }
                    })

                  }}>
                    <p className="ms-1">Post job</p>
                  </div>

                  <div className="or-1 w-100"></div>

                  {/* <div className="my-dropdown-item">
                    <p className=''>Account</p>
                  </div>

                  <div className="my-dropdown-item">
                    <p className="ms-1" data-bs-toggle="modal" data-bs-target="#Settings">Settings</p>
                  </div> */}

                  <div className="my-dropdown-item" onClick={() => {
                    logout().then(() => {
                      dispatcher(Adduser(null))
                      localStorage.clear()
                      router('/Auth/login')
                    })
                  }}>
                    <p className="ms-1">Logout</p>
                  </div>

                </div>
              </div>
              :
              null
          }


        </div>
      </div>
      <div className="offset"></div>

      <div className={ActiveLayout === 'posts' ? 'search-navbar search-medium h-auto' : 'd-none'}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" /></svg>
        <input type="text" className='nav-search app-font' placeholder='Search anything...' />
      </div>
    </>
  )
}

export default Navbar