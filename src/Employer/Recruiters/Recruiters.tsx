import default_user_image, { BASE_IMAGE_URL } from '../../AppMain/AppConfig/AppConstants'
import CarreerInnAxios from '../../AppMain/AppConfig/AxiosConfig'
import { debounce } from '../../User/Splits/Profile/Helper'
import { get_users, user } from '../../User/Splits/Profile/UserProfile/Includes/Jobs/Helper'
import { updateTimeSince } from '../../User/UserConfig/Helper'
import { add_new_recruiter, remove_recruiter } from './Helper'
import { useSelector } from 'react-redux'
import { RootState } from '../../AppMain/AppConfig/Redux/store'
import './recruiters.css'

import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { validation } from '../../User/Splits/Profile/UserProfile/Includes/Projects/Helper'

function Recruiters() {
  const [recruiters, SetRecruiters] = useState<user[]>([])
  const modalCloser = useRef<HTMLButtonElement>(null)
  const selectUserInp = useRef<HTMLInputElement>(null)
  const [users, SetUsers] = useState<user[]>([])
  const [target, SetTarget] = useState(0)
  const [userIsCeo, setUserisCeo] = useState(false)
  const currentuser = useSelector((state: RootState) => state.logged_user.value)
  const [resolved, Setresolved] = useState(false)
  const router = useNavigate()



  const user_debounce = debounce((user_query: string) => {
    if (!user_query) {
      SetUsers([])
      return
    }
    get_users(user_query)
      .then(res => {
        if (res.data == 'no data') {
          SetUsers([{ username: `No user for search '${user_query}' `, profile: null, info: '956321', id: 0 }])
          return
        }
        SetUsers(res.data)
      })
  }, 250)

  useEffect(() => {
    CarreerInnAxios.get('employer/get-recruiters/')
      .then(res => {
        SetRecruiters(res.data)
        res.data.map((user: user) => {
          if (user.username == currentuser.username && user.is_ceo) {
            setUserisCeo(true)
          }
        })
        Setresolved(true)
      })
  }, [])

  return (
    <div className='col-12 j-center col-md-10 job-table app-shadow app-font'>

      <div className="px-2">

        <div className="mb-2 d-flex justify-content-between align-items-center">

          <h2 className='resize-heading'>Recruiters</h2>

          {
            userIsCeo ?
              <div className='ms-auto d-flex a-center mt-1 me-md-4 me-0 ps-2 pe-md-2 pe-0 btn-3'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="18" height="18" focusable="false">
                  <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"></path>
                </svg>
                <p className="weight-600 ms-2 f-m-smaller normal-line-height" data-bs-toggle="modal" data-bs-target="#AddrecruiterModal" >Add Recruiter</p>
              </div>
              :
              null

          }


        </div>
        <div className="table-responsive">
          {/* {resolved ?

            <table className="table table-responsive table-borderless table-striped-columns">

              <thead className='table-striped'>
                <tr className="bg-light">
                  <th scope="col" >Name</th>
                  <th scope="col" >Joined Date</th>
                  <th scope="col" >Job Posted</th>
                  <th scope="col" >Interviewed</th>
                  <th scope="col" className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody className='table-striped'>

                {
                  recruiters.map(recruiter => {
                    return (
                      <tr key={recruiter.id} className='c-pointer'>
                        <td>{recruiter.username}</td>
                        <td><i className="fa fa-check-circle-o green"></i><span className="ms-1 f-m-xsmall">{updateTimeSince(String(recruiter.date_joined!))}</span></td>
                        <td>8</td>
                        <td><span className="fw-bolder">3</span></td>
                        {
                          recruiter.id == currentuser.user_id ?
                            <td className='text-center app-font'>None</td>
                            :
                            <td className='text-center' data-bs-toggle={userIsCeo ? "dropdown" : ''} aria-expanded="false">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                              </svg>
                              {
                                userIsCeo ?
                                  <ul className="dropdown-menu dropdown-menu-end me-4">
                                    <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#Profilemodal" onClick={() => {
                                      remove_recruiter(recruiter.id).then(() => {
                                        SetRecruiters(recruiters.filter(rec => rec.id != recruiter.id))
                                      })

                                    }}>Remove Recruiter</a></li>
                                  </ul>
                                  :
                                  null
                              }
                            </td>
                        }
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
            :
            <div className="d-flex j-center pt-4 pb-3">
              <div className="lds-spinner lds-spinner2 me-5 mt-3" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

            </div>

          } */}

          {
            resolved ?
              recruiters.map(recruiter => {
                return (
                  <div className='col-12 col-md-6 p-1 p-md-4 pb-md-3 r-7 app-shadow d-flex app-shadow'>
                    <img className='me-1 r-7 resize-phone' src={recruiter.profile ? BASE_IMAGE_URL + recruiter.profile : default_user_image} width={70} height={70} alt="" onClick={() => router(`/show-profile/${recruiter.username}`, { state: { 'user_id': recruiter.id } })} />
                    <div className='normal-line-height' onClick={() => router(`/show-profile/${recruiter.username}`, { state: { 'user_id': recruiter.id } })}>
                      <h5 className='resize-heading'>{recruiter.username}</h5>
                      <p className="f-small">{recruiter.info ? recruiter.info : 'no info'}</p>
                    </div>

                    <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto me-1 bi bi-three-dots-vertical" viewBox="0 0 16 16">
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>

                    <ul className="dropdown-menu dropdown-menu-end app-font">
                      {
                        userIsCeo ?
                          <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#Profilemodal" onClick={() => {
                            if(recruiter.is_ceo){
                              validation("Can't remove CEO")
                            }else {
                              remove_recruiter(recruiter.id).then(() => {
                                SetRecruiters(recruiters.filter(rec => rec.id != recruiter.id))
                              })
                            }

                          }}>Remove Recruiter</a></li>
                          :
                          null
                      }
                    </ul>
                  </div>
                )
              })
              :
              null
          }

          {/* modal */}

          <div className="modal fade app-font" id="AddrecruiterModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog Register-modal">
              <div className="modal-content">
                <div className="modal-header b-none">
                  <h5 className="modal-title weight-600" id="exampleModalLabel">Add Recruiters</h5>
                  <button ref={modalCloser} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body pt-0 m-heigh">
                  <p className='mt-4 weight-600'>Add new Recruiter</p>

                  <div className="input-infos">
                    <div className="d-flex">
                      <p>Recruiter (must have Carreerinn account)*</p>
                      {
                        selectUserInp.current?.disabled ?
                          <p className="app-link ms-auto me-5" onClick={() => {
                            selectUserInp.current!.value = ''
                            selectUserInp.current!.disabled = false
                            SetTarget(0)
                          }}>change</p>
                          :
                          null
                      }
                    </div>
                    <div className='w-100 lock-parent'>
                      <input ref={selectUserInp} type="text" required placeholder='Search user' className='p-2' onChange={e => user_debounce(e.target.value)} />
                      {
                        users[0] ?
                          <div className='rel-holder'>
                            {
                              users.map(user => {

                                return (
                                  user.info == '956321' ?

                                    <p>{user.username}</p>
                                    :
                                    <div className="d-flex a-center s-holder" key={user.username} onClick={() => {
                                      selectUserInp.current!.value = user.username
                                      selectUserInp.current!.disabled = true
                                      SetTarget(user.id)
                                      SetUsers([])
                                    }}>
                                      <img src={user.profile ? BASE_IMAGE_URL + user.profile : default_user_image} height={50} width={50} className='rounded-circle' alt="user_profile" />
                                      <div className="ms-2">
                                        <p>{user.username}</p>
                                        <p className="f-small">{user.info}</p>
                                      </div>
                                    </div>
                                )

                              })
                            }
                          </div>
                          : null
                      }
                    </div>
                    <div className="modal-footer b-none pb-0 mt-5">
                      <button type="button" className="btn-1 f-m-smaller" onClick={() => {
                        add_new_recruiter(target)
                          .then(res => {
                            SetRecruiters([...recruiters, res])
                            modalCloser.current!.click()
                          })

                      }}>Add</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* modal */}

          </div>

        </div>

      </div>
    </div>
  )
}

export default Recruiters