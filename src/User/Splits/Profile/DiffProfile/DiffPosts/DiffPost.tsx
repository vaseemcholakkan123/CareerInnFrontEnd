
import Posts from '../../../Posts/Posts'

function DiffPost({id} :{id:number}) {
  return (
    <div>
        <Posts url={`user/get-different-user-posts/${id}/`} />
    </div>
  )
}

export default DiffPost