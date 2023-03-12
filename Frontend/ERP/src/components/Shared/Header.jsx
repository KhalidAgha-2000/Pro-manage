import React from 'react'
import { FaSearch } from 'react-icons/fa'
const Header = (props) => {
    return (
        <div className='bg-light font-montserrat w-full p-4 h-36 flex flex-col justify-start items-center'>
            <div className=' flex items-center w-1/2'>
                <h1 className='text-3xl'><b>Dashboard</b></h1>
                <p className='relative ml-10 text-xl 
                before:absolute
                before:bg-[#4bb543]
                before:top-2
                before:-left-6
                before:w-4
                before:h-4
                before:rounded-full
                before:animate-pulse
                '>{props.dataSpecificAdmin.email}</p>

            </div>

            <form>
                <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaSearch />
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
        </div>
    )
}

export default Header