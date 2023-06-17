import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { motion } from 'framer-motion'
import { Context } from '../../Context/Context'
import axiosInstance from '../../utils/axios'
import Cookies from 'js-cookie';
import GlobalToast from '../Shared/Toast';
import { HiUserCircle } from 'react-icons/hi';
import Kpis from './Kpis'
import Roles from './Roles'
import Charts from './Charts'

const Report = () => {

    const { openFormToAddEdit, setLoading } = useContext(Context)

    let { id } = useParams()

    const [tabsToEdit, setTabsToEdit] = useState('kpis')
    const [employeeData, setSetEmployeeData] = useState({})
    const [kpisOfEmployee, setKpisOfEmployee] = useState([])
    const [rolesOfEmployee, setRolesOfEmployee] = useState([])


    // Data of the Employee
    const rolesAndKpisForReport = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get(`/employees/roles-kpis-report/${openFormToAddEdit.data ? openFormToAddEdit.data : id}`, { headers: { token: Cookies.get('token') } })
            setSetEmployeeData(response.data.data)
            setKpisOfEmployee(response.data.data.kpis)
            setRolesOfEmployee(response.data.data.roles)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
            }
        }
        setTimeout(() => { setLoading(false) }, 2000);
    }
    useEffect(() => {
        rolesAndKpisForReport()

    }, [])

    const formComponents = { kpis: Kpis, roles: Roles, charts: Charts, };
    const FormComponent = formComponents[tabsToEdit] || null;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
                className='w-5/6 flex items-center justify-between relative m-auto h-14  bg-sidebar rounded-md p-2 mt-6'
            >
                {/* Info */}
                <div className='w-1/2 h-fit flex items-center gap-x-2'>

                    {employeeData.image && <img src={employeeData.image} alt={employeeData.Employee_Name} className='object-cover object-center aspect-square  rounded-full mx-2 border-2 w-12 h-12' />
                        || <HiUserCircle size={20} />
                    }
                    <h1 className='text-2xl mt-1 text-dark truncate font-alkatra font-bold '>{employeeData.Employee_Name}</h1>
                </div>

                {/* Nav Tabs */}
                <div className='w-1/2 m-auto h-full p-2 flex justify-between items-center gap-x-2'>
                    {['kpis', 'roles', 'charts'].map((key, index) => (
                        <span key={index} onClick={() => { setTabsToEdit(key) }}
                            className={
                                `${tabsToEdit === key ? 'opacity-40' : ''} 
                         w-1/2 rounded-lg transition duration-700 ease-in-out hover:opacity-40 bg-light h-fit p-2 text-center cursor-pointer font-alkatra text-xl`}
                        >{key}
                        </span>
                    ))}
                </div>

            </motion.div>
            <div className='w-5/6 m-auto mt-4 flex h-full'>
                {FormComponent && <FormComponent
                    employeeData={employeeData}
                    kpisOfEmployee={kpisOfEmployee}
                    rolesOfEmployee={rolesOfEmployee}
                />}
            </div>
        </>
    )
}

export default Report