import { useLocation, useNavigate } from 'react-router-dom'
import CarreerInnAxios from '../../../AppMain/AppConfig/AxiosConfig'
import { updateTimeSince } from '../../UserConfig/Helper'
import { job } from './Helper'
import JobExpanded from './JobExpanded'
import './job.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { RootState } from '../../../AppMain/AppConfig/Redux/store'
import { inform, validation } from '../Profile/UserProfile/Includes/Projects/Helper'

function Jobs() {
    const [Jobs, Setjobs] = useState<job[]>([])
    const [ActiveLayout, SetActiveLayout] = useState('ls')
    const [ExpandedJob, ExpandJob] = useState<job>()
    const routerstate = useLocation()
    const [nextUrl, setNextUrl] = useState('')
    const [loadNext, SetloadNext] = useState(false)
    const job_id = routerstate.state ? routerstate.state.job_id : null
    const user = useSelector((state: RootState) => state.logged_user.value)
    const router = useNavigate()
    const [triggerH,SetTriggerh] = useState(false)

    useEffect(() => {

        if (!user.profile) {
            inform("let's start by adding profile")
            router('/profile')
        }

        CarreerInnAxios.get('employer/user-jobs/')
            .then(res => {
                if (res.data.next) {
                    setNextUrl(res.data.next.split('?')[1])
                }
                else setNextUrl('')

                const job_id = routerstate.state ? routerstate.state.job_id : null
                if (job_id) {
                    CarreerInnAxios.get(`employer/view-job/${job_id}/`)
                        .then(v_res => {

                            Setjobs([v_res.data, ...Jobs, ...res.data.results.filter((item: job) => item.id != v_res.data.id)]);

                        })

                } else Setjobs(res.data.results)


            })
            .catch(err => {
                console.log(err.response);

            })
    }, [loadNext])

    return (
        <div className='jobs-container app-shadow'>

            {

                ActiveLayout == 'ls' ?

                    <div className="w-100 relative">
                        <div className='normal-line-height d-flex'>
                            <h2>Recommended for you</h2>
                            <div className='d-flex a-center gap-1 ms-auto c-pointer pt-1' data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto bi bi-filter" viewBox="0 0 16 16"><path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"></path></svg>
                                {/* on click show fiter-container */}
                                <p onClick={()=>SetTriggerh(!triggerH)}>Filter jobs</p>
                            </div>
                        </div>

                        <div className={ triggerH ? "filter-container trigger-height"  : "filter-container" } >
                            
                            {/* include filters  */}
                            <p className='wieght-600 text-center mb-auto' onClick={(()=>{SetTriggerh(!triggerH)})}>x</p>
                        </div>
                   

                        <div className="jobs-holder">

                            {
                                Jobs.map(job => {
                                    return (
                                        <div key={job.id} className={job.id == job_id ? "job-card app-blue-gray" : 'job-card'} onClick={() => { SetActiveLayout('x'); ExpandJob(job) }}>
                                            <img src={job.company.logo} width={78} height={78} className='rounded-circle' alt="company_logo" />
                                            <div className="ms-2 normal-line-height">
                                                <p className="weight-600 app-color f-large c-pointer f">{job.name}</p>
                                                <p className="">{job.company.name}</p>
                                                <p className='f-small'>{job.company.location} | {job.job_type}</p>
                                                <p className='f-small mt-2'>{updateTimeSince(String(job.posted_on))} | {job.applicants_count == 0 ? 'Be the first to apply' : job.applicants_count + ' applicants'}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                !Jobs[0] ?
                                    <div className="d-flex j-center pt-4 pb-3">
                                        <div className="lds-spinner lds-spinner2 me-5 mt-3" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                                    </div>
                                    :

                                    null
                            }


                        </div>

                        {
                            nextUrl != '' ?

                                <p className='text-center app-grey d-flex a-center j-center c-pointer' onClick={() => SetloadNext(!loadNext)} >
                                    show more

                                    <svg width="17" className='ms-2 sm-mt' height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_2_599)">
                                            <g clipPath="url(#clip1_2_599)">
                                                <path d="M1.84009 5.14014L8.84009 9.75014L15.8401 5.14014V7.53014L8.84009 12.1401L1.84009 7.53014V5.14014Z" fill="black" fillOpacity="0.6" />
                                            </g>
                                        </g>
                                        <defs>
                                            <rect width="16" height="16" fill="white" transform="translate(0.840088 0.140137)" />
                                            <rect width="16" height="16" fill="white" transform="translate(0.840088 0.140137)" />
                                        </defs>
                                    </svg>
                                </p>

                                :
                                null

                        }

                    </div>

                    :

                    ExpandedJob && <JobExpanded job={ExpandedJob} SetActiveLayout={SetActiveLayout} />

            }

        </div>
    )
}

export default Jobs