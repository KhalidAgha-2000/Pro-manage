import { useContext, useState } from 'react'
import Inputs from "../Shared/Inputs";
import { Buttons } from '../Shared/Buttons';
import Circles from '../Shared/Circles';
import Cookies from 'js-cookie';
import GlobalToast from '../Shared/Toast';
import { Context } from '../../Context/Context';
import axiosInstance from '../../utils/axios';

const AddProject = ({ teamsData, allProjectsData, setAllProjectsData }) => {

    const { setLoading, setOpenFormToAddEdit } = useContext(Context)

    const [newProject, setNewProject] = useState('')
    const [teamToAssign, setTeamToAssign] = useState('')

    // Add New Project
    const addNewProject = async (e) => {
        e.preventDefault()
        // Check if the name input is empty
        if (newProject == '' || teamToAssign == '') {
            GlobalToast('warn', 'Please fill the inputs.')
            return
        }

        try {
            const response = await axiosInstance.post('/projects/add-project',
                { name: newProject, teamID: teamToAssign },
                { headers: { token: Cookies.get('token') } })
            setLoading(true)
            GlobalToast('success', response.data.message)
            setAllProjectsData([...allProjectsData, response.data.data]);
            setTimeout(() => { setOpenFormToAddEdit({ openedToAdd: false }) }, 2000);
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);
    }

    return (
        <>
            {/* Circles */}
            <Circles className1={'-left-2 bottom-0 w-6 h-6 bg-orange'} className2={'left-6 bottom-2 w-4 h-4 bg-sidebar'} className3={'left-4 bottom-6 w-1 h-1 bg-orange'} />
            {/* Header */}
            <h1 className='font-alkatra text-orange font-semibold w-full p-2 mt-6 text-center text-xl'>Create New Project</h1>

            <form className='w-full h-1/2 m-auto mt-24 flex flex-col justify-between items-center '>

                <Inputs className={'w-5/6'} onChange={(e) => { setNewProject(e.target.value.trim()) }} name="name" placeholder='name' type='text' />

                <select name="team" onChange={(e) => { setTeamToAssign(e.target.value) }}
                    className='h-14 rounded-md w-5/6 p-1 bg-light outline-none border-4 border-sidebar font-montserrat font-semibold text-dark placeholder:text-dark placeholder:opacity-60 focus:shadow-lg focus:shadow-orange'>
                    <option>choose a team</option>
                    {teamsData.map(team => (<option className='text-orange hover:bg-dark hover:text-light'
                        value={team._id} key={team._id} >{team.name}</option>
                    ))}
                </select>

                <div className='w-5/6 flex justify-end items-center  gap-x-2'>
                    <Buttons onClick={() => {
                        setOpenFormToAddEdit({ openedToAdd: false }), setNewProject(''), setTeamToAssign('')
                    }} remove text={"Discard"} />

                    <Buttons onClick={addNewProject} done text={"Done"} />
                </div>


            </form>
        </>
    )
}

export default AddProject