import { useContext, useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Context } from '../Context/Context';
import axiosInstance from '../../constants/axios'
import Cookies from 'js-cookie';
import Input from '../Admins/Input';
import { Buttons } from '../Shared/Buttons';

const Employee = ({ isOpenToEdit, setIsOpenToEdit, teamsData, setEmployees, getAllEmployees }) => {

    const { id } = isOpenToEdit
    const [employeeData, setEmployeeData] = useState({})
    const [selectedTeam, setSelectedTeam] = useState('');
    const [image, setImage] = useState('');
    const [first_name, setFirst_name] = useState('' || employeeData.first_name)
    const [last_name, setLast_name] = useState('' || employeeData.last_name)
    const [email, setEmail] = useState('' || employeeData.email)
    const [phone, setPhone] = useState('' || employeeData.phone)
    const [phoneError, setPhoneError] = useState('');

    const { setNotifications, setLoading } = useContext(Context)

    // Data of the admin
    const specificEmployee = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get(`/employees/specific-employee/${id}`, {
                    headers: { token: Cookies.get('token') }
                })
            setEmployeeData(response.data.data)
        } catch (error) {
            if (error.response && error.response.data) {
                setNotifications({
                    notificationBar: true,
                    pass: false,
                    notificationBarMessage: "Oops! Some thing wrong, try to reload"
                })
            }
        }
        finally {
            setLoading(false);
            setInterval(() => {
                setNotifications({
                    pass: false,
                    notificationBarMessage: '',
                    notificationBar: false,
                })
            }, 9000);
        }
    }

    // Assign Team To Employee
    const handleChange = (e) => {
        setSelectedTeam(e.target.value);
    }

    const assignTeamToemployee = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await
                axiosInstance.put(`/teams/assign-team-to-employee/${selectedTeam}`, { employeeId: id }, {
                    headers: { token: Cookies.get('token') }
                })
            setNotifications({
                notificationBar: true,
                pass: true,
                notificationBarMessage: response.data.message
            })
            // Get The Updated Admin Data
            setEmployees(prevemployeeData => {
                const updatedAdminsData = prevemployeeData.map(emp => {
                    if (emp.id === response.data.id) {
                        return { ...emp, team: response.data.team };
                    }
                    return emp;
                });
                return updatedAdminsData;
            })
        } catch (error) {
            if (error.response && error.response.data) {
                setNotifications({
                    notificationBar: true,
                    pass: false,
                    notificationBarMessage: "Oops! Some thing wrong, try to reload"
                })
            }
        }
        finally {
            setLoading(false);
            setInterval(() => {
                setNotifications({
                    pass: false,
                    notificationBarMessage: '',
                    notificationBar: false,
                })
            }, 9000);
        }
    }

    // Change Image
    const handleImageUpload = (e) => {
        setImage(e.target.files[0])
    }
    const changeImage = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/employees/change-image/${id}`, { image: image }, {
                headers: {
                    token: Cookies.get('token'),
                    "content-type": "multipart/form-data",
                }
            })
            setLoading(true)
            setNotifications({
                notificationBar: true,
                pass: true,
                notificationBarMessage: response.data.message
            })
            // Get The Updated Admin Data
            setEmployees(prevemployeeData => {
                const updatedAdminsData = prevemployeeData.map(emp => {
                    if (emp.id === response.data.id) {
                        return { ...emp, image: response.data.data.image };
                    }
                    return emp;
                });
                return updatedAdminsData;
            })
        } catch (error) {
            if (error.response && error.response.data) {
                setNotifications({
                    notificationBar: true,
                    pass: false,
                    notificationBarMessage: error.response.data.message
                })
            }
        } finally {
            setInterval(() => {
                setLoading(false)
                setNotifications({
                    pass: false,
                    notificationBarMessage: '',
                    notificationBar: false,
                })
            }, 9000);
        }

    }

    // Update email / name / phone
    const handleChangeToUpdate = (e) => {
        e.preventDefault();
        setUpdateEmployeeInfo({ ...updateEmployeeInfo, [e.target.name]: e.target.value })
        // const { name, value } = e.target
        // setUpdateEmployeeInfo(prevState => ({ ...prevState, [name]: value }))
        console.log('updateEmployeeInfo', updateEmployeeInfo)
    }
    const handleChangeToUpdatePhone = (e) => {
        const phoneRegex = /^\d{8}$/;
        const value = e.target.value.trim();
        if (value.length === 0) {
            setPhoneError('Phone number is required');
        } else if (!phoneRegex.test(value)) {
            setPhoneError('Phone number must be exactly 8 digits');
        } else {
            setPhoneError('');
            setPhone(value);
        }
    }

    const updateEmployeeInformation = async (e) => {
        e.preventDefault()
        // Check if length of phone number = 8
        const phoneRegex = /^\d{8}$/
        if (!phoneRegex.test(phone || employeeData.phone)) {
            setNotifications({
                notificationBar: true,
                pass: false,
                notificationBarMessage: 'Please enter a valid 8-digit phone number.'
            })
            return
        }
        try {
            const response = await axiosInstance.put(`/employees/update-info/${id}`, {
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone
            }, {
                headers: { token: Cookies.get('token') }
            })
            setLoading(true)
            setNotifications({
                notificationBar: true,
                pass: true,
                notificationBarMessage: response.data.message
            })
            getAllEmployees()
        } catch (error) {
            if (error.response && error.response.data) {
                setNotifications({
                    notificationBar: true,
                    pass: false,
                    notificationBarMessage: error.response.data.message
                })
            }
        } finally {
            setInterval(() => {
                setLoading(false)
                setNotifications({
                    pass: false,
                    notificationBarMessage: '',
                    notificationBar: false,
                })
            }, 9000);
        }
    }
    useEffect(() => {
        specificEmployee()
    }, [])


    return (
        <div className='w-3/4 h-4/5  max-h-fit z-[9999] m-auto bg-light relative overflow-hidden'>
            {/* Header */}

            {/* ---- */}
            <span className='absolute -left-2 bottom-0 w-6 h-6 object-cover bg-orange bg-opacity-95 rounded-full' />
            <span className='absolute left-6 bottom-2 w-4 h-4 object-cover bg-sidebar  rounded-full' />
            <span className='absolute left-4 bottom-6 w-1 h-1 object-cover bg-orange bg-opacity-95 rounded-full' />

            <AiFillCloseCircle
                onClick={() => {
                    setIsOpenToEdit(isOpenToEdit => ({ ...isOpenToEdit, opened: false }))
                }}
                // onClick={() => closeAndUpdate()}
                className='absolute top-2 right-2' cursor='pointer' size={25} color='#e04e17'
            />
            <h1 className='font-alkatra text-xl text-orange font-semibold w-full p-2 my-1 mb-6 text-center'>
                Update Employee Information
                <br />
                <span className='text-dark'>Info /Team /KPIs</span>
            </h1>

            <div className='w-full h-full m-auto  px-4 flex items-center justify-around'>
                {/* Information &  Team */}
                <div className='w-1/2 h-full bg-slate-100'>
                    <div className='w-full h-fit p-1'>
                        {/* Basic */}
                        <form className='mb-10'
                            onSubmit={updateEmployeeInformation}
                        >
                            <div className='flex gap-x-2 gap-y-2 mb-4'>

                                <Input
                                    type={'text'} placeholder='first_name'
                                    name={'first_name'} className={'w-1/2'}
                                    defaultValue={employeeData.first_name}
                                    onChange={(e) => { setFirst_name(e.target.value), console.log('first_name', first_name); }}
                                />

                                <Input
                                    type={'text'} placeholder='last_name'
                                    name={'last_name'} className={'w-1/2'}
                                    defaultValue={employeeData.last_name}
                                    onChange={(e) => { setLast_name(e.target.value) }}

                                />
                            </div>
                            <div className='flex gap-x-2 gap-y-2 my-4'>

                                <Input
                                    type={'email'} placeholder='email'
                                    name={'email'} className={'w-1/2'}
                                    defaultValue={employeeData.email}
                                    onChange={(e) => { setEmail(e.target.value) }}

                                />
                                <Input
                                    type={'number'} placeholder='Phone, Enter (8)digits'
                                    name={'phone'} className={'w-1/2'}
                                    defaultValue={employeeData.phone}
                                    onChange={(e) => { setPhone(e.target.value.trim()) }}
                                />
                            </div>
                            <div className='flex flex-col items-end'>
                                <Buttons done text={'done'} />
                            </div>
                        </form>

                        {/* Image*/}
                        <form
                            onSubmit={changeImage}
                            className=' flex justify-between items-center mb-6'
                        >
                            <Input
                                onChange={handleImageUpload}
                                name="image"
                                defaultValue={employeeData.image}
                                placeholder='image'
                                type='file'
                                className={'pt-3 px-1 w-[60%]'} />

                            <Buttons done text={'done'} />

                        </form>

                        <form className='flex justify-between items-center'
                            onSubmit={assignTeamToemployee}
                        >
                            <select name="team"
                                className='h-14 rounded-md w-[65%] p-1 bg-light outline-none border-4 border-sidebar font-montserrat font-semibold text-dark placeholder:text-dark placeholder:opacity-60 focus:shadow-lg focus:shadow-orange'
                                onChange={handleChange}

                            >
                                <option selected>{employeeData.teamName && employeeData.teamName || "No Team"}</option>
                                {
                                    teamsData.map(team => (
                                        <option
                                            className='text-orange hover:bg-dark hover:text-light'
                                            value={team._id}>{team.name}</option>
                                    ))
                                }
                            </select>



                            <Buttons done text={'done'} />

                        </form>
                    </div>

                </div>
                {/* KPIs*/}
                <div className='w-1/2 h-full bg-slate-500'></div>
            </div>
        </div >

    )
}

export default Employee