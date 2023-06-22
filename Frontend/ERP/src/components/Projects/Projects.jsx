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
import Project from './Project';
import { FormToEdit, FormToAdd } from '../Shared/FormToEdit';
import { getAllRoles } from '../Roles/Roles';

const Projects = () => {

    const { setLoading, search, setOpenFormToAddEdit } = useContext(Context)

    const [allProjectsData, setAllProjectsData] = useState([]);
    const [isArchived, setIsArchived] = useState(false)
    const [teamsData, setTeamsData] = useState([])
    const [allRolesData, setAllRolesData] = useState({})

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
                axiosInstance.get('/teams/all-teams',
                    { headers: { token: Cookies.get('token') } })
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


    useEffect(() => {
        const getRolesData = async () => {
            try {
                const data = await getAllRoles();
                if (data) {
                    setAllRolesData(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getRolesData();
    }, [])



    return (

        <div className='w-full h-[75vh] relative flex flex-wrap justify-center p-3 gap-x-4 gap- overflow-auto '>
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
                    />
                ))
            }
            {/* Add Project */}
            <IconButtons Icon={IoMdAdd} onClick={() => setOpenFormToAddEdit({ openedToAdd: true })} className={'fixed right-6 bottom-6'} />
            <FormToAdd>
                <AddProject allProjectsData={allProjectsData} setAllProjectsData={setAllProjectsData} teamsData={teamsData} />
            </FormToAdd>

            <FormToEdit>
                <Project
                    teamsData={teamsData}
                    allRolesData={allRolesData}
                    setAllRolesData={setAllRolesData}
                    allProjectsData={allProjectsData} setAllProjectsData={setAllProjectsData}
                />
            </FormToEdit>


        </div>
    )
}

export default Projects



