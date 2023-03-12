import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Context } from './Context/Context';

const Login = () => {
    const navigate = useNavigate();
    const { setNotificationBar, setNotificationBarMessage, setPass, setAdminData } = useContext(Context)

    // Initialize state variables
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

    // Destructure formValues object for easier access
    const { email, password } = formValues;

    // Handle form submit
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/v1/registration/login', { email, password });
            setNotificationBar(true)
            setPass(true)
            setNotificationBarMessage(response.data.message)
            localStorage.setItem('token', response.data.token); // Set token in local storage
            setAdminData(response.data.data._id)
            setTimeout(() => {
                navigate('/dashboard/Admins'); // Navigate to home page after 3s delay
            }, 3000);
        } catch (error) {
            if (error.response && error.response.data) {
                // Update error and messageError state if there is an error response
                setFormValues({
                    ...formValues,
                    email: '',
                    password: ''
                });
                setNotificationBar(true)
                setPass(false)
                setNotificationBarMessage(error.response.data.message)
            }
        }
        finally {
            setInterval(() => {
                setNotificationBar(false)
                setPass(false)
                setNotificationBarMessage('')
            }, 4000);
        }

    };


    return (
        <div className='Login flex h-screen'>

            {/* Right */}
            <div className="left-side w-1/3 h-screen bg-light  flex flex-col items-center justify-center ">
                <img src={logo} alt="Logo" className='w-52 h-auto aspect-square p-2' />
                <h1 className='w-full text-center font-extrabold transition-all duration-1000 font-montserrat text-4xl my-2 text-orange'>ERP_System</h1>
                <h5 className='text-dark text-2xl '>Facilitate your HR management</h5>
                <h5 className='text-dark text-2xl '>Fast and Precise Results</h5>
            </div>

            {/* Left */}
            <div className="right-side w-2/3 flex flex-col items-center py-14 h-screen bg-orange">
                <img src={logo} alt="Logo" className='w-10' />
                <h1 className='w-[80%] h-auto m font-semibold text-2xl  text-light text-center m-auto'>Sign In as Administrator</h1>
                <form
                    onSubmit={handleLogin}
                    className='w-[80%] h-2/3 flex flex-col justify-center items-center m-auto'>

                    <div className="login__input">
                        <input className="login__input-input"
                            value={email}
                            onChange={(e) =>
                                setFormValues({ ...formValues, email: e.target.value })
                            }
                            type="text" placeholder=" " />
                        <label className="login__input-label">Email</label>
                    </div>

                    <div className="login__input">
                        <input className="login__input-input"
                            value={password}
                            onChange={(e) =>
                                setFormValues({ ...formValues, password: e.target.value })
                            } type="password" placeholder=" " />

                        <label className="login__input-label">Password</label>
                    </div>

                    <button
                        className='btnbtn'
                        type="submit" name='login'>Continue
                    </button>

                    {/* Error message
                    {error &&
                        <span className='animate-bounce   w-3/5 my-6 text-center  transition-all duration-1000 text-[#b91c1c] font-bold h-auto'>
                            {messageError}
                        </span>
                    } */}

                </form>
            </div>
        </div>
    )
}

export default Login