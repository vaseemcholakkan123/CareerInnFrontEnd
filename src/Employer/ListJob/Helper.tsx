import CarreerInnAxios from "../../AppMain/AppConfig/AxiosConfig";
import { success } from "../../User/Splits/Profile/UserProfile/Includes/Jobs/Helper";
import { question } from "../PostJob/Helper";

type skill = {
    title : string,
    id:number,
}
export type rs = {
    name : string,
}

export type jobCompany = {
    id:number,
    name : string,
    description : string,
    job_type : string,
    job_time : string,
    expected_salary:number,
    company : {
        id : number,
        name:string,
        ceo:number,
        department:{
            id:number,
            title : string
        },
        employees_start:number,
        employees_end:number,
        location:string,
        about:string,
        excerpt:string,
    },
    responsibilities : rs[],
    requirements : rs[],
    skills_required : skill[],
    questions : question[],
    posted_on:Date,
    is_closed:boolean,
    applicants_count:number,
    interview_count:number,
}

export async function get_company_jobs(){
    try {
        const result = await CarreerInnAxios.get(`employer/get-company-jobs/`) 
        return Promise.resolve(result.data)

    } catch (error) {
        return Promise.reject(error)
    }
} 

export async function close_job(job_id:number){
    if(job_id == 0) return 
    try {
        await CarreerInnAxios.post('employer/close-job/',{'target':job_id}) 
        success('Job closed')
        return Promise.resolve()

    } catch (error) {
        return Promise.reject(error)
    }
} 