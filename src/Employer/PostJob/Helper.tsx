import CarreerInnAxios from "../../AppMain/AppConfig/AxiosConfig"
import { success } from "../../User/Splits/Profile/UserProfile/Includes/Jobs/Helper"
import { validation } from "../../User/Splits/Profile/UserProfile/Includes/Projects/Helper"

export type skill = {
    title:string,
    id:number
}

export async function get_skills(query:string){
    try {
        const result = await CarreerInnAxios.post(`user/search-skills/`,{'query':query}) 
        return Promise.resolve(result)

    } catch (error) {
        return Promise.reject(error)
    }
} 


export async function add_skills(title:string){
    if(title == '') return validation('Enter something')
    try {
        const result = await CarreerInnAxios.post(`user/create-skill/`,{'title':title}) 
        success('Skill Added')
        return Promise.resolve(result.data)

    } catch (error) {
        return Promise.reject(error)
    }
} 
export type question = {
    id ?: number,
    name : string,
    answer_is_yes : boolean
}

export type add_job = {
    name : string,
    description : string,
    job_type : string,
    job_time : string,
    expected_salary : number,
    company : number,
    responsibilities : string[],
    requirements : string[],
    skills_required : number[],
    questions : question[],

}

export async function post_job(form:add_job){
    if(form.name == ''){
        validation('Enter a title / position name')
        return Promise.reject()
    }
    if(form.expected_salary <= 0){
        validation("Enter a valid salary")
        return Promise.reject()
    }
    if(form.job_time == ''){
        validation('Select a job type')
        return Promise.reject()
    }
    if(form.description == ''){
        
        validation('Enter a description')
        return Promise.reject()

    }
    if(form.job_type == '') {
        validation('Select workplace type')
        return Promise.reject()

    }
    if(form.skills_required.length == 0){
        
        validation('Select atleast one skill')
        return Promise.reject()
 
    } 
    
    let validated = true

    form.requirements.map(reqs=>{
        if (reqs == '') {
            validation('Please fill all requirements')
            validated = false
            return
        }
    })
    form.responsibilities.map(resp=>{
        if (resp == ''){
            validation('Please fill all responsibilities')
            validated = false 
            return
        }
    })
    form.questions.map(qs=>{
        if (qs.name == '') {
            validation('Please fill all questions')
            validated = false
            return
        } 

    })
    if(!validated) return


    try {
        const result = await CarreerInnAxios.post(`employer/add-job/`,form) 
        success('Job Posted')
        return Promise.resolve(result.data)

    } catch (error) {
        return Promise.reject(error)
    }
} 


export async function update_job(form:add_job,job_id:number){
    if(form.name == ''){
        validation('Enter a title / position name')
        return Promise.reject()
    }
    if(form.expected_salary <= 0){
        validation("Enter a valid salary")
        return Promise.reject()
    }
    if(form.job_time == ''){
        validation('Select a job type')
        return Promise.reject()
    }
    if(form.description == ''){
        
        validation('Enter a description')
        return Promise.reject()

    }
    if(form.job_type == '') {
        validation('Select workplace type')
        return Promise.reject()

    }
    if(form.skills_required.length == 0){
        
        validation('Select atleast one skill')
        return Promise.reject()
 
    } 
    
    let validated = true

    form.requirements.map(reqs=>{
        if (reqs == '') {
            validation('Please fill all requirements')
            validated = false
            return
        }
    })
    form.responsibilities.map(resp=>{
        if (resp == ''){
            validation('Please fill all responsibilities')
            validated = false 
            return
        }
    })
    form.questions.map(qs=>{
        if (qs.name == '') {
            validation('Please fill all questions')
            validated = false
            return
        } 

    })
    if(!validated) return


    try {
        
        const result = await CarreerInnAxios.put(`employer/update-job/${job_id}`,form) 
        success('Job Updated')
        return Promise.resolve(result.data)

    } catch (error) {
        return Promise.reject(error)
    }
} 