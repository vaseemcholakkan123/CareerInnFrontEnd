import { useNavigate } from 'react-router-dom'
import { validation } from '../Profile/UserProfile/Includes/Projects/Helper'
import { answer_question, application_form, application_validity, apply_for_job, job } from './Helper'
import './job.css'

import { Dispatch, SetStateAction, useRef, useState } from 'react'

function JobExpanded({ job, SetActiveLayout }: { job: job, SetActiveLayout: Dispatch<SetStateAction<string>> }) {

    const modalCloser = useRef<HTMLButtonElement>(null)
    const modalOpener = useRef<HTMLButtonElement>(null)
    const modalCompanyCLoser = useRef<HTMLButtonElement>(null)
    const [application_form, setApplicationForm] = useState<application_form>({
        resume: null,
        qs: [...job.questions.map(qs => {
            let qsn: answer_question = {
                id: qs.id ? qs.id : 0,
                user_is_selected: false,
                user_answer: true,
                name: qs.name
            }
            return qsn
        })],
        about: '',
    })
    const router = useNavigate()

    const [modalbody, SetmodalBody] = useState('application')

    return (
        <div className="px-2 pb-3 p-relative">

            <div className="mb-2 d-flex justify-content-between align-items-center">

                <h2>{job.name}</h2>
                <div className="d-flex a-center p-1 ps-2 pe-3 ms-auto gap-2 c-pointer" onClick={() => { SetActiveLayout('ls') }}>
                    <h6>go back</h6>
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} data-name="Layer 1" viewBox="0 0 32 32"><path d="M10.19,16.26a1,1,0,0,0-1,0L1.5,20.7a1,1,0,0,0,0,1.73l7.69,4.44a1,1,0,0,0,1.5-.87V23H22A9,9,0,0,0,22,5H9A1,1,0,0,0,9,7H22a7,7,0,0,1,0,14H10.69V17.13A1,1,0,0,0,10.19,16.26Zm-1.5,8L4,21.56l4.69-2.71Z" /></svg>

                </div>

            </div>

            <div className='p-2'>
                <h4 className="weight-600 c-pointer">Details</h4>
                <div className='mt-1 ms-1'>

                    <div className="d-flex detail-svg">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_2_1428)">
                                <g clipPath="url(#clip1_2_1428)">
                                    <path d="M17.7998 6.97998V5.97998C17.7998 5.18433 17.4837 4.42127 16.9211 3.85866C16.3585 3.29605 15.5955 2.97998 14.7998 2.97998H10.7998C10.0042 2.97998 9.24109 3.29605 8.67848 3.85866C8.11588 4.42127 7.7998 5.18433 7.7998 5.97998V6.97998H2.7998V10.98C2.7998 11.7756 3.11588 12.5387 3.67848 13.1013C4.24109 13.6639 5.00416 13.98 5.7998 13.98H19.7998C20.5955 13.98 21.3585 13.6639 21.9211 13.1013C22.4837 12.5387 22.7998 11.7756 22.7998 10.98V6.97998H17.7998ZM9.7998 5.97998C9.7998 5.71476 9.90516 5.46041 10.0927 5.27287C10.2802 5.08534 10.5346 4.97998 10.7998 4.97998H14.7998C15.065 4.97998 15.3194 5.08534 15.5069 5.27287C15.6944 5.46041 15.7998 5.71476 15.7998 5.97998V6.97998H9.7998V5.97998ZM19.7998 14.98C20.3693 14.9768 20.9315 14.852 21.4489 14.614C21.9662 14.376 22.4268 14.0303 22.7998 13.6V17.98C22.7998 18.7756 22.4837 19.5387 21.9211 20.1013C21.3585 20.6639 20.5955 20.98 19.7998 20.98H5.7998C5.00416 20.98 4.24109 20.6639 3.67848 20.1013C3.11588 19.5387 2.7998 18.7756 2.7998 17.98V13.6C3.1728 14.0303 3.63339 14.376 4.15075 14.614C4.66812 14.852 5.23034 14.9768 5.7998 14.98H19.7998Z" fill="black" fillOpacity="0.6" />
                                </g>
                            </g>
                            <defs>
                                <rect width="24" height="24" fill="white" transform="translate(0.799805 0.97998)" />
                                <rect width="24" height="24" fill="white" transform="translate(0.799805 0.97998)" />
                            </defs>
                        </svg>
                        <p className="ms-2">{job.job_type} | {job.job_time} | Expected salary : {job.expected_salary} per annum</p>
                    </div>



                    <div className="d-flex detail-svg mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width="25" height="25" focusable="false">
                            <path d="M22 3v2H11V3zM11 13h11v-2H11zm0 8h11v-2H11zM4.85 4L3.34 2.51 2 3.85 5.15 7l4.6-7H7.48zm0 8l-1.51-1.49L2 11.85 5.15 15l4.6-7H7.48zm0 8l-1.51-1.49L2 19.85 5.15 23l4.6-7H7.48z"></path>
                        </svg>
                        <p className="ms-2">Skills required :
                            {
                                job.skills_required.map((skill, i) => {
                                    if (i == job.skills_required.length - 1) {
                                        return (skill.title)
                                    }
                                    else {
                                        return (skill.title + ', ')
                                    }
                                })
                            }
                        </p>
                    </div>

                    <div className='mb-2'>
                        <h4>About the job</h4>
                        <p className='p-1' style={{ whiteSpace: 'pre-line' }}>
                            {job.description}
                        </p>
                    </div>

                    <div className='mb-2'>
                        <h4>Responsibilities:</h4>
                        <ul className='ms-2'>
                            {
                                job.responsibilities.map(rs => {
                                    return (
                                        <li key={rs.name}>{rs.name}</li>
                                    )
                                })
                            }

                        </ul>
                    </div>

                    <div className='mb-2'>
                        <h4>Requirements:</h4>
                        <ul className='ms-2'>
                            {
                                job.requirements.map(rs => {
                                    return (
                                        <li key={rs.name}>{rs.name}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                </div>

                <div className=''>
                    <h4 className="weight-600 c-pointer" data-bs-toggle="collapse" data-bs-target="#applicantCollapse">About Company :</h4>
                    <div className="collapse" id="applicantCollapse">
                        <div className="ms-1 pb-3 c-pointer" data-bs-toggle="modal" data-bs-target="#AboutCompany">

                            <div className="banner-logo">
                                <img src={job.company.banner ? job.company.banner : ''} className='banner-2' alt="" />
                                <img src={job.company.logo} width={70} height={70} alt="" className="logo" style={{ 'left': job.company.banner ? '' : '-2px' }} />
                            </div>

                            <div className="normal-line-height" style={{ 'marginTop': job.company.banner ? '' : '65px' }}>
                                <h3 className='title-company'>{job.company.name}</h3>
                                <p className="weight-600" >CEO : {job.company.ceo.username}</p>

                            </div>

                        </div>
                    </div>
                </div>


                {/* About company modal */}


                <div className="modal fade app-font" id="AboutCompany" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog Register-modal">
                        <div className="modal-content">
                            <div className="modal-header b-none">
                                <h5 className="modal-title weight-600 pb-0" id="exampleModalLabel">About Company</h5>
                                <button ref={modalCompanyCLoser} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body pt-0 m-heigh">
                                <div className="ms-1 pb-3">

                                    <div className="banner-logo">
                                        <img src={job.company.banner ? job.company.banner : ''} className='banner-2' alt="" />
                                        <img src={job.company.logo} width={70} height={70} alt="" className="logo" style={{ 'left': job.company.banner ? '' : '-2px' }} />
                                    </div>

                                    <div className="normal-line-height" style={{ 'marginTop': job.company.banner ? '' : '65px' }}>
                                        <h3 className='title-company'>{job.company.name}</h3>
                                        <p className="weight-600 c-pointer"
                                         onClick={() => {
                                            modalCompanyCLoser.current!.click()
                                            router(`/show-profile/${job.company.ceo.username}`, { state: { 'user_id': job.company.ceo.id } })
                                        }}
                                        >CEO : {job.company.ceo.username}</p>
                                        <p className="mt-2 mb-3">{job.company.excerpt}</p>
                                        <div className="d-flex detail-svg">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="25" height="25" focusable="false">
                                                <path d="M4 2v20h16V2zm14 18h-4v-2h-4v2H6V4h12zm-7-8H8v-2h3zm0 4H8v-2h3zm5-4h-3v-2h3zm-5-4H8V6h3zm5 0h-3V6h3zm0 8h-3v-2h3z"></path>
                                            </svg>
                                            <p className="ms-2">{job.company.employees_start} - {job.company.employees_end} employees | {job.company.department.title}</p>
                                        </div>
                                        <p className='mt-2 mb-2'>location : {job.company.location}</p>

                                        <p className='pb-4' style={{ whiteSpace: 'pre-line' }}>{job.company.about}</p>

                                    </div>

                                </div>


                                <div className="modal-footer b-none pb-0 mt-5">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* modal end */}



                <button ref={modalOpener} className="d-none" data-bs-toggle="modal" data-bs-target="#applyJob"></button>

                <div className="modal fade app-font" id="applyJob" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog Register-modal">
                        <div className="modal-content">
                            <div className="modal-header b-none">
                                <h5 className="modal-title weight-600" id="exampleModalLabel">Apply for job</h5>
                                <button ref={modalCloser} onClick={() => SetmodalBody('application')} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>


                            {



                                modalbody == 'application' ?

                                    <div className="modal-body pt-0 m-heigh p-relative">
                                        <p className='weight-600'>Complete questionnaire</p>
                                        <p className="f-small app-gray">* answer your preference and attach resume</p>

                                        {
                                            job.questions.map((qs, i) => {
                                                return (
                                                    <div key={i} className="mt-1">
                                                        <p>{i + 1}. {qs.name}</p>

                                                        <div className="d-flex gap-2 ms-3 mt-1">
                                                            <div className="d-flex gap-1">
                                                                <input type="checkbox" id={`yes${i}`} checked={application_form.qs[i].user_answer && application_form.qs[i].user_is_selected} onChange={() => {
                                                                    setApplicationForm({
                                                                        ...application_form,
                                                                        qs: application_form.qs.map(ques => {
                                                                            if (ques.id == qs.id) {
                                                                                ques.user_answer = true
                                                                                ques.user_is_selected = true

                                                                            }

                                                                            return ques
                                                                        })
                                                                    })
                                                                }} />
                                                                <label htmlFor={`yes${i}`}>
                                                                    <p>Yes</p>
                                                                </label>
                                                            </div>

                                                            <div className="d-flex gap-1">
                                                                <input type="checkbox" id={`no${i}`} checked={!application_form.qs[i].user_answer && application_form.qs[i].user_is_selected} onChange={() => {
                                                                    setApplicationForm({
                                                                        ...application_form,
                                                                        qs: application_form.qs.map(ques => {
                                                                            if (ques.id == qs.id) {
                                                                                ques.user_answer = false
                                                                                ques.user_is_selected = true
                                                                            }

                                                                            return ques
                                                                        })
                                                                    })
                                                                }} />
                                                                <label htmlFor={`no${i}`}>
                                                                    <p>No</p>
                                                                </label>
                                                            </div>
                                                        </div>

                                                    </div>
                                                )
                                            })
                                        }

                                        <p className='weight-600 mt-2'>About yourself</p>
                                        <p className="f-small app-gray mb-1">* Tell us the experience and achievements of yours...</p>
                                        <textarea onChange={e => setApplicationForm({ ...application_form, about: e.target.value })} rows={5} className='app-input r-7 bg-blg'></textarea>


                                        <label htmlFor="resume" className='d-flex a-center m-1 gap-2 c-pointer resume-label' >
                                            <svg width="21" height="12" viewBox="0 0 21 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.72809 11.5645C4.13115 11.5343 2.78772 10.9533 1.69779 9.82139C0.607854 8.6895 0.0779681 7.32508 0.108128 5.72814C0.138287 4.13121 0.719314 2.78777 1.85121 1.69784C2.9831 0.607908 4.34752 0.0780214 5.94445 0.108181L16.88 0.314708C18.0256 0.336345 18.9987 0.76278 19.7991 1.59401C20.5995 2.42525 20.9889 3.41368 20.9672 4.55931C20.9456 5.70494 20.5192 6.67796 19.6879 7.47838C18.8567 8.2788 17.8683 8.66819 16.7226 8.64656L6.82858 8.4597C6.09954 8.44593 5.48809 8.1826 4.99421 7.66971C4.50034 7.15682 4.26028 6.53586 4.27405 5.80682C4.28782 5.07779 4.55115 4.46633 5.06404 3.97245C5.57693 3.47858 6.19789 3.23852 6.92693 3.25229L16.821 3.43915L16.7915 5.00137L6.89742 4.81451C6.60234 4.80894 6.3531 4.90408 6.14971 5.09993C5.94633 5.29577 5.84185 5.54124 5.83627 5.83633C5.8307 6.13141 5.92584 6.38065 6.12168 6.58404C6.31753 6.78742 6.563 6.8919 6.85808 6.89748L16.7522 7.08433C17.4812 7.0981 18.1022 6.85805 18.615 6.36417C19.1279 5.8703 19.3913 5.25884 19.405 4.5298C19.4188 3.80077 19.1787 3.17981 18.6849 2.66692C18.191 2.15403 17.5795 1.8907 16.8505 1.87693L5.91495 1.6704C4.76932 1.64877 3.78089 2.03816 2.94965 2.83858C2.11842 3.639 1.69199 4.61202 1.67035 5.75765C1.64871 6.90328 2.0381 7.89171 2.83852 8.72294C3.63894 9.55418 4.61197 9.98061 5.7576 10.0022L16.6931 10.2088L16.6636 11.771L5.72809 11.5645Z" fill="black" />
                                            </svg>
                                            <p>{application_form.resume ? `Attached : ${application_form.resume.name}` : 'Attach Resume'}</p>
                                        </label>

                                        <input className='d-none' id='resume' type="file" accept="application/pdf" onChange={e => {
                                            e.target.files ?
                                                setApplicationForm({ ...application_form, resume: e.target.files[0] })
                                                :
                                                null
                                        }} />

                                    </div>


                                    :
                                    modalbody == 'rejected' ?

                                        <div className="modal-body pt-0 m-heigh p-relative">
                                            <p className='weight-600'>We're Sorry...</p>
                                            <p className="f-small app-gray w-75">We have submitted all the answers and it seems like this job/company is not fit for you,Please try another job options and good luck for next time.</p>



                                        </div>


                                        :

                                        <div className="modal-body pt-0 m-heigh p-relative">
                                            <p className='weight-600'>Successfully Applied</p>
                                            <p className="f-small app-gray">We have submitted all the data and you're passed to the company's handle,Please stay updated with the notifications to track your progress on the job!</p>



                                        </div>

                            }

                            <div className="modal-footer b-none pb-1 mt-5">
                                <button type="button" className="btn-1" onClick={() => {
                                    if (modalbody == 'application') {
                                        apply_for_job(application_form, job.id, job.questions)
                                            .then(data => {
                                                console.log(data);

                                                if (data.success) {
                                                    SetmodalBody('x')
                                                }
                                            })
                                            .catch(err => {
                                                console.log(err);

                                                if (err.response.data.applied) {
                                                    validation('You have already applied for this job')
                                                    modalCloser.current!.click()
                                                }
                                                if (err.response.data.rejected) {
                                                    SetmodalBody('rejected')
                                                }
                                            })
                                    } else modalCloser.current!.click()
                                }}>{modalbody == 'application' ? 'Apply' : 'Close'}</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            {
                job.user_is_applied ?
                    null
                    :
                    <p className="btn-1 apply-btn"
                        onClick={() => {
                            application_validity(job.id)
                                .then((data) => {
                                    if (data.valid) {
                                        modalOpener.current!.click()
                                    }
                                    if (data.not_valid) {
                                        validation(data.not_valid)
                                    }
                                })
                        }}
                    >Apply Now</p>

            }

        </div>
    )
}

export default JobExpanded