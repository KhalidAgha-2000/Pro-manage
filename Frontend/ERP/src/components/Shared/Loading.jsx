import React, { useContext } from 'react'
import { Context } from '../../Context/Context'

const Loading = () => {
    const { loading } = useContext(Context)

    return (
        <>
            {loading &&
                <div className='m-auto w-[80%] h-[80%] opacity-80 fixed z-[9999] bg-slate-200 flex flex-col items-center justify-center'>
                    <div className="loader-wrapper w-12 h-12">
                        <div className="loader animate-spin w-full h-full border-4  border-t-orange border-b-dark rounded-full">
                            <div className="loader-inner duration-200 border-b-[red] border-t-pink-300"></div>
                        </div>
                    </div>
                    <h1 className='font-montserrat font-semibold text-orange'>One Moment ...</h1>
                </div>
            }
        </>
    )
}

export default Loading



// Falid To Fetch
export const FalidtoFetch = () => {
    return (
        <h1 className='w-fit h-fit m-auto p-3 my-8 rounded-md bg-orange text-lg font-alkatra text-light'>
            Getting Data, Try to navigate !
        </h1>
    )
}