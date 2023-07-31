import CarreerInnAxios from "../../../../../../AppMain/AppConfig/AxiosConfig"
import { success } from "../Jobs/Helper"
import { validation } from "../Projects/Helper"

export type Experiencetype = {
    company : {
        name: string,
        id:number,
    },
    id : number,
    position : string,
    year_from : number,
    year_to : number,
    still_working : boolean,
}
export type smallcompanytype = {
    name:string,
    id : number,
    logo:string,
}

export type ExperienceForm = {
    company : number,
    company_name ?: string,
    position : string,
    year_from : number,
    year_to : number,
    still_working : boolean | null,
}

export async function add_experience(form:ExperienceForm){
    if(form.company==0){
        validation('Select company')
        return Promise.reject()
    }
    if(form.position==''){
        validation('Enter position')
        return Promise.reject()
    }

    const dt = new Date
    const curr_year = dt.getFullYear()

    console.log(form.year_from,form.year_to);
    
    
    if(!form.still_working){
        if(form.year_from > form.year_to || form.year_to == 0 || form.year_from == 0 || form.year_to > curr_year){
            validation('Enter a valid year')
            return Promise.reject()
        }
    }

    try {
        const res = await CarreerInnAxios.post('user/add-experience/',form)
        success('Experience Added')
        return Promise.resolve(res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function axios_delete_experience(exp_id:number) {
    try {
        await CarreerInnAxios.delete(`user/update-delete-experience/${exp_id}/`) 
        success('Experience Removed')
        return Promise.resolve()
    } catch (error) {
        validation('Internal Error,Try again later')
        return Promise.reject()
    }
}


export async function axios_update_experience(exp_id:number,form:ExperienceForm) {
    if(form.company==0){
        validation('Select company')
        return Promise.reject()
    }
    if(form.position==''){
        validation('Enter position')
        return Promise.reject()
    }
    const dt = new Date
    const curr_year = dt.getFullYear()

    if(!form.still_working){
        if(form.year_from > form.year_to || form.year_to == 0 || form.year_from == 0 || form.year_to > curr_year){
            validation('Enter a valid year')
            return Promise.reject()
        }
    }

    try {
        const result = await CarreerInnAxios.put(`user/update-delete-experience/${exp_id}/`,form) 
        success('Experience updated')
        return Promise.resolve(result.data)
    } catch (error) {
        validation('Internal Error,Try again later')
        return Promise.reject(error)
    }
}

export async function get_companies(query:string){
    try {
        const result = await CarreerInnAxios.post(`employer/search-company/`,{'query':query}) 
        return Promise.resolve(result)

    } catch (error) {
        return Promise.reject(error)
    }
} 