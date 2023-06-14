import { useContext, useEffect, useState } from 'react'
import { TeamDelete, TeamEmployee, TeamName } from './FormsToUpdate';
import Circles from '../Shared/Circles';
import { AiFillCloseCircle } from "react-icons/ai";
import { Context } from '../../Context/Context';
import axiosInstance from '../../utils/axios';
import Cookies from 'js-cookie';
import GlobalToast from '../Shared/Toast';

const Team = ({ allTeamsData, setallTeamsData }) => {

    const { setOpenFormToAddEdit, setLoading, idToEdit } = useContext(Context)
    const [teamName, setTeamName] = useState('')
    const [updateTheTeam, setUpdateTheTeam] = useState('')
    const [tabsToEdit, setTabsToEdit] = useState('rename')
    const [assignedEmployees, setAssignedEmployees] = useState([])
    const [unassignedEmployees, setUnassignedEmployees] = useState([])
    const [numberOfEmployees, setNumberOfEmployees] = useState(0)
    const [numberOfProjects, setNumberOfProjects] = useState(0)

    const formComponents = { rename: TeamName, employees: TeamEmployee, delete: TeamDelete };
    const FormComponent = formComponents[tabsToEdit] || null;

    // Data of the Team
    const specificTeam = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get(`/teams/specific-team/${idToEdit}`, { headers: { token: Cookies.get('token') } })
            setTeamName(response.data.data.name)
            setAssignedEmployees(response.data.data.employees)
            setUnassignedEmployees(response.data.unassignedEmployees)
            setNumberOfEmployees(response.data.numberOfEmployees)
            setNumberOfProjects(response.data.numberOfProjects)
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
            const response = await axiosInstance.put(`/teams/update-team-name/${idToEdit}`, { name: updateTheTeam }, {
                headers: { token: Cookies.get('token') }
            })
            setLoading(true)
            GlobalToast('success', response.data.message)
            // Get The Updated Team Data
            setallTeamsData((prevTeamsData) =>
                prevTeamsData.map((team) => team._id === idToEdit ? { ...team, name: response.data.data.name } : team)
            );
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);

    }



    // Assign Employee
    const handleAssignEmployee = async (e, employeeId) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put(`/teams/assign-team-to-employee/${idToEdit}`, { employeeId: employeeId }, {
                headers: { token: Cookies.get('token') }
            });
            GlobalToast('success', "Done");
            // Update unassignedEmployees array by removing the assigned employee
            setUnassignedEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== employeeId));
            // Update assignedEmployees array by adding the unassigned employee
            const employee = unassignedEmployees.find(emp => emp.id === employeeId);
            setAssignedEmployees(prevEmployees => [...prevEmployees, employee]);
            // Get The Updated Team Data
            setallTeamsData(prevTeamsData => {
                const updatedTeamsData = prevTeamsData.map(team => {
                    if (team._id === idToEdit) {
                        return { ...team, numberOfEmployees: assignedEmployees.length + 1 };
                    }
                    return team;
                });
                return updatedTeamsData;
            })
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message);
            }
        }
    };

    // UnAssign Employee
    const handleUnAssignEmployee = async (e, employeeId) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put(`/teams/un-assign-employee-from-team/${idToEdit}`, { employeeId: employeeId }, {
                headers: { token: Cookies.get('token') }
            });
            GlobalToast('success', "Done");
            // Update AssignedEmployees array by removing the unassigned employee
            setAssignedEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== employeeId));
            // Update unassignedEmployees array by adding the assigned employee
            const employee = assignedEmployees.find(emp => emp.id === employeeId);
            setUnassignedEmployees(prevEmployees => [...prevEmployees, employee]);
            // Get The Updated Team Data
            setallTeamsData(prevTeamsData => {
                const updatedTeamsData = prevTeamsData.map(team => {
                    if (team._id === idToEdit) {
                        return { ...team, numberOfEmployees: assignedEmployees.length - 1 };
                    }
                    return team;
                });
                return updatedTeamsData;
            })
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message);
            }
        }
    };

    // Delete Team
    const removeTeam = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await
                axiosInstance.delete(`/teams/remove-team/${idToEdit}`, { headers: { token: Cookies.get('token') } })
            GlobalToast('success', response.data.message)
            setallTeamsData(allTeamsData.filter((team) => team._id !== idToEdit))
            setTimeout(() => { setOpenFormToAddEdit({ openedToEdit: false }) }, 2000);
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        }
        finally { setLoading(false) }
    }

    useEffect(() => {
        specificTeam()
    }, [])

    return (
        <>
            {/* Circles */}
            <Circles className1={'-left-2 bottom-0 w-6 h-6 bg-orange'} className2={'left-6 bottom-2 w-4 h-4 bg-orange'} className3={'left-4 bottom-6 w-1 h-1 bg-orange'} />

            <AiFillCloseCircle onClick={() => { setOpenFormToAddEdit({ openedToEdit: false }) }}
                className='absolute top-2 right-2' cursor='pointer' size={25} color='#e04e17'
            />
            {/* Title */}
            <h1 className='font-alkatra text-orange font-semibold w-full p-2 my-1 text-center text-xl'>
                Update Team's Data
            </h1>
            {/* Nav Tabs */}
            <div className='w-10/12 m-auto h-fit p-2  flex justify-between items-center gap-x-2'>
                {['rename', 'employees', 'delete'].map((key, index) => (
                    <span key={index} onClick={() => setTabsToEdit(key)}
                        className={`${tabsToEdit === key ? 'opacity-40' : ''} w-1/2 rounded-lg transition duration-700 ease-in-out hover:opacity-40 bg-sidebar h-fit p-2 text-center cursor-pointer font-alkatra text-xl`}
                    >{key}
                    </span>
                ))}
            </div>

            {/* Forms */}
            {FormComponent && <FormComponent
                // 
                teamName={teamName}
                // Update Name
                updateTheTeam={updateTheTeam}
                updateTeamName={updateTeamName}
                handleChangeTeamName={handleChangeTeamName}
                // Delete
                removeTeam={removeTeam}
                // Un / Assign
                handleAssignEmployee={handleAssignEmployee}
                handleUnAssignEmployee={handleUnAssignEmployee}
                setAssignedEmployees={setAssignedEmployees}
                setUnassignedEmployees={setUnassignedEmployees}
                assignedEmployees={assignedEmployees}
                unassignedEmployees={unassignedEmployees}
                numberOfEmployees={numberOfEmployees}
                numberOfProjects={numberOfProjects}
            />}


        </>

    )
}

export default Team