import React from 'react'
import Search from './Search'
const Header = (props) => {
    return (
        <div className='bg-dark border-l-4 border-l-light rounded-l-3xl font-montserrat w-full p-4 h-36 flex flex-col justify-start items-center'>
            <div className=' flex items-center w-1/2 justify-between text-orange'>
                <h1 className='text-3xl'><b>Dashboard</b></h1>
                <p className='relative ml-10 text-xl 
                before:absolute before:bg-[#4bb543] before:top-2 before:-left-6 before:w-4 before:h-4 before:rounded-full before:animate-pulse'
                >{props.dataSpecificAdmin.email}</p>

            </div>

            {/* Search */}
            <Search />

        </div>
    )
}

export default Header