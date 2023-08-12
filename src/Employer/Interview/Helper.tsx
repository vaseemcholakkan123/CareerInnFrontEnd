import { toast } from "react-toastify"


export async function get_user_media() {
    try {
        return await navigator.mediaDevices.getUserMedia({ video: true, audio: true })

    } catch (error) {
        return Promise.reject("can't get media devices")
    }
}

export async function get_user_screen() {
    try {
        return await navigator.mediaDevices.getDisplayMedia()

    } catch (error) {
        return Promise.reject("can't get media devices")
    }
}



export const getEndpoint = () => {

    var location = window.location
    let wsStart = 'ws://'

    if (location.protocol == 'https') wsStart = 'wss://'

    // let endpoint = wsStart + '127.0.0.1:8000' + location.pathname
    let endpoint = wsStart + '127.0.0.1:8000/peersocket/'

    return endpoint
}


// export function CreateOfferer(Peerusername:string,channel_name:string ,media:MediaStream){
//         let peer = new RTCPeerConnection()
//         addLocalTracks(peer,media)
//         let data_channel = peer.createDataChannel('channel');

//         data_channel.onopen =async () => {
//             console.log('peer opened successfully');
//         }


// }

// function addLocalTracks(peer:RTCPeerConnection,media:MediaStream){
//     media.getTracks().forEach(track=>{
//         peer.addTrack(track,media)
//     })
// }

export const servers = {
    iceServers: [
        {
            urls: [
                'stun:stun.l.google.com:19302',
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
                'stun:stun3.l.google.com:19302',
                'stun:stun4.l.google.com:19302',
            ]
        }
    ]
}


// export async function createOffer_and_Setdescription(peer:RTCPeerConnection) {
//     let offer = await peer.createOffer()
//     await peer.setLocalDescription(offer)
//     console.log(offer);

//     peer.onicecandidate = async event=>{
//         if(event.candidate){
//             console.log('candidate received' , event.candidate);
            
//         }
//     }

// }

export const info = (message:string) => toast.warn(message,
    { position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    progressStyle:{color:'red'},
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light", })


export function toggle_video(Media:MediaStream) {
    let videoTrack = Media.getVideoTracks().find(track=>track.kind === "video")

    if(videoTrack){
        if(videoTrack.enabled){
            videoTrack.enabled = false
            return false
        }else{
            
            videoTrack.enabled = true
            return true
        }
    }
    else return false
    
    
}

export function toggle_audio(Media:MediaStream) {
    let AudioTrack = Media.getVideoTracks().find(track=>track.kind === "audio")

    if(AudioTrack){
        if(AudioTrack.enabled){
            AudioTrack.enabled = false
            return false
        }else{
            
            AudioTrack.enabled = true
            return true
        }
    }
    else return false
    
    
}