import CarreerInnAxios from "../../../AppMain/AppConfig/AxiosConfig"
import { validation } from "../Profile/UserProfile/Includes/Projects/Helper"

export async function report_post_helper(post_id:number,content:string){
    if(post_id == 0){
        validation('Internal Error try later')
        return Promise.reject()
    }
    if(content == ''){
        validation("Please tell us why you're reporting")
        return Promise.reject()
    }

    try {
        await CarreerInnAxios.post('user/report-post/',{'post':post_id,'content':content})
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }

}

export async function save_unsave_post(post_id:number) {
        if(post_id == 0){
            validation('Internal Error try later')
            return Promise.reject()
        }

    try {
        const res = await CarreerInnAxios.post('user/saveUnsave-Post/',{'post_id':post_id})
        return Promise.resolve(res.data)
    } catch (error) {
        Promise.reject(error)
    }
}


export async function delete_comment(comment_id:number) {
    if(comment_id == 0){
        return Promise.reject()
    }
    try {
        await CarreerInnAxios.post(`user/delete-comment/${comment_id}`)
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
    
}