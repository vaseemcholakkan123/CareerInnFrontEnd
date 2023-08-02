import { debounce } from '../../User/Splits/Profile/Helper'
import { validation } from '../../User/Splits/Profile/UserProfile/Includes/Projects/Helper'
import { jobCompany } from '../ListJob/Helper'
import { add_job, add_skills, get_skills, post_job, question, skill, update_job } from './Helper'
import './job.css'

import { Dispatch, SetStateAction, useRef, useState, useEffect } from 'react'


function FormPageTwo({ SetActiveFormPage, SetJobForm, job_form, EditJob }: { SetActiveFormPage: Dispatch<SetStateAction<string>>, SetJobForm: Dispatch<SetStateAction<add_job>>, job_form: add_job, EditJob?: jobCompany }) {
    const [skills, SetSkills] = useState<skill[]>([])
    const [selectedskills, SetselectedSkills] = useState<skill[]>([])
    const selectSkillInp = useRef<HTMLInputElement>(null);
    const modalCloser = useRef<HTMLButtonElement>(null);
    const skillcreateInp = useRef<HTMLInputElement>(null)

    const skills_debounce = debounce((skill_query) => {
        if (!skill_query) {
            SetSkills([])
            return
        }
        get_skills(skill_query)
            .then(res => {
                if (res.data == 'no data') {
                    SetSkills([{ title: `No skill for '${skill_query}'`, id: 0 }])
                    return
                }
                console.log(res.data);

                SetSkills(
                    selectedskills[0] ?
                        selectedskills.map(thread => {
                            return res.data.filter((item: skill) => item.id != thread.id)
                        })[0]
                        :
                        res.data
                )

            })
    })

    useEffect(() => {
        if (EditJob) {
            SetselectedSkills(EditJob.skills_required)
        }
    }, [])


    return (
        <div className='p-1 mt-2 d-flex f-coloumn'>
            <div className="form-one">
                <div className='mb-2'>
                    <p className="form-label">Requirements</p>
                    {
                        job_form.requirements.map((x, i) => {
                            return (
                                <input value={x} key={i} type="text" onChange={e => {
                                    let new_reqs = job_form.requirements
                                    new_reqs[i] = e.target.value
                                    SetJobForm({ ...job_form, requirements: new_reqs })
                                }} className='input-job-form m-1' placeholder={i == 0 ? 'Ex - 3+ years of relevant experience' : ''} />
                            )
                        })
                    }
                    {
                        job_form.requirements.length < 4 ?
                            <div className="d-flex gap-1 mt-2 a-center normal-line-height c-pointer w-f" onClick={() => {
                                SetJobForm({ ...job_form, requirements: [...job_form.requirements, ''] })
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="20" height="20" focusable="false">
                                    <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"></path>
                                </svg>
                                <p>Add another</p>
                            </div>
                            :
                            null
                    }
                </div>


                <div className='mb-2'>
                    <p className="form-label">Responsibilities</p>
                    {
                        job_form.responsibilities.map((x, i) => {
                            return (
                                <input value={x} key={i} onChange={e => {
                                    let new_respo = job_form.responsibilities
                                    new_respo[i] = e.target.value
                                    SetJobForm({ ...job_form, responsibilities: new_respo })

                                }} type="text" className='input-job-form m-1' placeholder={i == 0 ? 'Ex - Plan, build, develop, and execute microsites' : ''} />
                            )
                        })
                    }
                    {
                        job_form.responsibilities.length < 4 ?
                            <div className="d-flex w-f gap-1 mt-2 a-center normal-line-height c-pointer" onClick={() => {
                                SetJobForm({ ...job_form, responsibilities: [...job_form.responsibilities, ''] })

                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="20" height="20" focusable="false">
                                    <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"></path>
                                </svg>
                                <p>Add another</p>
                            </div>
                            :
                            null
                    }
                </div>

                <div >
                    <p className="form-label mb-0">skills required</p>

                    <div className="input-infos mt-0">
                        <div className="d-flex">
                            <p>Select from available skills or add one</p>
                            <div className="d-flex w-f ms-auto gap-1 me-5 a-center normal-line-height c-pointer" data-bs-toggle="modal" data-bs-target="#AddSkillModal">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="20" height="20" focusable="false">
                                    <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"></path>
                                </svg>
                                <p>Add Skill</p>
                            </div>

                        </div>
                        <div className='skill-parent'>

                            <input ref={selectSkillInp} type="text" placeholder="Ex - MERN Stack" className='input-job-form' onChange={e => {
                                skills_debounce(e.target.value)

                            }} />
                            <div className="deps-holder">
                                {
                                    skills[0] ?
                                        <div className='rel-holder'>
                                            {
                                                skills.map(skill => {

                                                    return (
                                                        <div className="s-holder" key={skill.title} onClick={() => {
                                                            selectSkillInp.current!.value = ''
                                                            SetselectedSkills([...selectedskills, skill])
                                                            SetJobForm({ ...job_form, skills_required: [...job_form.skills_required, skill.id] })
                                                            SetSkills([])
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

                    <div className="skill-container row gap-1">
                        {
                            selectedskills.map(skill => {
                                return (
                                    <div key={skill.title} className="skill-card col-md-2 col-6">
                                        <p>{skill.title}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={() => {
                                            let new_skills = selectedskills.filter(SKILL => SKILL.id != skill.id)
                                            SetselectedSkills(new_skills)
                                            SetJobForm({ ...job_form, skills_required: new_skills.map(item => item.id) })
                                        }}>
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                        </svg>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='mb-2'>
                    <p className="form-label">Screening questions</p>
                    {
                        job_form.questions.map((x, i) => {
                            return (
                                <div key={i}>
                                    <input value={x.name} key={i} type="text" className='input-job-form m-1' placeholder={job_form.questions.length < 2 ? 'Ex - Are you comfortable working in a hybrid setting?' : ''} onChange={(e) => {
                                        let temp = job_form.questions
                                        temp[i].name = e.target.value
                                        SetJobForm({ ...job_form, questions: temp })

                                    }} />
                                    <div>
                                        <p>Preferred answer</p>
                                        <div className="d-flex gap-2 ms-2">
                                            <input checked={job_form.questions[i].name != '' ? job_form.questions[i].answer_is_yes : false} type="checkbox" id={`yes${i}`} onChange={() => {
                                                let temp = job_form.questions
                                                temp[i].answer_is_yes = true
                                                SetJobForm({ ...job_form, questions: temp })

                                            }} />
                                            <label htmlFor={`yes${i}`}>
                                                <p>Yes</p>
                                            </label>

                                            <input checked={!job_form.questions[i].answer_is_yes} type="checkbox" id={`no${i}`} onChange={() => {
                                                let temp = job_form.questions
                                                temp[i].answer_is_yes = false
                                                SetJobForm({ ...job_form, questions: temp })

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
                    {
                        job_form.questions.length < 3 ?
                            <div className="d-flex gap-1 mt-2 a-center normal-line-height c-pointer w-f" onClick={() => {
                                let new_quest: question = {
                                    name: '',
                                    answer_is_yes: true
                                }
                                SetJobForm({ ...job_form, questions: [...job_form.questions, new_quest] })
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="20" height="20" focusable="false">
                                    <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"></path>
                                </svg>
                                <p>Add another</p>
                            </div>
                            :
                            null
                    }
                </div>

            </div>



            <div className="modal fade app-font" id="AddSkillModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog Register-modal">
                    <div className="modal-content">
                        <div className="modal-header b-none">
                            <h5 className="modal-title weight-600" id="exampleModalLabel">Add Skill</h5>
                            <button ref={modalCloser} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body pt-0 m-height">

                            <div className="input-infos">
                                <div className="d-flex">
                                    <p>Name *</p>
                                </div>
                                <div className='w-100 lock-parent'>
                                    <input ref={skillcreateInp} type="text" required placeholder='Ex - MEAN Stack' className='p-2' />

                                </div>
                                <div className="modal-footer b-none pb-0 mt-5">
                                    <button type="button" className="btn-1" onClick={() => {
                                        add_skills(skillcreateInp.current!.value)
                                            .then(data => {
                                                SetselectedSkills([...selectedskills, data])
                                                SetJobForm({ ...job_form, skills_required: [...job_form.skills_required, data.id] })
                                                skillcreateInp.current!.value = ''
                                                modalCloser.current!.click()
                                            })
                                            .catch(err => {
                                                if (err.response.data.title) {
                                                    validation('Skill already exists')
                                                }

                                            })
                                    }}>Add & select</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='form-2-btns'>
                <p className="app-link w-25 text-center f-large" onClick={() => { SetActiveFormPage('one') }}>Previous Page</p>
                <p className="btn-1 w-25 text-center" onClick={() => {
                    EditJob ?

                        update_job(job_form,EditJob.id)
                            .then(res => {
                                setTimeout(() => { window.location.href = '/employer' }, 1500)
                            })
                            .catch(e => {
                                console.log(e.response);

                            })

                        :

                        post_job(job_form)
                            .then(res => {
                                setTimeout(() => { window.location.href = '/employer' }, 1500)
                            })

                }} >{EditJob ? 'Update Job' : 'Post Job'}</p>
            </div>

        </div>
    )
}

export default FormPageTwo