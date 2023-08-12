import { Educationtype, axios_delete_education } from './Helper'
import './edu.css'


function EduCard( {education, delete_edu_from_list , update_edu_from_list} : {education :Educationtype , delete_edu_from_list : (x:number) => void , update_edu_from_list : (x:number) => void } ) {
  return (
    <div className="d-flex w-100 p-1 pb-2 ps-2 pe-2 a-center">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_2_3294)">
        <path d="M0 0H48V48H0V0Z" fill="#E7E2DC"/>
        <path d="M18 6H42V48H18V6Z" fill="#9DB3C8"/>
        <path d="M6 30H18V48H6V30Z" fill="#788FA5"/>
        <path d="M18 30H30V48H18V30Z" fill="#56687A"/>
        </g>
        <defs>
        <rect width="48" height="48" fill="white"/>
        </defs>
        </svg>

        
        <div className="ms-2 normal-line-height w-100">
        <div className='w-100 d-flex'>
            <p>{education.subject}</p>

            <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto me-1 mt-2 bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>

            <ul className="dropdown-menu dropdown-menu-end app-font">
            <li onClick={()=>{
                update_edu_from_list(education.id)
            }} ><p className="dropdown-item c-pointer">Edit Education</p></li>
            <li><div className="dropdown-divider"></div></li>
            <li>
                <p className='dropdown-item text-danger c-pointer' onClick={()=>{
                    axios_delete_education(education.id)
                    .then(()=>{
                        delete_edu_from_list(education.id)
                    })
                    }}>Remove education</p>
            </li>
            </ul>
        </div>
        <p className='f-small'>passed out in {education.graduated_year}</p>


        <p className='weight-600'>{education.institute}</p>
        </div>

    </div>
  )
}

export default EduCard