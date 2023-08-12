import './PostLeft.css'
import { useState, useEffect } from 'react'
import { RootState } from '../../../../AppMain/AppConfig/Redux/store'
import { useSelector } from 'react-redux'
import default_user_image from '../../../../AppMain/AppConfig/AppConstants'
import { useNavigate } from 'react-router-dom'
import verified_image from '../../../../AppMain/AppConfig/vaerifiedImage'
import CarreerInnAxios from '../../../../AppMain/AppConfig/AxiosConfig'
import { validation } from '../../../Splits/Profile/UserProfile/Includes/Projects/Helper'

function PostLeft() {
    const user = useSelector((state: RootState) => state.logged_user.value)
    const router = useNavigate()
    const [PremiumValidity, SetPremiumValidity] = useState(0)

    useEffect(() => {
        CarreerInnAxios.get('user/get-premium-validity/')
            .then(res => {
                if (res.data == 'premium_ended') {
                    validation("Premium Ended ,Login again")
                    localStorage.clear()
                    router('/Auth/login')
                }
                else if (res.data == 'valid') SetPremiumValidity(0)
                else SetPremiumValidity(res.data)

            })
    }, [])

    return (
        <div className='posts-left app-font weight-600'>
            <div className="d-flex j-center f-coloumn mt-2 a-center">
                <div className="bannerl r-7" style={{ backgroundImage: user.banner ? `url(${user.banner})` : 'url("https://static.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq")' }}>
                    <img src={user.profile ? user.profile : default_user_image} width={75} height={75} className={user.profile ? 'rounded-circle user-profl' : 'user-profl bg-white rounded-circle'} alt="user_profile" />

                </div>
                <h4 className="weight-500 mt-4-5 c-pointer" onClick={() => router('/profile')}>{user.username}
                    {
                        user.is_premium_user ?
                            <img className='ms-1' src={verified_image} width={20} height={20} alt="" />

                            :
                            null
                    }
                </h4>
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

            <div className='d-flex gap-1 mt-2 a-center items margin-6' onClick={() => {
                router('/saved-posts');
            }}>
                <svg className='app-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="24px">    <path d="M 4 2 L 4 22 L 12 19 L 20 22 L 20 2 L 6 2 L 4 2 z" /></svg>
                <p className='weight-500'>Saved</p>
            </div>

            {
                !user.is_premium_user ?
                    <div className="a-center d-flex gap-1 p-2 mt-1 c-pointer" onClick={() => {
                        router('/premium');
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" width="21" height="21" focusable="false">
                            <path d="M20 20a3.36 3.36 0 001-2.39V6.38A3.38 3.38 0 0017.62 3H6.38A3.36 3.36 0 004 4z" fill="#f8c77e"></path>
                            <path d="M4 4a3.36 3.36 0 00-1 2.38v11.24A3.38 3.38 0 006.38 21h11.24A3.36 3.36 0 0020 20z" fill="#e7a33e"></path>
                        </svg>
                        <h6>Try Premium</h6>
                    </div>
                    :
                    PremiumValidity != 0 ?
                        <div className="a-center d-flex gap-1 p-2 mt-1 c-pointer" onClick={() => {
                            router('/premium');
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" width="21" height="21" focusable="false">
                                <path d="M20 20a3.36 3.36 0 001-2.39V6.38A3.38 3.38 0 0017.62 3H6.38A3.36 3.36 0 004 4z" fill="#f8c77e"></path>
                                <path d="M4 4a3.36 3.36 0 00-1 2.38v11.24A3.38 3.38 0 006.38 21h11.24A3.36 3.36 0 0020 20z" fill="#e7a33e"></path>
                            </svg>
                            <div className='normal-line-height'>
                                <p>Renew Premium</p>
                                <p className="f-small">ends in {PremiumValidity} days</p>
                            </div>
                        </div>

                        :
                        null
            }

        </div>
    )
}

export default PostLeft