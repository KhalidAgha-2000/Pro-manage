import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Context } from '../Context/Context';
import axiosInstance from '../../constants/axios';
import Cookies from "js-cookie";
import { IoMdArchive } from "react-icons/io";
import { FaProjectDiagram } from "react-icons/fa";
import { motion } from "framer-motion";
const Projects = () => {
    const { setNotifications, setLoading, search } = useContext(Context)

    const [projects, setProjects] = useState([]);
    const [isArchived, setIsArchived] = useState(false)

    // Filter
    const filteredEmployeesToSearch = projects.filter(val => {
        if (search === '') {
            return projects;
        } else if (val.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
            return val;
        }
    })

    const getAllProjects = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get(`/projects/all-projects?isArchived=${isArchived}`
                    , { headers: { token: Cookies.get('token') } }
                )
            setProjects(response.data.data);
            // console.log('ree', response.data.data);
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
    useEffect(() => {
        getAllProjects()
    }, [isArchived])

    return (

        <div className='w-full h-[75vh] relative flex flex-wrap justify-center p-3 gap-x-4 gap-y-4 overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-dark'>

            <header
                onClick={() => setIsArchived(!isArchived)}
                className='absolute top-2 right-0 flex items-center w-fit m-auto bg-orange text-sidebar rounded-md p-1 mx-1 font-montserrat h-fit cursor-pointer hover:opacity-50 transition duration-200 ease-in-out'>
                {!isArchived ?
                    <IoMdArchive /> :
                    <FaProjectDiagram />}
                <span className='mx-1'>
                    {!isArchived ? "Go To Archived Project" : "Back To Projects "}
                </span>
            </header>
            {/* Projects */}
            {
                filteredEmployeesToSearch.length === 0 ? (
                    <h1 className='w-max h-fit m-auto p-3 my-8 rounded-md bg-orange text-lg font-montserrat text-light'>
                        No value match your search input
                    </h1>
                ) : (
                    filteredEmployeesToSearch.map((p) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ y: [50, 0], opacity: [0, 0, 1] }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            key={p._id}
                            className='mt-10 w-[32%] h-fit max-w-sm relative overflow-hidden bg-dark flex flex-col justify-center items-start  text-sidebar p-4 cursor-pointer rounded-xl'>

                            <Link to={"/dashboard/projects/project/" + p._id}>

                                <div className='m-auto h-1/2 ml-10 flex items-center '>
                                    <span className="rounded-full w-28 h-28 bg-sidebar z-10 flex items-center justify-center text-dark uppercase text-6xl font-alkatra shadow-sidebar shadow-lg">{p.name.charAt(0)}</span>
                                    <span className="rounded-full w-28 h-28 bg-white transform -translate-x-6 z-0 flex items-center justify-center text-dark uppercase text-6xl font-alkatra shadow-sidebar shadow-lg">{p.teamName && p.teamName.charAt(0) || "N/A"}</span>

                                </div>
                                {/* Name */}
                                <h1 className='w-full h-auto whitespace-normal break-words text-xl mt-4 uppercase text-center font-montserrat text-sidebar'>{p.name}</h1>

                                <div className='w-full auto flex flex-col justify-start gap-y-1 mt-1'>
                                    <h2 className='whitespace-normal break-words text-lg mx-1 uppercase font-montserrat text-orange'>{p.teamName && p.teamName || "N/A"}</h2>
                                    <div className='flex'>
                                        <input type="checkbox" name="inProgress" id="inProgress" readOnly
                                            className='accent-orange w-4 mx-1'
                                            checked={p.in_progress ? true : false}
                                        />
                                        <p >in_progress</p>
                                    </div>

                                    <p><span className='bg-orange text-sidebar px-1 mx-1 rounded-sm'>{p.numberOfEmployees}</span>Employee(s)</p>

                                </div>

                                {/* ------ */}
                                <span className='absolute -right-2 -top-2 w-10 h-10 object-cover bg-[#dfd6d3] rounded-full' />
                                <span className='absolute right-0 top-10 w-4 h-4 object-cover bg-[#dfd6d3] rounded-full' />

                            </Link>
                        </motion.div>
                    )
                    ))
            }

        </div >
    )
}

export default Projects