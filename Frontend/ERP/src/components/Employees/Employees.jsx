
import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../constants/axios'
import { Context } from '../Context/Context'
import { HiUserCircle } from 'react-icons/hi'
import { MdNavigateNext, MdNavigateBefore, MdAdd } from 'react-icons/md'
import { IconButtons } from "../Shared/Buttons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AddEmployee from './Addemployee'
const Employees = () => {
    const { setNotifications, setLoading, search } = useContext(Context)
    const [employees, setEmployees] = useState([]);
    const [employeestoSearch, setEmployeestoSearch] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isOpenToAdd, setIsOpenToAdd] = useState(false)

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
                setNotifications({
                    notificationBar: true,
                    pass: false,
                    notificationBarMessage: "Oops! Some thing wrong, try to reload"
                })
            }
        }
        finally {
            setLoading(false);
            setInterval(() => {
                setNotifications({
                    pass: false,
                    notificationBarMessage: '',
                    notificationBar: false,
                })
            }, 4000);
        }
    }

    // Filter
    const filteredEmployeesToSearch = employees.filter(val => {
        if (search === '') {
            return employees;
        } else if (val.Employee_Name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
            return val;
        }
    });

    useEffect(() => {
        getAllEmployees()
    }, [currentPage, search]);


    return (
        <div className='w-full h-[75vh] relative flex flex-col items-center justify-start p-3 gap-x-2 gap-y-2'>

            <header className='relative overflow-hidden w-11/12 h-14 flex items-center rounded-full justify-around text-sidebar bg-dark'>
                <p></p>
                <p className='w-1/5 font-semibold font-montserrat text-center'>Name</p>
                <p className='w-1/5 font-semibold font-montserrat text-center'>Email</p>
                <p className='w-1/5 font-semibold font-montserrat text-center'>Phone</p>
                <p className='w-1/5 font-semibold font-montserrat text-center'>Team</p>


                {/* ---- */}
                <span className='absolute -left-8 -bottom-2 w-14 h-14 bg-sidebar rounded-full' />
                <span className='absolute left-4 bottom-10 w-4 h-4 bg-sidebar rounded-full' />
                <span className='absolute left-7 bottom-3 w-1 h-1 bg-sidebar rounded-full' />

            </header>

            <div className='w-11/12 h-3/4 overflow-auto pr-2 scrollbar-thin scrollbar-thumb-orange scrollbar-track-dark'>
                {
                    filteredEmployeesToSearch.length === 0 ? (
                        <h1 className='w-max h-auto m-auto p-3 my-8 rounded-md bg-orange text-lg font-montserrat text-light'>
                            No value match your search input
                        </h1>
                    ) : (
                        filteredEmployeesToSearch.map((employee, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
                                transition={{ duration: 0.5 }}
                                key={index}
                                className='w-full h-14 flex items-center rounded-2xl justify-around font-montserrat relative overflow-hidden
                                            cursor-pointer my-2 border-2 border-sidebar hover:bg-dark hover:text-light hover:border-dark
                                            transition duration-200 ease-in-out '
                            >
                                {
                                    employee.image &&
                                    <img src={employee.image} alt={employee.Employee_Name}
                                        className='object-cover object-center aspect-square  rounded-full mx-2 border-2 w-12 h-12' />
                                    || <HiUserCircle size={20} />
                                }
                                <p className='w-full font-semibold text-lg text-center'>{employee.Employee_Name}</p>
                                <p className='w-full font-semibold text-lg text-center'>{employee.email}</p>
                                <p className='w-full font-semibold text-lg text-center'>{employee.phone}</p>
                                <p className='w-full font-semibold text-lg text-center z-10'>{employee.team && employee.team || "---"}</p>

                                {/* ---- */}
                                <span className='absolute -right-6 -bottom-2 w-10 h-10 bg-orange rounded-full' />
                                <span className='absolute right-1 bottom-10 w-2 h-2 bg-orange rounded-full' />
                                <span className='absolute right-2 bottom-8 w-2 h-2 bg-orange rounded-full' />

                            </motion.div>
                        ))
                    )
                }

            </div >

            {/* Pagination */}
            {
                search === '' || null ?
                    <div className='w-11/12 flex items-center justify-center gap-x-4 rounded-md bg-light '>

                        <MdNavigateBefore color='#e04e17' size={30} cursor='pointer'
                            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                        />
                        {totalPages > 10 ?
                            <span className='text-orange font-semibold font-montserrat'>{currentPage} / {totalPages}</span>
                            :
                            Array.from(Array(totalPages), (e, i) => {
                                const page = i + 1;
                                return (
                                    <>
                                        <span
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`${i + 1 === currentPage ? 'text-sidebar bg-orange' : "text-orange bg-sidebar"} w-8 h-8 text-center pt-1 rounded-full cursor-pointer transition duration-200 ease-in-out`}
                                        >
                                            {page}
                                        </span>
                                    </>
                                )
                            })

                        }
                        <MdNavigateNext color='#e04e17' size={30} cursor='pointer'
                            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                        />

                    </div>
                    : null
            }

            {/* Add Button */}
            <IconButtons Icon={MdAdd}
                onClick={() => setIsOpenToAdd(true)}
                className={'fixed right-6 bottom-6'}
            />

            {/* Add Employee */}
            <AddEmployee
                getAllEmployees={getAllEmployees}
                employees={employees}
                setEmployees={setEmployees}
                isOpenToAdd={isOpenToAdd}
                setIsOpenToAdd={setIsOpenToAdd}
            />

        </div>
    )
}


export default Employees