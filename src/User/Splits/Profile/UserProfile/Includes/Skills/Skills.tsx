import './edu.css'

import {useState , useEffect , useRef} from 'react'
import { add_skill, axios_delete_skill, skill } from './helper'
import { debounce } from '../../../Helper'
import { get_skills } from '../../../../../../Employer/PostJob/Helper'
import CarreerInnAxios from '../../../../../../AppMain/AppConfig/AxiosConfig'

function Skills() {

  const [skills,Setskills] = useState<skill[]>([])
  const selectSkillInp = useRef<HTMLInputElement>(null)
  const [addskill,setAddskill] = useState<{skill_id:number,skill:string}>({skill_id:0,skill:''})
  const [searchSkills,setSearchskills] = useState<skill[]>([])
  const modalCloser = useRef<HTMLButtonElement>(null)

  useEffect(()=>{
      CarreerInnAxios.get('user/retrieve-skills/')
      .then(res=>{
        Setskills(res.data)
      })
  },[])

  const skills_debounce = debounce((skill_query)=>{
    if(!skill_query) {
      setSearchskills([])
      return
    }
    get_skills(skill_query)
    .then(res=>{
      if(res.data == 'no data' ){
        setSearchskills([{title:`No skill for '${skill_query}'`,id:0 }])
        return
      }
      setSearchskills(res.data)
      
    })
})

  return (
    <div>
        <div className="d-flex w-100 p-2 pb-0 a-center mt-2">
            <h5>Skills</h5>

            <div className='ms-auto d-flex a-center mt-1 me-1 btn-3'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="18" height="18" focusable="false">
                <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"></path>
                </svg>
                <p className="weight-600 ms-2" data-bs-toggle="modal" data-bs-target="#Skillmodal">Add another</p>

            </div>



        </div>

        
        {
          skills.map(skill=>{
            return(
              <div key={skill.id} className="d-flex w-100 p-1 pb-2 ps-2 pe-2 a-center">
                  
                  <div className="ms-2 normal-line-height d-flex a-center w-100">
                    <p className='weight-600'>{skill.title}</p>

                    <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto me-1 mt-2 bi bi-three-dots-vertical" viewBox="0 0 16 16">
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>

                    <ul className="dropdown-menu dropdown-menu-end app-font">
                      <li>
                          <p className='dropdown-item text-danger' onClick={()=>{
                            axios_delete_skill(skill.id)
                            .then(()=>{
                              Setskills(skills.filter(item=>item.id != skill.id))
                            })
                            }}>Remove skill</p>
                      </li>
                      </ul>
                  </div>

              </div>
            )
          })
        }
         {
            !skills[0]?
                <div className='ms-3 pb-2'>
                    <p>Add skills to boost your profile for jobs</p>
                </div>
            :
            null
        }


        {/* modal */}

        <div className="modal fade app-font" id="Skillmodal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog profile-modal">
                <div className="modal-content">
                    <div className="modal-header b-none">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Skill</h1>
                    <button type="button" className="btn-close" ref={modalCloser} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    <div className="modal-body info-modal h-t">
                    

                      <p className='mt-1 weight-600'>Skills</p>

                      <div className="input-infos">
                          <div className="d-flex">
                          <p className='f-small app-gray'>search and add from all skills.</p>
                          {
                              selectSkillInp.current?.disabled ? 
                              <p className="app-link ms-auto me-5" onClick={()=>{
                                  selectSkillInp.current!.value = ''
                                  selectSkillInp.current!.disabled = false
                                  setAddskill({skill_id:0,skill:''})
                              }} >change</p>
                              :
                              null
                          }
                          </div>
                          <div className='w-100 lock-parent'>

                              <input ref={selectSkillInp} type="text" placeholder="Ex - MERN Stack" onChange={e=>{
                                  skills_debounce(e.target.value)

                              }}  />
                              <div className="deps-holder">
                              {
                                  searchSkills[0] ? 
                                  <div className='rel-holder'>
                                  {
                                  searchSkills.map(skill=>{

                                      return(
                                      <div className="s-holder d-flex a-center gap-2" key={skill.title} onClick={()=>{
                                          if(skill.id == 0) return
                                          selectSkillInp.current!.value = skill.title
                                          selectSkillInp.current!.disabled = true
                                          setAddskill({skill_id:skill.id,skill:skill.title})
                                          setSearchskills([])
                                          
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

                    <div className="modal-footer b-none">
                        <button className="btn-1 pt-2 pb-2" onClick={()=>{
                          add_skill(addskill.skill_id)
                          .then(()=>{
                            Setskills([{id:0,title:addskill.skill},...skills])
                            selectSkillInp.current!.value = ''
                            selectSkillInp.current!.disabled = false
                            setAddskill({skill_id:0,skill:''})
                            modalCloser.current!.click()
                          })
                        }}>Add Skill</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Skills