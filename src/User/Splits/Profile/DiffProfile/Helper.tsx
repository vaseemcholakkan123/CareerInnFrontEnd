import { Educationtype } from "../UserProfile/Includes/Education/Helper"
import { Experiencetype } from "../UserProfile/Includes/Experience/Helper"
import { project } from "../UserProfile/Includes/Projects/Helper"
import { skill } from "../UserProfile/Includes/Skills/helper"

export type differUser = {
    id:number,
    username : string,
    profile : string | null,
    info : string | null,
    date_joined?:Date,
    location : string | null,
    banner : string | null,
    experience : Experiencetype[],
    education : Educationtype[],
    projects  : project[],
    skills : skill[],
    is_following : boolean,

}