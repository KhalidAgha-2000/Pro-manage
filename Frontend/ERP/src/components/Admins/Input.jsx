import React from 'react'

const Input = ({ type, className, onChange, defaultValue, placeholder, name }) => {
    return (
        <input
            className={`h-14 rounded-md px-6 my-1 bg-light outline-none border-2 font-montserrat font-semibold border-orange placeholder:text-dark placeholder:opacity-60 text-dark focus:shadow-lg focus:shadow-orange ${className}`}
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