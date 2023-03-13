import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import notFound from "../../assets/404.png";
import { FaArrowCircleRight } from "react-icons/fa";
const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='w-full h-screen uppercase bg-dark flex items-center p-0 font-montserrat text-light'>
            <div className='w-1/2 h-1/2 flex flex-col  justify-center  m-auto'>
                <img src={notFound} alt="404" className='w-52 h-52' />
                <h1 className='font-montserrat text-light text-4xl'>
                    sorry, there`s nothing here
                </h1>
                <span className='mt-4 flex'>

                    <Link to={'/login'}>
                        <u className='mx-2 flex items-center  '>
                            Login <FaArrowCircleRight className='mx-1' />
                        </u>
                    </Link>
                    {/* navigate(-1) */}
                </span>

                <span className='cursor-pointer mt-4 flex'>


                    <u onClick={() => navigate(-1)} className='mx-2 flex items-center  '>
                        Go Back <FaArrowCircleRight className='mx-1' />
                    </u>


                </span>
            </div>
        </div>
    )
}

export default NotFound