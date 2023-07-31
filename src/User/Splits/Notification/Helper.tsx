import CarreerInnAxios from "../../../AppMain/AppConfig/AxiosConfig"

export type notification = {
    content : string,
    link_thread : string,
    type : string,
    created : Date,
    id:number,
    rel_img:string | null,
}

export async function read_notification(notification_id:number) {

    try {
        await CarreerInnAxios.post('user/read-notification/',{'notification_id':notification_id})
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
    
}

export async function delete_notification(notification_id:number) {

    try {
        await CarreerInnAxios.post('user/delete-notification/',{'notification_id':notification_id})
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
    
}

export async function read_all_notification() {

    try {
        await CarreerInnAxios.post('user/mark-all-as-read/')
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
    
}