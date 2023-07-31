import SimpleNav from '../../Navbar/SimpleNav'
import { change_password, reset_pass_otp, verify_otp_for_pass } from '../Auth'
import './../auth.css'
import { PasswordTrigger } from '../../UserConfig/Helper'
import { useState, useRef, useEffect } from 'react'
import { success } from '../../Splits/Profile/UserProfile/Includes/Jobs/Helper'
import { validation } from '../../Splits/Profile/UserProfile/Includes/Projects/Helper'
import { useNavigate } from 'react-router-dom'

function ForgotPass() {
    const [loading, setLoading] = useState(false)
    const [Resendloading, setResendLoading] = useState(false)
    const [ActiveLayout, SetActiveLayout] = useState('get-otp')
    const [passwordTriggered, TriggerView] = useState(false)
    const passwordInput = useRef<HTMLInputElement>(null)
    const [formSubmit, SetDisabled] = useState(false)
    const [username, Setusername] = useState('')
    const router = useNavigate()
    const [resendOTP, setResendOTP] = useState(true)
    const [delay, Setdelay] = useState(30)

    useEffect(() => {

        const resendTimer = setInterval(() => {

            Setdelay((prevDelay) => prevDelay - 1)

        }, 1000)
        if (delay == 0) {
            setResendOTP(true)
            clearInterval(resendTimer)

        }


        return (() => {
            clearInterval(resendTimer)

        })
    }, [delay])



    return (
        <>
            <SimpleNav />
            <div className='container-fluid auth-container f-coloumn'>


                {
                    ActiveLayout == 'get-otp' ?

                        <div className="auth-layout login extra-login app-font">
                            <h3 className='m-0 weight-600 pt-1'>Verify mail</h3>
                            <p className='weight-500 mb-4'>Let's verify your account</p>
                            <form onSubmit={e => {
                                SetDisabled(true)
                                setLoading(true);
                                reset_pass_otp(e)
                                    .then(() => {
                                        SetDisabled(false)

                                        setLoading(false)
                                        success('Otp Send')
                                        SetActiveLayout('verify-otp')
                                    })
                                    .catch(() => {
                                        setLoading(false)
                                        SetDisabled(false)

                                    })
                            }}>

                                <input type="text" name='username' className="input-1 mb-2" placeholder='Email or Username' onChange={e => Setusername(e.target.value)} />
                                <button disabled={formSubmit} className="btn-1 auth-btn h-scale" type='submit'>Get OTP
                                    <div className="lds-spinner" id={loading ? '' : 'hidden'} ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </button>
                            </form>

                        </div>

                        :

                        ActiveLayout == 'verify-otp' ?

                            <div className="auth-layout login extra-login app-font">
                                <h3 className='m-0 weight-600 pt-1'>Verify OTP</h3>
                                <p className='weight-500 mb-4'>Enter OTP send to your mail</p>
                                <form onSubmit={e => {
                                    setLoading(true);
                                    verify_otp_for_pass(e, username)
                                        .then(() => {
                                            setLoading(false)
                                            success('OTP validated')
                                            SetActiveLayout('x')
                                        })
                                        .catch(() => {
                                            setLoading(false)
                                        })
                                }}>

                                    <input type="text" name='otp' className="input-1 mb-2" placeholder='xxxxx' />
                                    <button className="btn-1 auth-btn h-scale" type='submit'>Verify OTP
                                        <div className="lds-spinner" id={loading ? '' : 'hidden'} ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                    </button>
                                    {
                                        resendOTP && delay == 0 ?
                                            <button disabled={formSubmit} className="btn-2 auth-btn text-center h-scale c-pointer" onClick={(e) => {
                                                setResendLoading(true)
                                                SetDisabled(true)
                                                reset_pass_otp(null, username)
                                                    .then(() => {
                                                        setResendLoading(false)
                                                        SetDisabled(false)
                                                        success('Otp Send')
                                                        Setdelay(30)
                                                    })
                                                    .catch(() => {
                                                        SetDisabled(false)
                                                        setResendLoading(false)
                                                        Setdelay(30)
                                                    })
                                            }}>Resend OTP
                                                <div className="lds-spinner lds-spinner2" id={Resendloading ? '' : 'hidden'} ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                            </button>
                                            :
                                            <p className='text-center w-100'>Resend OTP in {delay} seconds</p>
                                    }
                                </form>

                            </div>

                            :

                            <div className='container-fluid  app-font auth-container f-coloumn'>
                                <div className="auth-layout sign-up">
                                    <form className='auth-form' onSubmit={e => {
                                        setLoading(true)
                                        change_password(e, username)
                                            .then(() => {
                                                setLoading(false)
                                                success('Password changed,please login')
                                                router('/Auth/login')
                                            })
                                            .catch(() => {
                                                setLoading(false)
                                            })
                                    }}>
                                        <label htmlFor="e-mail" className='weight-600 pt-3' >Password</label>
                                        <input id='e-mail' name='password1' type="password" className="input-1 mb-2" placeholder='Enter 8 or more Characters' />
                                        <br />
                                        <div className='p-relative'>
                                            <label htmlFor="e-mail" className='weight-600' >{'Confirm Password'}</label>
                                            <input ref={passwordInput} type="password" name='password2' className="input-1" placeholder='xxxxxxxx' />
                                            <p id={passwordTriggered ? 'hidden' : ''} className="weight-600 app-link f-small password-trigger top-x" onClick={() => { PasswordTrigger(passwordInput.current!); TriggerView(true) }}>Show</p>
                                            <p id={!passwordTriggered ? 'hidden' : ''} className="weight-600 app-link f-small password-trigger top-x" onClick={() => { PasswordTrigger(passwordInput.current!); TriggerView(false) }}>Hide</p>
                                        </div>

                                        <button className="btn-1 auth-btn" type='submit'>Change Password

                                            <div className="lds-spinner" id={loading ? '' : 'hidden'} ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                                        </button>
                                    </form>

                                </div>

                            </div>
                }


            </div>
        </>
    )
}

export default ForgotPass