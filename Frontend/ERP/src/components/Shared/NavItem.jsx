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
                     hover:bg-orange hover:text-light ${activeNavItem === title && "bg-light"}`}// rounded-r-none before:absolute before:w-10 before:h-full before:bg-orange before:top-0 before:-right-0 before:rounded-l-lg before:transition 
                >
                    {Icon && <Icon className={`text-lg
                     ${activeNavItem === title && "text-dark"}`} />}
                    <h2 className={`
                     ${activeNavItem === title && "text-dark"}
                    text-base font-semibold font-montserrat `}>
                        {title ? title : null}
                    </h2>
                </div>
            </NavLink>

        </>
    )
}

export default NavItem