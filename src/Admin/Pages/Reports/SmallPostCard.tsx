

import React from 'react'
import default_user_image from '../../../AppMain/AppConfig/AppConstants'
import { post } from '../../../User/UserConfig/Constants'
import { RootState } from '../../../AppMain/AppConfig/Redux/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateTimeSince } from '../../../User/UserConfig/Helper'
import parse from 'html-react-parser'
import { Element } from 'domhandler'
import { reportstype } from '../Helper'


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

function SmallPostCard({ post, report }: { post: post, report: reportstype }) {
    const user = useSelector((state: RootState) => state.logged_user.value)
    const router = useNavigate()


    return (
        <>
            <div className={'col-12 mb-3 post-card app-shadow'}>
                <div className="posted-user-holder">
                    <img
                        onClick={() => {

                            post.posted_user.username != user.username ?

                                router(`/show-profile/${post.posted_user.username}`, { state: { 'user_id': post.posted_user.id } })
                                :
                                null
                        }}
                        className='rounded-circle c-pointer'
                        src={post.posted_user.profile ? post.posted_user.profile : default_user_image}
                        alt="posted_user" width={60} height={60} />

                    <div className="f-small ms-2 app-font" onClick={() => {

                        post.posted_user.username != user.username ?

                            router(`/show-profile/${post.posted_user.username}`, { state: { 'user_id': post.posted_user.id } })
                            :
                            null
                    }}>
                        <p className="weight-700 f-medium c-pointer">{post.posted_user.username == user.username ? 'You' : post.posted_user.username}</p>
                        <p>{post.posted_user.info}</p>
                        <p>{updateTimeSince(String(post.posted_on))}</p>
                    </div>

                </div>
                <p className="mt-1 pb-2 ps-3 pe-3  app-font weight-500 p-1 post-content-text" style={{ whiteSpace: 'pre-line' }}>{parser(post.content_text)}</p>

                {
                    post.content_image ?
                        <img src={post.content_image} alt="item" className='post' />
                        :
                        null

                }

                {
                    post.likes > 0 ?
                        <div className="d-flex a-center gx-2 ms-3 mt-2 pb-3">
                            <img src="https://static.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt" width={18} height={18} alt="likes" />
                            <p className="f-small ms-2">{post.likes} {post.likes == 1 ? 'Like' : 'likes'}</p>
                        </div>
                        :
                        null
                }

            </div>
            <div className='p-2'>

                <p className="weight-600">Report by {report.user.username}</p>
                <p className="f-small text-danger">Total : {report.total_reports}</p>

                <p>{report.content}</p>
            </div>

        </>

    )
}

export default SmallPostCard