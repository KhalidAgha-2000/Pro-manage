import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ Icon, title, onClick, linkTo, setActiveNavItem, activeNavItem }) => {
    return (
        <>
            <NavLink to={`/${linkTo}`}>
                <div
                    onClick={() => setActiveNavItem(title)}
                    className={`nav__item relative flex justify-start items-center text-orange gap-16 py-3 px-10 
                    rounded-xl overflow-hidden cursor-pointer transition duration-200 ease-in-out
                     hover:bg-orange hover:text-light ${activeNavItem === title ? "text-[#f0f0f0] bg-orange" : ""}`}
                >
                    {Icon && <Icon className='icon text-xl ' />}
                    <h2 className="text-base font-semibold font-montserrat ">
                        {title ? title : null}
                    </h2>
                </div>
            </NavLink>

        </>
    )
}

export default NavItem