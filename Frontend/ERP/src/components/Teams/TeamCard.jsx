import React, { useContext } from 'react'
import { motion } from "framer-motion";
import Circles from '../Shared/Circles';
import { MdDriveFileRenameOutline, MdDeleteForever, MdGroupAdd, MdOutlineGroupAdd } from "react-icons/md";
import { TeamDelete, TeamEmployee, TeamName } from './FormsToUpdate';
import { TeamContext } from '../../Context/TeamContext';

const TeamCard = ({ data, _id }) => {


    const { setOpenFormToEdit, openFormToEdit, id, teamName } = useContext(TeamContext);

    const formItems = [
        { formName: 'rename', icon: MdDriveFileRenameOutline },
        { formName: 'delete', icon: MdDeleteForever },
        { formName: 'employees', icon: MdGroupAdd },
    ];



    return (
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }} transition={{ duration: 0.3 }}
            className='w-[32%] relative h-fit max-w-sm p-5 flex flex-col gap-y-1 rounded-lg shadow-lg font-montserrat overflow-hidden
            bg-card border-r-4 border-b-4  'key={_id}>

            {/* <Link to={"/dashboard/teams/team/" + _id}> */}
            <div className='w-full h-1/4 my-2 flex items-center'>
                <span className='w-20 h-20 text-6xl uppercase font-alkatra flex items-center justify-center rounded-full bg-light'>{data.name.charAt(0)}</span>
                {/* Numbers */}
                <div className='flex flex-col p-4 w-auto h-fit '>
                    <h1 className='text-dark text-xl font-montserrat'><span className='w-1 h-1 px-2 mx-1 rounded-full'>{data.numberOfEmployees}</span>Employees</h1>
                    <h1 className='text-orange text-xl font-montserrat'><span className='w-1 h-1 px-2 mx-1 rounded-full'>{data.numberOfProjects}</span>Projects</h1>
                </div>
            </div>

            <h1 className='text-dark font-semibold font-alkatra w-3/4 m-auto truncate text-2xl text-center uppercase'>{data.name}</h1>

            <motion.div initial={{ opacity: 0, y: 20 }} whileHover={{ opacity: 1, y: 0 }}
                className='w-11/12 h-5/6 m-auto absolute rounded-md bg-light'>

                <div className='w-full h-full flex flex-col justify-evenly items-center bg-light opacity-70 rounded-md'>
                    {formItems.map((item) => (
                        <div
                            key={item.formName}
                            onClick={() => setOpenFormToEdit({
                                id: _id,
                                formName: item.formName,
                                opened: true,
                                teamName: data.name,
                                hasEmployees: data.numberOfEmployees > 0 ? true : false,
                                hasProjects: data.numberOfProjects > 0 ? true : false
                            })}
                            className='flex items-center justify-end w-1/2 m-auto cursor-pointer hover:bg-orange rounded-md px-4 hover:scale-105 transition duration-200 ease-in-out'>
                            <item.icon color='#171717' size={20} className='w-1/3' />
                            <span className='text-lg w-2/3 text-dark'>
                                {item.formName}
                            </span>
                        </div>

                    ))}
                </div>

            </motion.div>


            {/* Circles */}
            <Circles className1={'-right-1 -bottom-2 w-10 h-10 bg-sidebar'} className2={'-right-2 bottom-8 w-4 h-4 bg-sidebar'} />

        </motion.div>
    )
}

export default TeamCard


