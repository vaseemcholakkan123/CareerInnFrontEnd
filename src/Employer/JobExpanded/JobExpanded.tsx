import { useNavigate } from 'react-router-dom'
import default_user_image, { BASE_IMAGE_URL } from '../../AppMain/AppConfig/AppConstants'
import CarreerInnAxios from '../../AppMain/AppConfig/AxiosConfig'
import { success } from '../../User/Splits/Profile/UserProfile/Includes/Jobs/Helper'
import { updateTimeSince } from '../../User/UserConfig/Helper'
import { jobCompany } from '../ListJob/Helper'
import './../ListJob/list.css'
import { Applicant, inform_interview, is_interviewed, reject_applicant, select_candidate, shortlist_applicant, take_interview } from './Helper'
import './jobexp.css'

import { useEffect, useState, Dispatch, SetStateAction, useRef } from 'react'

function JobExpanded({ job, SetActiveLayout }: { job: jobCompany, SetActiveLayout: Dispatch<SetStateAction<string>> }) {

    const [Applicants, setApplicants] = useState<Applicant[]>([])
    const [informApplicant, setInformApplicant] = useState(0)
    const interviewDate = useRef<HTMLInputElement>(null)
    const interviewtime = useRef<HTMLInputElement>(null)
    const modalCloser = useRef<HTMLButtonElement>(null)
    const interviewTakeModalCloser = useRef<HTMLButtonElement>(null)
    const [interviewTakeLoading, setInterviewTakeLoading] = useState(false)
    const [ShowAboutApplicant, SetApplicantToShow] = useState<Applicant | null>(null) //
    const router = useNavigate()
    const [interviewApplicant, SetInterviewApplicant] = useState(0)

    useEffect(() => {
        CarreerInnAxios.post('employer/get-job-applicants/', { 'job_id': job.id })
            .then(res => {
                setApplicants(res.data)
            })
            .catch(err => {
                console.log(err);

            })
    }, [])

    return (
        <div className="px-2 pb-3">

            <div className="mb-2 d-flex justify-content-between align-items-center">

                <h2>{job.name}</h2>
                <div className="d-flex a-center p-1 ps-2 pe-3 ms-auto gap-2 c-pointer" onClick={() => { SetActiveLayout('listjobs') }}>
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
                        <p className="ms-2">{job.job_type} | {job.job_time} | {job.expected_salary} per annum</p>
                    </div>

                    <div className="d-flex detail-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="25" height="25" focusable="false">
                            <path d="M4 2v20h16V2zm14 18h-4v-2h-4v2H6V4h12zm-7-8H8v-2h3zm0 4H8v-2h3zm5-4h-3v-2h3zm-5-4H8V6h3zm5 0h-3V6h3zm0 8h-3v-2h3z"></path>
                        </svg>
                        <p className="ms-2">{job.company.employees_start} - {job.company.employees_end} employees | {job.company.department.title}</p>
                    </div>

                    <div className="d-flex detail-svg mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width="25" height="25" focusable="false">
                            <path d="M22 3v2H11V3zM11 13h11v-2H11zm0 8h11v-2H11zM4.85 4L3.34 2.51 2 3.85 5.15 7l4.6-7H7.48zm0 8l-1.51-1.49L2 11.85 5.15 15l4.6-7H7.48zm0 8l-1.51-1.49L2 19.85 5.15 23l4.6-7H7.48z"></path>
                        </svg>
                        <p className="ms-2">Skills :
                            {
                                job.skills_required.map((skill, i) => {
                                    if (i == job.skills_required.length - 1) {
                                        return (skill.title)
                                    }
                                    else {
                                        return (skill.title + ',')
                                    }
                                })
                            }
                        </p>
                    </div>

                    <div className='mb-2'>
                        <h4>Job description</h4>
                        <p className='p-1 job-desc' style={{ whiteSpace: 'pre-line' }}>
                            {job.description}
                        </p>
                    </div>

                    <div className='mb-2'>
                        <h4>Job Responsibilities:</h4>
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
                        <h4>Job Requirements:</h4>
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

                    <div className='mb-2'>
                        <h4>Screening Questions:</h4>
                        <ul className='ms-2'>
                            {
                                job.questions.map(qs => {
                                    return (
                                        <li key={qs.name} >{qs.name}  <span className='text-success'>Answer : {qs.answer_is_yes ? 'Yes' : 'No'}</span></li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                </div>
            </div>

            <div className='p-2'>
                <h4 className="weight-600 c-pointer" data-bs-toggle="collapse" data-bs-target="#applicantCollapse">View Applicants</h4>
                <div className="collapse" id="applicantCollapse">
                    <div className="ms-3 row gap-3 gy-2">

                        {
                            Applicants.map(applicant => {
                                return (
                                    !applicant.is_shortlisted ?

                                        <div key={applicant.user.id} className="main-card col-sm-6 col-12 col-md-3 app-shadow">

                                            <div className="user-card">
                                                <img width={75} height={75} className='rounded-circle' src={applicant.user.profile ? BASE_IMAGE_URL + applicant.user.profile : default_user_image} alt="" />
                                                <div className="ms-1 normal-line-height">
                                                    <h5 className='weight-500'>{applicant.user.username}</h5>
                                                    <p className='f-small'>{applicant.user.info ? applicant.user.info : 'No about'}</p>
                                                    <p className='f-small'>Applied : {updateTimeSince(String(applicant.applied_on))}</p>
                                                </div>
                                                <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="align-self-start m-2 mb-0 bi bi-three-dots" viewBox="0 0 16 16">
                                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                </svg>

                                                <ul className="dropdown-menu dropdown-menu-end me-1 bg-light text-center">
                                                    <li
                                                        onChange={() => {
                                                            router(`/show-profile/${applicant.user.username}`, { state: { 'user_id': applicant.user.id } })

                                                        }}
                                                    >View profile</li>
                                                    <li data-bs-toggle="modal" data-bs-target="#ShowAbout" onClick={() => SetApplicantToShow(applicant)}><a className="dropdown-item">View about</a></li>

                                                    <li><a href={BASE_IMAGE_URL + applicant.resume} target="_blank" title={`Resume ${applicant.user.username}`}>View Resume</a></li>
                                                </ul>
                                            </div>

                                            <div className="w-100 text-center mb-2">
                                                <p className="btn-1 p-1 ps-2 pe-2 m-1 ms-2 me-2 w-auto h-scale" onClick={() => {
                                                    shortlist_applicant(applicant.id, job.id)
                                                        .then(() => {
                                                            success('Applicant Shortlisted')
                                                            setApplicants(Applicants.map(thisapplicant => {
                                                                if (thisapplicant.id == applicant.id) applicant.is_shortlisted = true
                                                                return thisapplicant
                                                            }))
                                                        })
                                                        .catch(err => {
                                                            console.log(err);

                                                        })
                                                }}>Shortlist</p>
                                                <p className="btn-2 p-1 ps-2 pe-2 m-1 ms-2 me-2 c-pointer h-scale" onClick={() => {
                                                    reject_applicant(applicant.id, job.id)
                                                        .then(() => {
                                                            success('Applicant Rejected')
                                                            setApplicants(Applicants.filter(lc => lc.id != applicant.id))
                                                        })
                                                        .catch(err => {
                                                            console.log(err);

                                                        })
                                                }}>Remove</p>
                                            </div>

                                        </div>

                                        :
                                        null
                                )
                            })
                        }
                        {
                            !Applicants.filter(i => !i.is_shortlisted)[0] ?
                                <p>No applicants to shortlist</p>
                                :
                                null
                        }

                    </div>
                </div>
            </div>

            <div className='p-2'>
                <h4 className="weight-600 c-pointer" data-bs-toggle="collapse" data-bs-target="#shortlistCollapse">View Shortlist</h4>
                <div className="collapse" id="shortlistCollapse">
                    <div className="ms-3 row gap-3 gy-2">
                        {

                            Applicants.map(applicant => {
                                return (
                                    applicant.is_shortlisted && !applicant.is_selected ?

                                        <div key={applicant.user.id} className="main-card col-sm-6 col-12 col-md-3 app-shadow">

                                            <div className="user-card">
                                                <img width={75} height={75} className='rounded-circle' src={applicant.user.profile ? BASE_IMAGE_URL + applicant.user.profile : default_user_image} alt="" />
                                                <div className="ms-1 normal-line-height">
                                                    <h5 className='weight-500'>{applicant.user.username}</h5>
                                                    <p className='f-small'>{applicant.user.info ? applicant.user.info : 'No about'}</p>
                                                    <p className='f-small'>Applied : {updateTimeSince(String(applicant.applied_on))}</p>
                                                </div>
                                                <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="align-self-start m-2 mb-0 bi bi-three-dots" viewBox="0 0 16 16">
                                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                </svg>

                                                <ul className="dropdown-menu dropdown-menu-end me-1 bg-light text-center">
                                                    <li className='c-pointer'
                                                        onClick={() => {
                                                            router(`/show-profile/${applicant.user.username}`, { state: { 'user_id': applicant.user.id } })

                                                        }}
                                                    >View profile</li>
                                                    {
                                                        !applicant.is_interviewed ?
                                                            <li><a className="dropdown-item"
                                                                onClick={() => {
                                                                    is_interviewed(applicant.user.id, job.id)
                                                                        .then(() => {
                                                                            success('Applicant Updated')
                                                                            setApplicants(Applicants.map(thisapplicant => {
                                                                                if (thisapplicant.id == applicant.id) applicant.is_interviewed = true
                                                                                return thisapplicant
                                                                            }))
                                                                        })
                                                                }}
                                                            >Is interviewed</a></li>
                                                            :
                                                            null
                                                    }

                                                    <li><a className='dropdown-item' href={BASE_IMAGE_URL + applicant.resume} target="_blank" title={`Resume ${applicant.user.username}`}>View Resume</a></li>
                                                </ul>
                                            </div>

                                            <div className="w-100 text-center mb-2 p-2 pt-0 pb-1">
                                                {
                                                    !applicant.is_informed ?
                                                        <p className="btn-1 p-1 ps-2 pe-2 m-1 ms-2 me-2 w-auto h-scale" data-bs-toggle="modal" data-bs-target="#InformInterview" onClick={() => setInformApplicant(applicant.id)} >Inform Interview</p>

                                                        :
                                                        applicant.is_interviewed ?
                                                            <p className='btn-1 p-1 ps-2 pe-2 m-1 ms-2 me-2 w-auto h-scale'
                                                                onClick={() => {
                                                                    select_candidate(applicant.user.id, job.id)
                                                                        .then(() => {
                                                                            success('Applicant Selected')
                                                                            setApplicants(Applicants.map(thisapplicant => {
                                                                                if (thisapplicant.id == applicant.id) applicant.is_selected = true
                                                                                return thisapplicant
                                                                            }))
                                                                        })
                                                                }}
                                                            >Select candidate</p>

                                                            :
                                                            <p className='btn-1 p-1 ps-2 pe-2 m-1 ms-2 me-2 w-auto h-scale' data-bs-toggle="modal" data-bs-target="#TakeInterview" onClick={() => { SetInterviewApplicant(applicant.user.id) }} >Take interview</p>

                                                }
                                                <p className="btn-2 p-1 ps-2 pe-2 m-1 ms-2 me-2 c-pointer h-scale" onClick={() => {
                                                    reject_applicant(applicant.id, job.id)
                                                        .then(() => {
                                                            success('Applicant Rejected')
                                                            setApplicants(Applicants.map(thisapplicant => {
                                                                if (thisapplicant.id == applicant.id) applicant.is_selected = true
                                                                return thisapplicant
                                                            }))
                                                        })
                                                }}>Remove</p>
                                            </div>



                                        </div>

                                        :
                                        null
                                )
                            })

                        }
                        {
                            !Applicants.filter(i => i.is_shortlisted && !i.is_selected)[0] ?
                                <p>No applicants to interview</p>
                                :
                                null
                        }
                    </div>
                </div>
            </div>

            {/* inform interview modal */}

            <div className="modal fade app-font" id="InformInterview" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog Register-modal">
                    <div className="modal-content">
                        <div className="modal-header b-none">
                            <h5 className="modal-title weight-600" id="exampleModalLabel">Inform interview</h5>
                            <button ref={modalCloser} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body pt-0 m-heigh">
                            <p className='mt-4 weight-600'>Send interview notification to the applicant</p>
                            <div className="ms-md-3">
                                <p>Select Date</p>
                                <input ref={interviewDate} type="date" className='i-interview mb-3' /> <br />
                                <p>Enter time</p>
                                <input ref={interviewtime} type="time" className='i-interview' placeholder='8:00 am' />
                            </div>


                            <div className="modal-footer b-none pb-0 mt-5">
                                <button type="button" className="btn-1" onClick={() => {
                                    inform_interview(interviewDate.current!.value, interviewtime.current!.value, informApplicant, job.id)
                                        .then(() => {
                                            success('Applicant informed')
                                            setApplicants(Applicants.map(a => {
                                                if (a.id == informApplicant && informApplicant != 0) {
                                                    a.is_informed = true
                                                }
                                                return a
                                            }))
                                            modalCloser.current!.click()
                                        })
                                        .catch(e => {
                                            console.log(e.response);

                                        })
                                }}>Send notification</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal end */}

            {/* interview confirm modal */}

            <div className="modal fade app-font" id="TakeInterview" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog Register-modal">
                    <div className="modal-content">
                        <div className="modal-header b-none">
                            <h5 className="modal-title weight-600" id="exampleModalLabel">Take interview</h5>
                            <button ref={interviewTakeModalCloser} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body pt-0 m-heigh">
                            <p className='mt-4 weight-600'>Send interview links to the applicant</p>
                            <div className="ms-md-3">
                                <p>You'll be redirected our interview page and the applicant will get informed with an email and notification.Please wait till the applicant joins</p>
                            </div>


                            <div className="modal-footer b-none pb-0 mt-5">
                                <button disabled={interviewTakeLoading} className="btn-1" onClick={() => {
                                    setInterviewTakeLoading(true)
                                    take_interview(interviewApplicant, job.id)
                                        .then(() => {
                                            interviewTakeModalCloser.current!.click()
                                            success('Notification Send')
                                            router('/interview', { state: { targetid: interviewApplicant } })
                                        })
                                }}>{interviewTakeLoading ? 'Please wait...' : 'Continue'}
                                    <div className="lds-spinner me-5 mt-1" id={interviewTakeLoading ? '' : 'hidden'} ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* interview confirm modal end */}

            {/* about applicant modal */}
            <div className="modal fade app-font" id="ShowAbout" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog Register-modal">
                    <div className="modal-content">
                        <div className="modal-header b-none">
                            <h5 className="modal-title weight-600" id="exampleModalLabel">About {ShowAboutApplicant ? ShowAboutApplicant.user.username : ''}</h5>
                            <button ref={interviewTakeModalCloser} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body pt-0 m-heigh">
                            <p className='weight-600'>What the applicant have shared about themself.</p>
                            <div className="ms-md-3">
                                <p>{ShowAboutApplicant ? ShowAboutApplicant.about : ''}</p>
                            </div>

                            <div className="modal-footer b-none pb-0 mt-1">

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* about end */}



            <div className='p-2'>
                <h4 className="weight-600 c-pointer" data-bs-toggle="collapse" data-bs-target="#SelectedCollapse">Selected Candidates</h4>
                <div className="collapse" id="SelectedCollapse">
                    <div className="ms-3 row gap-3 gy-2">
                        {
                            Applicants.map(applicant => {
                                return (
                                    applicant.is_selected ?
                                        <div key={applicant.id} className="main-card col-sm-6 col-12 col-md-3 app-shadow">

                                            <div className="user-card">
                                                <img width={75} height={75} className='rounded-circle' src={applicant.user.profile ? BASE_IMAGE_URL + applicant.user.profile : default_user_image} alt="" />
                                                <div className="ms-1 normal-line-height">
                                                    <h5 className='weight-500'>{applicant.user.username}</h5>
                                                    <p className='f-small'>{applicant.user.info ? applicant.user.info : 'no info'}</p>
                                                    <p>Applied : {updateTimeSince(String(applicant.applied_on))}</p>

                                                </div>
                                            </div>

                                        </div>
                                        :
                                        null
                                )
                            })
                        }
                        {
                            !Applicants.filter(i => i.is_selected)[0] ?
                                <p>No candidates selected</p>
                                :
                                null
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}

export default JobExpanded