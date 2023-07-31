import { jobCompany } from '../ListJob/Helper'
import { add_job } from './Helper'
import './job.css'

import { Dispatch, SetStateAction, useState } from 'react'


function FormPageOne({ SetActiveFormPage, SetJobForm, job_form }: { job_form: add_job, SetActiveFormPage: Dispatch<SetStateAction<string>>, SetJobForm: Dispatch<SetStateAction<add_job>> }) {
    return (
        <div className='p-1 mt-2 d-flex f-coloumn'>
            <div className="form-one">
                <div className='mb-2'>
                    <p className="form-label">Job title</p>
                    <input type="text" value={job_form.name} onChange={e => { SetJobForm({ ...job_form, name: e.target.value }) }} className='input-job-form' placeholder='Ex - Mern Stack Developer' />
                </div>

                <div className="row">
                    <div className="mb-2 col-md-5 col-12">
                        <p className="form-label">Workplace type</p>
                        <div className="d-flex gap-3 ms-1">
                            <div className='d-flex gap-2'>
                                <input type="checkbox" id='WFH' name='work-type' checked={job_form.job_type == 'WFH'} onChange={() => {
                                    SetJobForm({ ...job_form, job_type: 'On-Site' })
                                }} />
                                <label htmlFor="WFH">
                                    <p className="weight-500">On-Site</p>
                                </label>
                            </div>

                            <div className='d-flex gap-2'>
                                <input type="checkbox" id='Office' name='work-type' checked={job_form.job_type == 'Hybrid'} onChange={() => {
                                    SetJobForm({ ...job_form, job_type: 'Hybrid' })
                                }} />
                                <label htmlFor="Office">    
                                    <p className="weight-500">Hybrid</p>
                                </label>
                            </div>

                            <div className='d-flex gap-2'>
                                <input type="checkbox" id='Hybrid' name='work-type' checked={job_form.job_type == 'Remote'} onChange={() => {
                                    SetJobForm({ ...job_form, job_type: 'Remote' })
                                }} />
                                <label htmlFor="Hybrid">
                                    <p className="weight-500">Remote</p>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-7">
                        <p className="form-label">Job type</p>
                        <select value={job_form.job_time} id="" className='p-1 r-7' onChange={e=>SetJobForm({...job_form,job_time:e.target.value})}>
                            <option value="">select</option>
                            <option value="Full-time" className='p-1'>Full-time</option>
                            <option value="Part-time" className='p-1'>Part-time</option>
                            <option value="Contract" className='p-1'>Contract</option>
                            <option value="Internship" className='p-1'>Internship</option>
                        </select>
                    </div>
                </div>

                <div className="mb-2">
                    <p className="form-label">Expected salary</p>
                    <input type="number" value={job_form.expected_salary} className='input-job-form p-inp' placeholder='600000' min={1} onChange={e=>SetJobForm({...job_form,expected_salary:Number(e.target.value)})} />
                </div>




                

                <div className='mb-2'>
                    <p className="form-label">Description</p>
                    <textarea rows={7} value={job_form.description} onChange={e => { SetJobForm({ ...job_form, description: e.target.value }) }} className='input-job-form' placeholder='Tell us what the job is . . .' />
                </div>

            </div>
            <div className='form1-btn'>
                <p className="btn-1 ms-auto w-25 text-center " onClick={() => { SetActiveFormPage('twe') }}>continue</p>
            </div>
        </div>
    )
}

export default FormPageOne