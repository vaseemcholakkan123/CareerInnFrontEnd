
import './../Profile.css'
import { useState, useEffect } from 'react'
import { differUser } from './Helper';
import default_user_image from '../../../../AppMain/AppConfig/AppConstants';
import { useLocation, useNavigate } from 'react-router-dom';
import CarreerInnAxios from '../../../../AppMain/AppConfig/AxiosConfig';
import DiffExp from './DiffExp';
import DiffEducation from './DiffEducationCard/DiffEducation';
import DiffProjectCard from './DiffProjectBundle/DiffProject';
import { follow_user } from '../../../UserConfig/Helper';
import DiffPost from './DiffPosts/DiffPost';

function DifferentProfile() {
    const [ActiveLayout, SetActiveLayout] = useState('main')
    const [user, Setuser] = useState<differUser | null>(null)
    const router = useNavigate()
    const routerState = useLocation()

    useEffect(() => {
        if (!routerState.state && !routerState.state.user_id) router('/')

        CarreerInnAxios.get(`user/get-user-bundle/${routerState.state.user_id}/`)
            .then(res => {
                Setuser(res.data)
            })

    }, [routerState.state])

    return (
        <div className='profile-main-container mb-5 pb-3'>

            {
                ActiveLayout == 'main' ?

                    user ?
                        <>
                            <div className='banner-user-container app-shadow'>
                                <div className="banner" style={{ backgroundImage: user.banner ? `url(${user.banner})` : 'url("https://static.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq")' }}>
                                    <img src={user.profile ? user.profile : default_user_image} width={145} height={143} className={user.profile ? 'rounded-circle user-prof' : 'user-prof rounded-circle bg-white'} alt="user_profile" />

                                </div>
                                <div className="user-main-holder pb-4 r-7 bg-white p-3 normal-line-height" >
                                    <div className='app-font ms-1 pb-1 align-self-end'>
                                        <h3 className="w-50">{user.username} </h3>
                                        <p >{user.info ? user.info : ''}</p>
                                        <p className='f-small app-gray'>{user.location ? user.location : ''}</p>
                                    </div>
                                    <div className="ms-auto">
                                        <p className="f-medium ms-auto follow app-color me-0" onClick={() => {
                                            follow_user(user.id)
                                                .then(() => {
                                                    Setuser({...user , is_following : !user.is_following})
                                                })
                                        }} >{user.is_following ? 'Unfollow' : 'Follow'}</p>
                                    </div>
                                </div>
                            </div>


                            {/* <div className="or-1 w-100 m-2 ms-auto me-auto"></div> */}

                            <div className='bg-white app-shadow w-100 p-3 mt-3 r-7'>

                                <div className="connections-info">
                                    <svg width="27px" height="27px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs></defs><rect className='a' x="5.5" y="5.5" width="15.8571" height="15.8571" /><rect className='a' x="27.5004" y="6.3575" width="14.1421" height="14.1421" transform="translate(0.6303 28.3788) rotate(-45)" /><rect className='a' x="5.5" y="26.6429" width="15.8571" height="15.8571" /><rect className='a' x="26.6429" y="26.6429" width="15.8571" height="15.8571" /></svg>

                                    <div className='ms-2 app-font info' onClick={() => { SetActiveLayout('posts'); }}>
                                        <p className="weight-700">Activity</p>
                                        <p>See {user.username}'s posts</p>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="or-1 m-2 w-100 ms-auto me-auto"></div> */}

                            <div className='bg-white app-shadow w-100 p-3 mt-3 r-7 pt-0'>

                                <div>
                                    <div className="d-flex w-100 p-2 a-center">
                                        <h5>Education</h5>

                                    </div>

                                    {
                                        user.education.map((edu, i) => {
                                            return (
                                                <DiffEducation key={i} {...edu} />
                                            )
                                        })
                                    }

                                    {
                                        !user.education[0] ?
                                            <div className='ms-3'>
                                                <p>No Education added</p>
                                            </div>
                                            :
                                            null
                                    }


                                </div>

                                {/* component experience */}

                                <DiffExp Experiences={user.experience} />


                            </div>


                            <div className='bg-white app-shadow w-100 p-3 mt-3 r-7 pt-0'>
                                {/* Projects holder component */}

                                <div>
                                    <div className="d-flex w-100 p-2 pb-0 mt-1 a-center">
                                        <h5>Projects</h5>

                                    </div>

                                    {
                                        user.projects.map(project => {
                                            return (
                                                <DiffProjectCard {...project} />
                                            )
                                        })
                                    }
                                    {
                                        !user.projects[0] ?
                                            <div className='ms-3 mt-2'>
                                                <p>No projects Added</p>
                                            </div>
                                            :
                                            null
                                    }

                                </div>

                                {/* hardcode skills */}

                                <div className="d-flex w-100 p-2 pb-0 a-center mt-2 mb-1">
                                    <h5>Skills</h5>

                                </div>


                                {
                                    user.skills.map(skill => {
                                        return (
                                            <div key={skill.id} className="d-flex w-100 p-1 pb-2 ps-2 pe-2 a-center">

                                                <div className="ms-2 normal-line-height d-flex a-center w-100">
                                                    <p className='weight-600'>{skill.title}</p>

                                                </div>

                                            </div>
                                        )
                                    })
                                }
                                {
                                    !user.skills[0] ?
                                        <div className='ms-3 pb-2'>
                                            <p>No skills Added</p>
                                        </div>
                                        :
                                        null
                                }

                                {/* skill endn */}

                            </div>

                           
                        </>
                        :
                        
      
                        <div className='bg-white mt-1 p-4 app-shadow r-7'>
                            <div className="d-flex j-center pt-3 pb-3">
                                <div className="lds-spinner lds-spinner2 me-5 mt-1" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                            </div>
                        </div>

                    :

                    ActiveLayout == 'posts' && user ?

                    < DiffPost id={user.id}  />

                    :

                    null


            }



        </div>
    )
}

export default DifferentProfile