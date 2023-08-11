import { useNavigate } from 'react-router-dom'
import default_user_image from '../../../AppMain/AppConfig/AppConstants'
import { post } from '../../UserConfig/Constants'
import { job } from '../Jobs/Helper'
import { company, user } from '../Profile/UserProfile/Includes/Jobs/Helper'
import './search.css'

import { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react'
import { updateTimeSince } from '../../UserConfig/Helper'
import { debounce } from '../Profile/Helper'
import { RootState } from '../../../AppMain/AppConfig/Redux/store'
import { useSelector } from 'react-redux'

function SearchResults({ type, content, query, loading, ChangeType }: { ChangeType: Dispatch<SetStateAction<string>>, loading: boolean, query: string, type: string, content: post[] | company[] | user[] | job[] }) {

    const router = useNavigate()
    const Loggeduser = useSelector((state: RootState) => state.logged_user.value)
    const [company, SetCompanyShow] = useState<company | null>(null)
    const modalCompanyCLoser = useRef<HTMLButtonElement>(null)
    const [searchLoading, SetSearchloading] = useState(false)
    const searchInp = useRef<HTMLInputElement>(null)

    const search_debounce = debounce((query) => {
        if (query != '') {
            SetSearchloading(false)
            router('/search', { state: { 'query': query } });
            searchInp.current!.value = ''
        }
        else {
            SetSearchloading(false)
        }

    })

    return (
        <div className='app-font'>

            <div className="col-12 d-sm-none mb-0 p-3 pb-0">
                <div className="col-12 ms-auto me-auto">
                    <div className="d-flex bg-blg a-center r-7 pt-1 pb-1 pe-3">
                        <svg className='col-1 m-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width={19} height={19}><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" /></svg>
                        <input ref={searchInp} onChange={e => search_debounce(e.target.value)} type="text" className='bg-inherit s-input col-10 app-font' placeholder='Search anything...' />
                        <div id={searchLoading ? '' : 'hidden-search-loading'} className="lds-spinner lds-spinner2 lds-spinner4 h-0 me-3 pe-2" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                    </div>
                </div>
                <div className="d-flex gap-1 p-1 mt-1 pb-0 w-100">
                    <h5 className="resize-heading">Showing</h5>
                    <select className='r-7 app-font text-center border-0 bg-inherit outline-none' onChange={e => ChangeType(e.target.value)}>
                        <option value={'posts'}>Posts</option>
                        <option value={'users'}>Users</option>
                        <option value={'jobs'}>Jobs</option>
                        <option value='company'>Company</option>
                    </select>
                </div>
            </div>
            {
                !loading && content && !content[0] ?
                    <div className="d-flex w-100 p-3 mt-md-3 mt-0 j-center a-center">
                        <p>No {type} for "{query}"</p>
                    </div>
                    :
                    null
            }
            {
                loading && !content ?
                    <div className="w-100 d-flex j-center mt-4">
                        <div className="p-2 bg-blg d-flex a-center gap-1 ms-auto me-auto w-f-content pe-4 r-7">
                            <p className='f-small f-m-small'>loading results</p>
                            <div className="lds-spinner lds-spinner2 lds-spinner4 h-0 mt-1 pe-2" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
                    </div>
                    :
                    null
            }


            <div className="row p-3 mt-md-2 gy-2">


                {
                    type == 'users' && content ?
                        (content as user[]).map(usr => {
                            return (
                                <div key={usr.id} className='col-12 p-1 r-7 app-shadow d-flex'  onClick={() => {
                                    if (usr.id == Loggeduser.user_id ) {
                                        router('/profile')
                                    } else {
                                        router(`/show-profile/${usr.username}`, { state: { 'user_id': usr.id } })
                                    }

                                }} >
                                    <img className='me-1 r-7 rounded-circle' src={usr.profile ? usr.profile : default_user_image} width={70} height={70} alt=""/>
                                    <div className='normal-line-height'>
                                        <h5>{usr.username}</h5>
                                        <p className="f-small">{usr.info ? usr.info : 'no info'}</p>
                                    </div>

                                </div>
                            )
                        })


                        :

                        null
                }

                {
                    type == 'company' && content ?
                        (content as company[]).map(company => {
                            return (
                                <div data-bs-toggle="modal" data-bs-target="#AboutCompany" key={company.name} className='col-12 p-1 r-7 app-shadow d-flex gap-1' onClick={() => SetCompanyShow(company)}>
                                    <img className='me-1 r-7 rounded-circle' src={company.logo} width={70} height={70} alt="" onClick={() => { }} />
                                    <div className='normal-line-height'>
                                        <h5>{company.name}</h5>
                                        <p className="f-small">{company.department.title}</p>
                                    </div>

                                </div>
                            )
                        })


                        :

                        null
                }

                {
                    type == 'jobs' && content ?
                        (content as job[]).map(job => {
                            console.log(job);

                            return (
                                <div key={job.id} className='job-card app-shadow r-7 p-2' onClick={() => router('/jobs', { state: { 'job_id': job.id } })}>
                                    <img src={job.company.logo} width={78} height={78} className='resize-phone rounded-circle' alt="company_logo" />
                                    <div className="ms-2 normal-line-height">
                                        <p className="weight-600 app-color f-large c-pointer f">{job.name}</p>
                                        <p className="">{job.company.name}</p>
                                        <p className='f-small f-m-smaller mt-1 mt-md-2 '>{updateTimeSince(String(job.posted_on))} | {job.applicants_count == 0 ? 'Be the first to apply' : job.applicants_count + ' applicants'}</p>
                                    </div>
                                </div>
                            )
                        })


                        :

                        null
                }

                {
                    type == 'posts' && content ?
                        (content as post[]).map(post => {

                            return (
                                <div key={post.id} className='col-12 p-1 p-md-4 r-7 pb-md-3 app-shadow d-flex' onClick={() => router('/', { state: { 'post_id': post.id } })}>
                                    {
                                        post.content_image ?
                                            <img className='me-1 r-7' src={post.content_image} width={60} height={60} alt="" />

                                            :
                                            null
                                    }
                                    <div>
                                        <h5>Post by {post.posted_user.username}</h5>
                                        <p className='f-small'>{post.content_text.length > 30 ? post.content_text.slice(0, 30) + '...' : post.content_text}</p>
                                    </div>

                                </div>
                            )
                        })


                        :

                        null
                }


                {
                    company &&
                    <div className="modal fade app-font" id="AboutCompany" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog Register-modal">
                            <div className="modal-content">
                                <div className="modal-header b-none">
                                    <h5 className="modal-title weight-600 pb-0" id="exampleModalLabel">About Company</h5>
                                    <button ref={modalCompanyCLoser} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body pt-0 m-heigh">
                                    <div className="ms-1 pb-3">

                                        <div className="banner-logo">
                                            <img src={company.banner ? company.banner : ''} className='banner-2' alt="" />
                                            <img src={company.logo} width={70} height={70} alt="" className="logo" style={{ 'left': company.banner ? '' : '-2px' }} />
                                        </div>

                                        <div className={company.banner ? "normal-line-height mt-md-0 mt-4" : "normal-line-height mt-md-0 mt-5 pt-3 pt-md-0"} style={{ 'marginTop': company.banner ? '' : '65px' }}>
                                            <h3 className='title-company'>{company.name}</h3>
                                            <p className="weight-600 c-pointer"
                                                onClick={() => {
                                                    modalCompanyCLoser.current!.click()
                                                    router(`/show-profile/${company.ceo.username}`, { state: { 'user_id': company.ceo.id } })
                                                }}
                                            >CEO : {company.ceo.username}</p>
                                            <p className="mt-2 mb-3">{company.excerpt}</p>
                                            <div className="d-flex detail-svg">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="25" height="25" focusable="false">
                                                    <path d="M4 2v20h16V2zm14 18h-4v-2h-4v2H6V4h12zm-7-8H8v-2h3zm0 4H8v-2h3zm5-4h-3v-2h3zm-5-4H8V6h3zm5 0h-3V6h3zm0 8h-3v-2h3z"></path>
                                                </svg>
                                                <p className="ms-2">{company.employees_start} - {company.employees_end} employees | {company.department.title}</p>
                                            </div>
                                            <p className='mt-2 mb-2'>location : {company.location}</p>

                                            <p className='pb-1' style={{ whiteSpace: 'pre-line' }}>{company.about}</p>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }


            </div>

        </div>
    )
}

export default SearchResults