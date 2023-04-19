import React, { useContext } from 'react'
import logo from '../assets/logo.jpg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Context } from './Context/Context';
import axiosInstance from '../constants/axios';
import checkIfEmpty from '../constants/validation';
import Cookies from 'js-cookie';
import landing_Shape from "../assets/landing_Shape.png";

const Login = () => {

    const navigate = useNavigate();
    const { setNotifications } = useContext(Context)

    // Initialize state variables
    const [formValues, setFormValues] = useState({ email: '', password: '' });

    // Destructure formValues object for easier access
    const { email, password } = formValues;

    // Handle form submit
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/registration/login', { email, password });
            setNotifications({
                notificationBar: true,
                pass: true,
                notificationBarMessage: response.data.message
            })
            await Cookies.set('token', response.data.token, { expires: 1 / 24 }); // Expires in 1 hour (1/24 of a day)
            await Cookies.set('id', response.data.data._id, { expires: 1 / 24 }); // Expires in 1 hour (1/24 of a day)
            setTimeout(() => {
                navigate('/dashboard/analysis'); // Navigate to home page after 3s delay
                window.location.reload()
            }, 3000);
        } catch (error) {
            if (error.response && error.response.data) {
                // Update error and messageError state if there is an error response
                setFormValues({
                    ...formValues,
                    email: '',
                    password: ''
                });
                setNotifications({
                    notificationBar: true,
                    pass: false,
                    notificationBarMessage: error.response.data.message
                })
            }
        }
        finally {
            setInterval(() => {
                setNotifications({
                    notificationBarMessage: '',
                    pass: false,
                    notificationBar: false,
                })
            }, 4000);
        }
    };


    return (
        <div className='Login flex h-screen relative'>
            {/* Background */}
            <img src={landing_Shape} className='w-1/2 h-screen absolute right-0' alt="landing_Shape" />

            {/* Form */}
            <section className='leftt w-1/2 h-screen flex items-center'>
                <form class="login-form relative w-1/2 p-1 h-2/3 m-auto flex flex-col items-center ju
               backdrop-blur-lg bg-gradient-to-b from-light to-sidebar shadow-orange/70 shadow-floating-shadow "
                >
                    <h1 className='w-full h-fit p-1 mt-4 font-alkatra text-orange text-center font-bold text-3xl'>Welcome</h1>
                    <em className='w-full h-fit my-4 mb-10 text-orange text-center text-lg'>Log In as Administrator</em>

                    <div className="login__input my-4">
                        <input className="login__input-input"
                            value={email}
                            onChange={(e) =>
                                setFormValues({ ...formValues, email: e.target.value })
                            }
                            type="text" placeholder=" " />
                        <label className="login__input-label">Email</label>
                    </div>
                    <div className="login__input my-4">
                        <input className="login__input-input"
                            value={password}
                            onChange={(e) =>
                                setFormValues({ ...formValues, password: e.target.value })
                            } type="password" placeholder=" " />

                        <label className="login__input-label">Password</label>
                    </div>

                    <button
                        disabled={checkIfEmpty(formValues, formValues.email)}
                        className='bg-orange w-[90%] mt-6
                        rounded-md px-24 py-2.5 text-sidebar font-alkatra font-bold text-xs tracking-widest uppercase transition-colors transition-timing-ease-in duration-270 hover:text-orange hover:bg-light   focus:outline-sidebar
                        disabled:cursor-not-allowed disabled:opacity-25'
                        type="submit" name='login'>Continue
                    </button>
                </form>
            </section>


            <section className='right w-1/2 h-screen z-10 flex flex-col p-10 overflow-hidden'>
                {/* Logo */}
                <div


                    className="relative px-1">
                    <img
                        src={logo} alt="logo" className='w-72' />
                    <p className='absolute top-28 left-[105px] text-orange font-alkatra text-5xl'>ERP</p>
                </div>
                <div className=' w-fit h-fit m-auto p-2  '>
                    <p className='text-4xl text-light leading-snug font-alkatra ' id='landing_text'>Facilitate your HR management</p>
                    <p className='text-4xl text-light leading-snug font-alkatra ' id='landing_text'>Fast and Precise Results</p>
                </div>

            </section>

        </div>
    )
}

export default Login