import React from 'react'

const Buttons = ({ text, edit, add, remove }) => {
    return (
        <button
            className={`items-center px-4 py-2.5 text-sm font-medium font-montserrat text-center text-light rounded-lg
             hover:bg-light hover:text-dark 
             focus:ring-1 focus:outline-none focus:ring-light
             transition duration-700 ease-in-out 
             ${edit && 'bg-success'}
             ${remove && 'bg-failed'}
             `
            }
        >
            {text}
        </button>

    )
}

export default Buttons