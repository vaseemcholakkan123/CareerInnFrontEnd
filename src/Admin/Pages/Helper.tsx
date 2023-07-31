import CarreerInnAxios from "../../AppMain/AppConfig/AxiosConfig";



export async function check_admin(){
    try {

        await CarreerInnAxios.get('admin/check-auth/')
        return Promise.resolve()
    } catch (error) {
        
        return Promise.reject()
    }
}