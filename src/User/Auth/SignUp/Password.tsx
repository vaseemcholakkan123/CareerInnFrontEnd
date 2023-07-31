import '../auth.css'
import { useRef, useState} from 'react';
import { PasswordTrigger } from '../../UserConfig/Helper';
import { handleAccountCreation } from '../Auth';


function Password() {
    const passwordInput = useRef<HTMLInputElement>(null)
    const [passwordTriggered,TriggerView] = useState(false)
    const [loading,SetLoading] = useState(false)


  return (
    <div className='container-fluid  app-font auth-container f-coloumn'>
        <div className="auth-layout sign-up">
          <form className='auth-form' onSubmit={e=>{handleAccountCreation(e,SetLoading)}}>
            <label htmlFor="e-mail" className='weight-600 pt-3' >Password</label>
            <input id='e-mail' name='password1' type="password" className="input-1 mb-2" placeholder='Enter 8 or more Characters' />
            <br />
            <div className='p-relative'>
              <label htmlFor="e-mail" className='weight-600' >{'Confirm Password'}</label>
              <input ref={passwordInput} type="password" name='password2' className="input-1" placeholder='xxxxxxxx' />
              <p id={passwordTriggered ? 'hidden' : ''} className="weight-600 app-link f-small password-trigger top-x" onClick={()=>{PasswordTrigger(passwordInput.current!); TriggerView(true)}}>Show</p>
              <p id={!passwordTriggered ? 'hidden' : ''} className="weight-600 app-link f-small password-trigger top-x" onClick={()=>{PasswordTrigger(passwordInput.current!); TriggerView(false)}}>Hide</p>
            </div>
           
            <button className="btn-1 auth-btn" type='submit'>Agree & Continue
            
            <div className="lds-spinner" id={loading ? '' : 'hidden'} ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            
            </button>
          </form>

          <div className="d-flex a-center mt-2 mb-2">
            <div className="or-1 w-100"></div>
          </div>  

          <p className='policy m-auto mb-2'>By Creating account Agree & Join, you agree to the CareerInn <span className="app-color weight-600">User Agreement , Privacy Policy,</span> and <span className="weight-600 app-color">Cookie Policy.</span></p>

        </div>

    </div>
  )
}

export default Password