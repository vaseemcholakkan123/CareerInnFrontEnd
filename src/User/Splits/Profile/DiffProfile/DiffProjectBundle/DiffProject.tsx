

import './../../UserProfile/Includes/includes.css'
import { project } from '../../UserProfile/Includes/Projects/Helper'

function DiffProjectCard(project : project) {
  return (
    <div className="w-100 pb-2 ps-3 pe-2 normal-line-height c-pointer ">
        <div className='d-flex w-100'>
          <p className='weight-500'>{project.name}</p>

        </div>

        <p>{project.description}</p>
        <a className="app-link ms-1 app-color p-1" href={project.link} target='_blank' rel='noopener noreferrer'>
        Show project

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" className="ms-1" width="16" height="16" focusable="false">
            <path d="M15 1v6h-2V4.41L7.41 10 6 8.59 11.59 3H9V1zm-4 10a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h2V3H5a3 3 0 00-3 3v5a3 3 0 003 3h5a3 3 0 003-3V9h-2z"></path>
        </svg>  
        </a>
    </div>
  )
}

export default DiffProjectCard