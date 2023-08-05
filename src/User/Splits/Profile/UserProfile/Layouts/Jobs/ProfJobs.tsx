import CarreerInnAxios from '../../../../../../AppMain/AppConfig/AxiosConfig'
import './../layouts.css'

import { useEffect, useState } from 'react'

function ProfJobs() {

    const [userJobs, SetUserJobs] = useState<user_jobs[]>([])
    const [nextUrl, setNextUrl] = useState('')
    const [loadNext, SetloadNext] = useState(false)
    const [resolved, Setresolved] = useState(false)


    useEffect(() => {
        CarreerInnAxios.get(`user/get-applied-jobs/?${nextUrl}`)
            .then(res => {
                Setresolved(true)
                SetUserJobs([...userJobs, ...res.data.results])
                if (res.data.next) {
                    setNextUrl(res.data.next.split('?')[1])
                }
                else setNextUrl('')

            })
            .catch(e => {
                console.log(e.response);

            })
    }, [loadNext])

    return (
        <div className='bg-white pt-2'>
            <h4 className='ms-1 me-1 mt-2 ms-md-2 ps-2 mb-md-2 mb-0 pb-md-3 pb-3 border-0 border-bottom'>Track your application</h4>
            <div className="row ps-1 pe-1 j-center gap-0 mt-md-3 mt-0 ps-2">
                {

                    userJobs.map(job => {
                        return (
                            <div key={job.id} className="col-12 d-flex ps-md-3 pe-md-3 job-card a-center">
                                <img src={job.company.logo} className='rounded-circle resize-phone' width={56} height={56} alt="" />
                                <div className='normal-line-height mt-auto mb-md-3 mb-1 ms-2 d-flex f-coloumn j-center'>
                                    <h5 className='m-0 resize-heading'>{job.company.name}</h5>
                                    <p className='f-small f-m-xsmall'>{job.name}</p>
                                    <p className={job.progress == 'Application Rejected' ? 'text-danger f-small f-m-smaller' : 'f-small text-success f-m-xsmall'}>{job.progress}</p>
                                </div>
                                {
                                    job.progress != 'Selected for job' ?
                                        <div className='ms-auto me-md-1 me-3'>
                                            <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                            </svg>

                                            <ul className="dropdown-menu dropdown-menu-end app-font">
                                                <li>
                                                    <p className='dropdown-item text-danger c-pointer' onClick={() => {
                                                    }}>Remove Application</p>
                                                </li>
                                            </ul>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        )
                    })

                }
                {
                    !userJobs[0] && resolved ?
                        <div className='text-center'>
                            <p>Seems Like you've not applied for any jobs</p>
                        </div>
                        :
                        null
                }
                {
                    !resolved ?
                        <div className="d-flex j-center pt-4 pb-3">
                            <div className="lds-spinner lds-spinner2 me-5 mt-3" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                        </div>
                        :
                        null

                }


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
        </div>
    )
}

export default ProfJobs