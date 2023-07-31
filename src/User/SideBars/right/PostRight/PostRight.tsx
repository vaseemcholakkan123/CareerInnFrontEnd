import './PostRight.css'

import { useState } from 'react'

function PostRight() {
  return (
    <div className='posts-right'>
        <p className='weight-500 f-large app-color mb-2'>CarreerInn News</p>
        <div className="news-holder app-font f-small">
            <ul>
                <li>
                    <p>Driving social impact at scale</p>
                    <p>2d ago</p>
                </li>
                <li>
                    <p>Insurance has an attritioon problem</p>
                    <p>11hours ago</p>
                </li><li>
                    <p>Demand for Rust Skills shines</p>
                    <p>1hour ago</p>
                </li><li>
                    <p>NBFCs disburse more personal loans</p>
                    <p>1d ago</p>
                </li><li>
                    <p>Jwellery brand Giva raises 35 million</p>
                    <p>10hours ago</p>

                </li>
            </ul>
        </div>

    </div>
  )
}

export default PostRight