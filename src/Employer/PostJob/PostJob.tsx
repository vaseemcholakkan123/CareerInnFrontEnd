import { jobCompany } from '../ListJob/Helper'
import FormPageOne from './FormPageOne'
import FormPageTwo from './FormPageTwo'
import { add_job, question } from './Helper'
import './job.css'

import { Dispatch, SetStateAction, useState , useEffect } from 'react'

function PostJob({ SetActiveLayout ,EditJob }: { SetActiveLayout: Dispatch<SetStateAction<string>> , EditJob? : jobCompany }) {
  const [ActiveFormPage, SetActiveFormPage] = useState('one')
  let new_quest: question = {
    name: '',
    answer_is_yes: true
  }
  const [JobForm, SetJobForm] = useState<add_job>({ name: '', description: '', company: 0, job_type: '', questions: [new_quest], requirements: [''], responsibilities: [''], skills_required: [], job_time: '', expected_salary: 0 })
  
  useEffect(()=>{
    if(EditJob){
      SetJobForm(
        { name: EditJob.name,
          description: EditJob.description,
          company: EditJob.company.id, 
          job_type: EditJob.job_type, 
          questions: EditJob.questions, 
          requirements: EditJob.requirements.map(item=>item.name), 
          responsibilities: EditJob.responsibilities.map(item=>item.name), 
          skills_required: EditJob.skills_required.map(sk=>sk.id), 
          job_time: EditJob.job_time, 
          expected_salary: EditJob.expected_salary
        }
      )
      
    }

  },[])

  return (
    <div className='p-1 app-font'>
      <div className="main-post-job">
        <div className="header">
          {
            ActiveFormPage == 'one' ?
              <h1 className='weight-600 resize-heading'>Find a great hire,fast</h1>

              :
              null
          }
          <div className="d-flex a-center ms-auto c-pointer me-4" onClick={() => { SetActiveLayout('listjobs') }}>
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} data-name="Layer 1" viewBox="0 0 32 32"><path d="M10.19,16.26a1,1,0,0,0-1,0L1.5,20.7a1,1,0,0,0,0,1.73l7.69,4.44a1,1,0,0,0,1.5-.87V23H22A9,9,0,0,0,22,5H9A1,1,0,0,0,9,7H22a7,7,0,0,1,0,14H10.69V17.13A1,1,0,0,0,10.19,16.26Zm-1.5,8L4,21.56l4.69-2.71Z" /></svg>
            <p className='ms-2 d-sm-block d-none'>back to jobs</p>
          </div>
        </div>


        {
          ActiveFormPage == 'one' ?
            <FormPageOne SetJobForm={SetJobForm} job_form={JobForm} SetActiveFormPage={SetActiveFormPage} />
            :
            <FormPageTwo SetJobForm={SetJobForm} job_form={JobForm} SetActiveFormPage={SetActiveFormPage} EditJob={EditJob} />

        }

      </div>


    </div>
  )
}

export default PostJob