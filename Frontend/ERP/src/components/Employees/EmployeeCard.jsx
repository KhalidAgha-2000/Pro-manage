import { motion } from "framer-motion";
import { HiUserCircle } from "react-icons/hi";
import Circles from "../Shared/Circles";
import { useContext } from "react";
import { EmployeeContext } from "../../Context/EmployeeeContext";

const EmployeeCard = ({ data, id }) => {

    const { setOpenFormToEdit } = useContext(EmployeeContext);

    const formItems = [
        { formName: 'image', label: 'image' },
        { formName: 'profile', label: 'profile' },
        { formName: 'team', label: 'team' },
        { formName: 'kpi', label: 'kpis' },
    ];

    return (
        <motion.div key={id}
            initial={{ opacity: 0, y: 10 }} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }} transition={{ duration: 0.5 }}
            className='w-full h-14 flex items-center rounded-2xl justify-around font-montserrat relative overflow-hidden
               group cursor-pointer my-2 border-2 border-sidebar  transition duration-200 ease-in-out'>
            {data.image && <img src={data.image} alt={data.Employee_Name} className='object-cover object-center aspect-square  rounded-full mx-2 border-2 w-12 h-12' />
                || <HiUserCircle size={20} />
            }
            <p className='w-full font-semibold text-lg text-center truncate mr-4'>{data.Employee_Name}</p>
            <p className='w-full font-semibold text-lg text-center'>{data.email}</p>
            <p className='w-full font-semibold text-lg text-center'>{data.phone}</p>
            <p className='w-full font-semibold text-lg text-center '>{data.team && data.team || "---"}</p>

            {/* Circles */}
            <Circles className1={'-right-6 -bottom-2 w-10 h-10 bg-orange'} className2={'right-1 bottom-10 w-2 h-2 bg-orange'} className3={'right-2 bottom-8 w-2 h-2 bg-orange'} />

            <div className="w-full h-full bg-gray-400 group-hover:flex justify-between hidden absolute top-0 left-0">
                {formItems.map((item) => (
                    <span
                        key={item.formName}
                        onClick={() => setOpenFormToEdit({ id: id, formName: item.formName, opened: true })}
                        className="w-1/4 h-full uppercase font-bold p-2 text-light flex items-center justify-center group hover:text-orange border-light border-l-[0.5px]"
                    >{item.label}
                    </span>
                ))}
            </div>

        </motion.div>
    )
}

export default EmployeeCard

