import CarreerInnAxios from "../../../AppMain/AppConfig/AxiosConfig"
import { rs } from "../../../Employer/ListJob/Helper"
import { question, skill } from "../../../Employer/PostJob/Helper"
import { validation } from "../Profile/UserProfile/Includes/Projects/Helper"

export type job = {
    id:number,
    name : string,
    description : string,
    job_type : string,
    job_time : string,
    expected_salary : number,
    company : {
        name:string,
        ceo:{
            username:string,
            id:number
        },
        department:{
            id:number,
            title : string
        },
        employees_start:number,
        employees_end:number,
        location:string,
        logo:string,
        banner:string | null,
        about:string,
        excerpt:string,
    },
    responsibilities : rs[],
    requirements : rs[],
    skills_required : skill[],
    questions : question[],
    posted_on:Date,
    is_closed:boolean,
    applicants_count : number,
    user_is_applied : boolean,
}


export async function application_validity(job_id:number) {

    try {
        const res = await CarreerInnAxios.post('employer/validate-user/',{'job_id':job_id})
        return Promise.resolve(res.data)
        
    } catch (error) {
        console.log(error);
        
        return Promise.reject()  
        
    }    
}

export type answer_question = {
    id : number,
    name : string,
    user_answer:boolean,
    user_is_selected : boolean,
}

export type application_form = {
    qs : answer_question[],
    resume : File | null,
    about : string,

}

export async function apply_for_job(form:application_form ,job_id:number,oqs:question[]) {

    let validated = true
    let answers_validation = true

    form.qs.map(qs=>{
        if(!qs.user_is_selected){
            validated = false
        }
    })
    if(form.about == ''){
        validation("Enter about")
        return Promise.reject()
    }
    if(!validated){
        validation('Answer all questions')
        return Promise.reject()
    }
    if(!form.resume){
        validation('Attach resume to apply')
        return Promise.reject()
    }

    for (let index = 0; index < oqs.length; index++) {
       if(oqs[index].name == form.qs[index].name && form.qs[index].user_answer != oqs[index].answer_is_yes) answers_validation = false
       
        
    }
    
    

    try {
        const res = await CarreerInnAxios.post('employer/apply-job/',{'job_id':job_id,'answer_validation':answers_validation,'resume':form.resume,'about':form.about},{headers:{'Content-Type':'multipart/form-data'}})
        return Promise.resolve(res.data)
        
    } catch (error) {
        
        return Promise.reject(error)  
        
    }    
}

export type filter_type = {
    department : { title:string,  id:number},
    skills_contain : {id:number ,title :string}[],
    work_type : string,
    work_time : string,

}