import default_user_image from '../../../AppMain/AppConfig/AppConstants'
import { comment } from '../../UserConfig/Constants'
import { updateTimeSince } from '../../UserConfig/Helper'
import './Posts.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../../AppMain/AppConfig/Redux/store'
import { delete_comment } from './Helper'

function CommentsCard( {comment , delete_local_comment} :{comment: comment , delete_local_comment : (comment_id:number) => void} ) {
    const user = useSelector((state: RootState) => state.logged_user.value)
    return (
        <div className='comment'>
            <img src={comment.user.profile ? comment.user.profile : default_user_image} width={42} height={42} className='rounded-circle me-1' alt="commented_user" />
            <div className="comment-text w-100 app-font">
                <div className="d-flex a-center">
                    <div>
                        <p className="weight-700">{comment.user.username == user.username ? 'You' : comment.user.username}</p>
                        <p className="f-small d-md-block d-none">{comment.user.info ? comment.user.info : ''}</p>
                    </div>
                    <p className="f-small mt-1 ms-auto">{updateTimeSince(String(comment.commented_on))}</p>
                    {
                        user.user_id == comment.user.id ?
                            <>
                                <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-1 bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>

                                <ul className="dropdown-menu dropdown-menu-end app-font">
                                    <li><p className="dropdown-item weight-700" onClick={() => { delete_comment(comment.id).then(()=>delete_local_comment(comment.id)) }} >delete</p></li>
                                </ul>
                            </>
                            :
                            null
                    }
                </div>
                <p className="w-100 ms-1 app-font">{comment.comment_text}</p>
            </div>
        </div>
    )
}

export default CommentsCard