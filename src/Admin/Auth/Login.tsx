import { useNavigate } from 'react-router-dom';
import SimpleNav from '../../User/Navbar/SimpleNav';
import { PasswordTrigger } from '../../User/UserConfig/Helper';
import './../admin.css'

import { useRef, useState } from 'react'
import { HandleLogin } from '../../User/Auth/Auth';
import { useDispatch } from 'react-redux';
import { Adduser } from '../../AppMain/AppConfig/Redux/userReducer';

function Login() {

    const router = useNavigate();
    const passwordInput = useRef<HTMLInputElement>(null)
    const [passwordTriggered, TriggerView] = useState(false)
    const [loading, SetLoading] = useState(false)
    const dispatcher = useDispatch();



    return (
        <>
            <SimpleNav />
            <div className='container-fluid auth-container f-coloumn'>

                <div className="auth-layout login extra-login app-font">
                    <h3 className='m-0 weight-600 pt-1'>Admin sign In</h3>
                    <p className='weight-500 mb-2'>Authorized person only</p>
                    <form onSubmit={e => {
                        HandleLogin(e, SetLoading, true).then((data) => {
                            dispatcher(Adduser(data));
                            router('/admin')
                        })
                    }}>

                        <input type="text" name='username' className="input-1 mb-2 m-w" placeholder='Email or Username' />
                        <br />
                        <div className='p-relative'>
                            <input ref={passwordInput} type="password" name='password' className="input-1" placeholder='Password' />
                            <p id={passwordTriggered ? 'hidden' : ''} className="weight-600 app-link f-small password-trigger" onClick={() => { PasswordTrigger(passwordInput.current!); TriggerView(true) }}>Show</p>
                            <p id={!passwordTriggered ? 'hidden' : ''} className="weight-600 app-link f-small password-trigger" onClick={() => { PasswordTrigger(passwordInput.current!); TriggerView(false) }}>Hide</p>
                        </div>
                        <button className="btn-1 auth-btn pt-2 pb-2" type='submit'>Log In
                            <div className="lds-spinner" id={loading ? '' : 'hidden'} ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </button>
                    </form>

                </div>

            </div>
        </>
    )
}

export default Login