
import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../constants/axios'
import { Context } from '../Context/Context'
import { HiUserCircle } from 'react-icons/hi'
import { MdNavigateNext, MdNavigateBefore, MdAdd } from 'react-icons/md'
import { IconButtons } from "../Shared/Buttons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import { fromEvent } from 'rxjs';
// import { debounceTime } from 'rxjs/operators';
// import { useEffect } from 'react';
// import { fromEvent } from 'rxjs';
// import { debounceTime } from 'rxjs/operators';


// function SearchInput() {
//     useEffect(() => {
//       const input = document.querySelector('input');
//       const subscription = fromEvent(input, 'keyup')
//         .pipe(debounceTime(1000))
//         .subscribe(() => {
//           // search function here
//         });

//       return () => {
//         subscription.unsubscribe();
//       };
//     }, []);

//     return (
//       <input type="text" />
//     );
//   }
const Employees = () => {
    const { setNotifications, setLoading, search } = useContext(Context)
    const [employees, setEmployees] = useState([]);
    const [employeestoSearch, setEmployeestoSearch] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // const input = document.querySelector('input');

    // fromEvent(input, 'keyup')
    //   .pipe(debounceTime(1000))
    //   .subscribe(() => {
    //     // search function here
    //   });
    // Define a debounce function
    //   const debouncedSearch = _.debounce(async (searchTerm) => {
    //     try {
    //       setLoading(true);
    //       const response = await axiosInstance.get(
    //         `/employees/all-employees?search=${searchTerm}&page=${currentPage}`,
    //         {
    //           headers: { token: Cookies.get('token') },
    //         }
    //       );
    //       setEmployees(response.data.data);
    //       setCurrentPage(response.data.currentPage);
    //       setTotalPages(response.data.totalPages);
    //     } catch (error) {
    //       if (error.response && error.response.data) {
    //         console.error(error.response.data);
    //       }
    //     } finally {
    //       setLoading(false);
    //     }
    //   }, 1000);
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
            console.log('ree', response);
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
        <div className='w-full h-[75vh] relative flex flex-col items-center justify-start p-3 gap-x-2 gap-y-2 '>
            <header className='w-11/12 h-14 flex items-center rounded-lg justify-around bg-light border-2 border-orange'>
                <p></p>
                <p className='w-1/5 font-semibold font-montserrat text-center'>Name</p>
                <p className='w-1/5 font-semibold font-montserrat text-center'>Email</p>
                <p className='w-1/5 font-semibold font-montserrat text-center'>Phone</p>
                <p className='w-1/5 font-semibold font-montserrat text-center'>Team</p>
            </header>

            <div className='w-11/12 h-3/4  overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-dark'>
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
                                className='w-full h-14 flex items-center rounded-lg justify-around font-montserrat cursor-pointer my-2 border-2 border-orange hover:bg-orange hover:text-light transition duration-200 ease-in-out '
                            >
                                {
                                    employee.image &&
                                    <img src={employee.image} alt={employee.first_name} className='object-center aspect-square rounded-full border-2 border-dark mx-2 w-9 h-9' />
                                    || <HiUserCircle size={20} />
                                }
                                < p className='w-full text-center'>{employee.Employee_Name}</p>
                                <p className='w-full text-center'>{employee.email}</p>
                                <p className='w-full text-center'>{employee.phone}</p>
                                <p className='w-full text-center'>{employee.team && employee.team || "--"}</p>
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
                                            className={`${i + 1 === currentPage ? 'text-dark bg-orange' : "text-orange"} w-8 h-8 text-center pt-1 rounded-full cursor-pointer transition duration-200 ease-in-out`}
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
            <Link className='fixed z-[9999] right-6 bottom-6' to={"/dashboard/employees/add-employee/"}>
                <IconButtons Icon={MdAdd} />
            </Link>
        </div>
    )
}


export default Employees