

import { useEffect, useState } from 'react'
import CarreerInnAxios from '../../../AppMain/AppConfig/AxiosConfig'
import { validation } from '../../../User/Splits/Profile/UserProfile/Includes/Projects/Helper'
import { Unblock_user, adminUsers, block_user} from '../Helper'
import default_user_image from '../../../AppMain/AppConfig/AppConstants'
import { useNavigate } from 'react-router-dom'
import { success } from '../../../User/Splits/Profile/UserProfile/Includes/Jobs/Helper'

function Users() {
    const [Allusers, Setusers] = useState<adminUsers[]>([])
    const [resolved, SetResolved] = useState(false)
    const [nextUrl, setNextUrl] = useState('')
    const [loadNext, loader] = useState(false)
    const router = useNavigate()

    useEffect(() => {
        CarreerInnAxios.get('admin/users/' + `?${nextUrl}`).then(res => {

            SetResolved(true)
            Setusers([...Allusers,...res.data.results])
            if (res.data.next) setNextUrl(res.data.next.split('?')[1])
            else setNextUrl('')
        })
            .catch(() => {
                SetResolved(true)
                validation('Server Error')
            })
    }, [loadNext])

    return (
        <div className='w-100'>
            <header className='w-100 d-flex p-1 p-md-4 a-center'>
                <h3>All Users</h3>
            </header>

            <div className="row p-1 m-md-2 m-1 gy-2 container-height-admin">

                {
                    Allusers.map(usr => {
                        return (
                            <div className='col-12 col-md-6 p-1 p-md-4 pb-md-3 r-7 mt-0 app-shadow d-flex mobile-border'>
                                <img className='me-1 r-7' src={usr.profile ? usr.profile : default_user_image} width={70} height={70} alt="" onClick={() => router(`/show-profile/${usr.username}`, { state: { 'user_id': usr.id } })} />
                                <div className='normal-line-height' onClick={() => router(`/show-profile/${usr.username}`, { state: { 'user_id': usr.id } })}>
                                    <h5>{usr.username}</h5>
                                    <p className="f-small">{usr.info ? usr.info : 'no info'}</p>
                                    <p className='f-small'>Status <span className={usr.is_blocked ? 'text-danger' : 'text-success'}>{usr.is_blocked ? 'blocked' : 'active'}</span></p>
                                    {
                                        usr.posts_got_reported != 0 ?
                                            <p className="f-small">posts got reported : <span className="text-danger">{usr.posts_got_reported}</span></p>

                                            :
                                            null
                                    }
                                </div>

                                <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto me-2 mt-md-0 mt-3 me-md-1 bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>

                                <ul className="dropdown-menu dropdown-menu-end app-font">
                                    {
                                        usr.is_blocked ?
                                            <li><p className="dropdown-item weight-700"
                                                onClick={() => {
                                                    Unblock_user(usr.id)
                                                        .then(() => {
                                                            success('User Unblocked')
                                                            Setusers(
                                                                Allusers.map(uzr => {
                                                                    if (uzr.id === usr.id) uzr.is_blocked = false;
                                                                    return uzr
                                                                })
                                                            )
                                                        })
                                                }}
                                            >Unblock user</p></li>

                                            :
                                            <li><p className="dropdown-item weight-700"

                                                onClick={() => {
                                                    block_user(usr.id)
                                                        .then(() => {
                                                            success('User blocked')
                                                            Setusers(
                                                                Allusers.map(uzr => {
                                                                    if (uzr.id === usr.id) uzr.is_blocked = true;
                                                                    return uzr
                                                                })
                                                            )
                                                        })
                                                }}

                                            >Block user</p></li>

                                    }
                                </ul>
                            </div>
                        )
                    })
                }


                {
                    !Allusers[0] && !resolved ?
                        <div className="d-flex j-center pt-3 pb-3">
                            <div className="lds-spinner lds-spinner2 me-5 mt-1" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
                        :
                        null
                }
                {
                    !Allusers[0] && resolved ?
                        <div className='col-12 d-flex acenter j-center m-2 mt-0  pt-1 p-2'>
                            <p>Seem's like there's no users.</p>
                        </div>
                        :
                        null
                }

                {
                    nextUrl != '' ?
                        <div className="d-flex p-1 a-center  j-center r-7 mt-1 c-pointer" onClick={() => loader(!loadNext)}>
                            <p className="app-font">Show More</p>
                            <svg width="17" className='ms-2 sm-mt' height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2_599)">
                                    <g clipPath="url(#clip1_2_599)">
                                        <path d="M1.84009 5.14014L8.84009 9.75014L15.8401 5.14014V7.53014L8.84009 12.1401L1.84009 7.53014V5.14014Z" fill="black" fillOpacity="0.6" />
                                    </g>
                                </g>
                                <defs>
                                    <rect width="16" height="16" fill="white" transform="translate(0.840088 0.140137)" />
                                    <rect width="16" height="16" fill="white" transform="translate(0.840088 0.140137)" />
                                </defs>
                            </svg>

                        </div>
                        :
                        null
                }



            </div>
        </div>
    )
}

export default Users