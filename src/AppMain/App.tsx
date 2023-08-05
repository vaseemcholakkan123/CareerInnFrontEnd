import { BrowserRouter as Router,Routes,Route, Navigate } from "react-router-dom"
import Login from "../User/Auth/Login/Login"
import SignUp from "../User/Auth/SignUp/SignUp"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "../User/Home/HomePage";
import EmployerHome from "../Employer/Home/EmployerHome";
import ForgotPass from "../User/Auth/ForgotPassword/ForgotPass";
import Interview from "../Employer/Interview/Interview";
import AdminNavigator from "../Admin/Navigator/AdminNavigator";
import { useSelector } from "react-redux";
import { RootState } from "./AppConfig/Redux/store";

function App() {

  const user = useSelector((state: RootState) => state.logged_user.value)

  return (
      <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/Auth/ForgotPassword" element={<ForgotPass />}  />
          <Route path="/Auth/login" element={<Login />} />
          <Route path="/Auth/signup" element={<SignUp />} />
          <Route path="/*" element={user.user_id ? <HomePage /> : <Navigate to={'Auth/login'} /> } />
          <Route path="/admin/*" element={ < AdminNavigator /> } />
          <Route path="/employer" element={<EmployerHome />} />
          <Route path="/interview" element={<Interview />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
