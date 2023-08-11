import { useNavigate } from 'react-router-dom'
import default_user_image from '../../../../AppMain/AppConfig/AppConstants'
import CarreerInnAxios from '../../../../AppMain/AppConfig/AxiosConfig'
import { differUser } from '../../../Splits/Profile/DiffProfile/Helper'
import { follow_user } from '../../../UserConfig/Helper'
import './local.css'

import { useState, useEffect } from 'react'

function PeopleKnow() {
    const [people, Setpeople] = useState<differUser[]>([])
    const [resolved, SetResolved] = useState(false)
    const [nextUrl, setNextUrl] = useState('')
    const [loadNext, loader] = useState(false)
    const router = useNavigate()

    useEffect(() => {
        CarreerInnAxios.get('user/people-knows/' + `?${nextUrl}`)
            .then(res => {
                SetResolved(true)
                console.log(res.data);
                Setpeople([...people,...res.data.results])

                if (res.data.next) setNextUrl(res.data.next.split('?')[1])
                else setNextUrl('')
            })
    }, [loadNext])


    return (
        <div className='p-1 pmd-2 mt-2'>
            <h5 className='ms-1 ms-md-2 pb-2'>People You may know</h5>

            <div className="p-1">
                {
                    !people[0] && !resolved ?
                        <div className="d-flex j-center pt-3 pb-3">
                            <div className="lds-spinner lds-spinner2 me-5 mt-1" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
                        :
                        null
                }

                {

                    people.map(uzer => {
                        return (
                            <div key={uzer.id} className="col-12 d-flex ps-md-3 pe-md-3 mt-2 mb-1">
                                <img src={uzer.profile ? uzer.profile : default_user_image} className='rounded-circle' width={50} height={50} alt="" onClick={()=>{ router(`/show-profile/${uzer.username}`, { state: { 'user_id': uzer.id } }) }} />
                                <div className='normal-line-height mt-auto mb-3 ms-2' onClick={()=>{ router(`/show-profile/${uzer.username}`, { state: { 'user_id': uzer.id } }) }}>
                                    <p className='m-0 weight-500'>{uzer.username.length < 10 ? uzer.username : uzer.username.slice(0,8) + '...' }</p>
                                    <p className='f-small'>{uzer.info ? uzer.info : ''}</p>
                                </div>

                                <p className='ms-auto c-pointer app-gray mt-1'
                                    onClick={() => {
                                        follow_user(uzer.id)
                                            .then(() => {
                                                Setpeople(people.filter(p => p.id != uzer.id))
                                            })
                                    }}
                                >Follow</p>

                            </div>
                        )
                    })

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

            </div>

        </div>
    )
}

export default PeopleKnow