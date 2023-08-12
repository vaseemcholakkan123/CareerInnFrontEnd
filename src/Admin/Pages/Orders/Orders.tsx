

import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import default_user_image from '../../../AppMain/AppConfig/AppConstants'
import {  user } from '../../../User/Splits/Profile/UserProfile/Includes/Jobs/Helper'
import CarreerInnAxios from '../../../AppMain/AppConfig/AxiosConfig'
import { validation } from '../../../User/Splits/Profile/UserProfile/Includes/Projects/Helper'
import { updateTimeSince } from '../../../User/UserConfig/Helper'

type order = {
    type: string,
    payment_id: string,
    user: user,
    payment_date: Date,
    price: number,
}

function Orders() {
    const [Allorders, Setorders] = useState<order[]>([])
    const [resolved, SetResolved] = useState(false)
    const [nextUrl, setNextUrl] = useState('')
    const [loadNext, loader] = useState(false)
    const router = useNavigate()
    const modalCloser = useRef<HTMLButtonElement>(null)
    const [fromDate, SetfromDate] = useState('')
    const [ToDate, SetToDate] = useState('')

    useEffect(() => {

        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${year}-${month}-${day}`;

        let url = 'admin/orders/'
        url += fromDate == '' ? currentDate + '/' : fromDate + '/'
        url += ToDate == '' ? currentDate + '/' : ToDate + '/'

        if (!loadNext && (fromDate != '' || ToDate != '')) {

        }else url += `?${nextUrl}`


        CarreerInnAxios.get(url).then(res => {

            SetResolved(true)
            if(!loadNext && (fromDate != '' || ToDate != '')) Setorders(res.data.results)
            else Setorders([...Allorders, ...res.data.results])
            if (res.data.next) setNextUrl(res.data.next.split('?')[1])
            else setNextUrl('')
        })
            .catch(() => {
                SetResolved(true)
                validation('Server Error')
            })
    }, [loadNext, fromDate, ToDate])


    return (
        <div className='w-100'>
            <header className='w-100 d-flex p-1 p-md-4 a-center'>
                {
                    fromDate == '' && ToDate == ''?
                    <h3>Today </h3>
                    :
                    fromDate != '' && ToDate != '' ?
                    <p>{fromDate} to {ToDate}</p>
                    :
                    fromDate != '' ?
                    <p>From {fromDate}</p>
                    :
                    ToDate != '' ?
                    <p>From Today to {ToDate}</p>
                    :
                    null

                }
                <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto me-2 mt-md-0 me-md-1 bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>

                <ul className="dropdown-menu dropdown-menu-end app-font">
                    <li><p className="dropdown-item weight-700" data-bs-toggle="modal" data-bs-target="#filtermodal">Filter</p></li>
                    <li><p className="dropdown-item weight-700">Download report</p></li>

                </ul>
            </header>

            <div className="row p-1 m-md-2 m-1 gy-2 container-height-admin">

                {
                    Allorders.map(order => {
                        return (
                            <div className='col-12 col-md-6 p-1 p-md-4 pb-md-3 r-7 mt-0 app-shadow d-flex mobile-border'>
                                <img className='me-1 r-7' src={order.user.profile ? order.user.profile : default_user_image} width={70} height={70} alt="" onClick={() => router(`/show-profile/${order.user.username}`, { state: { 'user_id': order.user.id } })} />
                                <div className='normal-line-height' onClick={() => router(`/show-profile/${order.user.username}`, { state: { 'user_id': order.user.id } })}>
                                    <h5>{order.user.username}</h5>
                                    <p className="f-small">{order.type} || {order.price}</p>
                                    <p className="f-small f-m-smaller">id : {order.payment_id.slice(0, 15)} ...</p>
                                    <p className="f-small">purchased : {updateTimeSince(String(order.payment_date))}</p>
                                </div>
                            </div>
                        )
                    })
                }


                {
                    !Allorders[0] && !resolved ?
                        <div className="d-flex j-center pt-3 pb-3">
                            <div className="lds-spinner lds-spinner2 me-5 mt-1" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
                        :
                        null
                }
                {
                    !Allorders[0] && resolved ?
                        <div className='col-12 d-flex acenter j-center m-2 mt-0  pt-1 p-2'>
                            <p>Seem's like there's no users.</p>
                        </div>
                        :
                        null
                }

                {
                    nextUrl != '' ?
                        <div className="d-flex p-1 a-center  j-center r-7 mt-1 c-pointer" onClick={() => loader(!loadNext)}>
                            <p className="app-font">Show More</p>
                            <svg width="17" className='ms-2 sm-mt' height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2_599)">
                                    <g clipPath="url(#clip1_2_599)">
                                        <path d="M1.84009 5.14014L8.84009 9.75014L15.8401 5.14014V7.53014L8.84009 12.1401L1.84009 7.53014V5.14014Z" fill="black" fillOpacity="0.6" />
                                    </g>
                                </g>
                                <defs>
                                    <rect width="16" height="16" fill="white" transform="translate(0.840088 0.140137)" />
                                    <rect width="16" height="16" fill="white" transform="translate(0.840088 0.140137)" />
                                </defs>
                            </svg>

                        </div>
                        :
                        null
                }


                <div className="modal fade app-font" id="filtermodal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog profile-modal">
                        <div className="modal-content">
                            <div className="modal-header b-none">
                                <h1 className="modal-title fs-5 resize-heading" id="exampleModalLabel">Filter by date</h1>
                                <button type="button" className="btn-close" ref={modalCloser} data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body info-modal input-infos ps-md-4 ps-3 pb-5">

                                <div className="row">
                                    <div className="col-12 mb-2">
                                        <p>From</p>
                                        <input type="date" className='r-7 p-1 outline-none' onChange={e => {
                                            SetfromDate(e.target.value);
                                        }} />
                                    </div>
                                    <div className="col-12">
                                        <p>To</p>
                                        <input type="date" className='r-7 p-1 outline-none' onChange={e => {
                                            SetToDate(e.target.value)
                                        }} />
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Orders