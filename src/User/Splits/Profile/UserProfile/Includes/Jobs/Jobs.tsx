import { debounce } from '../../../Helper'
import './../includes.css'

import {useState,useRef} from 'react'
import { check_continue, department, get_departments, get_users, registerComapnyForm, register_company, user } from './Helper'
import default_user_image, { BASE_IMAGE_URL } from '../../../../../../AppMain/AppConfig/AppConstants'
import { useNavigate } from 'react-router-dom'

function Jobs() {
  const [departments,Setdepartments] = useState<department[]>([])
  const [users,SetUsers] = useState<user[]>([])
  const modalCloser = useRef<HTMLButtonElement>(null)
  const modalOpener = useRef<HTMLButtonElement>(null)
  const selectUserInp = useRef<HTMLInputElement>(null)
  const selectDepInp = useRef<HTMLInputElement>(null)
  const [RegisterForm,SetRegisterForm] = useState<registerComapnyForm>({ceo:0,name:'',department:0,employees_start:0,employees_end:0,location:'',about:'',excerpt:'',logo:null,banner:null})
  const router = useNavigate()

  const department_debounce = debounce((department_query)=>{
      if(!department_query) {
        Setdepartments([])
        return
      }
      get_departments(department_query)
      .then(res=>{
        if(res.data == 'no data' ){
          Setdepartments([{title:`No departments for '${department_query}'`,id:0}])
          return
        }
        Setdepartments(res.data)
        
      })
  }) 

  const user_debounce = debounce((user_query:string)=>{
    if (!user_query) {
      SetUsers([])
      return
    }
    get_users(user_query)
    .then(res=>{
      if(res.data == 'no data' ){
        SetUsers([{username:`No user for search '${user_query}' `,profile:null,info:'956321',id:0}])
        return
      }
      SetUsers(res.data)

    })
}) 
  
 
  return (
    <div className="connections-info pb-md-2 pb-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="var(--primary-color)" width="24" height="24" focusable="false">
            <circle cx="12" cy="4" r="2" style={{'isolation':'isolate'}} opacity=".75"></circle>
            <path d="M21 10H3a1 1 0 00-1 1v10a1 1 0 001 1h18a1 1 0 001-1V11a1 1 0 00-1-1zm-5 9H8v-2h8v2zm2-4H6v-2h12v2z"></path>
            <g opacity=".6">
              <path d="M9.57 5.75l-2.41 4.83 1.68.84 2.28-4.57a3 3 0 01-1.55-1.1zM14.43 5.75a3 3 0 01-1.55 1.1l2.28 4.57 1.68-.84z" style={{'isolation':'isolate'}} opacity=".55"></path>
            </g>
          </svg>
          <button className="d-none" ref={modalOpener} data-bs-toggle="modal" data-bs-target="#RegisterModal"></button>
          <div className='ms-2 app-font info' onClick={()=>{
            check_continue().then(res=>{
              if(res.data.var == 'continue'){
                localStorage.setItem('company_id',res.data.id)
                router('/employer')
              }
              else{
                modalOpener.current!.click()
                return
              }
              
            })
          }}>
            <p className="weight-700">Offer jobs</p>
            <p>See and manage posted jobs</p>
          </div>

          <div className="modal fade app-font" id="RegisterModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog Register-modal">
              <div className="modal-content">
                <div className="modal-header b-none">
                  <h5 className="modal-title weight-600" id="exampleModalLabel">Register Company</h5>
                  <button ref={modalCloser} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body pt-0 m-height">
                  <p className="f-small app-gray">* indicates required</p>
                  <p className='mt-4 weight-600'>Basic Information</p>
                  <div className="input-infos">
                    <p>Registered name*</p>
                    <input type="text" required placeholder='Ex - Brototype' onChange={e=>{
                      SetRegisterForm({...RegisterForm,name:e.target.value})
                    }}/>
                  </div>

                  <div className="input-infos">
                    <div className="d-flex">
                      <p>CEO (must have Carreerinn account)*</p>
                      {
                        selectUserInp.current?.disabled ? 
                          <p className="app-link ms-auto me-5" onClick={()=>{
                            selectUserInp.current!.value = ''
                            selectUserInp.current!.disabled = false
                            SetRegisterForm({...RegisterForm,ceo:0})
                          }}>change</p>
                        :
                        null
                      }
                    </div>
                    <div className='w-100 lock-parent'>
                      <input ref={selectUserInp} type="text" required placeholder='Search user' onChange={e=>user_debounce(e.target.value)} />
                      {
                        users[0] ? 
                        <div className='rel-holder'>
                        {
                          users.map(user=>{

                            return(
                              user.info == '956321'  ?

                                <p>{user.username}</p>
                              :
                              <div className="d-flex a-center s-holder" key={user.username} onClick={()=>{
                                if(user.id == 0) return
                                selectUserInp.current!.value = user.username
                                selectUserInp.current!.disabled = true 
                                SetRegisterForm({...RegisterForm,ceo:user.id})
                                SetUsers([])
                              }}>
                                <img src={user.profile ? BASE_IMAGE_URL + user.profile : default_user_image} height={50} width={50} className='rounded-circle' alt="user_profile" />
                                <div className="ms-2">
                                  <p>{user.username}</p>
                                  <p className="f-small">{user.info}</p>
                                </div>
                              </div>
                              )

                          })
                        }
                      </div>
                        : null
                      }
                    </div>
                  </div>

                  <div className="input-infos pb-2">
                    <p>Location: Country/Region and City*</p>
                    <input type="text" placeholder='Ex - India,Kerala,Kozhikode' onChange={e=>{SetRegisterForm({...RegisterForm,location:e.target.value})}}/>
                  </div>

                  <div className="d-flex employee-count">
                    <p>Employees</p>
                    <input type="number" placeholder="500" onChange={e=>{SetRegisterForm({...RegisterForm,employees_start:Number(e.target.value)})}} />
                    <p>to</p>
                    <input type="number" placeholder="1000" onChange={e=>{SetRegisterForm({...RegisterForm,employees_end:Number(e.target.value)})}} />
                  </div>

                  <div className="input-infos">
                    <p>Excerpt</p>
                    <input type="text" onChange={e=>{SetRegisterForm({...RegisterForm,excerpt:e.target.value})}} placeholder="Ex - Helping enterprises with staffing and compliance! India's first Oracle PaaS and eCompliance Partner!" />
                  </div>

                  <p className='mt-4 weight-600'>Department / Category</p>

                  <div className="input-infos">
                    <div className="d-flex">
                      <p>Select from all categories</p>
                      {
                        selectDepInp.current?.disabled ? 
                          <p className="app-link ms-auto me-5" onClick={()=>{
                            selectDepInp.current!.value = ''
                            selectDepInp.current!.disabled = false
                            SetRegisterForm({...RegisterForm,department:0})
                          }} >change</p>
                        :
                        null
                      }
                    </div>
                      <div className='w-100 lock-parent'>

                        <input ref={selectDepInp} type="text" placeholder="Ex - Information Technology & Services" onChange={e=>{
                            department_debounce(e.target.value)

                        }}  />
                        <div className="deps-holder">
                        {
                            departments[0] ? 
                            <div className='rel-holder'>
                            {
                              departments.map(department=>{

                                return(
                                  <div className="s-holder" key={department.title} onClick={()=>{
                                    if(department.id == 0) return
                                    selectDepInp.current!.value = department.title
                                    selectDepInp.current!.disabled = true
                                    SetRegisterForm({...RegisterForm,department:department.id})
                                    Setdepartments([])
                                  }}>
                                    <p>{department.title}</p>
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

                  <p className='mt-4 weight-600'>Banner and Logo</p>

                     <div className='m-1 d-flex gap-1'>
                        <div>
                          <p>Banner</p>
                          {
                            RegisterForm.banner ?
                            <img src={URL.createObjectURL(RegisterForm.banner)} alt="" width={100} height={75} />
                            :
                            null
                          }
                        </div>
                        <div>
                          <p>Logo</p>
                          {
                            RegisterForm.logo ?
                            <img src={URL.createObjectURL(RegisterForm.logo)} alt="" width={100} height={75} />
                            :
                            null
                          }
                        </div>
                     </div>
                  <div className="input-infos">

                      <label htmlFor="companybanner">
                        <p className="btn-2">Upload Banner</p>  
                      </label>  
                      <label htmlFor="logo">
                        <p className="btn-1 pt-2 pb-2 ms-2">Upload Logo*</p>  
                      </label>  

                      <input type="file" id='companybanner' className="d-none" accept="image/*,.pdf" onChange={e=>{
                        e.target.files  ? 
                
                        SetRegisterForm({...RegisterForm,banner:e.target.files[0]})
        
                        : null
                      }} />
                      <input type="file" id='logo' className="d-none" accept="image/*,.pdf" onChange={e=>{
                           e.target.files  ? 
                
                           SetRegisterForm({...RegisterForm,logo:e.target.files[0]})
           
                           : null
                      }} />

                  </div>

                  <p className='mt-4 weight-600'>About</p>

                  <div className="input-infos">
                    <p>Tell us what the company is:</p>
                    <textarea onChange={e=>{SetRegisterForm({...RegisterForm,about:e.target.value})}} className="w-100 p-2 no-focus" rows={4} placeholder='Established in the year 2017, with a view to providing Development and Staffing Solutions. We are driven by the goal to provide services that change lives...'/>
                  </div>

                </div>
                <div className="modal-footer b-none">
                  <button type="button" className="btn-1" onClick={()=>{
                    register_company(RegisterForm)
                    .then(()=>{
                      modalCloser.current!.click()
                      router('/employer')
                    })
                    .catch(e=>{
                      console.log(e);
                       
                    })
                    
                  }}>Register & Continue</button>
                </div>
              </div>
            </div>
          </div>
        
    </div>
  )
}

export default Jobs