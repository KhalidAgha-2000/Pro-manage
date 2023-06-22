import React, { useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GiCheckMark } from "react-icons/gi";
import { TbLetterX } from "react-icons/tb";
import { Context } from '../../Context/Context'
import Cookies from 'js-cookie'
import axiosInstance from '../../utils/axios'
import GlobalToast from '../Shared/Toast'
const AddTeam = ({ addTeam, setAddTeam, allTeamsData, setallTeamsData }) => {

    const { setLoading } = useContext(Context)
    const [newTeam, setNewTeam] = useState('')
    // Add Team 
    const addNewTeam = async (e) => {
        e.preventDefault()
        // Check if the Team input is empty
        if (newTeam === '') {
            GlobalToast('warn', 'Please enter a team name.')
            return
        }

        try {
            const response = await axiosInstance.post('/teams/add-team',
                { name: newTeam },
                { headers: { token: Cookies.get('token') } })
            setLoading(true)
            GlobalToast('success', response.data.message)
            setallTeamsData([...allTeamsData, response.data.data]);
            setAddTeam(false)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);
    }
    return (
        <AnimatePresence>
            {addTeam && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}
                    className="w-full h-[80vh] fixed">

                    <form className='w-80 h-fit fixed right-10 bottom-20 flex flex-col gap-y-2 p-4 rounded-2xl bg-white border-4 border-sidebar '>
                        <span className='text-orange font-montserrat font-bold'>Add new Team</span>
                        <div className='flex items-center justify-between '>
                            <input onChange={(e) => setNewTeam(e.target.value.trim())}
                                type="text" requiredname="name" placeholder='Team name'
                                className="w-3/4 bg-gray-50 text-sm rounded-lg focus:ring-orange border outline-none p-2.5 "
                            />

                            <GiCheckMark cursor='pointer' color='#4bb543' onClick={addNewTeam} />
                            <TbLetterX cursor='pointer' color='#ff3333' onClick={() => setAddTeam(false)} />
                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default AddTeam