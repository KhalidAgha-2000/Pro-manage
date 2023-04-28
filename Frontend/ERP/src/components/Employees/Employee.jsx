import { useContext, useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Context } from '../Context/Context';
import axiosInstance from '../../constants/axios'
import Cookies from 'js-cookie';
import Input from '../Admins/Input';
import { Buttons } from '../Shared/Buttons';

const Employee = ({ isOpenToEdit, setIsOpenToEdit, teamsData, getAllEmployees }) => {

    const { id } = isOpenToEdit
    const [employeeData, setEmployeeData] = useState({})
    const [selectedTeam, setSelectedTeam] = useState('');

    const { setNotifications, setLoading } = useContext(Context)

    // Data of the admin
    const specificEmployee = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get(`/employees/specific-employee/${id}`, {
                    headers: { token: Cookies.get('token') }
                })
            // console.log('rr', response);
            setEmployeeData(response.data.data)
        } catch (error) {
            if (error.response && error.response.data) {
                setNotifications({
                    notificationBar: true,
                    pass: false,
                    notificationBarMessage: "Oops! Some thing wrong, try to reload"
                })
            }
            // console.log(error);
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

    const closeAndUpdate = () => {
        setIsOpenToEdit(isOpenToEdit => ({ ...isOpenToEdit, opened: false }))
        getAllEmployees()
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
                onClick={() => closeAndUpdate()}
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
                        <form className='mb-10' >
                            <div className='flex gap-x-2 gap-y-2 mb-4'>

                                <Input
                                    type={'text'} placeholder='first_name'
                                    defaultValue={employeeData.first_name}
                                    // onChange={(e) =>
                                    //     setAdminEmail(e.target.value)
                                    // }
                                    className={'w-1/2'} />
                                <Input
                                    type={'text'} placeholder='last_name'
                                    defaultValue={employeeData.last_name}
                                    // onChange={(e) =>
                                    //     setAdminEmail(e.target.value)
                                    // }
                                    className={'w-1/2'} />
                            </div>
                            <div className='flex gap-x-2 gap-y-2 my-4'>

                                <Input
                                    type={'email'} placeholder='email'
                                    defaultValue={employeeData.email}
                                    // onChange={(e) =>
                                    //     setAdminEmail(e.target.value)
                                    // }
                                    className={'w-1/2'} />
                                <Input
                                    type={'number'} placeholder='Phone,Enter (8) digits'
                                    defaultValue={employeeData.phone}
                                    // onChange={(e) =>
                                    //     setAdminEmail(e.target.value)
                                    // }
                                    className={'w-1/2'} />
                            </div>
                            <div className='flex flex-col items-end'>
                                <Buttons done text={'done'} />
                            </div>
                        </form>

                        {/* Image*/}
                        <form className=' flex justify-between items-center mb-6' >
                            <Input
                                name="image"
                                defaultValue={employeeData.image}
                                placeholder='image'
                                type='file'
                                className='pt-3 px-1 w-[64%]' />

                            <Buttons done text={'done'} />

                        </form>

                        <form className='flex justify-between items-center'
                            onSubmit={assignTeamToemployee}
                        >

                            <select name="team"
                                className='h-14 rounded-md w-[65%] p-1 bg-light outline-none border-4 border-sidebar font-montserrat font-semibold text-dark placeholder:text-dark placeholder:opacity-60 focus:shadow-lg focus:shadow-orange '
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