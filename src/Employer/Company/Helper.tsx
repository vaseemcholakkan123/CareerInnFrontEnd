import CarreerInnAxios from "../../AppMain/AppConfig/AxiosConfig"
import { success } from "../../User/Splits/Profile/UserProfile/Includes/Jobs/Helper"
import { validation } from "../../User/Splits/Profile/UserProfile/Includes/Projects/Helper"

export async function update_banner(image:File){
    try {
        const res = await CarreerInnAxios.post('employer/update-company-banner/',{'banner':image},{headers:{'Content-Type':'multipart/form-data'}})
        success('Banner updated')
        return Promise.resolve(res.data.new_banner)
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function update_logo(image:File){
    try {
        const res = await CarreerInnAxios.post('employer/update-company-logo/',{'logo':image},{headers:{'Content-Type':'multipart/form-data'}})
        success('Logo updated')
        return Promise.resolve(res.data.new_logo)
    } catch (error) {
        return Promise.reject(error)
    }
}

export type UpdateComapnyForm = {
    name:string,
    ceo:number,
    department:number,
    employees_start:number,
    employees_end:number,
    location:string,
    about:string,
    excerpt:string,

}


export async function update_company(form:UpdateComapnyForm){
    console.log('working');
    
    if(form.name == '') return validation('Provide a name')
    if(form.about == '') return validation('Provide a about')
    if(form.department == 0) return validation('Select a department')
    if(form.ceo == 0) return validation('Select ceo')
    if(form.location == '') return validation('Provide a location')
    if(form.excerpt == '') return validation('Provide a excerpt')
    if(form.employees_start > form.employees_end) return validation('Employees count not valid')

    try {
        console.log('point 1');
        
        const id = localStorage.getItem('company_id')
        if(!id) return validation('company id not in local storage')
        console.log('point2');
        

        const result = await CarreerInnAxios.put(`employer/company-action/${id}/`,form)
        success('Company Updated')
        return Promise.resolve(result.data)
    } catch (error) {
        return Promise.reject(error)
    }   
}
