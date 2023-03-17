import React from 'react'

const Buttons = ({ text, edit, add, done, remove, disabled, onClick }) => {
    return (
        <button
            className={`w-max h-auto items-center px-4 py-2.5 text-sm font-medium font-montserrat text-center text-light rounded-lg cursor-pointer
             hover:opacity-70 hover:text-dark 
             focus:ring-1 focus:outline-none focus:ring-light 
             transition duration-700 ease-in-out 
             disabled:opacity-10 disabled:cursor-not-allowed
             ${edit && 'bg-success'}
             ${remove && 'bg-failed'}
             ${done && 'bg-orange'}
             `
            }
            type={'submit'}
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button >

    )
}

export default Buttons