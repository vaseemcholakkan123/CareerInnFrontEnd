import { updateTimeSince } from '../../UserConfig/Helper'
import './message.css'


function ChatMessageElement( {senderID ,msg , userID , datetime , sent_by_name ,profile} :{profile : string , msg:string,userID:Number|null,senderID:Number,sent_by_name:string,datetime:string}) {
    return (
        <div className={senderID == userID ? 'chat-user bg-blg r-7 gap-2 p-2 mt-md-0' : 'chat-another bg-blg r-7 gap-2 p-2 mt-md-0'} >
            <div className='mt-0'>
                <h6 className='weight-700 d-flex a-center gap-1 f-m-smaller'>{senderID == userID ? 'You ' : sent_by_name + ' '} <p className="time">{updateTimeSince(datetime)}</p></h6>
                <p>{msg}</p>
            </div>
            <img src={profile} width={40} height={40} className='rounded-circle resize-phone' alt="" />

        </div>
    )
}

export default ChatMessageElement