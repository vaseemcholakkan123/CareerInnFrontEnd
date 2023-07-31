import CarreerInnAxios from "../../../../../../AppMain/AppConfig/AxiosConfig"
import { success } from "../Jobs/Helper"
import { validation } from "../Projects/Helper"

export type Educationtype = {
    id : number,
    institute : string,
    subject : string,
    graduated_year : number,
}

export type Educationform = {
    institute : string,
    subject : string,
    graduated_year : number,
}

export async function add_education(form:Educationform){
    if(form.institute==''){
        validation('Enter institute')
        return Promise.reject()
    }
    if(form.subject==''){
        validation('Enter subject')
        return Promise.reject()
    }
    const dt = new Date()
    const curr_year = dt.getFullYear()
    
    if(form.graduated_year <= 0 || form.graduated_year > curr_year){
        validation('Enter a valid year')
        return Promise.reject()
    }

    try {
        const res = await CarreerInnAxios.post('user/add-education/',form)
        success('Education Added')
        return Promise.resolve(res.data)
    } catch (error) {
        return Promise.reject(error)
    }
}


export async function axios_delete_education(education_id:number) {
    try {
        const result = await CarreerInnAxios.delete(`user/update-delete-education/${education_id}/`) 
        success('Education Removed')
        return Promise.resolve(result)
    } catch (error) {
        validation('Internal Error,Try again later')
        return Promise.reject()
    }
}

export async function axios_update_education(education_id:number,form:Educationform) {
    if(form.institute==''){
        validation('Enter institute')
        return Promise.reject()
    }
    if(form.subject==''){
        validation('Enter subject')
        return Promise.reject()
    }
    const dt = new Date()
    const curr_year = dt.getFullYear()
    
    if(form.graduated_year <= 0 || form.graduated_year > curr_year){
        validation('Enter a valid year')
        return Promise.reject()
    }
    try {
        const result = await CarreerInnAxios.put(`user/update-delete-education/${education_id}/`,form) 
        success('Education Updated')
        return Promise.resolve(result.data)
    } catch (error) {
        validation('Internal Error,Try again later')
        return Promise.reject(error)
    }
}