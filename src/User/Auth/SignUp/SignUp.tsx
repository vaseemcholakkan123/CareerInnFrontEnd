import SimpleNav from '../../Navbar/SimpleNav'
import './../auth.css'
import {useState} from 'react'
import UserInfo from './UserInfo'
import Password from './Password'

function SignUp() {

  const [ActiveLayout,setActiveLayout] = useState('userInfo')

  return (
    <>
      <SimpleNav />
      {
        ActiveLayout == 'userInfo' ?  <UserInfo SetActiveLayout={setActiveLayout} /> : < Password/>
      }
      
    </>
  )
}




export default SignUp