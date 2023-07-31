import { useNavigate } from 'react-router-dom'
import './simplenavbar.css'

function SimpleNav() {
  const router = useNavigate()

  return (
    <div className="d-flex w-100 p-2 ps-2 p-md-3 ps-md-4 simple-nav weight-600 app-font c-pointer" onClick={()=>router('/')}>CareerInn</div>
  )
}

export default SimpleNav