import CarreerInnAxios from "../../AppMain/AppConfig/AxiosConfig";
import { success } from "../../User/Splits/Profile/UserProfile/Includes/Jobs/Helper";
import { validation } from "../../User/Splits/Profile/UserProfile/Includes/Projects/Helper";
import axios from "axios";

export async function add_new_recruiter(query:number) {
    if (query == 0) return validation('query invalid')

    try {
        const response = await CarreerInnAxios.post('employer/add-new/',{'target':query})
        success('Recruiter Added')
        return Promise.resolve(response.data)
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            validation(error.response?.data)
        }
        return Promise.reject()  
        
    }    
}


export async function remove_recruiter(query:number) {
    if (query == 0) return validation('query invalid')

    try {
        await CarreerInnAxios.post('employer/remove-recruiter/',{'target':query})
        success('Recruiter Removed')
        return Promise.resolve()
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            validation(error.response?.data)
        }
        return Promise.reject()  
        
    }    
}