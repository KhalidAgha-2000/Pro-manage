import { AnimatePresence, motion } from "framer-motion";
import { HiUserCircle } from "react-icons/hi";
import { BsImageAlt, BsInfoSquareFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { IoMdAnalytics } from "react-icons/io";
import Circles from "../Shared/Circles";
import { useContext, useState } from "react";
import Employee from "./Employee";
import { EmployeeContext } from "../Context/EmployeeeContext";

const EmployeeCard = ({ id, Employee_Name, image, email, phone, team }) => {

    const { opened, setOpenFormToEdit } = useContext(EmployeeContext);
    // const [openFormToEdit, setOpenFormToEdit] = useState({ id: '', formName: '', opened: false })

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }} transition={{ duration: 0.5 }}
            // onClick={() => setIsOpenToEdit({ id: id, opened: true })}
            className='w-full h-14 flex items-center rounded-2xl justify-around font-montserrat relative overflow-hidden
               group cursor-pointer my-2 border-2 border-sidebar  transition duration-200 ease-in-out '
        >
            {image &&
                <img src={image} alt={Employee_Name} className='object-cover object-center aspect-square  rounded-full mx-2 border-2 w-12 h-12' />
                || <HiUserCircle size={20} />
            }
            <p className='w-full font-semibold text-lg text-center truncate mr-4'>{Employee_Name}</p>
            <p className='w-full font-semibold text-lg text-center'>{email}</p>
            <p className='w-full font-semibold text-lg text-center'>{phone}</p>
            <p className='w-full font-semibold text-lg text-center '>{team && team || "---"}</p>

            {/* Circles */}
            <Circles className1={'-right-6 -bottom-2 w-10 h-10 bg-orange'} className2={'right-1 bottom-10 w-2 h-2 bg-orange'} className3={'right-2 bottom-8 w-2 h-2 bg-orange'} />

            <div className="w-full h-full bg-gray-400 group-hover:flex justify-between hidden absolute top-0 left-0">
                <span
                    onClick={() => setOpenFormToEdit({ id: id, formName: 'image', opened: true })}
                    className="w-1/4 h-full p-2 text-light flex items-center justify-center group hover:opacity-30 hover:text-orange border-light border-l-[0.5px]">
                    <BsImageAlt
                        size={20} className="hover:scale-150  transition duration-200 ease-in-out" />
                </span>


                <span
                    onClick={() => setOpenFormToEdit({ id: id, formName: 'profile', opened: true })}
                    className="w-1/4 h-full p-2 text-light flex items-center justify-center group hover:opacity-30 hover:text-orange border-light border-l-[0.5px]">
                    <BsInfoSquareFill
                        size={20} className="hover:scale-150  transition duration-200 ease-in-out" />
                </span>


                <span
                    onClick={() => setOpenFormToEdit({ id: id, formName: 'team', opened: true })}
                    className="w-1/4 h-full p-2 text-light flex items-center justify-center group hover:opacity-30 hover:text-orange border-light border-l-[0.5px]">
                    <RiTeamFill
                        size={20} className="hover:scale-150  transition duration-200 ease-in-out" />
                </span>


                <span
                    onClick={() => setOpenFormToEdit({ id: id, formName: 'kpi', opened: true })}
                    className="w-1/4 h-full p-2 text-light flex items-center justify-center group hover:opacity-30 hover:text-orange border-light border-l-[0.5px]">
                    <IoMdAnalytics
                        size={20} className="hover:scale-150  transition duration-200 ease-in-out" />
                </span>
            </div>


            {/* Edit Employee
            <AnimatePresence>
                {opened &&
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}
                        className="fixed top-0 left-0 w-full h-full z-10 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <Employee />
                    </motion.div>
                }
            </AnimatePresence> */}
        </motion.div>
    )
}

export default EmployeeCard

