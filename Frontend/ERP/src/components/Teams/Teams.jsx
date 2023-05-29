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
import TeamCard from './TeamCard';
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
    const filteredTeamsToSearch = filteredArrayToSearch(allTeamsData, 'name', search)

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

        </div>
    )
}

export default Teams