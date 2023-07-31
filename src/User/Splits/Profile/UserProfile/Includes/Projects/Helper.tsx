import { toast } from "react-toastify"
import CarreerInnAxios from "../../../../../../AppMain/AppConfig/AxiosConfig"

export type ProjectForm = {
    name : string,
    description: string,
    link : string,
    user:number,
}

export type project = {
    user : {
        username : string,
        info : string,
        profile : string,
    },
    name : string,
    id:number,
    description : string,
    link : string,
}


export async function post_project(form:ProjectForm){

    if(form.name == ''){
        validation('Provide a name')
        return
    }
    if(form.description == ''){
        validation('Provide a description')
        return
    }
    if(form.link == ''){
        validation('Provide a link to project')
        return 
    }

    try{
        const result = await CarreerInnAxios.post('user/add-project/',form) 
        success('Project Added')
        return Promise.resolve(result)
    }
    catch (e) {
        return Promise.reject(e)
    }
}
export async function update_project(form:ProjectForm,project_id:number){

    if(form.name == ''){
        validation('Provide a name')
        return
    }
    if(form.description == ''){
        validation('Provide a description')
        return
    }
    if(form.link == ''){
        validation('Provide a link to project')
        return 
    }

    try{
        const result = await CarreerInnAxios.put(`user/update-delete-project/${project_id}/`,form) 
        success('Project Updated')
        return Promise.resolve(result)
    }
    catch (e) {
        console.log(e);
        
        return Promise.reject(e)
    }
}
export async function axios_delete_project(project_id:number) {
    try {
        const result = await CarreerInnAxios.delete(`user/update-delete-project/${project_id}/`) 
        success('Project Deleted')
        return Promise.resolve(result)
    } catch (error) {
        validation('Internal Error,Try again later')
        return Promise.reject()
    }
}


export const validation = (message:string) => toast.error(message,
    { position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    progressStyle:{color:'red'},
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light", })

export const inform = (message:string) => toast.info(message,
        { position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progressStyle:{color:'red'},
        icon:false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light", })

const success = (message:string) => toast.success(message,
        { position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        progressStyle:{color:'red'},
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light", })
