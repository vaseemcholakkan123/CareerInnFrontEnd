import './../Profile.css'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../AppMain/AppConfig/Redux/store'
import default_user_image from '../../../../AppMain/AppConfig/AppConstants'
import { useDispatch } from 'react-redux'
import { change_banner_picture, change_profile_detail, change_profile_picture, detailForm, save_resume } from '../Helper'
import { Adduser } from '../../../../AppMain/AppConfig/Redux/userReducer'
import Experience from './Includes/Experience/Experience'
import Projects from './Includes/Projects/Projects'
import Jobs from './Includes/Jobs/Jobs'
import Education from './Includes/Education/Education'
import Skills from './Includes/Skills/Skills'
import Connections from './Layouts/Connections/Connections'
import ProfPost from './Layouts/Posts/ProfPost'
import ProfJobs from './Layouts/Jobs/ProfJobs'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { validation } from './Includes/Projects/Helper'

function UserProfile() {
  const user = useSelector((state: RootState) => state.logged_user.value)
  const profileModalClose = useRef<HTMLButtonElement>(null)
  const resumeModalClose = useRef<HTMLButtonElement>(null)
  const ProfileImage = useRef<HTMLImageElement>(null)
  const dispatcher = useDispatch()
  const [profForm, setProfForm] = useState<detailForm>({ username: user.username, info: user.info, mobile: user.mobile, location: user.location })
  const router = useNavigate()


  // useEffect(() => {
    
  //   if (window.location.pathname.split('/')[1] == 'profile' && !window.location.pathname.split('/')[2]) {
  //     SetActiveLayout('main')
  //   } else SetActiveLayout('main')

  //   if (window.location.pathname.split('/')[2] == 'posts') {
  //     SetActiveLayout('posts')
  //   }

  //   else if (window.location.pathname.split('/')[2] == 'connections') {
  //     SetActiveLayout('connections')
  //   }

  //   else if (window.location.pathname.split('/')[2] == 'applications') {
  //     SetActiveLayout('jobs')
  //   } else SetActiveLayout('main')

  // }, [window.location.pathname])

  return (
    <div className='profile-main-container mb-5 pb-md-3 pb-0'>


      <Routes>


        <Route path='/' element={
          <>
            <div className='banner-user-container app-shadow'>
              <div className="banner" style={{ backgroundImage: user.banner ? `url(${user.banner})` : 'url("https://static.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq")' }}>
                <label htmlFor="banner">
                  <svg className='banner-edit-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width="24" height="24" focusable="false">
                    <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
                  </svg>
                </label>
                <input type="file" className='d-none' id='banner' accept="image/*" onChange={e => {
                  e.target.files ?

                    change_banner_picture(e.target.files[0]).then(res => {
                      dispatcher(Adduser(res.data.user))
                    })
                    :
                    null
                }} />
                <img src={user.profile ? user.profile : default_user_image} width={145} height={143} className={user.profile ? 'rounded-circle user-prof resize-profile-img' : 'resize-profile-img user-prof rounded-circle bg-white'} alt="user_profile" />

              </div>
              <div className="user-main-holder pb-md-4 pb-0 r-7 bg-white p-3 normal-line-height" >
                <div className='app-font ms-1 pb-1 align-self-end'>
                  <h3 className="w-50">{user.username}</h3>
                  <p >{user.info ? user.info : 'add info to reach people'}</p>
                  <p className='f-small app-gray'>{user.location ? user.location : 'add location to attract users'}</p>
                </div>

                <div className="ms-auto me-2" data-bs-toggle="dropdown" aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width="24" height="24" focusable="false">
                    <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
                  </svg>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#Profilemodal">Profile picture</a></li>
                    <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#detailmodal" >Edit Details</a></li>
                    {
                      user.is_premium_user ?
                        <li><a className="dropdown-item text-primary" data-bs-toggle="modal" data-bs-target="#resumeModal" >{user.resume ? 'Change resume' : 'Save Resume'}</a></li>

                        :
                        null
                    }
                  </ul>
                </div>

              </div>
            </div>

            {/* Edit profile picture modal */}

            <div className="modal fade app-font" id="Profilemodal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog profile-modal">
                <div className="modal-content">
                  <div className="modal-header b-none">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Profile</h1>
                    <button type="button" ref={profileModalClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="d-flex">
                      <img ref={ProfileImage} src={user.profile ? user.profile : default_user_image} className={user.profile ? 'rounded-circle' : ''} width={110} height={110} alt="user_profile" />
                      <div className="ms-2 mt-1 h-100">
                        <p>Profile picture</p>
                        <p className='weight-700'>It’s not much fun to connect with a landscape!</p>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer b-none">
                    <label htmlFor='profile' className="btn-1 f-m-smaller">Upload Photo</label>
                    <input onChange={e => {
                      e.target.files ?

                        change_profile_picture(e.target.files[0]).then(res => {
                          dispatcher(Adduser(res.data.user))
                          profileModalClose.current!.click()
                        })

                        : null
                    }} type="file" className='d-none' accept="image/*" id='profile' />
                  </div>
                </div>
              </div>
            </div>

            {/* Edit profile picture modal */}

            {/* Save Resume modal */}

            <div className="modal fade app-font" id="resumeModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog profile-modal">
                <div className="modal-content">
                  <div className="modal-header b-none">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{user.resume ? 'Change resume' : 'Save resume'}</h1>
                    <button type="button" ref={resumeModalClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div>
                      
                      <div className="ms-2 mt-1 h-100">
                        <p>Attatch resume</p>
                        <p className='weight-700'>Make your applications faster</p>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer b-none">
                    <label htmlFor='resume' className="btn-1 f-m-smaller">{user.resume ? 'Change resume':'Upload Resume'}</label>
                    <input onChange={e => {
                      e.target.files ?

                        save_resume(e.target.files[0]).then(res => {
                          dispatcher(Adduser(res.data.user))
                          resumeModalClose.current!.click()
                        })

                        : null
                    }} type="file" className='d-none' accept="application/pdf" id='resume' />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Resume modal */}


            {/* Edit profile detail modal */}

            <div className="modal fade app-font" id="detailmodal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog profile-modal">
                <div className="modal-content">
                  <div className="modal-header b-none">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Info</h1>
                    <button type="button" ref={profileModalClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div className="modal-body info-modal m-height p-md-3 p-2">

                    <p className="f-small app-gray">* indicates required</p>
                    <div className="input-infos">
                      <p>Username*</p>
                      <input type="text" required value={profForm.username ? profForm.username : ''} onChange={e => setProfForm({ ...profForm, username: e.target.value })} />
                    </div>

                    <div className="input-infos">
                      <p>Info</p>
                      <input type="text" placeholder='Ex - Mern stack developer' value={profForm.info ? profForm.info : ''} onChange={e => setProfForm({ ...profForm, info: e.target.value })} />
                    </div>

                    <p className='mt-4 weight-600'>Contact</p>

                    <div className="input-infos">
                      <p>Email</p>
                      <input type="text" disabled value={user.email ? user.email : ''} />
                    </div>

                    <div className="input-infos">
                      <p>Mobile*</p>
                      <input type="number" value={profForm.mobile ? profForm.mobile : ''} placeholder='Ex - 9842345666' onChange={e => setProfForm({ ...profForm, mobile: Number(e.target.value) })} />
                    </div>


                    <p className='mt-4 weight-600'>Location</p>

                    <div className="input-infos">
                      <p>Country/Region and City*</p>
                      <input type="text" placeholder='Ex - India,Kerala,Kozhikode' value={profForm.location ? profForm.location : ''} onChange={e => setProfForm({ ...profForm, location: e.target.value })} />
                    </div>



                  </div>
                  <div className="modal-footer b-none">
                    <button className="btn-1 f-m-smaller"
                      onClick={() => {
                        change_profile_detail(profForm).then(res => {
                          dispatcher(Adduser(res?.data.user));
                          profileModalClose.current!.click();
                        })
                          .catch(() => {
                            validation("Unknown Error")
                          })
                      }}

                    >Save details</button>

                  </div>
                </div>
              </div>
            </div>

            {/* Edit profile detail modal */}


            {/* <div className="or-1 w-100 m-2 ms-auto me-auto"></div> */}

            <div className='bg-white app-shadow w-100 p-md-3 p-2 mt-md-3 mt-1 r-7'>
              <div className="connections-info">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="var(--primary-color)" className="mercado-match" width="24" height="24" focusable="false">
                  <path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z"></path>
                </svg>

                <div className='ms-2 app-font info' onClick={() => { router('/profile/connections') }}>
                  <p className="weight-700">My Network</p>
                  <p>See and manage your connections</p>
                </div>
              </div>


              <div className="connections-info">
                <svg width="27px" height="27px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs></defs><rect className='a' x="5.5" y="5.5" width="15.8571" height="15.8571" /><rect className='a' x="27.5004" y="6.3575" width="14.1421" height="14.1421" transform="translate(0.6303 28.3788) rotate(-45)" /><rect className='a' x="5.5" y="26.6429" width="15.8571" height="15.8571" /><rect className='a' x="26.6429" y="26.6429" width="15.8571" height="15.8571" /></svg>

                <div className='ms-2 app-font info' onClick={() => {  router('/profile/posts') }}>
                  <p className="weight-700">Activity</p>
                  <p>See and manage your posts</p>
                </div>
              </div>

              <div className="connections-info">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="var(--primary-color)" className="mercado-match" width="24" height="24" focusable="false">
                  <path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z"></path>
                </svg>

                <div className='ms-2 app-font info' onClick={() => { router('/profile/applications') }}>
                  <p className="weight-700">Applications</p>
                  <p>See and manage applied jobs</p>
                </div>
              </div>
            </div>

            {/* <div className="or-1 m-2 w-100 ms-auto me-auto"></div> */}
            <div className="or-1 w-100 d-md-none"></div>

            <div className='bg-white app-shadow w-100 p-md-3 p-2 mt-3 r-7 pt-0'>

              <Education />

              {/* component experience */}

              <Experience />


            </div>
            {/* <div className="or-1 w-100 d-md-none"></div> */}
            <div className='bg-white app-shadow w-100 p-md-3 p-2 pb-0 mt-md-3 mt-2 r-7 pt-0'>
              {/* Projects holder component */}

              <Projects />

              <Skills />


              <div className="or-1 w-100 m-2 ms-auto me-auto"></div>

              <Jobs />


            </div>
          </>
        } />



        <Route path='/connections' element={<Connections />} />
        <Route path='/posts' element={<ProfPost />} />
        <Route path='/applications' element={<ProfJobs />} />

      </Routes>


    </div>
  )
}

export default UserProfile