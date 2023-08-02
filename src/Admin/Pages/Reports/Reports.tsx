

import { useEffect, useRef, useState } from 'react'
import CarreerInnAxios from '../../../AppMain/AppConfig/AxiosConfig'
import { validation } from '../../../User/Splits/Profile/UserProfile/Includes/Projects/Helper'
import { block_user_from_report, delete_post, reportstype } from '../Helper'
import SmallPostCard from './SmallPostCard'
import { success } from '../../../User/Splits/Profile/UserProfile/Includes/Jobs/Helper'
import { useNavigate } from 'react-router-dom'

function Reports() {

    const [reports, SetReports] = useState<reportstype[]>([])
    const [resolved, SetResolved] = useState(false)
    const [nextUrl, setNextUrl] = useState('')
    const [loadNext, loader] = useState(false)
    const modalCloser = useRef<HTMLButtonElement>(null)
    const [ActionReport, SetActionReport] = useState<reportstype | null>(null)
    const router = useNavigate()


    useEffect(() => {
        CarreerInnAxios.get('admin/reports/' + `?${nextUrl}`).then(res => {

            SetResolved(true)
            SetReports(res.data.results)
            if (res.data.next) setNextUrl(res.data.next.split('?')[1])
            else setNextUrl('')
        })
            .catch(() => {
                SetResolved(true)
                validation('Server Error')
            })
    }, [loadNext])

    return (
        <div className='w-100'>
            <header className='w-100 d-flex p-1 p-md-4 a-center'>
                <h3>All Reports</h3>
            </header>

            <div className="row p-1 m-md-2 m-1 gy-2 container-height-admin">


                {
                    reports[0] ?
                        reports.map(report => {
                            return (
                                <div key={report.id} className='col-12 col-md-6 p-1 p-md-4 r-7 pb-md-3 app-shadow d-flex'>
                                    {
                                        report.post.content_image ?
                                            <img className='me-1 r-7' src={report.post.content_image} width={60} height={60} alt="" />

                                            :
                                            null
                                    }
                                    <div>
                                        <h5>Post by {report.post.posted_user.username}</h5>
                            
                                        <p className="f-small" onClick={()=> router(`/show-profile/${report.user.username}`, { state: { 'user_id': report.user.id } }) }><span className="text-danger">Reported by</span> {report.user.username}</p>
                                        <p className="f-small">Total reports : <span className="text-danger">{report.total_reports}</span></p>
                                    </div>

                                    <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto me-1 bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>

                                    <ul className="dropdown-menu dropdown-menu-end app-font">
                                        <li className="dropdown-item weight-700" data-bs-toggle="modal" data-bs-target="#reportmodal" onClick={() => SetActionReport(report)}>Expand</li>
                                        <li className='dropdown-item c-pointer' onClick={()=>{
                                            block_user_from_report(report.user.id)
                                            .then(()=>{
                                                success('User banned')
                                                SetReports(reports.filter(r =>r.user.id != report.user.id))
                                            })
                                        }}>Block reporter</li>
                                    </ul>
                                </div>  
                            )
                        })
                        :
                        null
                }

                {
                    !reports[0] && !resolved ?
                        <div className="d-flex j-center pt-3 pb-3">
                            <div className="lds-spinner lds-spinner2 me-5 mt-1" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
                        :
                        null
                }
                {
                    !reports[0] && resolved ?
                        <div className='col-12 d-flex acenter j-center m-2 mt-0  pt-1 p-2'>
                            <p>Seem's like there's no reports.</p>
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

                <div className="modal fade app-font" id="reportmodal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog profile-modal">
                        <div className="modal-content">
                            <div className="modal-header b-none">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Action</h1>
                                <button type="button" className="btn-close" ref={modalCloser} data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body info-modal input-infos ps-md-4 ps-3">
                                {
                                    ActionReport ?
                                        <SmallPostCard post={ActionReport.post} report={ActionReport} />
                                        :
                                        null
                                }

                            </div>

                            <div className="modal-footer b-none">
                                <button className="btn-1 pt-2 pb-2" onClick={() => {
                                    {
                                        ActionReport ?
                                            delete_post(ActionReport.post.id)
                                                .then(() => {
                                                    modalCloser.current!.click()
                                                    success('Post deleted')
                                                    SetReports(reports.filter(r =>r.post.id != ActionReport.post.id))
                                                })
                                            :
                                            null
                                    }
                                }}>Delete post</button>
                            </div>
                        </div>
                    </div>
                </div>



            </div>

        </div>

    )
}

export default Reports