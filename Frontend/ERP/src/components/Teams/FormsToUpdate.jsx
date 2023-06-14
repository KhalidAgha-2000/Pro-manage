import { useContext, useState } from 'react';
import { Buttons } from '../Shared/Buttons'
import Inputs from '../Shared/Inputs'
import { Context } from '../../Context/Context';
import { motion } from 'framer-motion';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';
import { HiUserCircle } from "react-icons/hi";

// Fix Team's Name
export const TeamName = ({ updateTheTeam, updateTeamName, teamName, handleChangeTeamName }) => {

    return (
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}
            onSubmit={updateTeamName} className='w-full h-full flex flex-col items-center my-8 gap-y-14  '>

            <h1 className="w-10/12 rounded-lg bg-sidebar h-fit p-2 text-center font-alkatra text-xl">
                Fix Team's name
            </h1>

            <form onSubmit={updateTeamName} className='w-full flex flex-col justify-between items-center gap-y-10 pb-5'>
                <Inputs onChange={handleChangeTeamName}
                    name="name" placeholder='name'
                    defaultValue={teamName} className={'pt-3 px-1 w-10/12'} />
                <Buttons disabled={updateTheTeam === ''} done text={'update'} className={'w-10/12'} />
            </form>
        </motion.div>

    )
}


// Remove Team
export const TeamDelete = ({ removeTeam, numberOfEmployees, numberOfProjects }) => {
    const { idToEdit } = useContext(Context)
    return (
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}
            className='h-full p-4 flex flex-col justify-start gap-y-10 '>
            <h1 className='font-alkatra text-xl text-failed font-semibold w-full p-2 my-1 mb-6 text-center'>
                Deletion process will be permanently!!
            </h1>

            <form className='flex flex-col items-center justify-start gap-y-10 pb-5'>
                <span className='w-10/12 h-fit p-2 bg-orange text-center text-light rounded-md'>
                    {numberOfEmployees || numberOfProjects ? "this team is associated" : "Team's data is clrear, DELETE"}
                </span>
                <Buttons onClick={(e) => removeTeam(e, idToEdit)}
                    remove text={'confirm process'} className={'w-10/12'}
                    disabled={numberOfEmployees || numberOfProjects ? true : false}
                />
            </form>

        </motion.div>
    )
}


// Employees / Assign / Unassign
export const TeamEmployee = ({ handleAssignEmployee, handleUnAssignEmployee, assignedEmployees, unassignedEmployees }) => {

    const [addRemove, setAddRemove] = useState(true)

    return (
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}
            className='h-full p-2 flex flex-col'>

            <div className='flex flex-col w-full h-3/4 rounded-md bg-sidebar'>
                {/* IN / OUT */}
                <header className='h-fit w-full m-auto p-2 flex gap-2 bg-sidebar rounded-md'>
                    <span onClick={() => setAddRemove(true)} className={`${addRemove ? 'opacity-40' : ''} w-1/2 rounded-lg cursor-pointer bg-light h-fit p-2 text-center font-alkatra text-xl transition duration-200 ease-in-out`}>IN</span>
                    <span onClick={() => setAddRemove(false)} className={`${!addRemove ? 'opacity-40' : ''} w-1/2 rounded-lg cursor-pointer bg-light h-fit p-2 text-center font-alkatra text-xl transition duration-200 ease-in-out`}>OUT</span>
                </header>

                <div className='w-full h-full border-[0.5px] m-auto overflow-auto'>
                    {addRemove ? (// Assigned Employees
                        assignedEmployees.length === 0 ? (
                            <span className='absolute top-52 left-14 w-3/4 rounded-lg bg-light h-fit p-2 pt-2 m-auto text-center font-alkatra'>
                                No employees assigned to this team
                            </span>
                        ) : (
                            assignedEmployees.map((e) => (<motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ y: [50, 50, 0], opacity: [0, 0, 1] }} transition={{ duration: 0.3 }}
                                key={e.id} className='flex justify-between items-center w-[95%] rounded-md text-xl m-auto p-2 my-2 bg-light'>
                                {e.image && <img src={e.image} alt={e.Employee_Name} className='object-cover object-center aspect-square rounded-full mx-1 w-6 h-6' /> || <HiUserCircle size={10} />}
                                <span className='w-10/12 truncate'>{e.Employee_Name}</span>
                                <AiOutlineUserDelete onClick={(event) => { handleUnAssignEmployee(event, e.id) }} color='#e04e17' size={20} cursor='pointer' className='hover:scale-150 transition duration-200 ease-in-out' />
                            </motion.div>)))
                    ) : (// Other Employees
                        unassignedEmployees.length === 0 ? (<span className='absolute top-52 left-14 w-3/4 rounded-lg bg-light h-fit p-2 pt-2 m-auto text-center font-alkatra'>Getting Other Employees</span>
                        ) : (unassignedEmployees.map((e) => (<motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ y: [50, 50, 0], opacity: [0, 0, 1] }} transition={{ duration: 0.3 }}
                            key={e.id} className='flex justify-between items-center w-[95%] rounded-md text-xl m-auto p-2 my-2 bg-light'>
                            {e.image && <img src={e.image} alt={e.Employee_Name} className='object-cover object-center aspect-square rounded-full mx-1 w-6 h-6' /> || <HiUserCircle size={10} />}   <span className='w-10/12 truncate'>{e.Employee_Name}</span>
                            <AiOutlineUserAdd onClick={(event) => { handleAssignEmployee(event, e.id) }} color='#e04e17' size={20} cursor='pointer' className='hover:scale-150 transition duration-200 ease-in-out' />
                        </motion.div>)))
                    )}
                </div>
            </div>
        </motion.div>
    )
}
