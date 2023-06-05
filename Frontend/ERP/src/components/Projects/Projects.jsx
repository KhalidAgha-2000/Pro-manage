import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context';
import axiosInstance from '../../utils/axios';
import Cookies from "js-cookie";
import { IoMdAdd, IoMdArchive } from "react-icons/io";
import { FaProjectDiagram } from "react-icons/fa";
import GlobalToast from '../Shared/Toast';
import NoValueMatchSeaarch, { filteredArrayToSearch } from '../../utils/search';
import { FalidtoFetch } from '../Shared/Loading';
import { IconButtons } from "../Shared/Buttons";
import ProjectCard from './ProjectCard';
import AddProject from './AddProject';
import { ProjectContext } from '../../Context/ProjectContext';

const Projects = () => {
    const { setLoading, search } = useContext(Context)
    const { setIsOpenToAdd } = useContext(ProjectContext)

    const [allProjectsData, setAllProjectsData] = useState([]);
    const [isArchived, setIsArchived] = useState(false)
    const [teamsData, setTeamsData] = useState([])
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

    // Get All Teams
    const getAllTeams = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get('/teams/all-teams/', { headers: { token: Cookies.get('token') } })
            setTeamsData(response.data.data)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
            }
        } setTimeout(() => { setLoading(false) }, 2000);
    }

    useEffect(() => {
        getAllProjects()
        getAllTeams()
    }, [isArchived, search])

    // Change Project Status
    const changeProjectStatus = async (e, _id) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/projects/change-project-status/${_id}`, {}, {
                headers: { token: Cookies.get('token') },
            });
            setLoading(true)
            GlobalToast('success', response.data.message)
            // Get The Updated Project Status
            setAllProjectsData(prevProjectStatus => {
                const updatedProjectStatus = prevProjectStatus.map(prj => {
                    if (prj._id === _id) {
                        return { ...prj, in_progress: response.data.data.in_progress };
                    }
                    return prj;
                });
                return updatedProjectStatus;
            })
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);

    }

    return (

        <div className='w-full h-[75vh] relative flex flex-wrap justify-center p-3 gap-x-4 gap-y-4 overflow-auto '>

            <header onClick={() => setIsArchived(!isArchived)}
                className='absolute top-2 right-0 flex items-center w-fit m-auto bg-orange text-sidebar rounded-md p-1 mx-1 font-montserrat h-fit cursor-pointer hover:opacity-50 transition duration-200 ease-in-out'>
                {!isArchived ? <IoMdArchive /> : <FaProjectDiagram />}
                <span className='mx-1'>{!isArchived ? "See Archived Projects" : "Back To Projects "}</span>
            </header>


            {/* Projects */}
            {allProjectsData.length == 0 ? <FalidtoFetch /> : filteredAdminsToSearch.length === 0 ? <NoValueMatchSeaarch /> :
                filteredAdminsToSearch.reverse().map((projj) => (
                    <ProjectCard key={projj._id} data={projj}
                        _id={projj._id}
                        changeProjectStatus={changeProjectStatus}
                    />
                ))
            }

            {/* Add Button */}
            <IconButtons Icon={IoMdAdd} onClick={() => setIsOpenToAdd(true)} className={'fixed right-6 bottom-6'} />

            {/* Add Project */}
            <AddProject allProjectsData={allProjectsData} setAllProjectsData={setAllProjectsData} teamsData={teamsData} />


        </div>
    )
}

export default Projects