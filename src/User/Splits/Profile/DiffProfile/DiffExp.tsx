import './../UserProfile/Includes/includes.css'


import React from 'react'
import DiffExpCard from './DiffExpCard'
import { Experiencetype } from '../UserProfile/Includes/Experience/Helper'

function DiffExp({Experiences} : {Experiences : Experiencetype[]}) {
  return (
    <div>
        <div className="d-flex w-100 p-2 a-center">
            <h5>Experience</h5>
        </div>

        {
            Experiences.map(exp=>{
                return(
                    <DiffExpCard key={exp.id} experience={exp} />

                )
            })
        }
        {
            !Experiences[0]?
                <div className='ms-3'>
                    <p>No experiences Added</p>
                </div>
            :
            null
        }



    </div>
  )
}

export default DiffExp