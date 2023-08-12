import './Posts.css'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../AppMain/AppConfig/Redux/store'
import default_user_image from '../../../AppMain/AppConfig/AppConstants'
import PostCard from './PostCard'
import { post, postform } from '../../UserConfig/Constants'
import { handlePostSubmission, update_post } from '../../UserConfig/Helper'
import CarreerInnAxios from '../../../AppMain/AppConfig/AxiosConfig'
import { useLocation, useNavigate } from 'react-router-dom'
import { report_post_helper } from './Helper'
import { success } from '../Profile/UserProfile/Includes/Jobs/Helper'
import { inform, validation } from '../Profile/UserProfile/Includes/Projects/Helper'

type props = {
    profile?: boolean,
    url?: string,

}

function Posts(prop: props) {

    const [posts, Setposts] = useState<post[]>([])
    const [nextUrl, setNextUrl] = useState('')
    const [loadNext, loader] = useState(false)


    const user = useSelector((state: RootState) => state.logged_user.value)
    const [postform, SetPostForm] = useState<postform>({ content_image: null, content_text: '' })
    const ImageInput = useRef<HTMLInputElement>(null)
    const [loading, Setloading] = useState(false)
    const modalClose = useRef<HTMLButtonElement>(null)
    const Posttextarea = useRef<HTMLTextAreaElement>(null)
    const postImage = useRef<HTMLImageElement>(null)
    const modalOpen = useRef<HTMLDivElement>(null)
    const [updating, Setupdating] = useState(false)
    const [editingPost, Setpostid] = useState(0)
    const ReportmodalCloser = useRef<HTMLButtonElement>(null)
    const ReportmodalOopener = useRef<HTMLParagraphElement>(null)
    const reportContent = useRef<HTMLInputElement>(null)
    const [reportPost, setreportPost] = useState(0)
    const [resolved, Setresolved] = useState(false)

    let url = prop.url ? prop.url : `user/posts/`
    const routerstate = useLocation()
    const router = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('user') && !user.profile) {
            inform("let's start by adding profile")
            router('/profile')
        }

        CarreerInnAxios.get(url + `?${nextUrl}`).then((res) => {
            Setresolved(true)
            
            const post_id = routerstate.state ? routerstate.state.post_id : null
            if (post_id) {
                CarreerInnAxios.get(`user/view-post/${post_id}/`)
                    .then(v_res => {
                        Setposts([v_res.data, ...posts, ...res.data.results]);

                    })

            } else Setposts([...posts, ...res.data.results]);


            if (res.data.next) setNextUrl(res.data.next.split('?')[1])
            else setNextUrl('')
        })


    }, [loadNext])

    function remove_post(post_id: number) {
        Setposts(posts.filter(post => post.id != post_id))
    }

    function handlepostUpdate(content_text: string, content_image: string | null, post_id: number) {
        Setpostid(post_id)
        Posttextarea.current!.value = content_text;
        postImage.current!.src = content_image ? content_image : ''
        Setupdating(true)
        modalOpen.current!.click()
        SetPostForm({ content_text: content_text, content_image: null })
    }
    function func_report_post(post_id: number) {
        setreportPost(post_id)
        ReportmodalOopener.current!.click()
    }
    function save_post(p_id: number) {
        Setposts(posts.map(p => {
            if (p.id == p_id) p.is_saved = !p.is_saved
            return p
        }))
    }



    return (
        <div className='posts-container'>
            {
                url.includes('different') || url.includes('saved') ?
                    null :
                    <div className="post-content app-shadow p-0 p-md-3 d-md-flex d-none">
                        <img className='rounded-circle me-2' height={60} width={60} src={user.profile ? user.profile : default_user_image} alt="prof" />
                        <div className="like-input" ref={modalOpen} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <p>Start a Post</p>
                        </div>
                    </div>
            }

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog rezise-phone-modal">
                    <div className="modal-content resize-modal-content">
                        <div className="modal-header bb-none">
                            <h5 className="modal-title app-font weight-600" id="staticBackdropLabel">Start Writing</h5>
                            <button type="button" ref={modalClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body post-modal">
                            <textarea rows={6} ref={Posttextarea} onChange={e => { SetPostForm({ ...postform, content_text: e.target!.value }) }} placeholder='What do you want to talk about..' className="w-100" />
                            <label className="svg" htmlFor="image">
                                <div className='d-flex gap-2 a-center' data-toggle="tooltip" data-placement="left" title="Attach image">
                                    <svg width="21" height="12" viewBox="0 0 21 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.72809 11.5645C4.13115 11.5343 2.78772 10.9533 1.69779 9.82139C0.607854 8.6895 0.0779681 7.32508 0.108128 5.72814C0.138287 4.13121 0.719314 2.78777 1.85121 1.69784C2.9831 0.607908 4.34752 0.0780214 5.94445 0.108181L16.88 0.314708C18.0256 0.336345 18.9987 0.76278 19.7991 1.59401C20.5995 2.42525 20.9889 3.41368 20.9672 4.55931C20.9456 5.70494 20.5192 6.67796 19.6879 7.47838C18.8567 8.2788 17.8683 8.66819 16.7226 8.64656L6.82858 8.4597C6.09954 8.44593 5.48809 8.1826 4.99421 7.66971C4.50034 7.15682 4.26028 6.53586 4.27405 5.80682C4.28782 5.07779 4.55115 4.46633 5.06404 3.97245C5.57693 3.47858 6.19789 3.23852 6.92693 3.25229L16.821 3.43915L16.7915 5.00137L6.89742 4.81451C6.60234 4.80894 6.3531 4.90408 6.14971 5.09993C5.94633 5.29577 5.84185 5.54124 5.83627 5.83633C5.8307 6.13141 5.92584 6.38065 6.12168 6.58404C6.31753 6.78742 6.563 6.8919 6.85808 6.89748L16.7522 7.08433C17.4812 7.0981 18.1022 6.85805 18.615 6.36417C19.1279 5.8703 19.3913 5.25884 19.405 4.5298C19.4188 3.80077 19.1787 3.17981 18.6849 2.66692C18.191 2.15403 17.5795 1.8907 16.8505 1.87693L5.91495 1.6704C4.76932 1.64877 3.78089 2.03816 2.94965 2.83858C2.11842 3.639 1.69199 4.61202 1.67035 5.75765C1.64871 6.90328 2.0381 7.89171 2.83852 8.72294C3.63894 9.55418 4.61197 9.98061 5.7576 10.0022L16.6931 10.2088L16.6636 11.771L5.72809 11.5645Z" fill="black" />
                                    </svg>
                                    <p className="app-font weight-600">Attach Image</p>
                                </div>
                            </label>
                            <input ref={ImageInput} onChange={() => {
                                ImageInput.current!.files ? SetPostForm({ ...postform, content_image: ImageInput.current!.files[0] }) : null
                            }} type="file" className='d-none' accept="image/*" id='image' />
                            <img ref={postImage} className='w-100' src={postform.content_image ? URL.createObjectURL(postform.content_image) : ''} alt="" />
                        </div>
                        <div className="modal-footer bt-none">

                            {
                                updating ?

                                    <button onClick={() => {
                                        Setloading(true);
                                        update_post(postform, editingPost).then((res) => {
                                            Setloading(false);
                                            Posttextarea.current!.value = ''
                                            postImage.current!.src = ''
                                            modalClose.current!.click();
                                            Setposts(
                                                posts.filter(post => {
                                                    if (post.id == res.id) {
                                                        post.content_image = res.content_image;
                                                        post.content_text = res.content_text
                                                    }
                                                    return post
                                                })
                                            )
                                        })
                                            .catch(() => {
                                                Setloading(false)
                                            })
                                    }} className="app-font weight-600 btn-1 p-1 ps-3 pe-3">
                                        {
                                            loading ?
                                                <div className="lds-spinner" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                                                :

                                                'Update'
                                        }

                                    </button>

                                    :


                                    <button onClick={() => {
                                        Setloading(true);
                                        handlePostSubmission(postform).then((res) => {
                                            Setloading(false);
                                            Posttextarea.current!.value = ''
                                            postImage.current!.src = ''
                                            modalClose.current!.click();
                                            Setposts([res, ...posts])
                                        })
                                            .catch(() => {
                                                Setloading(false)
                                            })
                                    }} className="app-font weight-600 btn-1 p-1 ps-3 pe-3">
                                        {
                                            loading ?
                                                <div className="lds-spinner" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                                                :

                                                'Post'
                                        }
                                    </button>
                            }

                        </div>

                    </div>
                </div>
            </div>

            {
                url.includes('different') || url.includes('saved') ?
                <div className="app-shadow bg-white mb-1 p-md-3 pt-3 ps-2 d-flex a-center rlt-7">
                    <h4 className='ms-1 ms-md-2'>{url.includes('saved') ? 'Saved Posts'  : posts[0] ? `All Posts of ${posts[0].posted_user.username}` : 'All posts'}</h4>

                </div>
                :
                <div className="d-md-block d-none or-1 mt-3 mb-3 w-100"></div>

            }
            <div className="posts-holder pb-1">
                {
                    posts.map(item => {
                        return (
                            <PostCard key={item.id} post={item} deletepost={remove_post} updatePost={handlepostUpdate} reportPost={func_report_post} updateSaved={save_post} />

                        )
                    })
                }
                {
                    !posts[0] && !resolved ?
                        <div className="d-flex j-center pt-3 pb-3">
                            <div className="lds-spinner lds-spinner2 me-5 mt-1" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
                        :
                        null
                }
                {
                    !posts[0] && resolved ?
                        <div className='d-flex acenter j-center m-2 mt-0  pt-1 p-2'>
                            <p>Seem's like there's no posts here.</p>
                        </div>
                        :
                        null
                }

            </div>

            {
                nextUrl != '' ?
                    <div className="d-flex p-md-1 pb-2 a-center  j-center r-7 mt-1 c-pointer" onClick={() => loader(!loadNext)}>
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



            {/* Report Post modal */}

            <p data-bs-toggle="modal" data-bs-target="#ReportPost" className='d-none' ref={ReportmodalOopener} ></p>

            <div className="modal fade app-font" id="ReportPost" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog Register-modal">
                    <div className="modal-content">
                        <div className="modal-header b-none">
                            <h5 className="modal-title weight-600 pb-0" id="exampleModalLabel">Report post</h5>
                            <button ref={ReportmodalCloser} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body pt-0 m-heigh">
                            <p className='weight-600'>Tell us why are you reporting this post</p>
                            <div className="ms-md-3">
                                <input type="text" className='report-input w-100' ref={reportContent} />
                            </div>


                            <div className="modal-footer b-none pb-0 mt-md-5 mt-3 pe-0">
                                <button type="button" className="btn-1 pt-md-2 pb-md-2  p-1 pe-3 ps-3" onClick={() => {
                                    report_post_helper(reportPost, reportContent.current!.value).then(() => {
                                        success('Post reported')
                                        Setposts(posts.filter(p => p.id != reportPost))
                                        reportContent.current!.value = ''
                                        ReportmodalCloser.current!.click()
                                    })
                                        .catch(e => {
                                            if (e.response.data.non_field_errors) {
                                                validation("You already reported this post")
                                            }
                                        }
                                        )
                                }} >Report</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal end */}
        </div>
    )
}

export default Posts