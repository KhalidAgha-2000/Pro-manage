import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context';
import axiosInstance from '../../utils/axios';
import Cookies from 'js-cookie';
import { IconButtons } from "../Shared/Buttons";
import { MdAdd } from "react-icons/md";
import NoValueMatchSeaarch, { filteredArrayToSearch } from '../../utils/search';
import GlobalToast from '../Shared/Toast';
import { FalidtoFetch } from '../Shared/Loading';
import TeamCard from './TeamCard';
import Team from './Team';
import { FormToEdit, FormToAdd } from '../Shared/FormToEdit';
import AddTeam from "./AddTeam";
const Teams = () => {

    const { setLoading, search } = useContext(Context)
    const [allTeamsData, setallTeamsData] = useState([]);
    const [addTeam, setAddTeam] = useState(false)
    const [employeesData, setEmployeesData] = useState([])

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

    // Get All Employees
    const getAllEmployees = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get('/employees/all-employees',
                    { headers: { token: Cookies.get('token') } })
            setEmployeesData(response.data.data)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
            }
        }
        setTimeout(() => { setLoading(false) }, 2000);
    }
    // Search
    const filteredTeamsToSearch = filteredArrayToSearch(allTeamsData, 'name', search)

    useEffect(() => {
        getAllTeams()
        getAllEmployees()

    }, [search])

    return (
        <div className='w-full h-[75vh] relative flex flex-wrap justify-center p-3 gap-x-4 gap-y-4 mt-4 overflow-auto'>
            {allTeamsData.length == 0 ?
                <FalidtoFetch /> :
                filteredTeamsToSearch.length === 0 ?
                    <NoValueMatchSeaarch /> : filteredTeamsToSearch.reverse()
                        .map((team) => (
                            <TeamCard data={team} _id={team._id} key={team._id}
                            />
                        ))}

            {/* Add Team */}
            <IconButtons Icon={MdAdd} onClick={() => { setAddTeam(true) }} className={'fixed right-6 bottom-6'} />
            <AddTeam allTeamsData={allTeamsData} setallTeamsData={setallTeamsData} setAddTeam={setAddTeam} addTeam={addTeam} />

            {/* Edit Team */}
            <FormToEdit>
                <Team employeesData={employeesData} allTeamsData={allTeamsData} setallTeamsData={setallTeamsData} />
            </FormToEdit>
        </div>
    )
}

export default Teams