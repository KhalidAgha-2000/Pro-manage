import { motion } from 'framer-motion'
import { AiFillEdit } from 'react-icons/ai'
import { IoMdAnalytics } from 'react-icons/io'

const KpiCard = ({ data, setKpiToUpdate }) => {
    return (
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ y: [50, 0], opacity: [0, 0, 1] }} transition={{ duration: 0.5 }} whileHover={{ scale: 1.05 }}
            className="flex items-center gap-x-2 bg-sidebar text-orange w-fit h-fit rounded-lg shadow-orange shadow-md p-5"
            key={data._id}>
            <IoMdAnalytics size={25} />
            <h3 className="text-xl uppercase font-montserrat font-semibold text-dark">{data.name}</h3>
            <AiFillEdit size={20} cursor={'pointer'}
                onClick={() => setKpiToUpdate({ id: data.id, kpiName: data.name, isOpen: true })}
                className='hover:scale-150 transition duration-200 ease-in-out text-xl text-dark opacity-60'
            />
        </motion.div>
    )
}

export default KpiCard