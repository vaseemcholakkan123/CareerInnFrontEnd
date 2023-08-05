import { useLocation, useNavigate } from 'react-router-dom'
import CarreerInnAxios from '../../../AppMain/AppConfig/AxiosConfig'
import { updateTimeSince } from '../../UserConfig/Helper'
import { filter_type, job } from './Helper'
import JobExpanded from './JobExpanded'
import './job.css'
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { RootState } from '../../../AppMain/AppConfig/Redux/store'
import { inform, validation } from '../Profile/UserProfile/Includes/Projects/Helper'
import { skill } from '../Profile/UserProfile/Includes/Skills/helper'
import { debounce } from '../Profile/Helper'
import { get_skills } from '../../../Employer/PostJob/Helper'
import { department, get_departments } from '../Profile/UserProfile/Includes/Jobs/Helper'

function Jobs() {
    const [Jobs, Setjobs] = useState<job[]>([])
    const [ActiveLayout, SetActiveLayout] = useState('ls')
    const [ExpandedJob, ExpandJob] = useState<job>()
    const routerstate = useLocation()
    const [nextUrl, setNextUrl] = useState('')
    const [loadNext, SetloadNext] = useState(false)
    const [resolved, Setresolved] = useState(false)
    const job_id = routerstate.state ? routerstate.state.job_id : null
    const user = useSelector((state: RootState) => state.logged_user.value)
    const router = useNavigate()
    const [triggerH, SetTriggerh] = useState(false)
    const [Filters, AddFilter] = useState<filter_type>({ department: { title: '', id: 0 }, skills_contain: [], work_type: '', work_time: '' })
    const [resultSkills, SetSearchSkills] = useState<skill[]>([])
    const selectSkillInp = useRef<HTMLInputElement>(null);
    const selectDepInp = useRef<HTMLInputElement>(null);
    const [departments, Setdepartments] = useState<department[]>([])


    const skills_debounce = debounce((skill_query) => {
        if (!skill_query) {
            SetSearchSkills([])
            return
        }
        get_skills(skill_query)
            .then(res => {
                if (res.data == 'no data') {
                    SetSearchSkills([{ title: `No skill for '${skill_query}'`, id: 0 }])
                    return
                }

                SetSearchSkills(
                    Filters.skills_contain[0] ?
                        Filters.skills_contain.map(thread => {
                            return res.data.filter((item: skill) => item.id != thread.id)
                        })[0]
                        :
                        res.data
                )

            })
    })

    useEffect(() => {

        if (localStorage.getItem('user') && !user.profile) {
            inform("let's start by adding profile")
            router('/profile')
        }
        let url = 'employer/user-jobs/'
        let otherfilterenabled = false

        if (Filters.department.id != 0) {
            url += '?department=' + Filters.department.id
            otherfilterenabled = true
        }
        if (Filters.work_type != '') {
            if (otherfilterenabled) url += '&'
            else url += '?'
            otherfilterenabled = true
            url += 'work_type=' + Filters.work_type
        }
        if (Filters.work_time != '') {
            if (otherfilterenabled) url += '&'
            else url += '?'
            otherfilterenabled = true
            url += 'work_time=' + Filters.work_time
        }
        if (Filters.skills_contain.length > 0) {
            if (otherfilterenabled) url += '&'
            else url += '?'
            otherfilterenabled = true
            url += 'skills=' + Filters.skills_contain.map(sk => sk.id)
        }
        console.log(url, 'llllllll');

        if (nextUrl == '') {
            if (Filters.department.title != '' || Filters.skills_contain.length > 0 || Filters.work_time != '' || Filters.work_type != '') url += `&${nextUrl}`
            else url = url + `?${nextUrl}`
        }

        CarreerInnAxios.get(url)
            .then(res => {
                Setresolved(true)
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
                Setresolved(true)

            })
    }, [loadNext, Filters])

    const department_debounce = debounce((department_query) => {
        if (!department_query) {
            Setdepartments([])
            return
        }
        get_departments(department_query)
            .then(res => {
                if (res.data == 'no data') {
                    Setdepartments([{ title: `No departments for '${department_query}'`, id: 0 }])
                    return
                }
                Setdepartments(res.data)

            })
    })



    return (
        <div className='jobs-container app-shadow'>

            {

                ActiveLayout == 'ls' ?

                    <div className="w-100 relative">
                        <div className='normal-line-height d-flex'>
                            <h2 className='resize-heading pt-md-1 pb-md-1 pt-3 pb-3 ps-md-1 ps-2'>Recommended for you</h2>
                            <div onClick={() => SetTriggerh(!triggerH)} className='d-flex a-center gap-1 ms-auto c-pointer pt-1 me-2 me-md-0' data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto bi bi-filter" viewBox="0 0 16 16"><path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"></path></svg>
                                {/* on click show fiter-container */}
                                <p>Filter</p>
                            </div>
                        </div>

                        <div className={triggerH ? "filter-container trigger-height app-shadow app-font" : "filter-container"} >
                            <div className="container-fluid filter-container-body p-md-3 p-2">

                                <div className="p-2">
                                    <div className='d-flex a-center'>
                                        <h4 className='m-md-0'>Filters</h4>
                                        <p className='ms-auto f-small'
                                            onClick={() => {
                                                AddFilter({ department: { title: '', id: 0 }, skills_contain: [], work_type: '', work_time: '' })
                                                SetTriggerh(!triggerH)
                                            }}
                                        >clear filters</p>
                                    </div>

                                    {
                                        Filters.department.title != '' || Filters.skills_contain.length > 0 || Filters.work_time != '' || Filters.work_type != '' ?
                                            <p className="weight-600">Applied filters</p>
                                            :
                                            null

                                    }

                                    <div className="row m-md-2 m-1 gap-2">

                                        {
                                            Filters.work_type != '' ?
                                                <div className="col-4 col-md-3 text-center btn-3 ps-2 pe-2 skill-card">
                                                    <p>{Filters.work_type}</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16" onClick={() => AddFilter({ ...Filters, work_type: '' })} >
                                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                                    </svg>
                                                </div>
                                                :
                                                null
                                        }

                                        {
                                            Filters.work_time != '' ?
                                                <div className="col-4 col-md-3 text-center btn-3 ps-2 pe-2 skill-card">
                                                    <p>{Filters.work_time}</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={() => AddFilter({ ...Filters, work_time: '' })} >
                                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                                    </svg>
                                                </div>
                                                :
                                                null
                                        }

                                        {
                                            Filters.department.title != '' ?
                                                <div className="col-4 col-md-3 text-center btn-3 ps-2 pe-2 skill-card">
                                                    <p>{Filters.department.title}</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={() => AddFilter({ ...Filters, department: { title: '', id: 0 } })} >
                                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                                    </svg>
                                                </div>
                                                :
                                                null
                                        }
                                        {
                                            Filters.skills_contain.map(skill => {
                                                return (
                                                    <div key={skill.id} className="col-4 col-md-3 text-center btn-3 ps-2 pe-2 skill-card">
                                                        <p>{skill.title}</p>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={() => AddFilter({ ...Filters, skills_contain: Filters.skills_contain.filter(s => s.id != skill.id) })} >
                                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                                        </svg>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>


                                    <p className='weight-600'>Department</p>

                                    <div className="m-md-2 m-1 skill-parent">
                                        <input type="text" ref={selectDepInp} placeholder='Search departments' className='job-filter-input' onChange={e => department_debounce(e.target.value)} />
                                        {
                                            departments[0] ?
                                                <div className='rel-holder pb-0'>
                                                    {
                                                        departments.map(dep => {

                                                            return (
                                                                <div className="s-holder" key={dep.id} onClick={() => {
                                                                    selectSkillInp.current!.value = ''
                                                                    AddFilter({ ...Filters, department: dep })
                                                                    Setdepartments([])
                                                                }}>
                                                                    <p>{dep.title}</p>
                                                                </div>
                                                            )

                                                        })
                                                    }
                                                </div>
                                                : null
                                        }
                                    </div>

                                    <p className='weight-600'>Work-Type</p>


                                    <div className="row m-md-2 m-1 gap-2">

                                        <div className=" col-4 col-md-3 text-center btn-3 ps-2 pe-2" id={Filters.work_type == 'On-Site' ? 'hidden' : ''} onClick={(() => AddFilter({ ...Filters, work_type: 'On-Site' }))}>
                                            <p>On-Site</p>
                                        </div>

                                        <div className=" col-4 col-md-3  text-center btn-3 ps-2 pe-2" id={Filters.work_type == 'Hybrid' ? 'hidden' : ''} onClick={(() => AddFilter({ ...Filters, work_type: 'Hybrid' }))}>
                                            <p>Hybrid</p>
                                        </div>

                                        <div className=" col-4 col-md-2 text-center  btn-3 ps-2 pe-2" id={Filters.work_type == 'Remote' ? 'hidden' : ''} onClick={(() => AddFilter({ ...Filters, work_type: 'Remote' }))}>
                                            <p>Remote</p>
                                        </div>


                                    </div>

                                    <p className='weight-600'>Work time</p>


                                    <div className="row m-md-2 m-1 gap-2">

                                        <div className=" col-4 col-md-3 text-center btn-3 ps-2 pe-2" id={Filters.work_time == 'Full-time' ? 'hidden' : ''} onClick={(() => AddFilter({ ...Filters, work_time: 'Full-time' }))}>
                                            <p>Full-time</p>
                                        </div>

                                        <div className=" col-4 col-md-3  text-center btn-3 ps-2 pe-2" id={Filters.work_time == 'Part-time' ? 'hidden' : ''} onClick={(() => AddFilter({ ...Filters, work_time: 'Part-time' }))}>
                                            <p>Part-time</p>
                                        </div>

                                        <div className=" col-4 col-md-2 text-center  btn-3 ps-2 pe-2" id={Filters.work_time == 'Contract' ? 'hidden' : ''} onClick={(() => AddFilter({ ...Filters, work_time: 'Contract' }))}>
                                            <p>Contract</p>
                                        </div>

                                        <div className=" col-4 col-md-2 text-center  btn-3 ps-2 pe-2" id={Filters.work_time == 'Internship' ? 'hidden' : ''} onClick={(() => AddFilter({ ...Filters, work_time: 'Internship' }))}>
                                            <p>Internship</p>
                                        </div>


                                    </div>

                                    <p className='weight-600'>With skills</p>

                                    <div className="m-md-2 m-1 skill-parent pb-3">
                                        <input type="text" ref={selectSkillInp} placeholder='Search skills' className='job-filter-input' onChange={e => skills_debounce(e.target.value)} />
                                        <div className="deps-holder">
                                            {
                                                resultSkills[0] ?
                                                    <div className='rel-holder pb-0'>
                                                        {
                                                            resultSkills.map(skill => {

                                                                return (
                                                                    <div className="s-holder" key={skill.title} onClick={() => {
                                                                        selectSkillInp.current!.value = ''
                                                                        AddFilter({ ...Filters, skills_contain: [...Filters.skills_contain, skill] })
                                                                        SetSearchSkills([])
                                                                    }}>
                                                                        <p>{skill.title}</p>
                                                                    </div>
                                                                )

                                                            })
                                                        }
                                                    </div>
                                                    : null
                                            }
                                        </div>

                                    </div>




                                </div>


                            </div>
                                <p className='wieght-700 filter-close text-center mb-auto p-1 bg-blg' onClick={(() => { SetTriggerh(!triggerH) })}>x</p>
                        </div>


                        <div className="jobs-holder">

                            {
                                Jobs.map(job => {
                                    return (
                                        <div key={job.id} className={job.id == job_id ? "job-card app-blue-gray" : 'job-card'} onClick={() => { SetActiveLayout('x'); ExpandJob(job) }}>
                                            <img src={job.company.logo} width={78} height={78} className='resize-phone rounded-circle' alt="company_logo" />
                                            <div className="ms-2 normal-line-height">
                                                <p className="weight-600 app-color f-large c-pointer f">{job.name}</p>
                                                <p className="">{job.company.name}</p>
                                                <p className='f-small'>{job.company.location} | {job.job_type}</p>
                                                <p className='f-small f-m-smaller mt-1 mt-md-2 '>{updateTimeSince(String(job.posted_on))} | {job.applicants_count == 0 ? 'Be the first to apply' : job.applicants_count + ' applicants'}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                !Jobs[0] && !resolved ?
                                    <div className="d-flex j-center pt-4 pb-3">
                                        <div className="lds-spinner lds-spinner2 me-5 mt-3" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                                    </div>
                                    :

                                    null
                            }

                            {
                                !Jobs[0] && resolved && Filters.department.title != '' || Filters.skills_contain.length > 0 || Filters.work_time != '' || Filters.work_type != '' ?
                                    <div className='col-12 d-flex acenter j-center m-2 mt-0  pt-1 p-2'>
                                        <p>No job matches this filter.</p>
                                    </div>
                                    :
                                    null
                            }
                            {
                                !Jobs[0] && resolved && Filters.department.title == '' && Filters.skills_contain.length == 0 && Filters.work_time == '' && Filters.work_type == '' ?
                                <div className='col-12 d-flex acenter j-center m-2 mt-0  pt-1 p-2'>
                                    <p>No jobs to show.</p>
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