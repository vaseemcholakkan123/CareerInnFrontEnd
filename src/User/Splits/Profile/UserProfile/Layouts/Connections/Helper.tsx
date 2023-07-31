import CarreerInnAxios from "../../../../../../AppMain/AppConfig/AxiosConfig"

export type f_user = {
    following:[{
        username:string,
        id:number,
        profile:string|null,
        info : string | null
    }]
}

export type followers = {
    user:{
        username:string,
        profile:string|null,
        info : string,
        id:number
    }
}

export async function break_connection(target_id:number){
    try {
        await CarreerInnAxios.post('user/break-connection/',{'user_id':target_id})
        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
}