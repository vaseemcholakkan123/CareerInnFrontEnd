import { useSelector } from 'react-redux'
import default_user_image, { BASE_IMAGE_URL, get_chat_endpoint } from '../../../../AppMain/AppConfig/AppConstants'
import CarreerInnAxios from '../../../../AppMain/AppConfig/AxiosConfig'
import { RootState } from '../../../../AppMain/AppConfig/Redux/store'
import { user } from '../../Profile/UserProfile/Includes/Jobs/Helper'
import { validation } from '../../Profile/UserProfile/Includes/Projects/Helper'
import { chat_message } from '../Helper'
import './../message.css'


import { useEffect, useState, useRef , Dispatch,SetStateAction } from 'react'
import ChatMessageElement from '../ChatMessageElement'
import verified_image from '../../../../AppMain/AppConfig/vaerifiedImage'

function Chatbody({ usr , SetActiveLayout }: { usr : user , SetActiveLayout :  Dispatch<SetStateAction<string>> } ) {

    const [ChatMessages, SetChatMessages] = useState<chat_message[]>([])
    const [resolved, Setresolved] = useState(false)
    const chatInput = useRef<HTMLInputElement>(null)
    const localsocket = useRef<WebSocket>()
    const primary_user = useSelector((state: RootState) => state.logged_user.value)
    const chatBody = useRef<HTMLDivElement>(null)

    useEffect(() => {
        CarreerInnAxios.get(`user/get-thread-messages/${usr.id}`)
            .then(res => {
                Setresolved(true)
                SetChatMessages(res.data)
            })
            .catch(() => {
                Setresolved(true)
                validation("Can't connect to the server")
            })

        const socket = new WebSocket(get_chat_endpoint(usr.id))
        chatBody.current!.scrollTop = chatBody.current!.scrollHeight + 90
        socket.onopen = () => {
            console.log('Socket connected');
            localsocket.current = socket
        }

        socket.onmessage = async event => {
            const dmp = JSON.parse(event.data)
            const data: chat_message = JSON.parse(dmp.message)
            SetChatMessages(ChatMessages => [...ChatMessages, { ...data, user: { ...data.user, profile: BASE_IMAGE_URL + data.user.profile } }])
            chatBody.current!.scrollTop = chatBody.current!.scrollHeight

        }

        return () => {
            SetChatMessages([])
            Setresolved(false)
            localsocket.current?.close()
            localsocket.current = undefined
        }

    }, [usr])

    function send_message(message: string) {
        if (message.trim() == '') return
        if (localsocket.current) {
            localsocket.current.send(
                JSON.stringify(
                    { 'message': message }
                )
            )
        }
        else validation("Broken connection")
    }


    return (
        <div className='h-100'>
            <div className="p-2 normal-line-height d-flex gap-md-2 gap-1 resize-chat-body-photo">
                {/* on mobile show picture */}
                <svg onClick={()=>{SetActiveLayout('chats-selection')}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="d-md-none align-self-center bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                </svg>
                <img src={usr.profile ? usr.profile : default_user_image} width={58} height={58} className='rounded-circle resize-phone' alt="" />
                <div className='mt-2'>
                    <div className="d-flex a-center">
                        <h6>{usr.username}</h6>
                        {
                            usr.is_premium_user ?
                                <img src={verified_image} height={18} width={18} alt="" />
                                :
                                null

                        }
                    </div>
                    <p className="f-small text-success">Online</p>
                </div>


            </div>
            <div className="or-1 w-100"></div>

            {/*  chat body add */}

            <div className="chat-body-main resize-chat-body-photo" ref={chatBody}>

                {/* <div className="chat-another bg-blg p-2 w-fit-content gap-2 r-7 mt-md-0">
                    <img src="http://10.4.2.62:8000/media/profiles/my_profile.jpg" width={40} height={40} className='rounded-circle resize-phone' alt="" />
                    <div className='mt-0'>
                        <h6 className='weight-700 d-flex a-center gap-1'>Vyshak <p className="time">10:00 am</p></h6>
                        <p>Hi there</p>
                    </div>

                </div>

                <div className="chat-user bg-blg r-7 gap-2 p-2 mt-md-0">
                    <div className='mt-0'>
                        <h6 className='weight-700 d-flex a-center gap-1'>You <p className="time">just now</p></h6>
                        <p>Hi there</p>
                    </div>
                    <img src="http://10.4.2.62:8000/media/profiles/my_profile.jpg" width={40} height={40} className='rounded-circle resize-phone' alt="" />

                </div> */}

                {
                    !resolved ?
                        <div className="p-2 bg-blg d-flex a-center gap-1 ms-auto me-auto w-f-content pe-4 r-7">
                            <p className='f-small f-m-small'>loading messages</p>
                            <div className="lds-spinner lds-spinner2 lds-spinner4 h-0 mt-1 pe-2" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
                        :
                        null
                }
                {
                    resolved && !ChatMessages[0] ?
                        <div className="p-2 bg-blg r-7 w-f-content ms-auto me-auto" onClick={() => send_message(`Hi ${usr.username}`)}>
                            <p>Say hi to {usr.username}</p>
                        </div>
                        :
                        null
                }
                {
                    ChatMessages.map(message_obj => {
                        return (
                            <ChatMessageElement key={message_obj.id} profile={message_obj.user.profile ? message_obj.user.profile : default_user_image} senderID={message_obj.user.id} userID={primary_user.user_id} msg={message_obj.message} sent_by_name={message_obj.user.username} datetime={String(message_obj.message_time)} />
                        )
                    })
                }



            </div>

            <div className="footer m-1 mb-md-1 mb-0 p-2 bg-blg row r-7 a-center">
                <form onSubmit={e => {
                    e.preventDefault();
                    send_message(chatInput.current!.value)
                    chatInput.current!.value = ''
                }}>
                    <input ref={chatInput} type="text" className='bg-inherit s-input col-10' />
                    <button
                        type='submit'
                        className="col-2 text-center border-0 bg-inherit"
                    >
                        Send
                    </button>
                </form>
            </div>


        </div>
    )
}

export default Chatbody