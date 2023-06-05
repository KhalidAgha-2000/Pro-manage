import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context';
import axiosInstance from '../../utils/axios';
import Cookies from 'js-cookie';
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IconButtons } from "../Shared/Buttons";
import { MdAdd } from "react-icons/md";
import Circles from '../Shared/Circles';
import NoValueMatchSeaarch, { filteredArrayToSearch } from '../../utils/search';
import GlobalToast from '../Shared/Toast';
import { FalidtoFetch } from '../Shared/Loading';
import TeamCard from './TeamCard';
import Team from './Team';
import { TeamContext } from '../../Context/TeamContext';

const Teams = () => {
    const { setLoading, search } = useContext(Context)
    const [allTeamsData, setallTeamsData] = useState([]);
    const { setOpenFormToEdit, opened, openFormToEdit, id } = useContext(TeamContext);


    const getAllTeams = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get('/teams/all-teams',
                    { headers: { token: Cookies.get('token') } }
                )
            setallTeamsData(response.data.data);
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', "Oops! Some thing wrong, try to reload")
            }
        }
        setTimeout(() => { setLoading(false) }, 2000);
    }
    // Search
    const filteredAdminsToSearch = filteredArrayToSearch(allTeamsData, 'name', search)

    useEffect(() => {
        getAllTeams()
    }, [search])

    return (
        <div className='w-full h-[75vh] relative flex flex-wrap justify-center p-3 gap-x-4 gap-y-4 mt-4 overflow-auto'>
            {allTeamsData.length == 0 ?
                <FalidtoFetch /> :
                filteredTeamsToSearch.length === 0 ?
                    <NoValueMatchSeaarch /> : filteredTeamsToSearch
                        .map((team) => (
                            <TeamCard data={team} _id={team._id} key={team._id}
                            />
                        ))}

            {/* Add Button */}
            <IconButtons Icon={MdAdd} linkTo={'dashboard/teams/add-team'} />


            <AnimatePresence>
                {opened &&
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}
                        className="fixed top-0 left-0 w-full h-full z-10 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <Team allTeamsData={allTeamsData} setallTeamsData={setallTeamsData} />
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default Teams