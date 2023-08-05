import CarreerInnAxios from '../../../../AppMain/AppConfig/AxiosConfig'
import { validation } from '../../../Splits/Profile/UserProfile/Includes/Projects/Helper'
import { updateTimeSince } from '../../../UserConfig/Helper'
import './PostRight.css'

import { useState, useEffect } from 'react'

type newstype = {
    title: string,
    posted_time: Date,
    id:number
}

function PostRight() {

    const [resolved, SetResolved] = useState(false)
    const [nextUrl, setNextUrl] = useState('')
    const [loadNext, loader] = useState(false)
    const [Allnews, Setnews] = useState<newstype[]>([])

    useEffect(() => {
        CarreerInnAxios.get('admin/get-news/' + `?${nextUrl}`).then(res => {

            SetResolved(true)
            Setnews([...Allnews,...res.data.results])
            if (res.data.next) setNextUrl(res.data.next.split('?')[1])
            else setNextUrl('')
        })
            .catch(() => {
                SetResolved(true)
                validation('Server Error')
            })

    }, [loadNext])
    return (
        <div className='posts-right'>
            <p className='weight-500 f-large app-color mb-2'>CarreerInn News</p>
            <div className="news-holder app-font f-small">
                <ul>
                    {
                        Allnews.map(news => {
                            return (
                                <li key={news.id}>
                                    <p>{news.title}</p>
                                    <p>{ updateTimeSince(String(news.posted_time)).includes(',') ? updateTimeSince(String(news.posted_time)).split(',')[0] : updateTimeSince(String(news.posted_time)) }</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            {
                !Allnews[0] && !resolved ?
                    <div className="d-flex j-center pt-3 pb-3">
                        <div className="lds-spinner lds-spinner2 me-5 mt-1" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                    :
                    null
            }
            {
                !Allnews[0] && resolved ?
                    <div className='col-12 d-flex acenter j-center m-2 mt-0  pt-1 p-2'>
                        <p>Seem's like there's no news.</p>
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

        </div>
    )
}

export default PostRight