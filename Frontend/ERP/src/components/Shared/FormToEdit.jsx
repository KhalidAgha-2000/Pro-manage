import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext } from 'react'
import { Context } from '../../Context/Context'

export const FormToEdit = ({ children }) => {

    const { openFormToAddEdit } = useContext(Context)


    return (
        <AnimatePresence>
            {openFormToAddEdit.openedToEdit &&
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}
                    className="fixed top-0 left-0 w-full h-full z-10 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className='w-1/3 h-3/4 max-h-fit z-[9999] rounded-lg m-auto bg-light relative overflow-hidden'>
                        {children}
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}


export const FormToAdd = ({ children }) => {

    const { openFormToAddEdit } = useContext(Context)


    return (
        <AnimatePresence>
            {openFormToAddEdit.openedToAdd &&
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}
                    className="fixed top-0 left-0 w-full h-full z-10 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className='w-1/3 h-3/4 max-h-fit z-[9999] rounded-lg m-auto bg-light relative overflow-hidden'>
                        {children}
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}