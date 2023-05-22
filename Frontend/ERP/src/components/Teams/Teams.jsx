import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context';
import axiosInstance from '../../utils/axios';
import Cookies from 'js-cookie';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IconButtons } from "../Shared/Buttons";
import { MdAdd } from "react-icons/md";
import Circles from '../Shared/Circles';
import NoValueMatchSeaarch, { filteredArrayToSearch } from '../../utils/search';
import GlobalToast from '../Shared/Toast';
import { FalidtoFetch } from '../Shared/Loading';
const Teams = () => {
    const { setLoading, search } = useContext(Context)
    const [allTeamsData, setallTeamsData] = useState([]);

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
                filteredAdminsToSearch.length === 0 ?
                    <NoValueMatchSeaarch /> : filteredAdminsToSearch
                        .map((t) => (
                            <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}
                                className='bg-dark w-[32%] relative h-fit max-w-sm p-5 flex flex-col gap-y-1 rounded-lg shadow-lg font-montserrat overflow-hidden shadow-orange cursor-pointer hover:scale-105 hover:z-10 transition-all duration-300'
                                key={t._id}>

                                <Link to={"/dashboard/teams/team/" + t._id}>
                                    <div className='w-full h-1/4 my-2 flex items-center'>
                                        <span className='w-20 h-20 text-6xl uppercase font-alkatra flex items-center justify-center rounded-full bg-sidebar'>{t.name.charAt(0)}</span>
                                        {/* Numbers */}
                                        <div className='flex flex-col p-4 w-auto h-fit '>
                                            <h1 className='text-sidebar text-xl font-montserrat'><span className='w-1 h-1 px-2 mx-1 rounded-full'> {t.numberOfEmployees}</span>Employees</h1>
                                            <h1 className='text-orange text-xl font-montserrat'><span className='w-1 h-1 px-2 mx-1 rounded-full'> {t.numberOfProjects}</span>Projects</h1>
                                        </div>
                                    </div>

                                    <h1 className='text-sidebar font-semibold font-montserrat text-2xl text-center uppercase'>{t.name}</h1>

                                </Link>

                                {/* Circles */}
                                <Circles className1={'-right-1 -bottom-2 w-10 h-10 bg-sidebar'} className2={'-right-2 bottom-8 w-4 h-4 bg-sidebar'} />

                            </motion.div >
                        ))}

            {/* Add Button */}
            <IconButtons Icon={MdAdd} linkTo={'dashboard/teams/add-team'} />

        </div>
    )
}

export default Teams