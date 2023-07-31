import './../auth.css'
import {Dispatch,SetStateAction} from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { ValidateUserInfo } from '../Auth'

type layout = {
    SetActiveLayout : Dispatch<SetStateAction<string>>
}

function UserInfo({SetActiveLayout}:layout) {
    const router = useNavigate()
    const [loading,SetLoading] = useState(false)
  return (
    <div className='container-fluid  app-font auth-container f-coloumn'>
        <h3 className='weight-600 mb-md-3 mb-2 sign-up'>Make the most of your professional life.</h3>
        <div className="auth-layout">
          <form className='auth-form' onSubmit={e=>{ValidateUserInfo(e,SetActiveLayout,SetLoading)}}>
            <label htmlFor="e-mail" className='weight-600 pt-3' >Email</label>
            <input id='e-mail' name='email' type="email" className="input-1 mb-2" placeholder='miguel@gmail.com' />
            <br />
            <label htmlFor="username" className='weight-600 pt-2' >Username</label>
            <input id='username' name='username' type="text" className="input-1 mb-2" placeholder='miguel_ls' />
           
            <button className="btn-1 auth-btn" type='submit'>
                
                Continue

                <div className="lds-spinner" id={loading ? '' : 'hidden'} ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </button>
          </form>

          {/* <div className="d-flex a-center">
            <div className="or-1"></div>
            <p className='or-text'>or</p>
            <div className="or-2"></div>
          </div>

          <button className="btn-2 w-100 mt-2 mb-2 weight-500">Continue with Google 
          
          <svg className='ms-2 d-x-small-none' xmlns="http://www.w3.org/2000/svg"viewBox="0 0 48 48" width="35px" height="35px"><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
          </button> */}

          <div className="mt-2 text-center">
            <p>Already on CareerInn? <span className='app-link app-color weight-600' onClick={()=>router('/Auth/login')}>Sign in</span></p>
          </div>

        </div>

    </div>
  )
}

export default UserInfo