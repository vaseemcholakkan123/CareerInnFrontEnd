import { useSelector } from 'react-redux'
import default_user_image, { BASE_IMAGE_URL, get_chat_endpoint } from '../../../../AppMain/AppConfig/AppConstants'
import CarreerInnAxios from '../../../../AppMain/AppConfig/AxiosConfig'
import { RootState } from '../../../../AppMain/AppConfig/Redux/store'
import { user } from '../../Profile/UserProfile/Includes/Jobs/Helper'
import { validation } from '../../Profile/UserProfile/Includes/Projects/Helper'
import { chat_message } from '../Helper'
import './../message.css'

type chat_body_type = {
    usr: user,
}

import { useEffect, useState, useRef } from 'react'
import ChatMessageElement from '../ChatMessageElement'

function Chatbody({ usr }: chat_body_type) {

    const [ChatMessages, SetChatMessages] = useState<chat_message[]>([])
    const [resolved, Setresolved] = useState(false)
    const chatInput = useRef<HTMLInputElement>(null)
    const localsocket = useRef<WebSocket>()
    const primary_user = useSelector((state: RootState) => state.logged_user.value)


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

        socket.onopen = () => {
            console.log('Socket connected');
            localsocket.current = socket
        }

        socket.onmessage = async event => {
            const dmp = JSON.parse(event.data)
            const data:chat_message = JSON.parse(dmp.message)
            console.log(data,'all events');
            
            SetChatMessages([...ChatMessages,{...data,user:{...data.user,profile:BASE_IMAGE_URL + data.user.profile}}])
           
        }

        return () => {
            SetChatMessages([])
            localsocket.current?.close()
            localsocket.current = undefined
        }

    }, [usr])

    function send_message(message: string) {
        if (message == '') return
        if (localsocket.current) {
            console.log('sending mesage');

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
            <div className="p-2 normal-line-height d-flex gap-2 resize-chat-body-photo">
                {/* on mobile show picture */}
                <img src={usr.profile ? usr.profile : default_user_image} width={58} height={58} className='rounded-circle resize-phone' alt="" />
                <div className='mt-2'>
                    <h6>{usr.username}</h6>
                    <p className="f-small text-success">Online</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="call-icon align-self-center ms-auto me-3 bi bi-telephone-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                </svg>

            </div>
            <div className="or-1 w-100"></div>

            {/*  chat body add */}

            <div className="chat-body-main resize-chat-body-photo">

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
                        <div className="p-2 bg-blg r-7 w-f-content ms-auto me-auto">
                            <p>Say hi to {usr.username}</p>
                        </div>
                        :
                        null
                }

                {
                    ChatMessages.map(message_obj => {
                        return(
                            <ChatMessageElement key={message_obj.id} profile={message_obj.user.profile ? message_obj.user.profile : default_user_image} senderID={message_obj.user.id} userID={primary_user.user_id} msg={message_obj.message} sent_by_name={message_obj.user.username} datetime={String(message_obj.message_time)} />
                        )
                    })
                }



            </div>

            <div className="footer m-1 mb-md-1 mb-0 p-2 bg-blg row r-7 a-center">
                <input ref={chatInput} type="text" className='bg-inherit s-input col-10' />
                <p
                    className="col-2 text-center"
                    onClick={() => {
                        send_message(chatInput.current!.value)
                        chatInput.current!.value = ''
                    }}
                >
                    Send
                </p>
            </div>


        </div>
    )
}

export default Chatbody