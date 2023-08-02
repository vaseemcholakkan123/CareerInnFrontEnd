import CarreerInnAxios from '../../../AppMain/AppConfig/AxiosConfig'
import { success } from '../../../User/Splits/Profile/UserProfile/Includes/Jobs/Helper'
import { validation } from '../../../User/Splits/Profile/UserProfile/Includes/Projects/Helper'
import { updateTimeSince } from '../../../User/UserConfig/Helper'
import { NewsType, add_news, delete_news, update_news } from '../Helper'
import './../../admin.css'

import { useEffect, useCallback, useState, useRef } from 'react'

function News() {
    const [Allnews, SetNews] = useState<NewsType[]>([])
    const [resolved, SetResolved] = useState(false)
    const [nextUrl, setNextUrl] = useState('')
    const [loadNext, loader] = useState(false)
    const modalCloser = useRef<HTMLButtonElement>(null)
    const titleinput = useRef<HTMLInputElement>(null)
    const [UpdateNews, SetUpdateNews] = useState(0)
    const modalOpener = useRef<HTMLDivElement>(null)

    useEffect(() => {
        CarreerInnAxios.get('admin/News/' + `?${nextUrl}`).then(res => {

            SetResolved(true)
            SetNews(res.data.results)
            if (res.data.next) setNextUrl(res.data.next.split('?')[1])
            else setNextUrl('')
        })
            .catch(() => {
                SetResolved(true)
                validation('Server Error')
            })
    }, [loadNext])


    const updatecb = (news_id:number) => {

        if (news_id == 0) return
        SetUpdateNews(news_id)
        
        titleinput.current!.value = Allnews.find(n => n.id == news_id)!.title
        modalOpener.current!.click()

    }

    return (
        <div className='w-100'>
            <header className='w-100 d-flex p-1 p-md-4 a-center'>
                <h3>CareerInn News</h3>

                <div ref={modalOpener} className='d-flex a-center gap-2 ms-auto btn-3' data-bs-toggle="modal" data-bs-target="#Newsmodal">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="18" height="18" focusable="false">
                        <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"></path>
                    </svg>
                    <p>Add New</p>
                </div>
            </header>

            <div className="row p-1 m-md-2 m-1 gy-2 container-height-admin">


                {Allnews[0] && resolved ?
                    Allnews.map(news => {
                        return (
                            <div key={news.id} className='col-12 col-md-6 p-1 p-md-4 r-7 pb-md-3 app-shadow d-flex'>  
                                <div>
                                    <h5>{news.title}.</h5>
                                    <p className="f-small">Posted {updateTimeSince(String(news.posted_time))}</p>
                                </div>

                                <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto me-1 bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>

                                <ul className="dropdown-menu dropdown-menu-end app-font">
                                    <li><p className="dropdown-item weight-700" onClick={() => { updatecb(news.id) }} >Edit News</p></li>
                                    <li className='dropdown-item c-pointer' onClick={() => {
                                        delete_news(news.id)
                                            .then(() => {
                                                SetNews(Allnews.filter(n => n.id != news.id))
                                                success('Deleted')
                                            })
                                            .catch(() => {
                                                validation('Server Error')
                                            })
                                    }}>Delete news</li>
                                </ul>
                            </div>
                        )
                    })
                    :
                    null
                }

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
                            <p>Seem's like there's no news added.</p>
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

                <div className="modal fade app-font" id="Newsmodal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog profile-modal">
                        <div className="modal-content">
                            <div className="modal-header b-none">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{UpdateNews == 0 ? 'Add News' : 'Edit news'}</h1>
                                <button type="button" className="btn-close" ref={modalCloser} data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body info-modal h-t input-infos ps-md-4 ps-3">

                                <p>Enter the title</p>
                                <input ref={titleinput} type="text" className="ms-1" />


                            </div>

                            <div className="modal-footer b-none">
                                <button className="btn-1 pt-2 pb-2" onClick={() => {
                                    UpdateNews == 0 ?
                                        add_news(titleinput.current!.value)
                                            .then(res => {
                                                success('Added')
                                                titleinput.current!.value = ''
                                                SetNews([res.data, ...Allnews])
                                                modalCloser.current!.click()
                                            })
                                        :
                                        update_news(titleinput.current!.value , UpdateNews)
                                            .then(res => {
                                                success('Updated')
                                                titleinput.current!.value = ''
                                                SetNews(Allnews.map(news=>{
                                                    if (news.id == UpdateNews) return res.data 
                                                    else return news
                                                }))
                                                modalCloser.current!.click()
                                            })
                                }}>{UpdateNews == 0 ? 'Add News' : 'Update'}</button>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default News