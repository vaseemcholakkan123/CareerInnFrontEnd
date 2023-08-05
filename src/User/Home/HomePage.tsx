import './homepage.css'
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
import MobileNav from '../Navbar/MobileNav/MobileNav';
import { NOTIFICATION_END_POINT } from '../../AppMain/AppConfig/AppConstants';
import { success } from '../Splits/Profile/UserProfile/Includes/Jobs/Helper';
import CarreerInnAxios from '../../AppMain/AppConfig/AxiosConfig';
import Messaging from '../Splits/Messaging/Messaging';

function HomePage() {
  const routerstate = useLocation()
  const [activeLayout, setActiveLayout] = useState('posts')
  const router = useNavigate()
  const [searchQuery, SetSearchquery] = useState('')
  const [NotificationCount, SetNotificationCount] = useState(0)

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
    if (window.location.pathname.split('/')[1] == 'messaging') {
      setActiveLayout('messaging')
    }

    if (!localStorage.getItem('user')) {
      router('/Auth/login')
    }

    // if(searchQuery != )

    let notification_socket = new WebSocket(NOTIFICATION_END_POINT + `?token=${localStorage.getItem('access-token')}`)

    notification_socket.onmessage = async event => {

      if (event.data == 'new_notification') {
        success("You've a new notificaton")
        SetNotificationCount(NotificationCount + 1)
      }

    }

    CarreerInnAxios.get('user/get-notification-count/').then(res => {
      SetNotificationCount(res.data)
    })



  }, [window.location.pathname, searchQuery])

  // console.log(useSelector(( state:RootState )=> state.logged_user.value));

  return (
    <>
      <Navbar NotificationCount={NotificationCount} SetQuery={SetSearchquery} ActiveLayout={activeLayout} SetActiveLayout={setActiveLayout} />
      <div className={activeLayout == 'messaging' ? 'row user-home-container j-center' : 'row user-home-container'}>
        <div id={activeLayout == 'messaging' ? 'hidden' : ''} className={activeLayout != 'posts' ? "col-2 d-md-block d-none user-home-holder show2" : "col-sm-3 d-md-block d-none user-home-holder"} >
          <div className="left col-inside app-shadow" id={activeLayout != 'posts' ? 'display-none' : ''} >

            {
              activeLayout === 'posts' || activeLayout === 'saved_posts' ?

                <PostLeft />

                :

                <p>user-holder</p>


            }

          </div>
        </div>

        <div className={activeLayout === 'posts' ? "col-12 col-md-9 col-lg-6" : activeLayout == 'messaging' ? "col-12 col-md-11 col-lg-7" :  "col-12 col-md-11 col-lg-7"}>
          <div className={activeLayout === 'messaging' ? "col-inside app-shadow main-div pe-2 w-100"  : "col-inside app-shadow main-div"}>
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

                          activeLayout == 'messaging' ?
                          <Messaging />
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
      <div className="nav-offset d-md-none"></div>
      <MobileNav NotificationCount={NotificationCount} SetActiveLayout={setActiveLayout} ActiveLayout={activeLayout} />
    </>
  )
}

export default HomePage