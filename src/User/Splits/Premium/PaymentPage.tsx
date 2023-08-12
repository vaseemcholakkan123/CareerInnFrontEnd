import { useState } from 'react'
import verified_image from '../../../AppMain/AppConfig/vaerifiedImage'
import CarreerInnAxios from '../../../AppMain/AppConfig/AxiosConfig'
import { validation } from '../Profile/UserProfile/Includes/Projects/Helper'
import { useSelector } from 'react-redux'
import { RootState } from '../../../AppMain/AppConfig/Redux/store'

function PaymentPage() {
    const user = useSelector((state: RootState) => state.logged_user.value)
    const [SelectedPlan, SelectPlan] = useState('monthly')
    const [redirecting, Setredirecting] = useState(false)

  return (
    <div className='h-100 bg-white app-shadow app-font'>
            <div className="p-2 w-100 text-center mt-md-2">
                <h3 className='resize-heading'>Achieve your goals faster with Premium.</h3>
                <p>Millions of members use Premium</p>

            </div>

            <div className="row j-space-around mt-md-3 mt-2">
                <div className="card app-shadow col-5 text-center pb-2 r-7 h-scale" onClick={() => { SelectPlan("monthly") }}>
                    <p className={SelectedPlan == 'monthly' ? 'weight-700 bg-blg pb-2 pt-1' : 'weight-700 pb-2 pt-1'}><span className='app-color'>Monthly</span> / ₹‎ 299</p>
                    <div className="or-1 w-100 mb-2"></div>
                    <div className="d-flex gap-1 a-center ms-auto me-auto">
                        <p className='weight-600 app-color'>Get verified</p>
                        <img src={verified_image} width={16} height={16} alt="" />
                    </div>
                    <p>Get notified for jobs</p>
                    <p>Save resume for fast apply</p>
                </div>
                <div className="card app-shadow col-5 text-center pb-2 r-7 h-scale" onClick={() => { SelectPlan("yearly") }}>
                    <p className={SelectedPlan == 'yearly' ? 'weight-700 bg-blg pb-2 pt-1' : 'weight-700 pb-2 pt-1'}><span className='app-color'>Yearly</span> / ₹‎ 1599</p>
                    <div className="or-1 w-100 mb-2"></div>
                    <div className="d-flex gap-1 a-center ms-auto me-auto">
                        <p className='weight-600 app-color'>Get verified</p>
                        <img src={verified_image} width={16} height={16} alt="" />
                    </div>
                    <p>Get notified for jobs</p>
                    <p>Save resume for fast apply</p>
                </div>
            </div>

            <p className='pt-3 pb-3 text-center'>We’ll send you a reminder 7 days before your plan ends.</p>
            <h6 className="resize-heading app-color text-center pt-1 pb-2">Premium members are 2.6x more likely to get hired on average.</h6>

            <button
                className="btn-1 pb-2 pt-2 w-f-content ms-auto mt-3 me-md-3 me-2"
                style={{'float':'right'}}
                disabled={redirecting}
                onClick={() => {
                    Setredirecting(true)
                    CarreerInnAxios.post('user/get-payment-session/', { 'plan_type': SelectedPlan, 'email': user.email })
                        .then(res => {
                            window.location.href = res.data
                        })
                        .catch(() => {
                            Setredirecting(false)
                            validation("Unknown Error")
                        })
                }}
            >
                {
                    redirecting ?
                        <div className="lds-spinner h-0 me-4 pe-3" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                        :

                        `Pay Now  ₹‎ ${SelectedPlan == 'monthly' ? 299 : 1599}`
                }
            </button>

        </div>
  )
}

export default PaymentPage