import { get_append_time } from './Helper'
import './message.css'

import React from 'react'

function ChatMessageElement( {senderID ,msg , userID , datetime , sent_by_name ,profile} :{profile : string , msg:string,userID:Number|null,senderID:Number,sent_by_name:string,datetime:string}) {
    return (
        <div className={senderID == userID ? 'chat-user bg-blg r-7 gap-2 p-2 mt-md-0' : 'chat-another bg-blg r-7 gap-2 p-2 mt-md-0'} >
            <div className='mt-0'>
                <h6 className='weight-700 d-flex a-center gap-1'>{senderID == userID ? 'You ' : sent_by_name + ' '} <p className="time">{get_append_time(datetime)}</p></h6>
                <p>{msg}</p>
            </div>
            <img src={profile} width={40} height={40} className='rounded-circle resize-phone' alt="" />

        </div>
    )
}

export default ChatMessageElement