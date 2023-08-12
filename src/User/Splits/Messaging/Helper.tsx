import { user } from "../Profile/UserProfile/Includes/Jobs/Helper"

export type chat_thread = {
    primary_user : user,
    secondary_user : user,
    id : number,
}

export type chat_message = {
    thread : number,
    user : user,
    message : string,
    message_time : Date,
    id:number,
}


function getMonth(month_num:string){
    let month = 'Jan '

    if (month_num === '02') month = 'Feb '
    if (month_num === '03') month = 'March '
    if (month_num === '04') month = 'Apr '
    if (month_num === '05') month = 'May '
    if (month_num === '06') month = 'Jun '
    if (month_num === '07') month = 'July '
    if (month_num === '08') month = 'Aug '
    if (month_num === '09') month = 'Sep '
    if (month_num === '10') month = 'Oct '
    if (month_num === '11') month = 'Nov '
    if (month_num === '12') month = 'Dec '
    
    return month
}

export const get_append_time = (datetime:string)=>{

    let date,time;
    
    let hours = Number(datetime.split('T')[1].split('.')[0].split(':')[0])
    let minute = datetime.split('T')[1].split('.')[0].split(':')[1]

    var ampm = hours >= 12 ? ' pm' : ' am';
    
    hours = hours % 12;
    
    hours = hours ? hours : 12;

    date = datetime.split('T')[0].split('-')[2]

    time = String(hours) + ':' + minute + ampm


    const dateobj = new Date();

    let currentMonth = String(dateobj.getMonth()+1).padStart(2,"0");
    

    let appenddatetime = getMonth(currentMonth) + date + ',' + time

    return appenddatetime
    
}