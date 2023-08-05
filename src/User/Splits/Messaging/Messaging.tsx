import { useSelector } from 'react-redux'
import CarreerInnAxios from '../../../AppMain/AppConfig/AxiosConfig'
import { RootState } from '../../../AppMain/AppConfig/Redux/store'
import { validation } from '../Profile/UserProfile/Includes/Projects/Helper'
import Chatbody from './ChatBody/Chatbody'
import { chat_thread } from './Helper'
import './message.css'

import { useState, useEffect } from 'react'
import default_user_image, { BASE_IMAGE_URL } from '../../../AppMain/AppConfig/AppConstants'
import { debounce } from '../Profile/Helper'
import { user } from '../Profile/UserProfile/Includes/Jobs/Helper'

function Messaging() {
    const [ActiveLayout, SetActiveLayout] = useState('chats-selection')
    const [ChatThreads, SetchatThreads] = useState<chat_thread[]>([])
    const [resolved, Setresolved] = useState(false)
    const [ActiveChat, SetchatActive] = useState<user | null>(null)
    const user = useSelector((state: RootState) => state.logged_user.value)
    const [searchLoading, SetSearchloading] = useState(false)
    const [Searchusers, SetSearchusers] = useState<user[]>([])
    const [Searchquery, Setsearchquery] = useState('')


    useEffect(() => {
        CarreerInnAxios.get('user/get-chat-threads')
            .then(res => {
                Setresolved(true)
                SetchatThreads(res.data)
            })
            .catch(() => {
                Setresolved(true)
                validation("Can't connect to server")
            })
    }, [])

    function SearchUser(searchQuery: string) {
        if (searchQuery == "") {
            return
        }
        CarreerInnAxios.post('user/get-following-by-query/', { 'query': searchQuery })
            .then(res => {
                SetSearchusers(
                    res.data.map((uzr: user) => {
                        if (
                            !ChatThreads.find(thread =>
                                thread.primary_user.id == uzr.id || thread.secondary_user.id == uzr.id

                            )
                        ) return uzr
                    })
                )
                SetSearchloading(false)
                if (res.data[0]) Setsearchquery('')
            })
    }

    const search_user_debounce = debounce((query) => {

        if (query != '') {
            SetSearchloading(true)
            SearchUser(query)
            Setsearchquery(query)
        }
        else {
            SetSearchloading(false)
        }

    })


    return (
        <div className='messaging-main row app-font app-shadow'>
            <div className={ActiveLayout == 'chats-selection' ? "col-sm-5 col-12 h-100 overflow-hidden d-sm-block" : "d-none col-sm-5 col-12 h-100 overflow-hidden d-sm-block"}>
                <div className="p-3">
                    <h6 className='weight-700'>Messaging</h6>
                </div>
                <div className="or-1 w-100"></div>

                <div className="p-2 ps-2 pe-2">
                    <div className="bg-blg p-1 position-relative row a-center">
                        <svg className='col-1 pe-1 ms-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width={19} height={19}><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" /></svg>

                        <div className="d-flex col-10 p-1 ps-0">
                            <input
                                type="text"
                                value={Searchquery}
                                onChange={e => {
                                    search_user_debounce(e.target.value);
                                    Setsearchquery(e.target.value)
                                }}
                                className="s-input bg-inherit pe-0" placeholder='Search following' />
                            <div id={searchLoading ? '' : 'hidden-search-loading'} className="lds-spinner lds-spinner2 lds-spinner4 h-0 mt-3 pe-2" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                        </div>

                        <div className={Searchusers[0] ? 'search-results-holder p-1' : ''}>
                            {
                                !searchLoading && Searchusers[0] ?
                                    Searchusers.map(usr => {
                                        return (
                                            <div
                                                className="small-card-user d-flex gap-1 mb-2"
                                                onClick={() => {
                                                    SetchatThreads([{ id: 0, primary_user: { ...usr, profile: BASE_IMAGE_URL + usr.profile }, secondary_user: usr }, ...ChatThreads]);
                                                    SetSearchusers([])
                                                    SetchatActive(usr)
                                                    SetActiveLayout('message')
                                                }}>

                                                <img src={usr.profile ? BASE_IMAGE_URL + usr.profile : default_user_image} width={48} height={48} className='rounded-circle resize-phone' alt="" />
                                                <div className='normal-line-height'>
                                                    <p className="weight-700">{usr.username}</p>
                                                    <p className='f-small f-m-smaller'>{usr.info}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    Searchquery != '' && <p className='text-center'> No results</p>

                            }
                        </div>

                    </div>
                </div>

                <div className="threads-holder p-2 ps-0 mt-2 resize-chat-body-photo">

                    {
                        ChatThreads.map(thread => {
                            return (
                                thread.primary_user.id == user.user_id ?

                                    <div
                                        key={thread.id}
                                        className={ActiveChat?.id == thread.secondary_user.id ? 'd-flex active-chat ps-2' : 'd-flex ps-2'}
                                        onClick={() => {
                                            SetchatActive(thread.secondary_user)
                                            SetActiveLayout('message')
                                        }}>
                                        <img src={thread.secondary_user.profile ? thread.secondary_user.profile : default_user_image} width={58} height={58} className='rounded-circle resize-phone' alt="" />
                                        <div className='mt-1 p-2 normal-line-height'>
                                            <h6>{thread.secondary_user.username}</h6>
                                            <p className="text-success f-small">Online</p>
                                        </div>
                                    </div>

                                    :

                                    <div
                                        key={thread.id}
                                        className={ActiveChat?.id == thread.secondary_user.id ? 'd-flex active-chat ps-2' : 'd-flex ps-2'}
                                        onClick={() => {
                                            SetchatActive(thread.primary_user)
                                            SetActiveLayout('message')
                                        }}>
                                        <img src={thread.primary_user.profile ? thread.primary_user.profile : default_user_image} width={58} height={58} className='rounded-circle resize-phone' alt="" />
                                        <div className='mt-1 p-2 normal-line-height'>
                                            <h6>{thread.primary_user.username}</h6>
                                            <p className="text-success f-small">Online</p>
                                        </div>
                                    </div>
                            )
                        })
                    }
                    {
                        !ChatThreads[0] && !resolved ?
                            <div className="d-flex j-center pt-3 pb-3">
                                <div className="lds-spinner lds-spinner2 me-5 mt-1" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                            </div>
                            :
                            null
                    }
                    {
                        !ChatThreads[0] && resolved ?
                            <div className='d-flex acenter j-center m-2 mt-0  pt-1 p-2'>
                                <p>Chat with your friends.</p>
                            </div>
                            :
                            null
                    }

                </div>

            </div>

            <div className={ActiveLayout == 'message' ? "col-sm-7 col-12 chat-body-seperate overflow-hidden h-100" : "h-100 overflow-hidden col-sm-7 col-12 chat-body-seperate d-md-block d-none"}>
                {ActiveChat && <Chatbody usr={ActiveChat} />}
            </div>
        </div>
    )
}

export default Messaging