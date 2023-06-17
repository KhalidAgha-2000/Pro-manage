import { motion } from 'framer-motion'
import { useContext } from 'react';
import { AiOutlineInfoCircle, AiOutlineMail, AiOutlineTeam } from 'react-icons/ai'
import { HiUserCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';
import { TbReportAnalytics } from 'react-icons/tb';

const ReportCard = ({ data }) => {

    const { setOpenFormToAddEdit } = useContext(Context)

    return (

        <motion.div initial={{ opacity: 0, y: 100 }} whileHover={{ scale: 1.05 }} whileInView={{ y: [50, 0], opacity: [0, 0, 1] }} transition={{ duration: 0.3 }}
            className='relative w-[30%] h-[120px] mx-2 max-w-sm py-5 mt-4 rounded-lg cursor-pointer shadow-lg font-montserrat bg-card border-r-4 border-b-4'>

            <Link to={`report/` + data.id}>

                <div
                    onClick={() => setOpenFormToAddEdit({ data: data.id })}
                    className='w-full flex flex-col px-2 justify-start bg-red]'>

                    <TbReportAnalytics className='absolute bottom-3  right-2' color='#4bb543' size={25} />

                    {data.image && <img src={data.image} alt={data.Employee_Name}
                        className='object-cover object-center aspect-square absolute -top-3 -right-6 rounded-full mx-2 border-2 w-16 h-16' />
                        || <HiUserCircle size={20} />
                    }

                    <p className='w-4/5 font-semibold text-lg truncate mr-4 flex items-center gap-x-2'><AiOutlineInfoCircle className='w-6' color='#e04e17' size={25} />
                        <span className='w-3/4'>{data.Employee_Name}</span>
                    </p>
                    <p className='w-4/5 font-semibold text-lg truncate mr-4 flex items-center gap-x-2'><AiOutlineMail className='w-6' color='#e04e17' size={25} />
                        <span className='w-3/4'> {data.email}</span>
                    </p>
                    <p className='w-4/5 font-semibold text-lg flex items-center gap-x-2'><AiOutlineTeam className='w-6' color='#e04e17' size={25} />
                        <span className='w-3/4'> {data.team && data.team || "No Team"}</span>
                    </p>
                </div>

            </Link>

        </motion.div>
    )
}

export default ReportCard