import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context';
import axiosInstance from '../../utils/axios';
import Cookies from "js-cookie";
import { IoMdArchive } from "react-icons/io";
import { FaProjectDiagram } from "react-icons/fa";
import GlobalToast from '../Shared/Toast';
import NoValueMatchSeaarch, { filteredArrayToSearch } from '../../utils/search';
import { FalidtoFetch } from '../Shared/Loading';
import ProjectCard from './ProjectCard';

const Projects = () => {
    const { setLoading, search } = useContext(Context)

    const [allProjectsData, setAllProjectsData] = useState([]);
    const [isArchived, setIsArchived] = useState(false)

    // Search
    const filteredAdminsToSearch = filteredArrayToSearch(allProjectsData, 'name', search)


    // Get All Project
    const getAllProjects = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get(`/projects/all-projects?isArchived=${isArchived}`
                    , { headers: { token: Cookies.get('token') } }
                )
            setAllProjectsData(response.data.data);
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
            }
        }
        setTimeout(() => { setLoading(false) }, 2000);
    }
    useEffect(() => {
        getAllProjects()
    }, [isArchived, search])

    return (

        <div className='w-full h-[75vh] relative flex flex-wrap justify-center p-3 gap-x-4 gap-y-4 overflow-auto '>

            <header onClick={() => setIsArchived(!isArchived)}
                className='absolute top-2 right-0 flex items-center w-fit m-auto bg-orange text-sidebar rounded-md p-1 mx-1 font-montserrat h-fit cursor-pointer hover:opacity-50 transition duration-200 ease-in-out'>
                {!isArchived ? <IoMdArchive /> : <FaProjectDiagram />}
                <span className='mx-1'>{!isArchived ? "Go To Archived Project" : "Back To Projects "}</span>
            </header>

            {/* Projects */}
            {allProjectsData.length == 0 ? <FalidtoFetch /> : filteredAdminsToSearch.length === 0 ? <NoValueMatchSeaarch /> :
                filteredAdminsToSearch.map((p) => (
                    <ProjectCard key={p._id}
                        _id={p._id} name={p.name} teamName={p.teamName} in_progress={p.in_progress} numberOfEmployees={p.numberOfEmployees}
                    />
                ))
            }

        </div >
    )
}

export default Projects