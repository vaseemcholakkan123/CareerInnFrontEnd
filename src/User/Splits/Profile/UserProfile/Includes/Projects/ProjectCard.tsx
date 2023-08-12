import './../includes.css'

import { axios_delete_project, project } from './Helper'


function ProjectCard({ project, EditProject, delete_project }: { project: project, EditProject: (project_id: number) => void, delete_project: (id: number) => void }) {
  return (
    <div className="w-100 pb-2 ps-3 pe-2 normal-line-height c-pointer ">
      <div className='d-flex w-100'>
        <h6 className='weight-500'>{project.name}</h6>

        <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto me-1 mt-2 bi bi-three-dots-vertical" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>

        <ul className="dropdown-menu dropdown-menu-end app-font">
          <li><p className="dropdown-item" onClick={() => EditProject(project.id)}>Edit Project</p></li>
          <li><div className="dropdown-divider"></div></li>
          <li>
            <p className='dropdown-item text-danger' onClick={() => {
              axios_delete_project(project.id)
                .then(() => {
                  delete_project(project.id)
                })
            }}>Delete Project</p>
          </li>
        </ul>
      </div>

      <div className="normal-line-height">
        <p className='ms-1 ms-md-0'>{project.description}</p>
        <a className="app-link ms-1 app-color p-1 pt-md-1 pt-0 f-m-smaller" href={project.link} target='_blank' rel='noopener noreferrer'>
          Show project

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" className="ms-1" width="16" height="16" focusable="false">
            <path d="M15 1v6h-2V4.41L7.41 10 6 8.59 11.59 3H9V1zm-4 10a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h2V3H5a3 3 0 00-3 3v5a3 3 0 003 3h5a3 3 0 003-3V9h-2z"></path>
          </svg>
        </a>
      </div>
    </div>
  )
}

export default ProjectCard