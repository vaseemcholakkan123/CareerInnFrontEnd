import { toast } from "react-toastify"
import CarreerInnAxios from "../../../../../../AppMain/AppConfig/AxiosConfig"
import { validation } from "../Projects/Helper"

export async function get_departments(query:string){
    try {
        const result = await CarreerInnAxios.post(`employer/search/`,{'query':query}) 
        return Promise.resolve(result)

    } catch (error) {
        return Promise.reject(error)
    }
} 

export async function get_users(query:string){
    try {
        const result = await CarreerInnAxios.post(`user/search/`,{'query':query})
        return Promise.resolve(result)

    } catch (error) {
        return Promise.reject(error)
    }
} 

export type department = {
    title : string,
    id:number
}
export type user = {
    id:number,
    username : string,
    profile : string | null,
    info : string | null,
    date_joined?:Date,
    is_ceo?:boolean,
    is_premium_user?:boolean,
}

export type registerComapnyForm = {
    name:string,
    ceo:number,
    department:number,
    employees_start:number,
    employees_end:number,
    location:string,
    about:string,
    excerpt:string,
    logo:File | null,
    banner:File|null,

}

export type company = {
    name:string,
    ceo:{
        id:number,
        username:string,
        profile:string,
        info:string
    },
    department:{
        id:number,
        title:string,
    },
    employees_start:number,
    employees_end:number,
    location:string,
    about:string,
    excerpt:string,
    logo: string,
    banner: string|null,

}

export const success = (message:string) => toast.success(message,
    { position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    progressStyle:{color:'red'},
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light", })

export async function register_company(form:registerComapnyForm){
    if(form.name == ''){
        
        validation('Provide a name')
        return Promise.reject()
    } 

    if(form.about == '') {
        validation('Provide a about')
        return Promise.reject()
    }
    if(form.department == 0){

        validation('Select a department')
        return Promise.reject()
    } 

    if(form.ceo == 0) {
        validation('Select ceo')
        return Promise.reject()
    }

    if(!form.logo){
        validation('Provide a logo')
        return Promise.reject()

    } 
    if(form.location == '') {
        validation('Provide a location')
        return Promise.reject()
    }
    if(form.excerpt == '') {
        validation('Provide a excerpt')
        return Promise.reject()
    }
    if(form.employees_start > form.employees_end || form.employees_start == 0){
        
        validation('Employees count not valid')
        return Promise.reject()
    } 

    try {
        await CarreerInnAxios.post('employer/register-company/',form,{headers:{'Content-Type':'multipart/form-data'}})
        success('Company Registered')
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }   
}
export async function check_continue() {
    try {
        const response = await CarreerInnAxios.get('user/check-company/')
        return Promise.resolve(response)
        
    } catch (error) {
        return Promise.reject(error)
    }
}