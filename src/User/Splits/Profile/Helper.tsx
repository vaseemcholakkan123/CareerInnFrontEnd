import { toast } from "react-toastify";
import CarreerInnAxios from "../../../AppMain/AppConfig/AxiosConfig";


export async function change_profile_picture(file:File){

    try {
        const response = await CarreerInnAxios.post('user/change-profile-picture/',{'profile':file},{headers:{'Content-Type':'multipart/form-data'}})
        ToastSuccess('Profile picture updated')
        return Promise.resolve(response)
    } catch (error) {
        return Promise.reject(error)
    }
} 

export async function save_resume(file:File){

    try {
        const response = await CarreerInnAxios.post('user/save-resume/',{'resume':file},{headers:{'Content-Type':'multipart/form-data'}})
        ToastSuccess('Resume saved')
        return Promise.resolve(response)
    } catch (error) {
        return Promise.reject(error)
    }
} 


export async function change_banner_picture(file:File){

    try {
        const response = await CarreerInnAxios.post('user/change-banner-picture/',{'banner':file},{headers:{'Content-Type':'multipart/form-data'}})
        ToastSuccess('Banner updated')
        return Promise.resolve(response)
    } catch (error) {
        return Promise.reject(error)
    }
} 

export async function change_profile_detail(form:detailForm){

    if (form.mobile && String(form.mobile).length < 10) {
        
        ToastValidation('Mobile no should have 10 number')
        return Promise.reject()
    }

    try {
        const result = await CarreerInnAxios.post(`user/change-details/`,{'details':form})
        ToastSuccess('Profile updated')
        return Promise.resolve(result)
    } catch (error) {
        return Promise.reject(error)
    }
}

export function debounce(cb:(...args:any)=>void,delay=1000){
    let timeout:number;
    
    return (...args:any)=>{
        clearTimeout(timeout)
        timeout = setTimeout(() => {
           cb(...args) 
        }, delay);

    }
}




const ToastSuccess = (message:string) => toast.success(message,
    { position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    progressStyle:{color:"var(--primary-color)"},
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light", })

const ToastValidation = (message:string) => toast.warn(message,
                    { position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    progressStyle:{color:"var(--primary-color)"},
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light", })


export type detailForm = {
    username : string | null,
    info : string | null,
    mobile : number | null,
    location : string | null,

}
