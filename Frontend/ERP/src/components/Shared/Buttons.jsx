// Buttons
export const Buttons = ({ text, edit, done, remove, type, onClick }) => {
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
            onClick={onClick}
            type={type}
        >
            {text}
        </button >

    )
}


// Icon Buttons
export const IconButtons = ({ Icon, onClick, className }) => {
    return (
        <button
            className={`${className} || w-max h-max items-center bg-orange px-3 py-3  text-center text-light rounded-full cursor-pointer
             hover:opacity-70 hover:text-dark  hover:scale-90
             focus:ring-1 focus:outline-none focus:ring-light 
             transition duration-700 ease-in-out`
            }
            onClick={onClick}
        >
            <Icon className={'text-xl text-light'} />
        </button >
    )
}
