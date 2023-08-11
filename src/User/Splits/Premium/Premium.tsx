


import { Routes,Route, useNavigate } from "react-router-dom"
import PaymentPage from "./PaymentPage"
import PaymentSuccess from "./PaymentSuccess"

function Premium() {

    return (
        <>
            <Routes>
                <Route path="/" element={<PaymentPage />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />

            </Routes>
        </>
    )
}

export default Premium