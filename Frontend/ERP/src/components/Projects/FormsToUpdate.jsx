import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { Buttons } from '../Shared/Buttons'
import Inputs from '../Shared/Inputs'
import { HiUserCircle } from 'react-icons/hi'
import { AiFillCheckCircle } from 'react-icons/ai'

// Project Status: In_Progress / Archived 
export const ProjectStatus = ({ ProjectData, isArchivedProject, changeProjectStatus, archiveProject }) => {

    useEffect(() => {
    }, [isArchivedProject])

    return (
        <motion.form initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}
            className='w-full h-full flex flex-col my-2 p-2'>
            {/* In Progress */}
            <div className='w-full text-center py-2 h-40'>
                <h1 className='font-alkatra text-xl text-orange font-semibold w-full p-2 my-1 mb-6 text-center'>
                    {ProjectData.in_progress ? "Pause the process" : "Move project to the ongoing activities"}
                </h1>
                <Buttons remove disabled={isArchivedProject}
                    text={`Mark as : ${ProjectData.in_progress ? "inactive" : "in_progress"} `} className={'w-8/12'}
                    onClick={changeProjectStatus}
                />

            </div>

            {/* Archived */}
            <div className='w-full text-center py-2 h-40 border-t-4'>
                <h1 className='font-alkatra text-xl text-orange font-semibold w-full p-2 my-1 mb-6 text-center'>
                    {isArchivedProject ? "Project already archived on :" : "Archiving project will be permanently"}
                </h1>

                {isArchivedProject ?
                    <span className='w-10/12 h-fit p-2 bg-orange text-center text-light rounded-md'>
                        {ProjectData.archiveDate}
                    </span> :
                    <Buttons onClick={archiveProject} remove text={'archive'} className={'w-8/12'} />
                }
            </div>
        </motion.form>
    )
}

// Project Team 
export const ProjectTeam = ({ ProjectData, teamToAssign, setTeamToAssign, ChangeTeamOfProject, teamsData }) => {
    return (
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}
            onSubmit={ChangeTeamOfProject} className='w-full h-full flex flex-col items-center my-8 gap-y-14  '>

            <h1 className="w-10/12 rounded-lg bg-sidebar h-fit p-2 text-center font-alkatra text-xl">
                Project associated to <span className='underline'>{ProjectData.teamName}</span>
            </h1>

            <form className='w-full flex flex-col justify-between items-center gap-y-10 pb-5'>

                <select name="team"
                    onChange={(e) => { setTeamToAssign(e.target.value) }}

                    className='h-14 rounded-md w-5/6 p-1 bg-light outline-none border-4 border-sidebar font-montserrat font-semibold text-dark placeholder:text-dark placeholder:opacity-60 focus:shadow-lg focus:shadow-orange'>
                    <option>change team</option>
                    {teamsData.map(team => (<option className='text-orange hover:bg-dark hover:text-light'
                        value={team._id} key={team._id}  >{team.name}</option>
                    ))}
                </select>

                <Buttons
                    disabled={teamToAssign === ''}
                    done text={'update'} className={'w-10/12'} />
            </form>
        </motion.div>
    )
}


// Project Neam 
export const ProjectRename = ({ ProjectData, handleChangeProjectName, updateProjectName, updateTheProjectName }) => {
    return (
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}
            onSubmit={updateProjectName} className='w-full h-full flex flex-col items-center my-8 gap-y-14  '>

            <h1 className="w-10/12 rounded-lg bg-sidebar h-fit p-2 text-center font-alkatra text-xl">
                Fix project's name
            </h1>

            <form className='w-full flex flex-col justify-between items-center gap-y-10 pb-5'>
                <Inputs
                    onChange={handleChangeProjectName}
                    name="name" placeholder='name'
                    defaultValue={ProjectData.name}
                    className={'pt-3 px-1 w-10/12'} />
                <Buttons
                    disabled={updateTheProjectName === ''}
                    done text={'update'} className={'w-10/12'} />
            </form>
        </motion.div>
    )
}

// Roles
export const Projectroles = ({ ProjectData, allRolesData, handleChangeRole, assignRoleToEmployee }) => {

    return (
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}
            className='w-[95%] h-[53vh] mt-4 border-[0.5px] m-auto overflow-auto bg-sidebar'
        >
            {ProjectData.teamemployees.length === 0 ?
                <p className='w-fit h-fit m-auto p-3 my-8 rounded-md bg-orange text-lg font-alkatra text-light'
                >No employees working here!</p> : ProjectData.teamemployees.map((em) => (
                    <form className='flex justify-between items-center w-[95%] rounded-md text-xl m-auto p-2 my-2 bg-light relative' key={em._id}>
                        {em.image && <img src={em.image} alt={em.Employee_Name} className='object-cover object-center aspect-square rounded-full mx-1 w-6 h-6' /> || <HiUserCircle size={10} />}
                        <span className='w-1/2 mr-2 truncate'>{em.Employee_Name}</span>
                        <select className='w-1/2 mr-10 text-center h-8 m-auto rounded-md 2 bg-light focus:outline-orange outline-orange font-alkatra text-lg text-orange'
                            onChange={(e) => handleChangeRole(e, em._id)}>
                            {em.role.roleId ? (
                                <option key={em.role.roleId} value={em.role.roleId} className=''>
                                    {em.role.roleName}
                                </option>
                            ) : (
                                <option value="">No role assigned</option>
                            )}
                            {allRolesData.map((r) => (
                                <option key={r._id} value={r._id} >
                                    {r.name}
                                </option>
                            ))}
                        </select>
                        <AiFillCheckCircle onClick={assignRoleToEmployee} color='#4bb543' cursor='pointer' size={22} className='absolute top-4 right-2 hover:scale-150 transition duration-200 ease-in-out' />
                    </form>
                ))}

        </motion.div>
    )
}