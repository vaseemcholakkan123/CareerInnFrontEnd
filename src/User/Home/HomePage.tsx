import './homepage.css'
import { RootState } from '../../AppMain/AppConfig/Redux/store';
import { useSelector } from 'react-redux'
import Navbar from '../Navbar/Main/Navbar';
import { useEffect, useState } from 'react'
import PostLeft from '../SideBars/left/PostLeft/PostLeft';
import Posts from '../Splits/Posts/Posts';
import PostRight from '../SideBars/right/PostRight/PostRight';
import UserProfile from '../Splits/Profile/UserProfile/UserProfile';
import { useNavigate } from 'react-router-dom';
import JobRight from '../SideBars/right/JobRight/JobRight';
import Jobs from '../Splits/Jobs/Jobs';
import { useLocation } from 'react-router-dom';
import Notification from '../Splits/Notification/Notification';
import DifferentProfile from '../Splits/Profile/DiffProfile/DifferentProfile';
import SavedPost from '../Splits/Posts/SavedPost';
import PeopleKnow from '../SideBars/right/OtherRight/PeopleKnow';

function HomePage() {
  const routerstate = useLocation()
  const [activeLayout, setActiveLayout] = useState('posts')
  const router = useNavigate()

  if (!localStorage.getItem('user')) {
    router('/Auth/login')
  }

  useEffect(() => {
    if (window.location.pathname.split('/')[1] == 'profile') {
      setActiveLayout('profile')
    }
    if (window.location.pathname.split('/')[1] == 'jobs') {
      setActiveLayout('jobs')
    }
    if (window.location.pathname.split('/')[1] == '') {
      setActiveLayout('posts')
    }
    if (window.location.pathname.split('/')[1] == 'notification') {
      setActiveLayout('notifications')
    }
    if (window.location.pathname.split('/')[1] == 'view-post') {
      setActiveLayout('posts')
    }
    if (window.location.pathname.split('/')[1] == 'view-job') {
      setActiveLayout('jobs')
    }
    if (window.location.pathname.split('/')[1] == 'show-profile') {
      setActiveLayout('show_user')
    }
    if (window.location.pathname.split('/')[1] == 'saved-posts') {
      setActiveLayout('saved_posts')
    }
    console.log('called');
    
    
    if (!localStorage.getItem('user')) {
      router('/Auth/login')
    }

  },[window.location.pathname])

  // console.log(useSelector(( state:RootState )=> state.logged_user.value));

  return (
    <>
      <Navbar ActiveLayout={activeLayout} SetActiveLayout={setActiveLayout} />
      <div className='row user-home-container'>
        <div className={activeLayout != 'posts' ? "col-2 d-md-block d-none user-home-holder show2" : "col-sm-3 d-md-block d-none user-home-holder"} >
          <div className="left col-inside app-shadow" id={activeLayout != 'posts' ? 'display-none' : ''} >

            {
              activeLayout === 'posts' || activeLayout === 'saved_posts' ?

                <PostLeft />

                :

                <p>user-holder</p>


            }

          </div>
        </div>

        <div className={activeLayout === 'posts' ? "col-12 col-md-9 col-lg-6" : "col-12 col-md-11 col-lg-7"}>
          <div className="col-inside app-shadow main-div">
            {
              activeLayout === 'posts' ?

                <Posts />

                :


                activeLayout === 'profile' ?

                  <UserProfile />

                  :

                  activeLayout == 'jobs' ?

                    <Jobs />
                    :

                    activeLayout == 'notifications' ?

                      <Notification />
                      :
                      activeLayout === 'show_user' ?
                        <DifferentProfile />
                        :

                        activeLayout === 'saved_posts' ? 
                        <SavedPost />

                        :


                        null

            }
          </div>
        </div>

        <div className="col-lg-3 d-none d-lg-block mt-1">
          <div className="col-inside app-shadow mh-5">
            {
              activeLayout === 'posts' ?

                <PostRight />

                :

                activeLayout == 'jobs' ?

                  <JobRight />
                  :


                activeLayout == 'profile' || activeLayout == 'saved_posts' || activeLayout == 'show_user' || activeLayout == 'notifications' ? 

                < PeopleKnow />
                :
                null

            }
          </div>
          <p className='mt-2 text-center text-secondary app-font' >CarreerInn Corporation 2023</p>

        </div>


      </div>
    </>
  )
}

export default HomePage