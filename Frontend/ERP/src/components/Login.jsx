import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Context } from './Context/Context';
import axiosInstance from '../constants/axios';

const Login = () => {

    // Validation
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const checkIfEmpty = (obj) => {
        let status = false
        for (let key in obj) {
            if (obj[key] === "" || !validRegex.test(formValues.email)) {
                status = true
            }
        }
        return status;
    }
    const navigate = useNavigate();
    const { setNotificationBar, setNotificationBarMessage, setPass, setAdminData } = useContext(Context)

    // Initialize state variables
    const [formValues, setFormValues] = useState({ email: '', password: '' });

    // Destructure formValues object for easier access
    const { email, password } = formValues;

    // Handle form submit
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/registration/login', { email, password });
            setNotificationBar(true)
            setPass(true)
            setNotificationBarMessage(response.data.message)
            localStorage.setItem('token', response.data.token); // Set token in local storage
            localStorage.setItem('id', response.data.data._id); // Set _id in local storage
            setTimeout(() => {
                navigate('/dashboard/Analysis'); // Navigate to home page after 3s delay
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
            <div className="left-side w-2/5 h-screen bg-light  flex flex-col items-center justify-center ">
                <img src={logo} alt="Logo" className='w-52 h-auto aspect-square p-2' />
                <h1 className='w-full text-center font-extrabold transition-all duration-1000 font-montserrat text-4xl my-2 text-orange'>ERP_System</h1>
            </div>

            {/* Left */}
            <div className="right-side w-3/5 flex flex-col items-center py-16 h-screen bg-orange">
                {/* <img src={logo} alt="Logo" className='w-10' /> */}
                {/* <h1 className='w-[80%] h-auto m font-semibold text-2xl  text-light text-center m-auto'>Sign In as Administrator</h1> */}
                <h5 className='text-light my-1 font-montserrat text-2xl '>Facilitate your HR management</h5>
                <h5 className='text-light my-1 font-montserrat text-2xl '>Fast and Precise Results</h5>

                <form
                    onSubmit={handleLogin}
                    className='w-[80%] h-2/3 flex flex-col gap-y-3 justify-center items-center'>

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
                        disabled={checkIfEmpty(formValues)}
                        className='btnbtn disabled:cursor-not-allowed disabled:opacity-25'
                        type="submit" name='login'>Continue
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Login