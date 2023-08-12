import { useLocation, useNavigate } from 'react-router-dom'
import CarreerInnAxios from '../../../AppMain/AppConfig/AxiosConfig'
import { post } from '../../UserConfig/Constants'
import { job } from '../Jobs/Helper'
import { company, user } from '../Profile/UserProfile/Includes/Jobs/Helper'
import SearchResults from './SearchResults'
import './search.css'

import { useState, useEffect } from 'react'

type results = {
    posts_count: number,
    users_count: number,
    jobs_count : number,
    companys_count : number,
    posts : post[],
    users : user[],
    compnay : company[],
    jobs : job[],
}

function SearchParent() {
    const [searchLoading, SetSearchloading] = useState(true)
    const [Searchresults, SetSearchResults] = useState<results>({posts_count:0,users_count:0 , jobs_count : 0 , companys_count : 0 , posts : [] , jobs : [] , compnay : [] , users : []})
    const [SearchType,SetSearchType] = useState("posts")
    const locationState = useLocation()
    const router = useNavigate()


    useEffect(()=>{
        if(!locationState.state || !locationState.state.query || locationState.state.query == '') router('/')
        let Searchquery = locationState.state.query 

        SetSearchloading(true)
        CarreerInnAxios.get(`user/search-data/${Searchquery}/${SearchType}`)
        .then(res=>{
            SetSearchloading(false)
            switch (SearchType) {
                case 'posts':
                    SetSearchResults({...res.data,posts:res.data.results})
                    break;
            
                case 'jobs':
                    SetSearchResults({...res.data,jobs:res.data.results})
                    break;
                case 'company':
                    SetSearchResults({...res.data,compnay:res.data.results})
                    break;
                case 'users':
                    SetSearchResults({...res.data,users:res.data.results})
                    break;

                default:
                    break;
            }
        })

    },[SearchType,locationState.state])

    return (
        <div className='messaging-main row app-font app-shadow'>
            <div className="col-sm-4 col-12 h-100 overflow-hidden d-sm-block d-none">
                <div className="p-3">
                    <h6 className='weight-700'>Results for {locationState.state && locationState.state.query}</h6>
                </div>
                <div className="or-1 w-100"></div>

                <div className="p-2 pe-2 d-flex f-coloumn gap-2">
                    <div className={SearchType == 'posts' ? "active-chat p-1 bg-blg r-7 a-center ps-2 d-flex h-scale c-pointer" : "p-1 bg-blg r-7 a-center ps-2 d-flex h-scale c-pointer" } onClick={()=>SetSearchType("posts")}>
                        <p>Posts</p>
                        <p className="f-small ms-auto me-3">{Searchresults.posts_count}</p>

                    </div>

                    <div className={SearchType == 'users' ? "active-chat p-1 bg-blg r-7 a-center ps-2 d-flex h-scale c-pointer" : "p-1 bg-blg r-7 a-center ps-2 d-flex h-scale c-pointer" } onClick={()=>SetSearchType("users")}>
                        <p>Users</p>
                        <p className="f-small ms-auto me-3">{Searchresults.users_count}</p>

                    </div>

                    <div className={SearchType == 'jobs' ? "active-chat p-1 bg-blg r-7 a-center ps-2 d-flex h-scale c-pointer" : "p-1 bg-blg r-7 a-center ps-2 d-flex h-scale c-pointer" } onClick={()=>SetSearchType("jobs")}>
                        <p>Jobs</p>
                        <p className="f-small ms-auto me-3">{Searchresults.jobs_count}</p>

                    </div>

                    <div className={SearchType == 'company' ? "active-chat p-1 bg-blg r-7 a-center ps-2 d-flex h-scale c-pointer" : "p-1 bg-blg r-7 a-center ps-2 d-flex h-scale c-pointer" } onClick={()=>SetSearchType("company")}>
                        <p>Company</p>
                        <p className="f-small ms-auto me-3">{Searchresults.companys_count}</p>

                    </div>
                </div>

            </div>

            <div className="h-100 overflow-hidden col-sm-8 col-12 chat-body-seperate">
                <SearchResults ChangeType={SetSearchType} loading={searchLoading} query={locationState.state && locationState.state.query} type={SearchType} content={
                    SearchType == 'posts' ? Searchresults.posts :
                    SearchType == 'jobs' ? Searchresults.jobs :
                    SearchType == 'users' ? Searchresults.users:
                    SearchType == 'company' ? Searchresults.compnay:
                    []
                } />
            </div>
        </div>
    )
}

export default SearchParent