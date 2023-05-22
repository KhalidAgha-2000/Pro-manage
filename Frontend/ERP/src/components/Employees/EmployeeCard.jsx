import { motion } from "framer-motion";
import { HiUserCircle } from "react-icons/hi";
import Circles from "../Shared/Circles";
import { useContext } from "react";
import { EmployeeContext } from "../../Context/EmployeeeContext";

const EmployeeCard = ({ id, Employee_Name, image, email, phone, team }) => {

    const { setOpenFormToEdit } = useContext(EmployeeContext);

    return (
        <motion.div key={id}
            initial={{ opacity: 0, y: 10 }} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }} transition={{ duration: 0.5 }}
            className='w-full h-14 flex items-center rounded-2xl justify-around font-montserrat relative overflow-hidden
               group cursor-pointer my-2 border-2 border-sidebar  transition duration-200 ease-in-out'>
            {image && <img src={image} alt={Employee_Name} className='object-cover object-center aspect-square  rounded-full mx-2 border-2 w-12 h-12' />
                || <HiUserCircle size={20} />
            }
            <p className='w-full font-semibold text-lg text-center truncate mr-4'>{Employee_Name}</p>
            <p className='w-full font-semibold text-lg text-center'>{email}</p>
            <p className='w-full font-semibold text-lg text-center'>{phone}</p>
            <p className='w-full font-semibold text-lg text-center '>{team && team || "---"}</p>

            {/* Circles */}
            <Circles className1={'-right-6 -bottom-2 w-10 h-10 bg-orange'} className2={'right-1 bottom-10 w-2 h-2 bg-orange'} className3={'right-2 bottom-8 w-2 h-2 bg-orange'} />

            <div className="w-full h-full bg-gray-400 group-hover:flex justify-between hidden absolute top-0 left-0">
                <span onClick={() => setOpenFormToEdit({ id: id, formName: 'image', opened: true })}
                    className="w-1/4 h-full uppercase font-bold p-2 text-light flex items-center justify-center group hover:text-orange border-light border-l-[0.5px]">
                    image
                </span>

                <span onClick={() => setOpenFormToEdit({ id: id, formName: 'profile', opened: true })}
                    className="w-1/4 h-full uppercase font-bold p-2 text-light flex items-center justify-center group hover:text-orange border-light border-l-[0.5px]">
                    profile
                </span>

                <span onClick={() => setOpenFormToEdit({ id: id, formName: 'team', opened: true })}
                    className="w-1/4 h-full uppercase font-bold p-2 text-light flex items-center justify-center group hover:text-orange border-light border-l-[0.5px]">
                    team
                </span>

                <span onClick={() => setOpenFormToEdit({ id: id, formName: 'kpi', opened: true })}
                    className="w-1/4 h-full uppercase font-bold p-2 text-light flex items-center justify-center group hover:text-orange border-light border-l-[0.5px]">
                    kpis
                </span>
            </div>

        </motion.div>
    )
}

export default EmployeeCard

