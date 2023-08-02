import CarreerInnAxios from "../../AppMain/AppConfig/AxiosConfig";
import { user } from "../../User/Splits/Profile/UserProfile/Includes/Jobs/Helper";
import { validation } from "../../User/Splits/Profile/UserProfile/Includes/Projects/Helper";
import { post } from "../../User/UserConfig/Constants";



export async function check_admin(){
    try {

        await CarreerInnAxios.get('admin/check-auth/')
        return Promise.resolve()
    } catch (error) {

        return Promise.reject()
    }
}

export type NewsType = {
    id:number,
    title : string,
    posted_time : Date,
}

export async function add_news(title:string){
    if(title == ''){
        validation('Enter something')
        return Promise.reject()
    }
    try {
        const response = CarreerInnAxios.post('admin/News/', {'title' : title})
        return Promise.resolve(response)
    } catch (error) {
        console.log(error);
        
        return Promise.reject(error)
    }
}

export async function delete_news(news_id:number){
    try {
        await CarreerInnAxios.delete(`admin/News/${news_id}/`)
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function update_news(title:string,news_id:number){
    if(title == ''){
        validation('Enter something')
        return Promise.reject()
    }
    try {
        const response = CarreerInnAxios.put(`admin/News/${news_id}/`, {'title' : title})
        return Promise.resolve(response)
    } catch (error) {
        console.log(error);
        
        return Promise.reject(error)
    }
}

export type depType = {
    id : number,
    title : string,
    no_of_company : number,
}


export async function add_department(title:string){
    if(title == ''){
        validation('Enter something')
        return Promise.reject()
    }
    try {
        const response = CarreerInnAxios.post('admin/Department/', {'title' : title})
        return Promise.resolve(response)
    } catch (error) {
        console.log(error);
        
        return Promise.reject(error)
    }
}

export async function delete_department(dep_id:number){
    try {
        await CarreerInnAxios.delete(`admin/Department/${dep_id}/`)
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function update_department(title:string,dep_id:number){
    if(title == ''){
        validation('Enter something')
        return Promise.reject()
    }
    try {
        const response = CarreerInnAxios.put(`admin/Department/${dep_id}/`, {'title' : title})
        return Promise.resolve(response)
    } catch (error) {
        console.log(error);
        
        return Promise.reject(error)
    }
}

export type reportstype = {
    total_reports : number,
    post : post,
    user : user,
    id:number,
    content:string,
} 


export async function delete_post(post_id:number){
    try {
        await CarreerInnAxios.post(`admin/delete-post/${post_id}/`)
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function block_user_from_report(user_id:number){
    try {
        await CarreerInnAxios.post(`admin/block-user/${user_id}/`)
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
}

export type adminUsers = {
    username : string,
    profile : string | null,
    id:number,
    info : string | null,
    posts_got_reported : number ,
    is_blocked : boolean,

}

export async function block_user(user_id:number){
    try {
        await CarreerInnAxios.post(`admin/block-user-list/${user_id}/`)
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function Unblock_user(user_id:number){
    try {
        await CarreerInnAxios.post(`admin/unblock-user-list/${user_id}/`)
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
}