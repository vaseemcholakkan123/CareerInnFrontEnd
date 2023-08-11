import default_user_image, { BASE_IMAGE_URL } from '../../AppMain/AppConfig/AppConstants'
import CarreerInnAxios from '../../AppMain/AppConfig/AxiosConfig'
import { company, department, get_departments, get_users, user } from '../../User/Splits/Profile/UserProfile/Includes/Jobs/Helper'
import { UpdateComapnyForm, update_banner, update_company, update_logo } from './Helper'
import './company.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../AppMain/AppConfig/Redux/store'
import {  useEffect,useState,useRef  } from 'react'
import { debounce } from '../../User/Splits/Profile/Helper'
import { useNavigate } from 'react-router-dom'


function Company() {

    const [Company,SetCompany] = useState<company | null>(null)
    const [departments,Setdepartments] = useState<department[]>([])
    const modalBannerCloser = useRef<HTMLButtonElement>(null)
    const modalLogoCloser = useRef<HTMLButtonElement>(null)
    const modalCloser = useRef<HTMLButtonElement>(null)
    const currentuser = useSelector(( state:RootState )=> state.logged_user.value)
    const [UpdateForm,SetRegisterForm] = useState<UpdateComapnyForm>(
                                        {   ceo: 0,
                                            name: '',
                                            department: 0,
                                            employees_start: 0,
                                            employees_end: 0,
                                            location: '',
                                            about: '',
                                            excerpt:''})

    const selectUserInp = useRef<HTMLInputElement>(null)
    const selectDepInp = useRef<HTMLInputElement>(null)
    const [users,SetUsers] = useState<user[]>([])
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

    useEffect(()=>{
        CarreerInnAxios.get('user/get-company-details/')
        .then(res=>{   
            SetCompany(res.data.company)

            SetRegisterForm(
                {   ceo: res.data.company.ceo.id,
                    name: res.data.company.name,
                    department: res.data.company.department.id,
                    employees_start: res.data.company.employees_start,
                    employees_end: res.data.company.employees_end,
                    location: res.data.company.location,
                    about: res.data.company.about,
                    excerpt: res.data.company.excerpt
                }
            )

        })
        .catch(err=>{
            console.log(err);
            
        })
    },[])

  return (
    <div className='company-main app-font col-12 j-center col-md-10'>
           {
             Company ? 
            <div className="holder">

                <img src={Company.banner ? BASE_IMAGE_URL +  Company.banner : ''} alt="" className="banner-company" />
                <img src={BASE_IMAGE_URL + Company.logo} alt="" className="company-logo app-shadow" style={{'top':Company.banner ? '' : '8px'}} />
    
                {
                    Company.ceo?.username == currentuser.username ? 

                    <div className="w-100">
                        <div  className="d-flex a-center company-edit" data-bs-toggle="dropdown" aria-expanded="false">
                            <p>Edit Company</p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width="24" height="24" focusable="false">
                                <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
                            </svg>
                            <ul className="dropdown-menu dropdown-menu-end me-4">
                                <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#Bannermodal">Banner</a></li>
                                <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#Logomodal" >Company Logo</a></li>
                                <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#RegisterModal" >Details</a></li>
                            </ul>
                        </div>
                    </div>

                    :
                    <div className="p-4"></div>
                }

                {/* banner modal */}

                <div className="modal fade app-font" id="Bannermodal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog Register-modal">
                    <div className="modal-content">
                        <div className="modal-header b-none pb-0">
                        <h5 className="modal-title weight-600" id="exampleModalLabel">Edit Banner</h5>
                        <button ref={modalBannerCloser} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body pt-0 m-heigh">
                        <p className='mt-4 weight-600'>Upload Banner</p>
                            {
                                Company.banner ? 
                                <img src={ BASE_IMAGE_URL + Company.banner} alt="" className='w-100' />
                                :
                                <p>Upload a banner to attract users</p>
                            }
                            <div className="modal-footer b-none pb-0 mt-1">
                                <label htmlFor='banner'>
                                    <p className="btn-1">Upload New</p>
                                </label>
                                <input id='banner' className='d-none' type="file" accept="image/*,.pdf" onChange={e=>{
                                    if(e.target.files){
                                        update_banner(e.target.files[0])
                                        .then(banner=>{
                                            SetCompany({...Company,banner:banner})
                                            modalBannerCloser.current!.click()
                                        })
                                        .catch((err)=>{
                                            console.log(err);
                                            
                                        })
                                    }
                                }} />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* banner modal */}

                {/* logo modal */}

                <div className="modal fade app-font" id="Logomodal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog Register-modal">
                    <div className="modal-content">
                        <div className="modal-header b-none pb-0">
                        <h5 className="modal-title weight-600" id="exampleModalLabel">Edit Logo</h5>
                        <button ref={modalLogoCloser} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body pt-0 m-heigh">
                        <p className='mt-4 weight-600'>Current Logo</p>
                            <img src={BASE_IMAGE_URL + Company.logo} width={200} height={200} alt="" />
                            <div className="modal-footer b-none pb-0 mt-5">
                                <label htmlFor='logo'>
                                    <p className="btn-1">Upload New</p>
                                </label>
                                <input id='logo' className='d-none' type="file" accept="image/*,.pdf" onChange={e=>{
                                    if(e.target.files){
                                        update_logo(e.target.files[0])
                                        .then(logo=>{
                                            SetCompany({...Company,logo:logo})
                                            modalLogoCloser.current!.click()
                                        })
                                        .catch((err)=>{
                                            console.log(err);
                                            
                                        })
                                    }
                                }} />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* logo modal */}


                {/* company modal */}

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
                            <input value={UpdateForm.name} type="text" required placeholder='Ex - Brototype' onChange={e=>{
                            SetRegisterForm({...UpdateForm,name:e.target.value})
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
                                    SetRegisterForm({...UpdateForm,ceo:0})
                                }}>change</p>
                                :
                                null
                            }
                            </div>
                            <div className='w-100 lock-parent'>
                            <input ref={selectUserInp} disabled value={Company.ceo.username} type="text" required placeholder='Search user' onChange={e=>user_debounce(e.target.value)} />
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
                                        selectUserInp.current!.value = user.username
                                        selectUserInp.current!.disabled = true 
                                        SetRegisterForm({...UpdateForm,ceo:user.id})
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
                            <input type="text" value={UpdateForm.location} placeholder='Ex - India,Kerala,Kozhikode' onChange={e=>{SetRegisterForm({...UpdateForm,location:e.target.value})}}/>
                        </div>

                        <div className="d-flex employee-count">
                            <p>Employees</p>
                            <input type="number" value={UpdateForm.employees_start} placeholder="500" onChange={e=>{SetRegisterForm({...UpdateForm,employees_start:Number(e.target.value)})}} />
                            <p>to</p>
                            <input type="number" value={UpdateForm.employees_end} placeholder="1000" onChange={e=>{SetRegisterForm({...UpdateForm,employees_end:Number(e.target.value)})}} />
                        </div>

                        <div className="input-infos">
                            <p>Excerpt</p>
                            <input type="text" value={UpdateForm.excerpt} onChange={e=>{SetRegisterForm({...UpdateForm,excerpt:e.target.value})}} placeholder="Ex - Helping enterprises with staffing and compliance! India's first Oracle PaaS and eCompliance Partner!" />
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
                                    SetRegisterForm({...UpdateForm,department:0})
                                }} >change</p>
                                :
                                null
                            }
                            </div>
                            <div className='w-100 lock-parent'>

                                <input disabled value={Company.department.title} ref={selectDepInp} type="text" placeholder="Ex - Information Technology & Services" onChange={e=>{
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
                                            selectDepInp.current!.value = department.title
                                            selectDepInp.current!.disabled = true
                                            SetRegisterForm({...UpdateForm,department:department.id})
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

                        <p className='mt-4 weight-600'>About</p>

                        <div className="input-infos">
                            <p>Tell us what the company is:</p>
                            <textarea value={UpdateForm.about} onChange={e=>{SetRegisterForm({...UpdateForm,about:e.target.value})}} className="w-100 p-2 no-focus" rows={4} placeholder='Established in the year 2017, with a view to providing Development and Staffing Solutions. We are driven by the goal to provide services that change lives...'/>
                        </div>

                        </div>
                        <div className="modal-footer b-none">
                        <button type="button" className="btn-1" onClick={()=>{
                            console.log(UpdateForm);
                            
                            update_company(UpdateForm)
                            .then((res)=>{
                                SetCompany({...res,banner:Company.banner,logo:Company.logo})
                                modalCloser.current!.click()
                            })
                            .catch(e=>{
                            console.log(e);
                                router('/employer')
                            })
                            
                        }}>Register & Continue</button>
                        </div>
                    </div>
                    </div>
                </div>

                {/* company modal */}
    
                <div className="main-texts-holder" style={{'marginTop':Company.banner ? '58px' : '140px'}}>
                    <h1 className='weight-600'>{Company.name} <span className="f-medium app-link">CEO @{Company.ceo.username}</span></h1>
                    <p>{Company.excerpt}</p>
                    <p className='f-small gray'>{Company.department.title},  {Company.location}  {Company.employees_start}-{Company.employees_end} employees</p>
                    <h2 className='mt-2'>About</h2>
                    <p>{Company.about}</p>
                </div>
            </div>
             :
             null
           }
    </div>
  )
}

export default Company