import CarreerInnAxios from "../../AppMain/AppConfig/AxiosConfig"
import { validation } from "../../User/Splits/Profile/UserProfile/Includes/Projects/Helper"

export type Applicant = {
    user : {
        id:number,
        username : string,
        info : string|null,
        profile : string|null,
    }
    id : number,
    resume : string,
    is_shortlisted : boolean,
    is_interviewed : boolean,
    is_informed : boolean,
    is_selected : boolean,
    applied_on : Date,
    about:string,
}


export async function shortlist_applicant(applicant_id:number,job_id:number){
    try{
            
        await CarreerInnAxios.post('employer/shortlist-applicant/',{'applicant_id':applicant_id,'job_id':job_id})
        return Promise.resolve()
    }
    catch (err){
        return Promise.reject(err)
    }
}
export async function reject_applicant(applicant_id:number,job_id:number){
    try{
            
        await CarreerInnAxios.post('employer/remove-applicant/',{'applicant_id':applicant_id,'job_id':job_id})
        return Promise.resolve()
    }
    catch (err){
        return Promise.reject(err)
    }
}
export async function inform_interview(date:string,time:string,applicant_id:number,job_id:number) {
    let dt = new Date
    let val_date = new Date(date + ' ' + time)  
    if(applicant_id == 0){
        validation('Error while getting applicant, try again later.')
        return Promise.reject()
    }   

    if(date == '' || val_date < dt){
        validation('please provide a valid date')
        return Promise.reject()
    }
    if(time == ''){
        validation('please provide a valid time')
        return Promise.reject()
    }

    try {
        await CarreerInnAxios.post('employer/notify-interview/',{'interview_time':val_date.toLocaleTimeString([],{hour:"2-digit",minute:'2-digit'}),'job_id':job_id,'target_id':applicant_id,'interview_date':date})
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
    
}

export async function take_interview(applicant_id: number,job_id: number){
    if (applicant_id === 0 || job_id === 0) {
        validation("Internal error,Try later")
        return Promise.reject()
    }
    try {
        await CarreerInnAxios.post('employer/take-interview/',{'job':job_id, 'applicant':applicant_id})
        return Promise.resolve()
    } catch (error) {
        return Promise.reject()
    }
}

export async function is_interviewed(user_id: number,job_id: number){
    if (user_id === 0 || job_id === 0) {
        validation("Internal error,Try later")
        return Promise.reject()
    }
    try {
        await CarreerInnAxios.post('employer/is-interviewed/',{'job_id':job_id, 'user_id':user_id})
        return Promise.resolve()
    } catch (error) {
        return Promise.reject()
    }
}

export async function select_candidate(user_id: number,job_id: number){
    if(user_id == 0 || job_id == 0){
        validation("Internal error")
        return Promise.reject()
    }
    try {
        await CarreerInnAxios.post('employer/select-candidate/',{'job_id':job_id , 'user_id':user_id})
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)       
    }
}