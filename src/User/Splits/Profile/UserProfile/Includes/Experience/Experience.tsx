import ExpCard from './ExpCard'
import './../includes.css'

import {useEffect,useState,useRef} from 'react'
import { Experiencetype , ExperienceForm, add_experience, get_companies, smallcompanytype, axios_update_experience } from './Helper'
import { debounce } from '../../../Helper'
import { BASE_IMAGE_URL } from '../../../../../../AppMain/AppConfig/AppConstants'
import CarreerInnAxios from '../../../../../../AppMain/AppConfig/AxiosConfig'
import { validation } from '../Projects/Helper'

function Experience() {

    const [ExperienceForm,setExperienceForm] = useState<ExperienceForm>({company:0,position:'',year_from:0,year_to:0,still_working:null})
    const selectCompanyInp = useRef<HTMLInputElement>(null)
    const [companies,setcompanies] = useState<smallcompanytype[]>([])
    const [Experiences,setExperiences] = useState<Experiencetype[]>([])
    const [updating,setUpdating] = useState(0)
    const modalopener = useRef<HTMLParagraphElement>(null)
    const modalCloser = useRef<HTMLButtonElement>(null)

    useEffect(()=>{
        CarreerInnAxios.get('user/get-experience/')
        .then(res=>{
            setExperiences(res.data)
        })
    },[])


    function delete_experience(edu_id:number){
        setExperiences(Experiences.filter(e=>e.id != edu_id))
    }
    function edit_experience(edu_id:number){
        
        let edit_exp = Experiences.find(p=>p.id === edu_id)
    
        setExperienceForm({position : edit_exp!.position,
            company_name:edit_exp!.company.name,
            company:edit_exp!.company.id,
            still_working:edit_exp!.still_working,
            year_from: edit_exp!.still_working ? 0 : edit_exp!.year_from,
            year_to: edit_exp!.still_working ? 0 : edit_exp!.year_to,
        })
        selectCompanyInp.current!.value = edit_exp!.company.name
        selectCompanyInp.current!.disabled = true
        setUpdating(edu_id)
        modalopener.current!.click()
    }

    const companies_debounce = debounce((company_query)=>{
        if(!company_query) {
          setcompanies([])
          return
        }
        get_companies(company_query)
        .then(res=>{
          if(res.data == 'no data' ){
            setcompanies([{name:`No company for '${company_query}'`,id:0 ,logo:''}])
            return
          }
          setcompanies(res.data)
          
        })
    })

  return (
    <div>
        <div className="d-flex w-100 p-2 a-center">
            <h5>Experience</h5>

            <div className='ms-auto d-flex a-center mt-1 me-1 btn-3'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="18" height="18" focusable="false">
                <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"></path>
                </svg>
                <p className="weight-600 ms-2" data-bs-toggle="modal" ref={modalopener} data-bs-target="#Expmodal">Add another</p>

            </div>



        </div>

        {
            Experiences.map(exp=>{
                return(
                    <ExpCard key={exp.id} delete_exp_from_list={delete_experience} update_exp_from_list={edit_experience} experience={exp} />

                )
            })
        }
        {
            !Experiences[0]?
                <div className='ms-3'>
                    <p>Add Experience to boost your profile</p>
                </div>
            :
            null
        }

        {/* modal */}

        <div className="modal fade app-font" id="Expmodal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog profile-modal">
                <div className="modal-content">
                    <div className="modal-header b-none">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{updating == 0 ? 'Add Experience' : 'Edit Experience'}</h1>
                    <button type="button" ref={modalCloser} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    <div className="modal-body info-modal">
                    
                        <p className="f-small app-gray">* indicates required</p>
                    

                        {/* <p className='mt-4 weight-600'>Contact</p>

                        <div className="input-infos">
                            <p>Company*</p>
                            <p className="f-small">Company has to be registered on our site</p>
                            <input type="text" value={ExperienceForm.company_name} placeholder='Search company' />
                        </div> */}

                        <p className='mt-1 weight-600'>Company</p>

                        <div className="input-infos">
                            <div className="d-flex">
                            <p className='f-small app-gray'>company has to be registered on our website.</p>
                            {
                                selectCompanyInp.current?.disabled ? 
                                <p className="app-link ms-auto me-5" onClick={()=>{
                                    selectCompanyInp.current!.value = ''
                                    selectCompanyInp.current!.disabled = false
                                    setExperienceForm({...ExperienceForm,company:0})
                                }} >change</p>
                                :
                                null
                            }
                            </div>
                            <div className='w-100 lock-parent'>

                                <input ref={selectCompanyInp} type="text" placeholder="Ex - Accenture India" onChange={e=>{
                                    companies_debounce(e.target.value)

                                }}  />
                                <div className="deps-holder">
                                {
                                    companies[0] ? 
                                    <div className='rel-holder'>
                                    {
                                    companies.map(company=>{

                                        return(
                                        <div className="s-holder d-flex a-center gap-2" key={company.name} onClick={()=>{
                                            if(company.id == 0) return
                                            selectCompanyInp.current!.value = company.name
                                            selectCompanyInp.current!.disabled = true
                                            setExperienceForm({...ExperienceForm,company:company.id,company_name:company.name})
                                            setcompanies([])
                                        }}>
                                            {
                                                company.logo != '' ? 
                                                    <img src={BASE_IMAGE_URL +  company.logo} width={30} height={30} alt="" />
                                                :
                                                null

                                            }
                                            <p>{company.name}</p>

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
                        
                        <div className="input-infos">
                            <p>Position*</p>
                            <input type="text" value={ExperienceForm.position} onChange={e=>{setExperienceForm({...ExperienceForm,position:e.target.value})}} placeholder='Hiring Manager' />
                        </div>

                        <div className="input-infos">
                            <p>Still working ? *</p>
                            <div className="d-flex gap-2 ms-2">
                                <div>
                                    <input type="checkbox" onChange={()=>{
                                        setExperienceForm({...ExperienceForm,still_working : true})
                                    }}  id='true' className='me-2' checked={ExperienceForm.still_working != null ? ExperienceForm.still_working : false}/>
                                    <label htmlFor="true">
                                        <p>Yes</p>
                                    </label>
                                </div>

                                <div>
                                    <input type="checkbox" id='no' onChange={()=>{
                                        setExperienceForm({...ExperienceForm,still_working : false})
                                    }} className='me-2' checked={ExperienceForm.still_working != null ? !ExperienceForm.still_working : false} />
                                    <label htmlFor="no">
                                        <p>No</p>
                                    </label>
                                </div>

                            </div>
                        </div>

                        {
                            ExperienceForm.still_working != null && !ExperienceForm.still_working ? 
                            <div className="d-flex employee-count">
                                <p>Started on</p>
                                <input type="number" placeholder="2021" value={ExperienceForm.year_from == 0 ? '' : ExperienceForm.year_from } onChange={e=>{setExperienceForm({...ExperienceForm,year_from:Number(e.target.value)})}} />
                                <p>till</p>
                                <input type="number" placeholder="2022" value={ExperienceForm.year_to == 0 ? '' : ExperienceForm.year_to } onChange={e=>{setExperienceForm({...ExperienceForm,year_to:Number(e.target.value)})}} />
                            </div>
                            :
                            null
                        }

                    </div>

                    <div className="modal-footer b-none">
                        <button className="btn-1" onClick={()=>{
                            updating == 0 ? 

                            add_experience(ExperienceForm)
                            .then(data=>{
                                
                                setExperiences([{...data,company:{id:ExperienceForm.company,name:ExperienceForm.company_name}},...Experiences])
                                setExperienceForm({company:0,position:'',year_from:0,year_to:0,still_working:null})
                                selectCompanyInp.current!.value = ''
                                selectCompanyInp.current!.disabled = false
                                modalCloser.current!.click()
                                
                            })
                            .catch(err=>{
                                if(err.response.data.company) validation(err.response.data.company[0])
                                console.log(err);
                                
                            })

                            :

                            axios_update_experience(updating,ExperienceForm)
                            .then(data=>{
                                setExperiences([{...data,company:{id:ExperienceForm.company,name:ExperienceForm.company_name}},...Experiences.filter(k=>k.id != data.id)])
                                setExperienceForm({company:0,position:'',year_from:0,year_to:0,still_working:null})
                                selectCompanyInp.current!.value = ''
                                selectCompanyInp.current!.disabled = false
                                setUpdating(0)
                                modalCloser.current!.click()
                            })
                            .catch(err=>{
                                console.log(err);
                                
                            })

                        }}>{updating == 0 ? 'Add Experience' : 'Update Experience'}</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Experience