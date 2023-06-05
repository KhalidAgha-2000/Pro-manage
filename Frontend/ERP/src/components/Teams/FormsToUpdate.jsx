import { useContext, useEffect, useState } from 'react';
import { TeamContext } from '../../Context/TeamContext';
import { Buttons } from '../Shared/Buttons'
import Inputs from '../Shared/Inputs'
import { Context } from '../../Context/Context';

export const TeamName = ({ teamData, updateTheTeam, updateTeamName, handleChangeTeamName }) => {

    const { setOpenFormToEdit, openFormToEdit, id, teamName } = useContext(TeamContext);

    return (
        <div className='h-3/4 p-4 flex flex-col justify-between gap-y-12 '>
            <h1 className='font-alkatra text-xl text-orange font-semibold w-full p-2 my-1 mb-6 text-center'>
                Fix Team's name
            </h1>

            <form
                onSubmit={updateTeamName}
                className='flex flex-col justify-between items-center gap-y-10 pb-5'>
                <Inputs
                    onChange={handleChangeTeamName}
                    name="name"
                    defaultValue={teamName}
                    placeholder='name'
                    className={'pt-3 px-1 w-10/12'} />
                <Buttons done text={'update'} className={'w-10/12'} />

            </form>
        </div>
    )
}



export const TeamDelete = ({ removeTeam, teamData }) => {
    const { setOpenFormToEdit, openFormToEdit, id, teamName, hasEmployees, hasProjects } = useContext(TeamContext);

    return (
        <div className='h-3/4 p-4 flex flex-col justify-between gap-y-12 '>
            <h1 className='font-alkatra text-xl text-orange font-semibold w-full p-2 my-1 mb-6 text-center'>
                Deletion process will be permanently
            </h1>

            <form className='flex flex-col justify-between items-center gap-y-10 pb-5'>
                <span className='w-10/12 h-fit p-2 bg-failed text-center text-light rounded-md'>
                    {hasEmployees || hasProjects ? "Team is assigned" : "Team's data is clrear, DELETE"}
                </span>
                <Buttons onClick={(e) => removeTeam(e, id)}
                    done text={'confirm process'} className={'w-10/12'}
                    disabled={hasEmployees || hasProjects ? true : false}
                />
            </form>

        </div>
    )
}



export const TeamEmployee = ({ getEmployeesByTeamToAssignUn, employeesOfTeam, assignedEmployees, unassignedEmployees }) => {

    const [addRemove, setAddRemove] = useState(true)
    const { setOpenFormToEdit, openFormToEdit, id, teamName, hasEmployees, hasProjects } = useContext(TeamContext);
    const { setLoading } = useContext(Context)



    useEffect(() => {
        getEmployeesByTeamToAssignUn()
    }, [])

    return (
        <div className='h-full p-4 flex flex-col'>
            <h1 className='font-alkatra text-xl text-orange font-semibold w-full p-2 my-1 text-center'>
                Update Team's Employees
            </h1>

            <div className='flex flex-col w-full h-full rounded-md pb-14 bg-sidebar'>
                <header className='h-1/4 w-full m-auto p-2 flex gap-2 bg-sidebar rounded-md'>
                    <span onClick={() => setAddRemove(true)} className={`${addRemove ? 'opacity-75' : ''} w-1/2 rounded-lg cursor-pointer bg-light h-fit p-2 text-center font-alkatra text-xl transition duration-200 ease-in-out`}>IN</span>
                    <span onClick={() => setAddRemove(false)} className={`${!addRemove ? 'opacity-75' : ''} w-1/2 rounded-lg cursor-pointer bg-light h-fit p-2 text-center font-alkatra text-xl transition duration-200 ease-in-out`}>OUT</span>
                </header>

                <div className='w-full h-3/4  border-[0.5px] m-auto overflow-auto '>
                    {
                        addRemove ?

                            assignedEmployees.length == 0 ?
                                <span className='absolute top-52 left-14 w-3/4  rounded-lg bg-light h-fit p-2 pt-2 m-auto text-center font-alkatra text-xl'>No employees assigned to this team</span> :
                                assignedEmployees
                                    .map((e, index) => (
                                        <h2>{index}{e.Employee_Name}</h2>
                                    ))

                            :
                            unassignedEmployees.length == 0 ? "LOADIN" :
                                unassignedEmployees
                                    .map((e, index) => (
                                        <h2>{index}{e.Employee_Name}</h2>
                                    ))

                    }
                </div>

            </div>

        </div>
    )
}
