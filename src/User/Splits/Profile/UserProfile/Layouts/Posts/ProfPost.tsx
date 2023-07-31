import Posts from '../../../../Posts/Posts'
import './../layouts.css'


import React from 'react'

function ProfPost() {
  return (
    <div>
        <Posts url='user/get-posts/'/>
    </div>
  )
}

export default ProfPost