import { Educationtype } from '../../UserProfile/Includes/Education/Helper'
import './../../UserProfile/Includes/Education/edu.css'


function DiffEducation(education : Educationtype) {
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
        </div>
        <p className='f-small'>passed out in {education.graduated_year}</p>


        <p className='weight-600'>{education.institute}</p>
        </div>

    </div>
  )
}

export default DiffEducation