import Posts from './Posts'
import './Posts.css'


import {useEffect} from 'react'

function SavedPost() {

    

  return (
    <div>
        <Posts url={'user/get-saved-posts/'} />
    </div>
  )
}

export default SavedPost