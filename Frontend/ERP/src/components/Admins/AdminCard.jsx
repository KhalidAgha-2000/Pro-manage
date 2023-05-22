import { motion } from "framer-motion";
import Cookies from 'js-cookie'
import { AiFillEdit, AiFillPushpin, AiOutlineUserDelete } from 'react-icons/ai'
import { GiCheckMark } from 'react-icons/gi'
import { MdAdminPanelSettings } from 'react-icons/md'
import { TbLetterX } from 'react-icons/tb'
import Circles from '../Shared/Circles'
import { AdminContext } from "../../Context/AdminContext";
import { useContext } from "react";

const AdminCard = ({ _id, image, username, email, setPrepareToRemove, removeAdmin, prepareToRemove }) => {

    const { setIsOpenToEdit, setIdToEdit } = useContext(AdminContext);

    return (
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }} transition={{ duration: 0.5 }}
            className='relative w-[32%] h-[200px] max-w-sm py-5 rounded-lg shadow-lg font-montserrat overflow-hidden shadow-orange bg-dark'
        >
            <div className="flex flex-col items-center">
                {image && <img src={image} alt="admin-image" className="w-24 h-24 mb-3 object-cover object-center border-orange shadow-lg shadow-light rounded-full" />
                    || <MdAdminPanelSettings className='text-orange w-24 h-24 ' />
                }
                <h5 className="mb-1 text-2xl font-bold  text-light">{username}</h5>
                <span className="text-sm text-light">{email}</span>
            </div>

            {/* Edit & Delete */}
            <div className='h-full w-4 absolute top-0 pr-4 right-3 flex flex-col items-start justify-evenly text-light'>
                <AiFillEdit className='hover:scale-150  transition duration-200 ease-in-out'
                    onClick={() => { setIdToEdit(_id), setIsOpenToEdit(true) }}
                    size={20} color='#f0f0f0' cursor={'pointer'}
                />
                <AiOutlineUserDelete className={`hover:scale-150  transition duration-200 ease-in-out ${_id === Cookies.get('id') && "hidden"}`}
                    size={20} color='#f0f0f0' cursor={'pointer'} onClick={() => { setPrepareToRemove(_id) }}
                />
            </div>

            {/* Pinned */}
            <AiFillPushpin className={`absolute -rotate-90 top-1 left-1 ${_id !== Cookies.get('id') && "hidden"}`} size={20} color="#f0f0f0" />

            {/* Delete Confirmation */}
            <div className={`flex justify-around items-center w-full h-full absolute top-0 z-30 bg-light opacity-70 ${prepareToRemove === _id ? "flex" : "hidden"} `}>
                <GiCheckMark size={40} cursor={'pointer'} color="#4bb543" onClick={() => { removeAdmin(_id) }} />
                <TbLetterX size={40} cursor={'pointer'} color="#ff3333" onClick={() => { setPrepareToRemove('') }} />
            </div>

            {/* Circles */}
            <Circles className1={'right-2 -bottom-2 w-4 h-4 object-cover bg-sidebar'} className2={'right-2 bottom-4 w-1 h-1 bg-sidebar'} />

        </motion.div>
    )
}

export default AdminCard