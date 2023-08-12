import Posts from './Posts'
import './Posts.css'

function SavedPost() {

    

  return (
    <div className='pb-4'>
        <Posts url={'user/get-saved-posts/'} />
    </div>
  )
}

export default SavedPost