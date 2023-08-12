import default_user_image from '../../../AppMain/AppConfig/AppConstants'
import './Posts.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../../AppMain/AppConfig/Redux/store'
import parse from 'html-react-parser'
import { useState } from 'react'
import { Element } from 'domhandler'
import CommentsCard from './CommentsCard'
import { comment, post } from '../../UserConfig/Constants'
import { delete_post, follow_user, get_comments, likePost, post_comment, updateTimeSince } from '../../UserConfig/Helper'
import { useLocation, useNavigate } from 'react-router-dom'
import { save_unsave_post } from './Helper'
import { success } from '../Profile/UserProfile/Includes/Jobs/Helper'
import verified_image from '../../../AppMain/AppConfig/vaerifiedImage'

const parser = (input: string) =>
    parse(input, {
        replace: (domNode) => {

            if (domNode.type === 'tag') {
                const element = domNode as Element;
                element.attribs.target = '_blank';
                element.attribs.rel = 'noopener noreferrer';

                return domNode;
            }
        }
    });


function PostCard({ post, deletepost, updatePost, reportPost, updateSaved }: { post: post, deletepost: (post_id: number) => void, updatePost: (c_text: string, c_image: string | null, post_id: number) => void, reportPost: (post_id: number) => void, updateSaved: (p: number) => void }) {

    const user = useSelector((state: RootState) => state.logged_user.value)
    const [ShowComment, setvisible] = useState(false)
    const [is_liked, setIsliked] = useState(post.is_liked)
    const [is_following, setFollowing] = useState(post.is_following)
    const [like_count, SetlikeCount] = useState(post.likes)
    const [comments, SetComments] = useState<comment[]>([])
    const [NextUrl, setNextUrl] = useState('')
    const [loading, Setloading] = useState(false)
    const [nocomments, Setnocomments] = useState(false)
    const routerstate = useLocation()
    const post_id = routerstate.state ? routerstate.state.post_id : null
    const router = useNavigate()

    const delete_local_comment = (comment_id: number) => SetComments(comments.filter(c => c.id != comment_id))

    return (
        <div className={post.id == post_id ? 'col-12 mb-md-3 mb-0 post-card app-shadow app-blue-gray mobile-border' : 'mobile-border col-12 mb-md-3 mb-0 post-card app-shadow'}>
            <div className="posted-user-holder ps-md-3 pe-md-3 ps-2 pe-1 normal-line-height">
                <img
                    onClick={() => {

                        post.posted_user.username != user.username ?

                            router(`/show-profile/${post.posted_user.username}`, { state: { 'user_id': post.posted_user.id } })
                            :
                            null
                    }}
                    className='resize-phone rounded-circle c-pointer'
                    src={post.posted_user.profile ? post.posted_user.profile : default_user_image}
                    alt="posted_user" width={60} height={60} />

                <div className="f-small ms-2 app-font" onClick={() => {

                    post.posted_user.username != user.username ?

                        router(`/show-profile/${post.posted_user.username}`, { state: { 'user_id': post.posted_user.id } })
                        :
                        null
                }}>
                    <p className="weight-700 f-medium c-pointer">{post.posted_user.username == user.username ? 'You' : post.posted_user.username}
                        {
                            post.posted_user.is_premium_user ?
                                <img className='ms-1' src={verified_image} width={19} height={19} alt="" />

                                :
                                null
                        }
                    </p>
                    <p className='m-f-small'>{post.posted_user.info}</p>
                    <p className='m-f-small'>{updateTimeSince(String(post.posted_on))}</p>
                </div>
                {
                    post.posted_user.username == user.username ?
                        <>
                            <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto me-1 bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>

                            <ul className="dropdown-menu dropdown-menu-end app-font">
                                <li><p className="dropdown-item weight-700" onClick={() => { updatePost(post.content_text, post.content_image, post.id) }} >Edit Post</p></li>
                                <li><div className="dropdown-divider"></div></li>
                                <li onClick={() => delete_post(post.id).then(() => {
                                    deletepost(post.id);
                                })}>
                                    <p className='dropdown-item weight-700 text-danger'>Delete Post</p>
                                </li>
                            </ul>
                        </>
                        :
                        <>
                            <p className="f-medium ms-auto follow app-color me-0 f-m-smaller" onClick={() => {
                                follow_user(post.posted_user.id)
                                    .then(() => {
                                        setFollowing(!is_following)
                                    })
                            }} >{is_following ? 'Unfollow' : 'Follow'}</p>

                            <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-1 me-1 bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>

                            <ul className="dropdown-menu dropdown-menu-end app-font">
                                <li onClick={() => {
                                    save_unsave_post(post.id)
                                        .then((d) => {
                                            updateSaved(post.id)
                                            success('Post ' + d)
                                        })

                                }}><p className="dropdown-item weight-700" >{post.is_saved ? 'Unsave' : 'Save Post'}</p></li>
                                <li><div className="dropdown-divider"></div></li>
                                <li onClick={() => { reportPost(post.id) }}>
                                    <p className='dropdown-item weight-700 text-danger'>Report Post</p>
                                </li>
                            </ul>

                        </>
                }
            </div>
            <p className="mt-1 pb-2 ps-md-3 pe-md-3 ps-2 pe-1 app-font weight-500 p-1 post-content-text" style={{ whiteSpace: 'pre-line' }}>{parser(post.content_text)}</p>

            {
                post.content_image ?
                    <img src={post.content_image} alt="item" className='post' />
                    :
                    null

            }

            {
                like_count > 0 ?
                    <div className="d-flex a-center gx-2 ms-3 mt-2">
                        <img src="https://static.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt" width={18} height={18} alt="likes" />
                        <p className="f-small ms-2">{like_count} {like_count == 1 ? 'Like' : 'likes'}</p>
                    </div>
                    :
                    null
            }

            <div className="actions-holder">
                {
                    is_liked ?

                        <div className="action" onClick={() => {
                            likePost(post.id)
                                .then(() => {
                                    setIsliked(false)
                                    SetlikeCount(like_count - 1)
                                })
                        }}>
                            <svg className='resize-phone-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="like-creation-medium" data-supported-dps="24x24">
                                <g>
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M12.69 9.5H5.06a1.8 1.8 0 00-1.56 2A1.62 1.62 0 005.15 13h.29a1.38 1.38 0 00-1.34 1.39 1.43 1.43 0 001.31 1.42A1.42 1.42 0 006 18.35a1.45 1.45 0 00-.15 1 1.51 1.51 0 001.51 1.12h4.08a6.3 6.3 0 001.56-.2l2.56-.75h3.38c1.78-.07 2.26-8.26 0-8.26h-1c-.17 0-.27-.34-.71-.82-.65-.71-1.39-1.62-1.91-2.13a12.62 12.62 0 01-3-3.92C11.9 3.42 11.85 3 11 3a1.38 1.38 0 00-1.21 1.45c0 .25.13 1.12.18 1.43a10.6 10.6 0 001.76 3.62" fill="#378fe9" fillRule="evenodd" />
                                    <path d="M5.06 10a1.42 1.42 0 00-1.56 1.5A1.6 1.6 0 005.15 13h.29a1.37 1.37 0 00-1.34 1.41 1.43 1.43 0 001.31 1.42A1.42 1.42 0 006 18.37a1.45 1.45 0 00-.15 1 1.53 1.53 0 001.52 1.13h4.08a6.8 6.8 0 001.55-.21l2.56-.75h3.38c1.78-.07 2.26-8.26 0-8.26h-1c-.17 0-.27-.34-.71-.82-.65-.71-1.39-1.62-1.91-2.13a12.62 12.62 0 01-3-3.92C11.9 3.44 11.85 3 11 3a1.29 1.29 0 00-.91.48 1.32 1.32 0 00-.3 1c0 .25.13 1.12.18 1.43A15.82 15.82 0 0011.73 10z" fill="none" stroke="#004182" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>


                            <p className="f-large f-m-medium app-font f-m-smaller">Like</p>
                        </div>

                        :

                        <div className="action d-flex" onClick={() => {
                            likePost(post.id)
                                .then(() => {
                                    setIsliked(true)
                                    SetlikeCount(like_count + 1)
                                })
                        }}>
                            <svg className='resize-phone-svg' viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2_517)">
                                    <path d="M20.2099 11.53L16.2999 7.62005C15.5313 6.85041 14.9527 5.91227 14.6099 4.88005L14.1199 3.41005C13.9359 2.8632 13.5852 2.38775 13.1171 2.05053C12.6489 1.71332 12.0869 1.53129 11.5099 1.53005C11.1488 1.52873 10.7909 1.59856 10.4567 1.73555C10.1226 1.87253 9.8187 2.07399 9.56241 2.32843C9.30612 2.58286 9.10246 2.88528 8.96304 3.21843C8.82363 3.55157 8.7512 3.90891 8.74989 4.27005V5.39005C8.75212 6.35835 8.90737 7.32021 9.20989 8.24005L9.63989 9.53005H4.86989C4.30763 9.53005 3.7684 9.7534 3.37082 10.151C2.97325 10.5486 2.74989 11.0878 2.74989 11.65C2.75127 11.9956 2.83554 12.3358 2.99563 12.642C3.15571 12.9483 3.38694 13.2117 3.66989 13.41C3.38668 13.6035 3.15488 13.863 2.99458 14.1662C2.83427 14.4694 2.75028 14.8071 2.74989 15.15C2.74194 15.5725 2.85926 15.9879 3.08705 16.3439C3.31484 16.6998 3.64291 16.9803 4.02989 17.15C3.85014 17.4529 3.75355 17.7979 3.74989 18.15C3.74902 18.6921 3.95583 19.2139 4.32781 19.6082C4.69979 20.0025 5.20869 20.2394 5.74989 20.27V20.41C5.74989 20.9723 5.97325 21.5115 6.37082 21.9091C6.7684 22.3067 7.30763 22.53 7.86989 22.53H15.3599C16.6019 22.5289 17.827 22.2415 18.9399 21.69L19.2499 21.53H21.7499V11.53H20.2099ZM19.7499 19.53H18.7499L18.0199 19.9C17.1827 20.3117 16.2628 20.5271 15.3299 20.53H8.46989C8.24675 20.5389 8.02705 20.4729 7.84582 20.3424C7.66458 20.2119 7.53224 20.0245 7.46989 19.81L7.21989 18.94L6.36989 18.53C6.17411 18.4503 6.00865 18.3106 5.89725 18.1309C5.78586 17.9512 5.73427 17.7409 5.74989 17.53L5.91989 16.53L5.15989 15.79C4.99454 15.6286 4.89023 15.4148 4.86471 15.1851C4.83919 14.9554 4.89402 14.7239 5.01989 14.53L5.67989 13.44L4.94989 12.34C4.90812 12.2893 4.877 12.2306 4.85837 12.1676C4.83973 12.1045 4.83398 12.0384 4.84144 11.9731C4.84891 11.9078 4.86944 11.8446 4.90181 11.7874C4.93419 11.7302 4.97775 11.6801 5.02989 11.64C5.12484 11.561 5.24662 11.5216 5.36989 11.53H12.4199L11.1099 7.61005C10.871 6.89429 10.7495 6.14461 10.7499 5.39005V4.28005C10.755 4.08273 10.8356 3.89489 10.9752 3.75532C11.1147 3.61575 11.3026 3.53511 11.4999 3.53005C11.6567 3.53017 11.8095 3.57943 11.9369 3.67091C12.0642 3.76239 12.1597 3.89149 12.2099 4.04005L12.7499 5.53005C13.1814 6.84496 13.9102 8.04266 14.8799 9.03005L19.3799 13.53H19.7499V19.53Z" fill="black" fillOpacity="0.6" />
                                </g>
                                <defs>
                                    <rect width="24" height="24" fill="white" transform="translate(0.75 0.530029)" />
                                </defs>
                            </svg>

                            <p className="f-large app-font">Like</p>
                        </div>
                }


                <div className="action" onClick={() => {
                    setvisible(!ShowComment)
                    get_comments(post.id, NextUrl)
                        .then((data) => {

                            if (data.count == 0) Setnocomments(true)

                            SetComments([...data.results])
                            setNextUrl(data.next ? data.next : '')
                        })
                }}>
                    <svg className='resize-phone-svg' viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_2_527)">
                            <path d="M7.31006 9.53003H17.3101V10.53H7.31006V9.53003ZM7.31006 13.53H14.3101V12.53H7.31006V13.53ZM23.3101 11.53C23.3249 12.625 23.0743 13.7072 22.5797 14.6842C22.0851 15.6611 21.3613 16.5038 20.4701 17.14L12.3101 22.53V18.53H8.31006C6.45354 18.53 4.67307 17.7925 3.36031 16.4798C2.04756 15.167 1.31006 13.3865 1.31006 11.53C1.31006 9.67351 2.04756 7.89304 3.36031 6.58028C4.67307 5.26753 6.45354 4.53003 8.31006 4.53003H16.3101C18.1666 4.53003 19.9471 5.26753 21.2598 6.58028C22.5726 7.89304 23.3101 9.67351 23.3101 11.53ZM21.3101 11.53C21.3101 10.2039 20.7833 8.93218 19.8456 7.9945C18.9079 7.05681 17.6361 6.53003 16.3101 6.53003H8.31006C6.98398 6.53003 5.71221 7.05681 4.77452 7.9945C3.83684 8.93218 3.31006 10.2039 3.31006 11.53C3.31006 12.8561 3.83684 14.1279 4.77452 15.0656C5.71221 16.0032 6.98398 16.53 8.31006 16.53H14.3101V18.81L19.3101 15.53C19.9437 15.0763 20.457 14.4748 20.8055 13.7778C21.1541 13.0807 21.3272 12.3092 21.3101 11.53Z" fill="black" fillOpacity="0.6" />
                        </g>
                        <defs>
                            <rect width="24" height="24" fill="white" transform="translate(0.310059 0.530029)" />
                        </defs>
                    </svg>
                    <p className="f-large app-font">Comment</p>
                </div>
            </div>
            <div>
                <div className="row gap-2 like-input-border a-center pb-2 pt-md-2 pb-md-2 mb-2 pt-2 j-space-around ps-1 pe-1" id={ShowComment ? '' : 'hidden'}>
                    <div className="col-1">
                        <img src={user.profile ? user.profile : default_user_image} width={45} height={45} className='rounded-circle' alt="user_profile" />
                    </div>
                    <div className="col-10 d-flex a-center p-2 pe-0">
                        <form className='d-flex w-100' onSubmit={e => {
                            Setloading(false);
                            post_comment(e, post.id)
                                .then((data) => {

                                    let date = new Date()
                                    let new_comment: comment = {
                                        id: data.d, user: {
                                            id: user.user_id ? user.user_id : 0,
                                            username: user.username ? user.username : '',
                                            profile: user.profile ? user.profile : default_user_image,
                                            info: '',
                                            is_premium_user: user.is_premium_user

                                        }, comment_text: data.comment ? data.comment : '', commented_on: date
                                    }

                                    SetComments([new_comment, ...comments])
                                })
                        }}>
                            <input type="text" name='comment' className='ms-1 col-10 input-no-border-no-outline' placeholder='Write feedback' />
                            <button type='submit' className="col-2 app-color post-btn">

                                {
                                    loading ?

                                        <div className="lds-spinner" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                                        :

                                        'Post'
                                }

                            </button>
                        </form>
                    </div>
                </div>
                <div className="comments-holder" id={ShowComment ? '' : 'hidden'}>
                    {
                        comments.map(comment => {
                            return (
                                <CommentsCard key={comment.id} comment={comment} delete_local_comment={delete_local_comment} />
                            )
                        })
                    }
                    {
                        !comments[0] && !nocomments ?
                            <div className="d-flex j-center pt-3 pb-3">
                                <div className="lds-spinner lds-spinner2 me-5 mt-1 mb-1" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                            </div>
                            :
                            null
                    }

                    {
                        NextUrl != '' ?
                            <div className="d-flex p-1 a-center app-gray-border j-center r-7 mt-1 c-pointer" onClick={() => {
                                get_comments(post.id, NextUrl)
                                    .then((data) => {
                                        SetComments([...comments, ...data.results])
                                        setNextUrl(data.next ? data.next : '')
                                    })
                            }}>
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
            </div>
        </div>
    )
}

export default PostCard