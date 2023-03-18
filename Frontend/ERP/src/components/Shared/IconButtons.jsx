const IconButtons = ({ Icon }) => {
    return (
        <button
            className={`w-max h-max items-center bg-orange px-3 py-3  text-center text-light rounded-full cursor-pointer
             hover:opacity-70 hover:text-dark  hover:scale-90
             focus:ring-1 focus:outline-none focus:ring-light 
             transition duration-700 ease-in-out`
            }
        >
            <Icon className={'text-xl text-light'} />
        </button >
    )
}

export default IconButtons
