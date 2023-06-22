import React from 'react'
import P_Logo_Home from '../assets/P_Logo_Home.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import checkIfEmpty from '../utils/validation';
import Cookies from 'js-cookie';
import landing_Shape from "../assets/landing_Shape.png";
import { motion } from "framer-motion";
import GlobalToast from '../components/Shared/Toast';
import Circles from '../components/Shared/Circles';
import axiosInstance from '../utils/axios';

const Login = () => {

    const navigate = useNavigate();

    // Initialize state variables
    const [formValues, setFormValues] = useState({ email: '', password: '' });

    // Destructure formValues object for easier access
    const { email, password } = formValues;

    // Handle form submit
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/registration/login',
                { email, password });
            GlobalToast('success', response.data.message)
            Cookies.set('token', response.data.token, { expires: 1 / 24 }) // Expires in 1 hour (1/24 of a day)
            Cookies.set('id', response.data.data._id, { expires: 1 / 24 })
            setTimeout(() => {
                navigate('/dashboard/analysis');
            }, 3000);
        } catch (error) {
            if (error.response && error.response.data) {
                setFormValues({ ...formValues, email: '', password: '' })
                GlobalToast('error', error.response.data.message)
            }
        }
    };


    return (
        <div className='Login flex h-screen relative'>
            {/* Background */}
            <motion.img initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
                src={landing_Shape} className='w-1/2 h-screen overflow-hidden absolute right-0' alt="landing_Shape" />

            {/* Form */}
            <motion.section initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
                className='leftt w-1/2 h-screen flex items-center'>
                <form onSubmit={handleLogin}
                    className="login-form rounded-md relative w-1/2 p-1 h-2/3 m-auto flex flex-col items-center backdrop-blur-lg bg-gradient-to-b from-light to-sidebar shadow-orange/70 shadow-floating-shadow ">
                    <h1 className='w-full h-fit p-1 mt-4 font-alkatra text-orange text-center font-bold text-3xl'>Welcome</h1>
                    <em className='w-full h-fit my-4 mb-10 text-orange text-center text-lg'>Log In as Administrator</em>

                    <div className="login__input my-4">
                        <input className="login__input-input"
                            value={email}
                            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} type="text" placeholder=" " />
                        <label className="login__input-label">Email</label>
                    </div>

                    <div className="login__input my-4">
                        <input className="login__input-input"
                            value={password}
                            onChange={(e) => setFormValues({ ...formValues, password: e.target.value })} type="password" placeholder=" " />
                        <label className="login__input-label">Password</label>
                    </div>

                    <button
                        disabled={checkIfEmpty(formValues, formValues.email)}
                        className='bg-orange w-[90%] mt-6
                        rounded-md px-24 py-2.5 text-sidebar font-alkatra font-bold text-xs tracking-widest uppercase transition-colors transition-timing-ease-in duration-270 hover:text-orange hover:bg-light   focus:outline-sidebar
                        disabled:cursor-not-allowed disabled:opacity-25'
                        type="submit" name='login'>Continue
                    </button>

                    {/* Circles */}
                    <Circles className1={'left-2 -top-2 w-4 h-4 bg-orange'} className2={'left-2 top-4 w-1 h-1 bg-orange'} className3={'left-6 top-0 w-2 h-2 bg-orange'} />
                </form>
            </motion.section>


            <section className='right w-1/2 h-screen z-10 flex flex-col p-10 overflow-hidden'>
                {/* Logo */}
                <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
                    className="relative px-1 bg-slate-5 mt-10 mr-20 flex items-center justify-center"
                >
                    <img src={P_Logo_Home} alt="logo" className='w-64' />
                </motion.div>

                <div className='w-fit h-fit m-auto p-10 mb-8 '>
                    <p className='text-4xl text-light leading-snug font-alkatra'>Facilitate your HR management</p>
                    <p className='text-4xl text-light leading-snug font-alkatra'>Fast and Precise Results</p>
                </div>

            </section>
            {/* Copyright */}
            <span className='fixed bottom-1 right-1 z-10 w-fit h-fit p-1 text-sidebar font-alkatra'>
                Copyright &copy;  {new Date().getFullYear()}
                <a className='mx-1 underline' target='_blank' rel='noreferrer' href="https://www.linkedin.com/in/khalid-agha/">
                    M.KHALID.K.AGHA
                </a>
                All Rights Reserved
            </span>
        </div>
    )
}

export default Login