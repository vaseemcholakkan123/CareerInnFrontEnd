
import './../UserProfile/Includes/includes.css'

import React from 'react'
import { Experiencetype } from '../UserProfile/Includes/Experience/Helper'

function DiffExpCard({experience} : {experience: Experiencetype}) {
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
              <p>{experience.position}</p>
          </div>

          <p className='f-small'>{experience.still_working ? 'On duty' : experience.year_from + ' to ' + experience.year_to}</p>
          <p className='weight-600'>{experience.company.name}</p>
        </div>

    </div>
  )
}

export default DiffExpCard