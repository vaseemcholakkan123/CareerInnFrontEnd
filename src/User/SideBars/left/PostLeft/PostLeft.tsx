import './PostLeft.css'
import { useState } from 'react'
import { RootState } from '../../../../AppMain/AppConfig/Redux/store'
import { useSelector } from 'react-redux'
import default_user_image from '../../../../AppMain/AppConfig/AppConstants'
import { useLocation, useNavigate } from 'react-router-dom'

function PostLeft() {
    const user = useSelector((state: RootState) => state.logged_user.value)
    const router = useNavigate()

    return (
        <div className='posts-left app-font weight-600'>
            <div className="d-flex j-center f-coloumn mt-2 a-center">
                <div className="bannerl r-7" style={{ backgroundImage: user.banner ? `url(${user.banner})` : 'url("https://static.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq")' }}>
                    <img src={user.profile ? user.profile : default_user_image} width={75} height={75} className={user.profile ? 'rounded-circle user-profl' : 'user-profl bg-white rounded-circle'} alt="user_profile" />

                </div>
                <h4 className="weight-500 mt-4-5 c-pointer" onClick={() => router('/profile')}>{user.username}</h4>
            </div>
            <div className="or-1 w-100 mt-2 mb-2"></div>

            <div className='f-small connect' onClick={() => router('/profile/connections')}>
                <p>Connections</p>
                <p className="weight-500">Grow your network</p>
            </div>

            <div className='f-small connect' onClick={() => router('/jobs')}>
                <p>Jobs</p>
                <p className="weight-500">Apply for a job</p>
            </div>

            <div className='d-flex gap-1 mt-2 a-center items margin-6' onClick={()=>{
                router('/saved-posts');
            }}>
                <svg className='app-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="24px">    <path d="M 4 2 L 4 22 L 12 19 L 20 22 L 20 2 L 6 2 L 4 2 z" /></svg>
                <p className='weight-500'>Saved</p>
            </div>

        </div>
    )
}

export default PostLeft