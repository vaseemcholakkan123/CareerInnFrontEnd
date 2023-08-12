import { useNavigate } from 'react-router-dom';
import './../../Navbar/Main/nav.css'


import { Dispatch, SetStateAction } from 'react'

function MobileNav({ SetActiveLayout, ActiveLayout ,NotificationCount }: { NotificationCount : number , SetActiveLayout: Dispatch<SetStateAction<string>>, ActiveLayout: string }) {
    const router = useNavigate()

    return (
        <div className='d-flex d-md-none mb-2 position-fixed mobile-nav'>
            <div className="nav-items mobile-nav m-0 j-space-around w-100 ps-1 pe-1">

                <div className={ActiveLayout === 'posts' ? "nav-item nav-item-active" : "nav-item"} onClick={() => { SetActiveLayout('posts'); router('/') }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width="24" height="24" focusable="false">
                        <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z"></path>
                    </svg>
                    <p className='m-0'>Home</p>
                </div>

                <div className={ActiveLayout === 'jobs' ? "nav-item nav-item-active" : "nav-item"} onClick={() => { SetActiveLayout('jobs'); router('/jobs') }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width="24" height="24" focusable="false">
                        <path d="M17 6V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2v4a3 3 0 003 3h14a3 3 0 003-3V6zM9 5a1 1 0 011-1h4a1 1 0 011 1v1H9zm10 9a4 4 0 003-1.38V17a3 3 0 01-3 3H5a3 3 0 01-3-3v-4.38A4 4 0 005 14z"></path>
                    </svg>
                    <p className="m-0">Jobs</p>
                </div>

                <div className='nav-item' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" className='mt-1' data-supported-dps="24x24" fill="currentColor" viewBox="0 0 16 16" focusable="false">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                    </svg>
                    <p className="m-0">Post</p>
                </div>

                <div className={ActiveLayout === 'profile' ? "nav-item nav-item-active" : "nav-item"} onClick={() => { SetActiveLayout('profile'); router('/profile/connections') }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="var(--primary-color)" className="mercado-match" width="24" height="24" focusable="false">
                        <path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z"></path>
                    </svg>
                    <p className="m-0">Network</p>
                </div>

                <div className={ActiveLayout === 'notifications' ? "nav-item nav-item-active position-relative" : "position-relative nav-item"} onClick={() => { SetActiveLayout('notifications'); router('notification') }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width="24" height="24" focusable="false">
                        <path d="M22 19h-8.24a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z"></path>
                    </svg>
                    <p className="m-0">Notifications </p>
                    {
                    
                    NotificationCount > 0 && <p className="notification-counter-mobile"></p>

                    }
                </div>




            </div>
        </div>
    )
}

export default MobileNav