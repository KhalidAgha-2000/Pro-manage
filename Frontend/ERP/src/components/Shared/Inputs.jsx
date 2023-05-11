const Inputs = ({ type, className, onChange, defaultValue, placeholder, name }) => {
    return (
        <input
            className={`${className} h-14 rounded-md p-1 bg-light outline-none border-4 border-sidebar
            font-montserrat font-semibold text-dark
          placeholder:text-dark placeholder:opacity-60
            focus:shadow-lg focus:shadow-orange`}

            defaultValue={defaultValue} placeholder={placeholder}
            onChange={onChange} type={type}
            name={name} required
        />
    )
}

export default Inputs