import { useContext, useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Context } from '../Context/Context';
import axiosInstance from '../../constants/axios'
import Cookies from 'js-cookie';
import Inputs from '../Shared/Inputs';
import { Buttons } from '../Shared/Buttons';
import { MdAdminPanelSettings } from 'react-icons/md';
import { EmployeeContext } from '../Context/EmployeeeContext';
import { Image, KPI, Profile, Team } from './FormsToUpdate';

const Employee = ({ teamsData, setEmployees, getAllEmployees, kpiData }) => {

    const { setNotifications, setLoading } = useContext(Context)
    const { setOpenFormToEdit, openFormToEdit, id, opened, idToEdit, setIdToEdit, isOpenToEdit, setIsOpenToEdit, } = useContext(EmployeeContext);

    // const { id } = openFormToEdit
    // const { id } = isOpenToEdit
    const [employeeData, setEmployeeData] = useState({})
    const [selectedTeam, setSelectedTeam] = useState('');
    const [image, setImage] = useState('');
    const [first_name, setFirst_name] = useState('' || employeeData.first_name)
    const [last_name, setLast_name] = useState('' || employeeData.last_name)
    const [email, setEmail] = useState('' || employeeData.email)
    const [phone, setPhone] = useState('' || employeeData.phone)
    const [updatedKpiName, setUpdatedKpiName] = useState('')
    const [updatedKpiRate, setUpdatedKpiRate] = useState('')


    // Data of the admin
    const specificEmployee = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get(`/employees/specific-employee/${id}`, {
                    headers: { token: Cookies.get('token') }
                })
            setEmployeeData(response.data.data)
            // console.log(response.data.data.kpis);
            console.log('kk', response.data.data);
        } catch (error) {
            if (error.response && error.response.data) {
                setNotifications({
                    notificationBar: true,
                    pass: false,
                    notificationBarMessage: "Oops! Some thing wrong, try to reload"
                })
            }
            console.log(error.response.data);
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
    const handleChangeTeam = (e) => {
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
            // Get The Updated Employee Data
            setEmployees(prevemployeeData => {
                const updatedemployeeData = prevemployeeData.map(emp => {
                    if (emp.id === response.data.id) {
                        return { ...emp, team: response.data.team };
                    }
                    return emp;
                });
                return updatedemployeeData;
            })
            setOpenFormToEdit({ opened: false })
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
            // Get The Updated Employee Data
            setEmployees(prevemployeeData => {
                const updatedEmployeeData = prevemployeeData.map(emp => {
                    if (emp.id === response.data.id) {
                        return { ...emp, image: response.data.data.image };
                    }
                    return emp;
                });
                return updatedEmployeeData;
            })
            setOpenFormToEdit({ opened: false })
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

    // Update Employee Information (Name, Email, Phone)
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

    // Add / Update Employee KPIS

    const handleChangeKPIName = (e) => {
        setUpdatedKpiName(e.target.value)
    }
    const handleChangeKPIRate = (e) => {
        setUpdatedKpiRate(e.target.value)
    }
    const updateEmployeeKPIs = async (e) => {
        e.preventDefault()

        try {
            const response = await axiosInstance.put(`/employees/add-kpi-to-employee/${id}`, {
                kpiId: updatedKpiName,
                kpiRate: updatedKpiRate,
            }, { headers: { token: Cookies.get('token') } })
            setLoading(true)
            setNotifications({
                notificationBar: true,
                pass: true,
                notificationBarMessage: response.data.message
            })
            // Get The Updated Employee Data
            setEmployees(prevEmployeeData => {
                const updatedEmployeeData = prevEmployeeData.map(emp => {
                    if (emp.id === response.data.id) {
                        return { ...emp, kpis: response.data.updatedKpis };
                    }
                    return emp;
                });
                return updatedEmployeeData;
            });

            console.log('response', response.data);
            //     getAllEmployees()
        } catch (error) {
            if (error.response && error.response.data) {
                setNotifications({
                    notificationBar: true,
                    pass: false,
                    notificationBarMessage: error.response.data.message
                })
            }
            console.log(error);
        }
        finally {
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

    const formComponents = {
        image: Image,
        team: Team,
        kpi: KPI,
        profile: Profile,
    };

    const FormComponent = formComponents[openFormToEdit.formName] || null;

    return (
        <div className='w-1/3 h-3/4  max-h-fit z-[9999] m-auto bg-light relative overflow-hidden'>

            {/* ---- */}
            <span className='absolute -left-2 bottom-0 w-6 h-6 object-cover bg-orange bg-opacity-95 rounded-full' />
            <span className='absolute left-6 bottom-2 w-4 h-4 object-cover bg-sidebar  rounded-full' />
            <span className='absolute left-4 bottom-6 w-1 h-1 object-cover bg-orange bg-opacity-95 rounded-full' />

            <AiFillCloseCircle
                onClick={() => { setOpenFormToEdit({ opened: false }) }}
                className='absolute top-2 right-2' cursor='pointer' size={25} color='#e04e17'
            />

            <h1 className='font-alkatra text-xl text-orange font-semibold w-full p-2 my-1 mb-6 text-center'>
                Update Employee' {openFormToEdit.formName}
            </h1>
            {FormComponent && <FormComponent
                employeeData={employeeData} image={image}
                // Image Form
                changeImage={changeImage} handleImageUpload={handleImageUpload}
                // Profile Form
                updateEmployeeInformation={updateEmployeeInformation}
                setFirst_name={setFirst_name} setLast_name={setLast_name} setEmail={setEmail} setPhone={setPhone}
                // Team From
                teamsData={teamsData}
                assignTeamToemployee={assignTeamToemployee}
                handleChangeTeam={handleChangeTeam}
                // KPI Form
                kpiData={kpiData}
                updateEmployeeKPIs={updateEmployeeKPIs}
                handleChangeKPIName={handleChangeKPIName}
                handleChangeKPIRate={handleChangeKPIRate}
            />}


        </div >

    )
}

export default Employee

// // Employee Image
// export const Image = ({ employeeData, changeImage, handleImageUpload, image }) => {
//     return (
//         <div className='flex flex-col items-center'>
//             {employeeData.image &&
//                 <img src={employeeData.image} alt={employeeData.first_name}
//                     className="w-48 h-48 mb-3 object-cover object-center border-orange shadow-lg shadow-light rounded-full"
//                 /> ||
//                 <MdAdminPanelSettings className='text-orange w-24 h-24 ' />
//             }
//             <form
//                 onSubmit={changeImage}
//                 className=' flex flex-col justify-between items-center gap-y-10 my-10 pb-5'
//             >
//                 <Inputs
//                     onChange={handleImageUpload}
//                     name="image"
//                     defaultValue={employeeData.image}
//                     placeholder='image'
//                     type='file'
//                     className={'pt-3 px-1 w-full'} />

//                 <Buttons disabled={image === ''} done text={'upload'} className={'w-10/12'} />

//             </form>
//         </div>
//     )
// }


// export const Profile = ({ }) => {
//     return (
//         <div>Employee</div>
//     )
// }

// export const Team = ({ }) => {
//     return (
//         <div>Team</div>
//     )
// }

// export const KPI = ({ }) => {
//     return (
//         <div>KPI</div>
//     )
// }
