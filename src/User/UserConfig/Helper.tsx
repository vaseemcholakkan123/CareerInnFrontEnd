import { toast } from "react-toastify"
import {  postform } from "./Constants"
import CarreerInnAxios from "../../AppMain/AppConfig/AxiosConfig"
import React from "react"
import { validation } from "../Splits/Profile/UserProfile/Includes/Projects/Helper"


export const PasswordTrigger = (input:HTMLInputElement)=>{
    if(input.type === 'password'){
        input.type = 'text'
    }else{
        input.type = 'password'
    }
}

export const handlePostSubmission = async (postform:postform)=>{
    if (postform.content_text == ''){
        PostToastError('Enter something')
        return
    }
    try{
        let data = postform.content_image ? postform : {'content_text':postform.content_text}
        const result = await CarreerInnAxios.post('user/posts/',data,{headers:{'Content-Type':'multipart/form-data'}})
        if(result){
            PostToastSuccess('Posted successfully');
            return Promise.resolve(result.data)
        }
    }catch(err){
        return Promise.reject(err);
    }

}
export async function update_post(postform:postform,post_id:number){
    if (postform.content_text == ''){
        PostToastError('Enter something')
        return
    }
    try{
        let data = postform.content_image ? postform : {'content_text':postform.content_text}
        const result = await CarreerInnAxios.patch(`user/posts/${post_id}/`,data,{headers:{'Content-Type':'multipart/form-data'}})
        if(result){
            PostToastSuccess('Post Updated');
            return Promise.resolve(result.data)
        }
    }catch(err){
        return Promise.reject(err);
    }
}


const PostToastError = (message:string) => toast.error(message,
    { position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    progressStyle:{color:"var('--app-color')"},
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light", })

const PostToastSuccess = (message:string) => toast.success(message,
    { position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    progressStyle:{color:"var(--app-color)"},
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light", })




export function updateTimeSince(timeString : string) {
    let time;
    const then = new Date(timeString);
    const now = new Date();
    const secondsPast = (now.getTime() - then.getTime()) / 1000;
    const minutesPast = Math.floor(secondsPast / 60);
    const hoursPast = Math.floor(minutesPast / 60);
    const daysPast = Math.floor(hoursPast / 24);
    

    if (daysPast > 6) {
        const year = then.getFullYear() === now.getFullYear() ? '' : ' ' + then.getFullYear();
        const month = then.toLocaleString('default', {month: 'short'});
        const day = then.getDate();
        time = then.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});
        return month + ' ' + day + year + ', ' + time;
    } else if (daysPast > 0) {
        const days = daysPast === 1 ? "1 day" : daysPast + " days";
        time = then.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});
        return days + " ago, " + time;
    } else if (hoursPast > 0) {
        return hoursPast + " hour ago";
    } else if (minutesPast > 0) {
        return minutesPast + " minutes ago";
    } else {
        return "just now";
    }
}

export async function likePost(post_id:number){
    try {
        await CarreerInnAxios.post(`user/like-post/${post_id}`)
        return Promise.resolve()
    } catch (error) {
        return Promise.reject()
    }
}

export async function get_comments(post_id:number,next:string){
    try {
        const result = await CarreerInnAxios.get(`user/post-comments/${post_id}?${next}`)
        return Promise.resolve(result.data)
        
    } catch (error) {
        Promise.reject(error)
    }
}

export async function post_comment(FormEvent:React.SyntheticEvent,post_id:number){
    FormEvent.preventDefault();

    const formElement = FormEvent.currentTarget as HTMLFormElement;
    const commentInput = formElement.elements.namedItem('comment') as HTMLInputElement;
    const comment = commentInput.value
    commentInput.value = ''
    if (comment === ''){
        CommentValidation('Enter something');
        return Promise.reject()
    }

    try {
        const res = await CarreerInnAxios.post(`user/comment-on-post/${post_id}`,{comment:comment})
        return Promise.resolve({d:res.data,comment:comment})
    } catch (error) {
        return Promise.reject(error)
    }

}

const CommentValidation = (message:string) => toast.error(message,
    { position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    progressStyle:{color:"var('--app-color')"},
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light", })

export async function delete_post(post_id:number){

    try{
        await CarreerInnAxios.delete(`user/posts/${post_id}/`)
        PostToastSuccess('Post Deleted')
    }
    catch(err){
        validation("Unknnown Error")
    }
}

export async function follow_user(target_id:number){
    try {
        await CarreerInnAxios.post('user/follow-user/',{'user_id':target_id})
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
}