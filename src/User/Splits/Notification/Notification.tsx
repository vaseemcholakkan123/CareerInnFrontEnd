import { useNavigate } from 'react-router-dom'
import default_user_image, { BASE_IMAGE_URL } from '../../../AppMain/AppConfig/AppConstants'
import CarreerInnAxios from '../../../AppMain/AppConfig/AxiosConfig'
import { updateTimeSince } from '../../UserConfig/Helper'
import { delete_notification, notification, read_all_notification, read_notification } from './Helper'
import './n.css'

import { useEffect, useState } from 'react'

function Notification() {

    const [UserNotifications, SetUserNotifications] = useState<notification[]>([])
    const [nextUrl, setNextUrl] = useState('')
    const [loadNext, SetloadNext] = useState(false)
    const router = useNavigate()
    const [ActiveLayout, SetActiveLayout] = useState('unread')
    const [resolved, Setresolved] = useState(false)

    useEffect(() => {
        let urlslug = ActiveLayout == 'unread' ? 'notifications' : 'read-notifications'
        CarreerInnAxios.get(`user/get-${urlslug}/?${nextUrl}`)
            .then(res => {
                Setresolved(true)
                SetUserNotifications([...UserNotifications, ...res.data.results])
                if (res.data.next) {
                    setNextUrl(res.data.next.split('?')[1])
                }
                else setNextUrl('')

            })
    }, [loadNext, ActiveLayout])

    return (
        <div className='w-100 bg-white app-shadow r-7'>
            <div className="d-flex a-center mt-2 p-4 pb-2 pt-2 ps-2">
                <h5 className='ms-2 p-2'>{ActiveLayout == 'unread' ? 'Unread Notifications' : 'Read Notifications'}</h5>
                <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>

                <ul className="dropdown-menu dropdown-menu-end app-font">
                    <li onClick={()=>{read_all_notification().then(()=>{SetUserNotifications([]); setNextUrl('')})}}><p className="dropdown-item c-pointer" >Mark all as read</p></li>
                    <li><div className="dropdown-divider"></div></li>
                    {
                        ActiveLayout == 'unread' ?
                            <li onClick={() => { SetActiveLayout('x'); Setresolved(false); setNextUrl(''); SetUserNotifications([]) }} >
                                <p className='dropdown-item text-danger c-pointer'>Read notifications</p>
                            </li>
                            :
                            <li onClick={() => { SetActiveLayout('unread'); Setresolved(false); setNextUrl(''); SetUserNotifications([]) }} >
                                <p className='dropdown-item c-pointer'>Unread notifications</p>
                            </li>
                    }
                </ul>

            </div>
            <div className="row ps-1 pe-1 j-center gap-2 mt-2 pb-2">
                {resolved ?

                    UserNotifications.map(notification => {
                        return (
                            <div key={notification.id} className="col-12 d-flex ps-md-3 pe-md-3 c-pointer">
                                {
                                    notification.rel_img || notification.type == 'Connection' ?
                                        <img src={notification.rel_img ? BASE_IMAGE_URL + notification.rel_img : default_user_image} className={notification.rel_img?.includes('profile') || notification.type != 'Post' ? 'rounded-circle' : ''} width={56} height={56} alt="" onClick={() => {
                                            if (notification.type === 'Post') {
                                                router('/view-post', { state: { 'post_id': notification.link_thread } })
                                            }
                                            else if (notification.type == 'Job') {
                                                if(notification.link_thread == 'redirect'){
                                                    router('/interview')
                                                }else router('/view-job', { state: { 'job_id': notification.link_thread } })
                                            }
                                            else if (notification.type == 'Connection') {
                                                router(`/show-profile/${notification.content.split('has')[0].trim()}`,{state:{'user_id':notification.link_thread}})
                                            }
                                            
                                        }} />

                                        :
                                        null
                                }
                                <div className='normal-line-height mt-auto mb-3 ms-2' onClick={() => {
                                    if (notification.type === 'Post') {
                                        router('/view-post', { state: { 'post_id': notification.link_thread } })
                                    }
                                    else if (notification.type == 'Job') {
                                        if(notification.link_thread == 'redirect'){
                                            router('/interview')
                                        }else router('/view-job', { state: { 'job_id': notification.link_thread } })
                                    }
                                    else if (notification.type == 'Connection') {
                                        router(`/show-profile/${notification.content.split('has')[0].trim()}`,{state:{'user_id':notification.link_thread}})
                                    }
                                }} >
                                    <p >{notification.content}</p>
                                    <p className='f-small'>{updateTimeSince(String(notification.created))}</p>
                                </div>
                                <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto me-1 mt-3 bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>

                                <ul className="dropdown-menu dropdown-menu-end app-font">
                                    {
                                        ActiveLayout == 'unread' ?
                                            <li>
                                                <p className='dropdown-item text-danger c-pointer' onClick={() => {
                                                    read_notification(notification.id)
                                                        .then(() => {
                                                            SetUserNotifications(UserNotifications.filter(item => item.id != notification.id))
                                                        })
                                                }}>Mark as read</p>
                                            </li>
                                            :
                                            <li>
                                                <p className='dropdown-item text-danger c-pointer' onClick={() => {
                                                    delete_notification(notification.id)
                                                        .then(() => {
                                                            SetUserNotifications(UserNotifications.filter(item => item.id != notification.id))
                                                        })
                                                }}>Delete notification</p>
                                            </li>
                                    }
                                </ul>
                            </div>
                        )
                    })
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
                    !UserNotifications[0] && resolved ?
                        <p className="text-center m-3 mt-0">You've no {ActiveLayout == 'unread' ? 'unread' : 'read'} notifications</p>
                        :
                        null
                }

                {
                    nextUrl != '' ?

                        <p className='text-center app-grey d-flex a-center j-center c-pointer' onClick={() => SetloadNext(!loadNext)} >
                            show more

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
                        </p>

                        :
                        null

                }

            </div>
        </div>
    )
}

export default Notification