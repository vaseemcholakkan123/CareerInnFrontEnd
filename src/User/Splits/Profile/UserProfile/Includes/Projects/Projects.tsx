import './../includes.css'

import { useEffect,useRef, useState } from 'react'
import ProjectCard from './ProjectCard'
import CarreerInnAxios from '../../../../../../AppMain/AppConfig/AxiosConfig'
import { ProjectForm, post_project, project, update_project, validation } from './Helper'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../AppMain/AppConfig/Redux/store'

function Projects() {

    const user = useSelector(( state:RootState )=> state.logged_user.value)
    const modalCloser = useRef<HTMLButtonElement>(null)
    const modal_opener = useRef<HTMLParagraphElement>(null)
    const [updating,setUpdating] = useState(0)
    const [projects,SetProjects] = useState<project[]>([])
    const [projectForm,SetProjectForm] =  useState<ProjectForm>({name:'',description:'',link:'',user:user.user_id ? user.user_id : 0})

    function edit_project(project_id:number) {
        setUpdating(project_id)

        let edit_project = projects.find(p=>p.id === project_id)
        if(edit_project){
            modal_opener.current!.click()
            SetProjectForm({name:edit_project.name,link:edit_project.link,description:edit_project.description,user:user.user_id ? user.user_id : 0})
        }
    }
    function project_delete(project_id:number){
        SetProjects(projects.filter(project=>project.id != project_id))
    }

    useEffect(()=>{
        CarreerInnAxios.get('user/retrieve-self-projects/').then((res)=>{
            SetProjects(res.data)
        })
    },[])


  return (
    <div>
        <div className="d-flex w-100 p-2 pb-0 mt-1 a-center">
            <h5>Projects</h5>

            <div className='ms-auto d-flex a-center mt-1 me-1 btn-3'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="18" height="18" focusable="false">
                <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"></path>
            </svg>
            <p ref={modal_opener} className="weight-600 ms-2" data-bs-toggle="modal" data-bs-target="#projectmodal" >Add another</p>

            </div>
        </div>

        {
            projects.map(project=>{
                return(
                    <ProjectCard project={project} EditProject={edit_project} delete_project={project_delete} key={project.id} />
                )
            })
        }
        {
            !projects[0]?
                <div className='ms-3'>
                    <p>Add your projects to boost your profile</p>
                </div>
            :
            null
        }



        {/* MODAL */}

        <div className="modal fade app-font" id="projectmodal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog profile-modal">
                <div className="modal-content">
                    <div className="modal-header b-none">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Project</h1>
                    <button type="button" ref={modalCloser} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    <div className="modal-body info-modal">
                    
                        <p className="f-small app-gray">* indicates required</p>
                    

                        {/* <p className='mt-4 weight-600'>Contact</p> */}

                        <div className="input-infos">
                            <p>Project name*</p>
                            <input value={projectForm.name} onChange={e=>{SetProjectForm({...projectForm,name:e.target.value})}} type="text" />
                        </div>
                        
                        <div className="input-infos">
                            <p>About project*</p>
                            <input type="text" value={projectForm.description} onChange={e=>{SetProjectForm({...projectForm,description:e.target.value})}} />
                        </div>

                        <div className="input-infos">
                            <p>link*</p>
                            <input type="text" value={projectForm.link} onChange={e=>{SetProjectForm({...projectForm,link:e.target.value})}} />
                        </div>

                    </div>

                    <div className="modal-footer b-none">
                        <button onClick={()=>{
                            updating ? 
                                update_project(projectForm,updating)
                                .then(res=>{
                                    SetProjects(projects.map(project=>{
                                        if(project.id == updating){
                                            project.name = res?.data.name
                                            project.description = res?.data.description
                                            project.link = res?.data.link
                                        }
                                        return project
                                    }))
                                    setUpdating(0)
                                    modalCloser.current!.click()
                                    SetProjectForm({...projectForm,name:'',link:'',description:''})
                                })
                            :

                            post_project(projectForm).then((res)=>{

                                let new_project:project ={id:0,name:res?.data.name,description:res?.data.description,link:res?.data.link,
                                user:{
                                    username : user.username ? user.username : '',
                                    profile : user.profile ? user.profile : '',
                                    info : user.info ? user.info : ''
                                }}
                                SetProjects([new_project,...projects])
                                modalCloser.current!.click()
                                SetProjectForm({...projectForm,name:'',link:'',description:''})
                            })
                            .catch(e=>{
                                validation(e.response.data.message)
                            })
                        }} className="btn-1 p-3 pt-1 pb-1">{updating != 0 ? 'Update Project' : 'Add Project'}</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Projects