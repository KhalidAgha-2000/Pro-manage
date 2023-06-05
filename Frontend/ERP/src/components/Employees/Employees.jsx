import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios'
import { Context } from '../../Context/Context'
import { MdNavigateNext, MdNavigateBefore, MdAdd } from 'react-icons/md'
import { IconButtons } from "../Shared/Buttons";
import { AnimatePresence, motion } from "framer-motion";
import AddEmployee from './AddEmployee'
import Employee from './Employee'
import Circles from '../Shared/Circles'
import NoValueMatchSeaarch, { filteredArrayToSearch } from '../../utils/search'
import EmployeeCard from './EmployeeCard'
import { EmployeeContext } from '../../Context/EmployeeeContext'
import { FalidtoFetch } from "../Shared/Loading";
import GlobalToast from '../Shared/Toast'

const Employees = () => {

    const [employees, setEmployees] = useState([]);
    const [teamsData, setTeamsData] = useState({})
    const [kpiData, setKpiData] = useState({})
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { setLoading, search } = useContext(Context)
    const { opened, setIsOpenToAdd } = useContext(EmployeeContext);

    // Get All Employees
    const getAllEmployees = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get(
                    search === '' || null ?
                        `/employees/all-employees-pagination?page=${currentPage}`
                        : `/employees/all-employees`
                    , { headers: { token: Cookies.get('token') } }
                )
            setEmployees(response.data.data);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
            }
        }
        setTimeout(() => { setLoading(false) }, 2000);
    }

    // Get All Teams
    const getAllTeams = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get('/teams/all-teams/', { headers: { token: Cookies.get('token') } })
            setTeamsData(response.data.data)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
            }
        } setTimeout(() => { setLoading(false) }, 2000);
    }
    // Get All KPIs
    const getAllKPIs = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get('/kpis/all-kpis/', { headers: { token: Cookies.get('token') } })
            setKpiData(response.data.data)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
            }
        } setTimeout(() => { setLoading(false) }, 2000);


    }
    // Search
    const filteredAdminsToSearch = filteredArrayToSearch(employees, 'Employee_Name', search)

    useEffect(() => {
        getAllTeams()
        getAllEmployees()
        getAllKPIs()
    }, [currentPage, search]);


    return (
        <div className='w-full h-[75vh] relative flex flex-col items-center justify-start p-3 gap-x-2 gap-y-2'>

            <header className='relative overflow-hidden w-11/12 h-14 flex items-center rounded-full justify-around text-sidebar bg-dark'>
                <p></p>
                <p className='w-1/5 font-semibold font-montserrat text-center'>Name</p>
                <p className='w-1/5 font-semibold font-montserrat text-center'>Email</p>
                <p className='w-1/5 font-semibold font-montserrat text-center'>Phone</p>
                <p className='w-1/5 font-semibold font-montserrat text-center'>Team</p>

                {/* Circles */}
                <Circles className1={'-left-8 -bottom-2 w-14 h-14 bg-sidebar'} className2={'left-4 bottom-10 w-4 h-4 bg-sidebar'} className3={'left-7 bottom-3 w-1 h-1 bg-sidebar '} />
            </header>

            <div className='w-11/12 h-3/4 overflow-auto pr-2 '>
                {employees.length == 0 ? <FalidtoFetch /> :
                    filteredAdminsToSearch.length === 0 ? <NoValueMatchSeaarch /> :
                        filteredAdminsToSearch.map((employee) => (
                            <EmployeeCard data={employee} key={employee.id} id={employee.id}
                            // Employee_Name={employee.Employee_Name} image={employee.image} team={employee.team}
                            // phone={employee.phone} email={employee.email}
                            />
                        ))}
            </div>

            {/* Pagination */}
            {search === '' || null ? <div className='w-11/12 flex items-center justify-center gap-x-4 rounded-md bg-light '>
                <MdNavigateBefore color='#e04e17' size={30} cursor='pointer'
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                />
                {totalPages > 10 ? <span className='text-orange font-semibold font-montserrat'>{currentPage} / {totalPages}</span>
                    : Array.from(Array(totalPages), (e, i) => {
                        const page = i + 1;
                        return (<span key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`${i + 1 === currentPage ? 'text-sidebar bg-orange' : "text-orange bg-sidebar"} w-8 h-8 text-center pt-1 rounded-full cursor-pointer transition duration-200 ease-in-out`}
                        >{page}</span>)
                    })

                }
                <MdNavigateNext color='#e04e17' size={30} cursor='pointer' onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} />
            </div> : null
            }

            {/* Add Button */}
            <IconButtons Icon={MdAdd} onClick={() => setIsOpenToAdd(true)} />


            {/* Add Employee */}
            <AddEmployee getAllEmployees={getAllEmployees} />

            {/* Edit Employee */}
            <AnimatePresence>
                {opened &&
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}
                        className="fixed top-0 left-0 w-full h-full z-10 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <Employee teamsData={teamsData} kpiData={kpiData} setEmployees={setEmployees} getAllEmployees={getAllEmployees} />
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}


export default Employees