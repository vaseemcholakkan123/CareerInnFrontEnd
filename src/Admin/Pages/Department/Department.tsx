

import { useEffect, useRef, useState } from 'react'
import { validation } from '../../../User/Splits/Profile/UserProfile/Includes/Projects/Helper'
import CarreerInnAxios from '../../../AppMain/AppConfig/AxiosConfig'
import { add_department, delete_department, depType, update_department } from '../Helper'
import { success } from '../../../User/Splits/Profile/UserProfile/Includes/Jobs/Helper'

function Department() {

    const [AllDeps, SetDepartments] = useState<depType[]>([])
    const [resolved, SetResolved] = useState(false)
    const [nextUrl, setNextUrl] = useState('')
    const [loadNext, loader] = useState(false)
    const modalCloser = useRef<HTMLButtonElement>(null)
    const titleinput = useRef<HTMLInputElement>(null)
    const [UpdateDep, SetUpdateDep] = useState(0)
    const modalOpener = useRef<HTMLDivElement>(null)

    useEffect(() => {
        CarreerInnAxios.get('admin/Department/' + `?${nextUrl}`).then(res => {

            SetResolved(true)
            SetDepartments(res.data.results)
            if (res.data.next) setNextUrl(res.data.next.split('?')[1])
            else setNextUrl('')
        })
            .catch(() => {
                SetResolved(true)
                validation('Server Error')
            })
    }, [loadNext])

    const updatecb = (dep_id: number) => {

        if (dep_id == 0) return
        SetUpdateDep(dep_id)

        titleinput.current!.value = AllDeps.find(n => n.id == dep_id)!.title
        modalOpener.current!.click()

    }

    return (
        <div className='w-100'>
            <header className='w-100 d-flex p-1 p-md-4 a-center'>
                <h3 className='resize-heading'>All Departments</h3>

                <div className='d-flex a-center gap-2 ms-auto' ref={modalOpener} data-bs-toggle="modal" data-bs-target="#Depmodal">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="18" height="18" focusable="false">
                        <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"></path>
                    </svg>
                    <p>Add New</p>
                </div>
            </header>

            <div className="row p-1 m-md-2 m-1 gy-2 container-height-admin">

                {
                    AllDeps[0] && resolved ?
                        AllDeps.map(dep => {
                            return (
                                <div key={dep.id} className='col-12 col-md-6 p-1 p-md-4 pb-md-3 r-7 app-shadow d-flex'>
                                    <div>
                                        <h5 className='resize-heading'>{dep.title}</h5>
                                        <p className="f-small f-m-smaller">Companies linked : {dep.no_of_company}</p>
                                    </div>

                                    <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto me-1 bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>

                                    <ul className="dropdown-menu dropdown-menu-end app-font">
                                        <li><p className="dropdown-item weight-700" onClick={() => { updatecb(dep.id) }} >Edit Department</p></li>
                                        {
                                            dep.no_of_company == 0 ?
                                                <li className='dropdown-item c-pointer'
                                                    onClick={() => {
                                                        delete_department(dep.id)
                                                            .then(() => {
                                                                SetDepartments(AllDeps.filter(n => n.id != dep.id))
                                                                success('Deleted')
                                                            })
                                                            .catch(() => {
                                                                validation('Server Error')
                                                            })

                                                    }}
                                                >Delete department</li>

                                                :
                                                null

                                        }
                                    </ul>
                                </div>
                            )
                        })
                        :
                        null
                }

                {
                    !AllDeps[0] && !resolved ?
                        <div className="d-flex j-center pt-3 pb-3">
                            <div className="lds-spinner lds-spinner2 me-5 mt-1" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
                        :
                        null
                }
                {
                    !AllDeps[0] && resolved ?
                        <div className='col-12 d-flex acenter j-center m-2 mt-0  pt-1 p-2'>
                            <p>Seem's like there's no departments added.</p>
                        </div>
                        :
                        null
                }

                {
                    nextUrl != '' ?
                        <div className="d-flex p-1 a-center  j-center r-7 mt-1 c-pointer" onClick={() => loader(!loadNext)}>
                            <p className="app-font">Show More</p>
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

                        </div>
                        :
                        null
                }

                {/* modal */}

                <div className="modal fade app-font" id="Depmodal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog profile-modal">
                        <div className="modal-content">
                            <div className="modal-header b-none">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{UpdateDep == 0 ? 'Add Department' : 'Edit Department'}</h1>
                                <button type="button" className="btn-close" ref={modalCloser} data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body info-modal h-t input-infos ps-md-4 ps-3">

                                <p>Enter the title</p>
                                <input ref={titleinput} type="text" className="ms-1" />


                            </div>

                            <div className="modal-footer b-none">
                                <button className="btn-1 pt-2 pb-2" onClick={() => {
                                    UpdateDep == 0 ?
                                        add_department(titleinput.current!.value)
                                            .then(res => {
                                                success('Added')
                                                titleinput.current!.value = ''
                                                SetDepartments([res.data, ...AllDeps])
                                                modalCloser.current!.click()
                                            })
                                        :
                                        update_department(titleinput.current!.value, UpdateDep)
                                            .then(res => {
                                                success('Updated')
                                                titleinput.current!.value = ''
                                                SetDepartments(AllDeps.map(news => {
                                                    if (news.id == UpdateDep) return res.data
                                                    else return news
                                                }))
                                                modalCloser.current!.click()
                                            })
                                }}>{UpdateDep == 0 ? 'Add Department' : 'Update'}</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div >
    )
}

export default Department