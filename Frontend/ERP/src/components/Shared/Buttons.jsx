import { Link } from "react-router-dom"

// Buttons
export const Buttons = ({ text, edit, done, remove, type, disabled, onClick, className }) => {
    return (
        <button
            className={`h-fit items-center px-4 py-2.5 text-sm font-medium font-montserrat text-center text-light rounded-lg cursor-pointer
             hover:opacity-70 hover:text-dark 
             focus:ring-1 focus:outline-none   focus:opacity-70 focus:text-dark
             transition duration-700 ease-in-out 
             disabled:opacity-10 disabled:cursor-not-allowed
             ${edit && 'bg-success'}
             ${remove && 'bg-failed'}
             ${done && 'bg-orange'}
             ${className}
             `
            }
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {text}
        </button >

    )
}


// Icon Buttons
export const IconButtons = ({ Icon, onClick, className, linkTo }) => {
    return (
        <div className=" fixed  right-6 bottom-6">
            {/* z-[99] */}
            {linkTo && (
                <Link
                    className="absolute inset-0 rounded-full bg-orange opacity-0 hover:opacity-70 transition duration-300"
                    to={`/${linkTo}`}
                />
            )}
            <button
                className={`${className} w-max h-max items-center bg-orange px-3 py-3 text-center text-light rounded-full cursor-pointer
                    hover:opacity-70 hover:text-dark hover:scale-90 focus:ring-1 focus:outline-none focus:ring-light
                    transition duration-700 ease-in-out`}
                onClick={onClick}
            >
                <Icon className={'text-xl text-light'} />
            </button>
        </div>
    );
};

// Padge to Navigate
export const PadgeToNavigate = ({ className, onClick, text }) => {
    return (
        <span
            onClick={onClick}
            className={`${className} rounded-lg bg-light h-fit p-2 text-center font-alkatra text-xl`}>{text}</span>
    )
}


