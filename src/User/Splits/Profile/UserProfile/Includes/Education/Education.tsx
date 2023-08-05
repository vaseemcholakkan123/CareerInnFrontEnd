import CarreerInnAxios from '../../../../../../AppMain/AppConfig/AxiosConfig'
import './EduCard'
import EduCard from './EduCard'
import { Educationform, Educationtype, add_education, axios_update_education } from './Helper'
import './edu.css'

import {useState,useEffect, useRef} from 'react'

function Education() {

    const [EduForm,SetEduForm] = useState<Educationform>({graduated_year : 0,subject:'',institute:''})
    const modalCloser = useRef<HTMLButtonElement>(null);
    const [updating,setUpdating] = useState(0)
    const [Educations,SetEducations] = useState<Educationtype[]>([])
    const modalopener = useRef<HTMLParagraphElement>(null)

    useEffect(()=>{
        CarreerInnAxios.get('user/get-education/')
        .then(res=>{
            SetEducations(res.data)
        })
    },[])

    function delete_education(edu_id:number){
        SetEducations(Educations.filter(e=>e.id != edu_id))
    }
    function edit_education(edu_id:number){
        
        let edit_education = Educations.find(p=>p.id === edu_id)
        
        SetEduForm({graduated_year : edit_education!.graduated_year,
            subject:edit_education!.subject,
            institute:edit_education!.institute})
        setUpdating(edu_id)
        modalopener.current!.click()
    }


  return (
    <div>
        <div className="d-flex w-100 p-2 a-center">
            <h5 className='resize-heading'>Education</h5>

            <div className='ms-auto d-flex a-center mt-1 me-1 btn-3'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="18" height="18" focusable="false">
                <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"></path>
                </svg>
                <p ref={modalopener} className="weight-600 ms-2" data-bs-toggle="modal" data-bs-target="#Edumodal">Add another</p>

            </div>



        </div>

        {
            Educations.map((edu,i)=>{
                return(
                    <EduCard key={i} education={edu} delete_edu_from_list={delete_education} update_edu_from_list={edit_education} />

                )
            })
        }

        {
            !Educations[0]?
                <div className='ms-3'>
                    <p>Add Education to boost your profile</p>
                </div>
            :
            null
        }

        {/* modal */}

        <div className="modal fade app-font" data-bs-backdrop="static" data-bs-keyboard="false" id="Edumodal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog profile-modal">
                <div className="modal-content">
                    <div className="modal-header b-none">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{updating != 0 ? 'Update Education' : 'Add Education'}</h1>
                    <button type="button" ref={modalCloser} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    <div className="modal-body info-modal p-md-3 p-2">
                    
                        <p className="f-small app-gray">* indicates required</p>
                    

                        {/* <p className='mt-4 weight-600'>Contact</p> */}

                        <div className="input-infos">
                            <p>College/Institute*</p>
                            <input type="text" value={EduForm.institute} placeholder='Calicut University' onChange={e=>SetEduForm({...EduForm,institute:e.target.value})} />
                        </div>
                        
                        <div className="input-infos">
                            <p>Subject*</p>
                            <input type="text" value={EduForm.subject} placeholder='Bsc Electronics' onChange={e=>SetEduForm({...EduForm,subject:e.target.value})} />
                        </div>

                        <div className="input-infos">
                            <p>Passed out year*</p>
                            <input type="number" value={EduForm.graduated_year == 0 ? '2021' : EduForm.graduated_year} min={1} onChange={e=>SetEduForm({...EduForm,graduated_year:Number(e.target.value)})} />
                        </div>

                    </div>

                    <div className="modal-footer b-none">
                        <button className="btn-1 f-m-smaller" onClick={()=>{
                            updating != 0 ? 

                            axios_update_education(updating,EduForm)
                            .then(data=>{
                                SetEducations([data,...Educations.filter(k=>k.id != data.id)])
                                SetEduForm({graduated_year : 0,subject:'',institute:''})
                                setUpdating(0)
                                modalCloser.current!.click()
                            })
                            .catch(err=>{
                                console.log(err);
                                
                            })

                            :

                            add_education(EduForm)
                            .then(data=>{
                                SetEducations([data,...Educations])
                                SetEduForm({graduated_year : 0,subject:'',institute:''})
                                modalCloser.current!.click()
                            })
                            .catch(err=>{
                                console.log(err);
                                
                            })

                        }}>{updating != 0 ? 'Update Education' : 'Add Education'}</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Education