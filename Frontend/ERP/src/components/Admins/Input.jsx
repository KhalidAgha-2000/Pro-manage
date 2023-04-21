import React from 'react'

const Input = ({ type, className, onChange, defaultValue, placeholder, name }) => {
    return (
        <input
            className={`h-14 rounded-md w-[90%] p-1  bg-light outline-none border-4 border-sidebar
            font-montserrat font-semibold text-dark
          placeholder:text-dark placeholder:opacity-60
            focus:shadow-lg focus:shadow-orange ${className}`}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required
            onChange={onChange}
            type={type}
            name={name}
        />
    )
}

export default Input