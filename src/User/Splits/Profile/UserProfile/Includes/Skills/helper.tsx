import CarreerInnAxios from "../../../../../../AppMain/AppConfig/AxiosConfig"
import { success } from "../Jobs/Helper"
import { validation } from "../Projects/Helper"

export type skill = {
    title : string,
    id : number,
}

export async function get_skills(query:string){
    try {
        const result = await CarreerInnAxios.post(`employer/search-skills/`,{'query':query}) 
        return Promise.resolve(result.data)

    } catch (error) {
        return Promise.reject(error)
    }
} 

export async function add_skill(skill_id:number) {
    if(skill_id == 0){
        return Promise.reject()
    } 
    try {
        const res = await CarreerInnAxios.post('user/add-skill/',{'skill_id':skill_id})
        if(res.data.exists){
            validation(res.data.exists)
            return Promise.reject()
        }
    } catch (error) {
        return Promise.reject(error)
    }


    
}

export async function axios_delete_skill(skill_id:number) {
    try {
        await CarreerInnAxios.post('user/remove-skill/',{'skill_id':skill_id}) 
        success('Skill removed')
        return Promise.resolve()
    } catch (error) {
        validation('Internal Error,Try again later')
        return Promise.reject()
    }
}