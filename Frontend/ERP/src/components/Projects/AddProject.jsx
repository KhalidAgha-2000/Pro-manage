import { motion, AnimatePresence } from 'framer-motion'
import { ProjectContext } from '../../Context/ProjectContext'
import { useContext, useState } from 'react'
import Inputs from "../Shared/Inputs";
import { Buttons } from '../Shared/Buttons';
import Circles from '../Shared/Circles';
import Cookies from 'js-cookie';
import GlobalToast from '../Shared/Toast';
import { Context } from '../../Context/Context';
import axiosInstance from '../../utils/axios';

const AddProject = ({ teamsData, allProjectsData, setAllProjectsData }) => {

    const { isOpenToAdd, setIsOpenToAdd } = useContext(ProjectContext)
    const { setLoading } = useContext(Context)

    const [newProject, setNewProject] = useState('')
    const [teamToAssign, setTeamToAssign] = useState('')
    // StellarShift    NexusQuest    PulseWave    GravityRise    Synthopia    LuminaryEdge    QuantumSphere    EchoVerse    NovaReach    CatalystX

    // Add New Project
    const addNewProject = async (e) => {
        e.preventDefault()
        // Check if the name input is empty
        if (newProject == '' || teamToAssign == '') {
            GlobalToast('warn', 'Please fill the inputs.')
            return
        }

        try {
            const response = await axiosInstance.post('/projects/add-project', { name: newProject, teamID: teamToAssign }, { headers: { token: Cookies.get('token') } })
            setLoading(true)
            GlobalToast('success', response.data.message)
            setAllProjectsData([...allProjectsData, response.data.data]);
            setIsOpenToAdd(false)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);
    }

    return (
        <AnimatePresence>
            {isOpenToAdd && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}
                    className="fixed top-0 left-0 w-full z-[999] h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">

                    <div className='w-1/3 h-1/2 max-h-fit m-auto bg-light relative overflow-hidden'>

                        {/* Header */}
                        <h1 className='font-alkatra text-xl text-orange font-semibold w-full p-2 my-1 mb-6 text-center'>Add New Project To The System</h1>

                        <form className='w-full m-auto h-full flex flex-col items-center gap-y-8'>

                            <Inputs className={'w-5/6'}
                                onChange={(e) => { setNewProject(e.target.value.trim()) }}
                                name="name" placeholder='name' type='text'
                            />
                            <select name="team"
                                onChange={(e) => { setTeamToAssign(e.target.value), console.log(teamToAssign); }}
                                className='h-14 rounded-md w-5/6 p-1 bg-light outline-none border-4 border-sidebar font-montserrat font-semibold text-dark placeholder:text-dark placeholder:opacity-60 focus:shadow-lg focus:shadow-orange'>
                                <option>choose a team</option>
                                {teamsData.map(team => (<option className='text-orange hover:bg-dark hover:text-light'
                                    value={team._id} key={team._id} >{team.name}</option>
                                ))}
                            </select>

                            <div className='w-5/6 flex justify-end items-center  gap-x-2'>
                                <Buttons onClick={(e) => { e.preventDefault(); setIsOpenToAdd(false) }} remove text={"Discard"} />
                                <Buttons onClick={addNewProject} done text={"Done"} />
                            </div>

                            {/* Circles */}
                            <Circles className1={'-left-2 bottom-0 w-6 h-6 bg-orange'} className2={'left-6 bottom-2 w-4 h-4 bg-sidebar'} className3={'left-4 bottom-6 w-1 h-1 bg-orange'} />

                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default AddProject