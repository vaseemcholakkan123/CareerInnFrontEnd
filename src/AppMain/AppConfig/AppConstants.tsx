import default_user_image from './../../../assets/tehico.png'
// export const BASE_URL = 'http://127.0.0.1:8000/'
export const BASE_URL = 'http://10.4.2.62:8000/'
export default default_user_image
// export const BASE_IMAGE_URL = 'http://127.0.0.1:8000'
export const BASE_IMAGE_URL = 'http://10.4.2.62:8000'

// export const BASE_IMAGE_URL = 'http://192.168.43.30:8000'
// export const BASE_URL = 'http://192.168.43.30:8000/'

var location = window.location
let wsStart = 'ws://'

if (location.protocol == 'https') wsStart = 'wss://'

export const NOTIFICATION_END_POINT = wsStart + '10.4.2.62:8000/notifications/'


export function get_chat_endpoint(target_id: number) {
    var location = window.location
    let wsStart = 'ws://'

    if (location.protocol == 'https') wsStart = 'wss://'
    return wsStart + '10.4.2.62:8000/chat/' + `?token=${localStorage.getItem('access-token')}&target=${target_id}`
}