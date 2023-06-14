import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context';
import { ProjectRename, ProjectStatus, ProjectTeam, Projectroles } from './FormsToUpdate';
import Circles from '../Shared/Circles';
import { AiFillCloseCircle } from 'react-icons/ai'
import Cookies from 'js-cookie';
import axiosInstance from '../../utils/axios'
import GlobalToast from '../Shared/Toast';

const Project = ({ allProjectsData, setAllProjectsData, teamsData, allRolesData, setAllRolesData }) => {

    const { setLoading, idToEdit, setOpenFormToAddEdit } = useContext(Context)

    const [ProjectData, setProjectData] = useState({})
    const [isArchivedProject, setIsArchivedProject] = useState(false)
    const [tabsToEdit, setTabsToEdit] = useState('status')
    const [updateTheProjectName, setUpdateTheProjectName] = useState('')
    const [teamToAssign, setTeamToAssign] = useState('')
    const [roleToAssign, setRoleToAssign] = useState({ roleID: '', employeeID: '' })

    const formComponents = { status: ProjectStatus, rename: ProjectRename, team: ProjectTeam, roles: Projectroles };
    const FormComponent = formComponents[tabsToEdit] || null;

    // Data of the Project
    const specificProject = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get(`/projects/specific-project/${idToEdit}`, { headers: { token: Cookies.get('token') } })
            setProjectData(response.data.data)
            setIsArchivedProject(response.data.data.archive ? true : false)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
            }
        }
        setTimeout(() => { setLoading(false) }, 2000);
    }

    // Change Project Status
    const changeProjectStatus = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/projects/change-project-status/${idToEdit}`, {}, {
                headers: { token: Cookies.get('token') },
            });
            setLoading(true)
            GlobalToast('success', response.data.message)
            // Get The Updated Project Status in the form
            setProjectData(prevProjectData => ({ ...prevProjectData, in_progress: response.data.in_progress }));

            // Get The Updated Project of all project
            setAllProjectsData(prevProjectsData => {
                const updatedProjectsData = prevProjectsData.map(proj => {
                    if (proj._id === idToEdit) {
                        return { ...proj, in_progress: response.data.in_progress };
                    }
                    return proj;
                });
                return updatedProjectsData;
            })
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);

    }

    // Achive Project
    const archiveProject = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/projects/archive-project/${idToEdit}`, {}, {
                headers: { token: Cookies.get('token') },
            });
            setLoading(true)
            GlobalToast('success', response.data.message)
            // Get The Updated Project Data in the form archiveDate
            setIsArchivedProject(true)
            setProjectData(prevProjectData => ({ ...prevProjectData, archiveDate: response.data.data.archive.arcivedDate }));

            // Get The Updated Project of all project
            setAllProjectsData(prevProjectsData => {
                const updatedProjectsData = prevProjectsData.map(proj => {
                    if (proj._id === idToEdit) {
                        return {
                            ...proj, archive: {
                                ...proj.archive,
                                archived: response.data.data.archive.archived,
                                arcivedDate: response.data.data.archive.arcivedDate,
                            }
                        };
                    }
                    return proj;
                });
                return updatedProjectsData;
            });

        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);

    }

    // Update Project's Name
    const handleChangeProjectName = (e) => {
        setUpdateTheProjectName(e.target.value.trim())
    }
    const updateProjectName = async (e) => {
        e.preventDefault()
        // Check if the team name state is empty
        if (!updateTheProjectName) {
            GlobalToast('warn', 'Please enter a project name.')
            return
        }

        try {
            const response = await axiosInstance.put(`/projects/update-project-name/${idToEdit}`, { name: updateTheProjectName }, {
                headers: { token: Cookies.get('token') }
            })
            setLoading(true)
            GlobalToast('success', response.data.message)
            // Get The Updated Project Data
            setAllProjectsData((prevProjectsData) =>
                prevProjectsData.map((proj) => proj._id === idToEdit ? { ...proj, name: response.data.data.newName } : proj)
            );
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);

    }

    // Change Team
    const ChangeTeamOfProject = async (e) => {
        e.preventDefault()
        // Check if the name input is empty
        if (teamToAssign == '') {
            GlobalToast('warn', 'Please choose a team.')
            return
        }

        try {
            const response = await axiosInstance.put(`/projects/change-team/${idToEdit}`, { teamID: teamToAssign }, { headers: { token: Cookies.get('token') } })
            setLoading(true)
            GlobalToast('success', response.data.message)
            // Get The Updated Project Status in the form
            setProjectData(prevProjectData => ({ ...prevProjectData, teamName: response.data.data.newTeam }));
            // Get The Updated Project Data
            setAllProjectsData((prevProjectsData) =>
                prevProjectsData.map((proj) => proj._id === idToEdit ? {
                    ...proj, teamName: response.data.data.newTeam,
                    numberOfEmployees: response.data.data.numberOfEmployees
                } : proj)
            );

        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);

    }

    // Assign Role to Employee
    const handleChangeRole = (e, employeeID) => {
        setRoleToAssign({ roleID: e.target.value, employeeID: employeeID })
    }
    const assignRoleToEmployee = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.put(`/employees/assign-role-to-employee/${idToEdit}`, {
                employeeID: roleToAssign.employeeID, roleID: roleToAssign.roleID,
            }, { headers: { token: Cookies.get('token') }, }
            );
            GlobalToast('success', response.data.message)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', "Please, Choose a role")
            }
        } setTimeout(() => { setLoading(false) }, 2000);

    }

    useEffect(() => {
        specificProject()
    }, [])

    return (

        <div>
            {/* Circles */}
            <Circles className1={"-left-2 top-0 w-6 h-6 bg-orange"} className2={"left-6 top-2 w-4 h-4 bg-sidebar"} className3={"left-4 top-6 w-1 h-1 bg-orange"} />
            {/* Close */}
            <AiFillCloseCircle onClick={() => setOpenFormToAddEdit({ openedToEdit: false, })} className='absolute top-2 right-2' cursor='pointer' size={25} color='#e04e17' />
            {/* Title */}
            <h1 className='font-alkatra text-orange font-semibold w-full p-2 my-1 text-center text-xl'>
                Project's Settings
            </h1>

            {/* Nav Tabs */}
            <div className='w-10/12 m-auto h-fit p-2  flex justify-between items-center gap-x-2'>
                {['status', 'rename', 'team', 'roles'].map((key, index) => (
                    <span key={index} onClick={() => {
                        setTabsToEdit(key),
                            key === 'roles' ? specificProject() : ""
                    }}
                        className={
                            `${tabsToEdit === key ? 'opacity-40' : '',
                            isArchivedProject ? 'pointer-events-none opacity-40' : ''} 
                         w-1/2 rounded-lg transition duration-700 ease-in-out hover:opacity-40 bg-sidebar h-fit p-2 text-center cursor-pointer font-alkatra text-xl`}
                    >{key}
                    </span>
                ))}
            </div>

            {/* Forms */}
            <div className='w-full flex h-full'>
                {FormComponent && <FormComponent
                    ProjectData={ProjectData}
                    isArchivedProject={isArchivedProject}
                    // Change Project Status
                    changeProjectStatus={changeProjectStatus}
                    // Archive Project
                    archiveProject={archiveProject}
                    // Update Name
                    updateTheProjectName={updateTheProjectName}
                    handleChangeProjectName={handleChangeProjectName}
                    updateProjectName={updateProjectName}
                    // Change Team
                    setTeamToAssign={setTeamToAssign} teamToAssign={teamToAssign}
                    ChangeTeamOfProject={ChangeTeamOfProject}
                    teamsData={teamsData}
                    // Roles
                    allRolesData={allRolesData}
                    setAllRolesData={setAllRolesData}
                    handleChangeRole={handleChangeRole}
                    assignRoleToEmployee={assignRoleToEmployee}
                />}
            </div>
        </div>
    )
}

export default Project