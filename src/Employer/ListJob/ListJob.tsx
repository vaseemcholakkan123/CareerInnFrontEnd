import { job } from '../../User/Splits/Jobs/Helper'
import { updateTimeSince } from '../../User/UserConfig/Helper'
import JobExpanded from '../JobExpanded/JobExpanded'
import PostJob from '../PostJob/PostJob'
import { close_job, get_company_jobs, jobCompany } from './Helper'
import './list.css'

import { useEffect, useRef, useState } from 'react'

function ListJob() {
    const [ActiveLayout, SetActveLayout] = useState('listjobs')
    const [CompanyJobs, setCompanyJobs] = useState<jobCompany[]>([])
    const [ExpandedJob, ExpandJob] = useState<jobCompany>()
    const modalCloser = useRef<HTMLButtonElement>(null)
    const [closeJob, SetCloseJob] = useState(0)
    const [resolved, Setresolved] = useState(false)
    const [EditJob, SeteditJob] = useState<jobCompany>()


    useEffect(() => {
        get_company_jobs()
            .then(data => {
                setCompanyJobs(data)
                Setresolved(true)
                console.log(data);


            })
            .catch(e => {
                console.log(e);

            })
    }, [])

    return (
        <div className='col-12 j-center col-md-10 job-table app-shadow app-font p-md-1 p-0'>

            {
                ActiveLayout == 'listjobs' ?

                    <div className="px-2">

                        <div className="mb-2 d-flex justify-content-between align-items-center">

                            <h2 className='resize-heading'>{CompanyJobs.length == 0 ? 'Find a great hire' : 'Posted jobs'}</h2>
                            {/* <div className="like-input w-25 p-1 ps-2 ms-auto">
                    <input type="text" className="app-input" placeholder='search by name' />
                </div> */}
                            <div className='ms-auto d-flex a-center mt-1 me-md-4 me-1 ps-2 pe-md-2 pe-0 btn-3' onClick={() => { SetActveLayout('postjob') }} >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="18" height="18" focusable="false">
                                    <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"></path>
                                </svg>
                                <p className="weight-600 ms-2" data-bs-toggle="modal" data-bs-target="#projectmodal" >Post New Job</p>
                            </div>


                        </div>
                        <div className="table-responsive">

                            {

                                CompanyJobs.length == 0 && resolved ?

                                    <div className="app-font">
                                        <h1 className='app-color'>Rated #1 in increasing quality of hire</h1>
                                        <p className='ms-2 mt-1 w-75'>Post your job on the world’s largest professional network and use simple tools to prioritize the most qualified
                                            candidates - so you can find the people you want to interview, faster.</p>
                                        <h4 className='mt-3 app-gray'>Join over 30 million businesses that hire on CareerInn</h4>
                                    </div>

                                    :

                                    null

                            }
                            {
                                !resolved ?
                                    <div className="d-flex j-center pt-4 pb-3">
                                        <div className="lds-spinner lds-spinner2 me-5 mt-3" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                                    </div>
                                    :
                                    null
                            }
                            {
                                CompanyJobs[0] ?

                                    <table className="table table-responsive table-borderless table-striped-columns">

                                        <thead className='table-striped'>
                                            <tr className="bg-light">
                                                <th scope="col" ><p className="f-m-small">Title</p></th>
                                                <th scope="col" ><p className="f-m-smaller d-flex gap-1">Posted <span className='d-none d-sm-block'> Date</span> </p></th>
                                                <th scope="col" ><p className="f-m-small">Applicants</p></th>
                                                <th scope="col" ><p className="f-m-small">Interviewed</p></th>
                                                <th scope="col"><p className="f-m-small">Status</p></th>
                                                <th scope="col"><p className="f-m-small">Action</p></th>
                                            </tr>
                                        </thead>
                                        <tbody className='table-striped'>

                                            {
                                                CompanyJobs.map(job => {
                                                    return (
                                                        <>
                                                            <tr key={job.name} className={job.is_closed ? 'table-danger c-pointer' : 'table-info c-pointer'} >
                                                                <td onClick={() => { SetActveLayout('x'); ExpandJob(job) }}><span className='f-msmaller'> {job.name}</span> </td>
                                                                <td onClick={() => { SetActveLayout('x'); ExpandJob(job) }}><i className="fa fa-check-circle-o green"></i><span className="ms-1 f-m-smaller">{updateTimeSince(String(job.posted_on)).split(',') ? updateTimeSince(String(job.posted_on)).split(',')[0] : updateTimeSince(String(job.posted_on))}</span></td>
                                                                <td onClick={() => { SetActveLayout('x'); ExpandJob(job) }}>{job.applicants_count}</td>
                                                                <td onClick={() => { SetActveLayout('x'); ExpandJob(job) }}><span className="fw-bolder f-m-smaller">{job.interview_count}</span></td>
                                                                <td onClick={() => { SetActveLayout('x'); ExpandJob(job) }}><span className="fw-bolder f-m-smaller">{job.is_closed ? 'closed' : 'active'}</span></td>
                                                                <td className='text-center' data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                                    </svg>
                                                                </td>
                                                                <ul className="dropdown-menu dropdown-menu-end me-4 bg-light">
                                                                    {!job.is_closed ? 
                                                                        <>
                                                                        <li><a className="dropdown-item" onClick={() => { SeteditJob(job); SetActveLayout('postjob') }}>Edit Job</a></li>
                                                                        <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#closeJob" onClick={() => { SetCloseJob(job.id) }}>Close Job</a></li>
                                                                        </>
                                                                        :
                                                                        <li className='text-center'>no action</li>
                                                                    }
                                                                </ul>
                                                            </tr>

                                                            <div className="modal fade app-font" id="closeJob" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div className="modal-dialog Register-modal">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header b-none">
                                                                            <h5 className="modal-title weight-600" id="exampleModalLabel">Confirm</h5>
                                                                            <button ref={modalCloser} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body pt-0 m-heigh">
                                                                            <p className='mt-4 weight-600'>Closed jobs cannot be open again,Confirm Closing</p>


                                                                            <div className="modal-footer b-none pb-0 mt-5">
                                                                                <button type="button" className="btn-1" onClick={() => {
                                                                                    close_job(closeJob)
                                                                                        .then(() => {
                                                                                            setCompanyJobs(CompanyJobs.map(job => {
                                                                                                if (job.id == closeJob) job.is_closed = true
                                                                                                return job
                                                                                            }))
                                                                                            modalCloser.current!.click()
                                                                                        })
                                                                                }}>Close Job</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </>

                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>

                                    :
                                    null
                            }


                        </div>

                    </div>

                    :

                    ActiveLayout == 'postjob' ?

                        <PostJob SetActiveLayout={SetActveLayout} EditJob={EditJob} />

                        :

                        ExpandedJob && <JobExpanded job={ExpandedJob} SetActiveLayout={SetActveLayout} />

            }

        </div>
    )
}

export default ListJob