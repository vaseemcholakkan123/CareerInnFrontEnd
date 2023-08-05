import default_user_image from '../../../../../../AppMain/AppConfig/AppConstants'
import './../layouts.css'


import {useEffect,useState} from 'react'
import { break_connection, f_user, followers } from './Helper'
import CarreerInnAxios from '../../../../../../AppMain/AppConfig/AxiosConfig'
import { follow_user } from '../../../../../UserConfig/Helper'
import { success } from '../../Includes/Jobs/Helper'
import { useNavigate } from 'react-router-dom'

function Connections() {

    const [followers,Setfollowers] = useState<followers[]>([])
    const [following,Setfollowing] = useState<f_user[]>([])
    const [nextUrl,setNextUrl] = useState('')
    const [loadNext,SetloadNext] = useState(false)
    const [resolved, SetREsolved] = useState(false)
    const [ActiveLayout,SetActiveLayout] = useState('followers')
    const router = useNavigate()

    useEffect(()=>{
        SetREsolved(false)
       Setfollowers([])
       Setfollowing([])
        ActiveLayout == 'followers'  ?

        CarreerInnAxios.get(`user/get-follower-list/?${nextUrl}`)
        .then(res=>{
            SetREsolved(true)

            Setfollowers([...followers , ...res.data.results])
            if(res.data.next){
                setNextUrl(res.data.next.split('?')[1])
            }
            else setNextUrl('')
            
        })

        :

        CarreerInnAxios.get(`user/get-following-list/?${nextUrl}`)
        .then(res=>{
            SetREsolved(true)
            Setfollowing([...following , ...res.data.results])
            if(res.data.next){
                setNextUrl(res.data.next.split('?')[1])
            }
            else setNextUrl('')
            
            
        })
       
    },[loadNext,ActiveLayout])

  return (
    <div className='app-font bg-white pb-4 pt-md-3 pt-2 r-7 app-shadow'>
        <div className="active-item-holder">
            <p className={ActiveLayout == 'followers' ? 'connection-active' : ''} onClick={()=>{SetActiveLayout('followers')}}>Followers</p>
            <p className={ActiveLayout == 'following' ? 'connection-active' : ''} onClick={()=>{SetActiveLayout('following')}}>Following</p>
        </div>

        {

            ActiveLayout == 'followers' ? 

            <div className="row ps-1 pe-1 j-center gap-2 mt-2">
                {

                    followers.map(follower=>{
                        return(
                            <div key={follower.user.id} className="ps-2 pe-2 col-12 d-flex ps-md-3 pe-md-3">
                                    <img src={follower.user.profile ? follower.user.profile : default_user_image} className='resize-phone rounded-circle' width={62} height={62} alt="" onClick={()=>{ router(`/show-profile/${follower.user.username}`, { state: { 'user_id': follower.user.id } }) }} />
                                    <div className='normal-line-height mt-auto mb-3 ms-2' onClick={()=>{ router(`/show-profile/${follower.user.username}`, { state: { 'user_id': follower.user.id } }) }}>
                                        <h5 className='m-0 resize-heading'>{follower.user.username}</h5>
                                        <p className='f-small'>{follower.user.info ? follower.user.info : ''}</p>
                                    </div>
                                    <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto me-1 mt-3 bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                    </svg>

                                    <ul className="dropdown-menu dropdown-menu-end app-font">
                                        <li>
                                            <p className='dropdown-item text-danger c-pointer' onClick={()=>{
                                                break_connection(follower.user.id)
                                                .then(()=>{
                                                    success('Connection removed')
                                                    Setfollowers(followers.filter(item=>item.user.id != follower.user.id))
                                                })
                                            }}>Break connection</p>
                                        </li>
                                    </ul>
                            </div>
                        )
                    })

                }
                {
                    !followers[0] && resolved ? 
                        <div className='text-center'>
                            <p>Seems Like you've no followers to show</p>
                        </div>
                    :
                    null
                }
                {
                    !resolved ? 
                        <div className="d-flex j-center pt-3 pb-3">
                            <div className="lds-spinner lds-spinner2 me-5 mt-1" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
                    :
                    null
                }

                {
                    nextUrl != '' ?

                    <p className='text-center app-grey d-flex a-center j-center c-pointer' onClick={()=>SetloadNext(!loadNext)} >
                        show more

                        <svg width="17" className='ms-2 sm-mt' height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2_599)">
                                <g clipPath="url(#clip1_2_599)">
                                <path d="M1.84009 5.14014L8.84009 9.75014L15.8401 5.14014V7.53014L8.84009 12.1401L1.84009 7.53014V5.14014Z" fill="black" fillOpacity="0.6"/>
                                </g>
                                </g>
                                <defs>
                                <rect width="16" height="16" fill="white" transform="translate(0.840088 0.140137)"/>
                                <rect width="16" height="16" fill="white" transform="translate(0.840088 0.140137)"/>
                                </defs>
                        </svg>
                    </p>

                :
                null

                }

                </div>


            :


            <div className="row ps-1 pe-1 j-center gap-2 mt-2">
            {

                following.map(thread=>{
                    return(
                        <div key={thread.following[0].id} className="ps-2 pe-2 col-12 d-flex ps-md-3 pe-md-3">
                                <img src={thread.following[0].profile ? thread.following[0].profile : default_user_image} className='resize-phone rounded-circle' width={62} height={62} alt="" onClick={()=>{ router(`/show-profile/${thread.following[0].username}`, { state: { 'user_id': thread.following[0].id } }) }} />
                                <div className='normal-line-height mt-auto mb-3 ms-2' onClick={()=>{ router(`/show-profile/${thread.following[0].username}`, { state: { 'user_id': thread.following[0].id } }) }}>
                                    <h5 className='m-0 resize-heading'>{thread.following[0].username}</h5>
                                    <p className='f-small'>{thread.following[0].info ? thread.following[0].info : ''}</p>
                                </div>
                                <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto me-1 mt-3 bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                </svg>

                                <ul className="dropdown-menu dropdown-menu-end app-font">
                                    <li>
                                        <p className='dropdown-item text-danger c-pointer' onClick={()=>{
                                            follow_user(thread.following[0].id)
                                            .then(()=>{
                                                success('Connection removed')
                                                Setfollowing(following.filter(item=>item.following[0].id != thread.following[0].id))
                                            })
                                        }}>Break connection</p>
                                    </li>
                                </ul>
                        </div>
                    )
                })

            }
            {
                !following[0] && resolved? 
                    <div className='text-center'>
                        <p>Seems Like you're not following anyone</p>
                    </div>
                :
                null
            }

            {
                nextUrl != '' ?

                <p className='text-center app-grey d-flex a-center j-center c-pointer' onClick={()=>SetloadNext(!loadNext)} >
                    show more

                    <svg width="17" className='ms-2 sm-mt' height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_2_599)">
                            <g clipPath="url(#clip1_2_599)">
                            <path d="M1.84009 5.14014L8.84009 9.75014L15.8401 5.14014V7.53014L8.84009 12.1401L1.84009 7.53014V5.14014Z" fill="black" fillOpacity="0.6"/>
                            </g>
                            </g>
                            <defs>
                            <rect width="16" height="16" fill="white" transform="translate(0.840088 0.140137)"/>
                            <rect width="16" height="16" fill="white" transform="translate(0.840088 0.140137)"/>
                            </defs>
                    </svg>
                </p>

            :
            null

            }

            </div>

        }

    </div>
  )
}

export default Connections