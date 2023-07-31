export type not_logged_user = {
    id : number
    username : string,
    profile : string | null,
    info : string | null,

}

export type post = {
    id:number,
    is_following? : boolean,
    is_liked:boolean,
    is_saved:boolean,
    posted_user:not_logged_user,
    content_image : string | null,
    content_text : string,
    likes : number,
    posted_on : Date,
}

export type comment = {
    id:number,
    user:not_logged_user,
    comment_text:string,
    commented_on:Date,
}
export type postform = {
    content_image:File|null,
    content_text:string,

} 