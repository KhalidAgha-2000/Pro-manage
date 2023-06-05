import { useContext, useEffect, useState } from 'react'
import { TeamDelete, TeamEmployee, TeamName } from './FormsToUpdate';
import { TeamContext } from '../../Context/TeamContext';
import Circles from '../Shared/Circles';
import { AiFillCloseCircle } from "react-icons/ai";
import { Context } from '../../Context/Context';
import axiosInstance from '../../utils/axios';
import Cookies from 'js-cookie';
import GlobalToast from '../Shared/Toast';

const Team = ({ allTeamsData, setallTeamsData }) => {

    const { setLoading } = useContext(Context)
    const { setOpenFormToEdit, openFormToEdit, id, teamName } = useContext(TeamContext);
    const [teamData, setTeamData] = useState({})
    const [updateTheTeam, setUpdateTheTeam] = useState('')
    const [assignedEmployees, setAssignedEmployees] = useState([])
    const [unassignedEmployees, setUnassignedEmployees] = useState([])

    // Data of the Team
    const specificTeam = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get(`/teams/specific-team/${id}`, { headers: { token: Cookies.get('token') } })
            console.log(response.data.data.name);
            setTeamData(response.data)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
            }
        }
        setTimeout(() => { setLoading(false) }, 2000);
    }

    // Update Team`s name
    const handleChangeTeamName = (e) => {
        setUpdateTheTeam(e.target.value.trim())
    }
    const updateTeamName = async (e) => {
        e.preventDefault()
        // Check if the team name state is empty
        if (!updateTheTeam) {
            GlobalToast('warn', 'Please enter a team name.')
            return
        }

        try {
            const response = await axiosInstance.put(`/teams/update-team-name/${id}`, { name: updateTheTeam }, {
                headers: { token: Cookies.get('token') }
            })
            setLoading(true)
            GlobalToast('success', response.data.message)
            // Get The Updated Team Data
            console.log(response.data.data);
            setallTeamsData((prevTeamsData) =>
                prevTeamsData.map((team) => team._id === id ? { ...team, name: response.data.data.name } : team)
            );
            setTimeout(() => { setOpenFormToEdit({ opened: false }) }, 2000);
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);

    }

    // Delete Team
    const removeTeam = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await
                axiosInstance.delete(`/teams/remove-team/${id}`, { headers: { token: Cookies.get('token') } })
            console.log(response);
            GlobalToast('success', response.data.message)
            setallTeamsData(allTeamsData.filter((team) => team._id !== id))
            setTimeout(() => { setOpenFormToEdit({ opened: false }) }, 2000);
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error);
                GlobalToast('warn', error.response.data.message)
            }
        }
        finally { setLoading(false) }
    }
    const formComponents = { rename: TeamName, delete: TeamDelete, employees: TeamEmployee };
    const FormComponent = formComponents[openFormToEdit.formName] || null;


    const getEmployeesByTeamToAssignUn = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get(`/teams/get-employees-by-Team-to-assign-un/${id}`, { headers: { token: Cookies.get('token') } })
            console.log(response.data.data);
            setAssignedEmployees(response.data.data.assignedEmployees)
            setUnassignedEmployees(response.data.data.unassignedEmployees)
            // console.log('tt', employeesOfTeam);
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error);
                GlobalToast('warn', error.response.data.message)
            }
        }
        finally { setLoading(false) }
    }
    useEffect(() => {

        // specificTeam()
    }, [])

    return (
        <div className='w-1/3 h-4/6 max-h-fit z-[9999] m-auto bg-light relative overflow-hidden'>

            {/* Circles */}
            <Circles className1={'-left-2 bottom-0 w-6 h-6 bg-orange'} className2={'left-6 bottom-2 w-4 h-4 bg-orange'} className3={'left-4 bottom-6 w-1 h-1 bg-orange'} />

            <AiFillCloseCircle onClick={() => { setOpenFormToEdit({ opened: false }) }}
                className='absolute top-2 right-2' cursor='pointer' size={25} color='#e04e17'
            />
            {FormComponent && <FormComponent
                // 
                teamData={teamData}
                // Update Name
                updateTheTeam={updateTheTeam}
                updateTeamName={updateTeamName}
                handleChangeTeamName={handleChangeTeamName}
                // Delete
                removeTeam={removeTeam}
                // Employees
                getEmployeesByTeamToAssignUn={getEmployeesByTeamToAssignUn}
                assignedEmployees={assignedEmployees}
                unassignedEmployees={unassignedEmployees}
            />}


        </div>

    )
}

export default Team