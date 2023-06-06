import { useContext, useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Context } from '../../Context/Context';
import axiosInstance from '../../utils/axios'
import Cookies from 'js-cookie';
import { Image, KPI, Profile, Team } from './FormsToUpdate';
import GlobalToast from '../Shared/Toast';
import Circles from "../Shared/Circles";

const Employee = ({ teamsData, setEmployees, getAllEmployees, kpiData }) => {

    const { setLoading, idToEdit, setOpenFormToAddEdit } = useContext(Context)

    const [employeeData, setEmployeeData] = useState({})
    const [employeeKPIS, setEmployeeKPIS] = useState([])
    const [selectedTeam, setSelectedTeam] = useState('');
    const [image, setImage] = useState('');
    const [first_name, setFirst_name] = useState('' || employeeData.first_name)
    const [last_name, setLast_name] = useState('' || employeeData.last_name)
    const [email, setEmail] = useState('' || employeeData.email)
    const [phone, setPhone] = useState('' || employeeData.phone)
    const [updatedKpiName, setUpdatedKpiName] = useState('640392f74b670907f1bea1d6')
    const [updatedKpiRate, setUpdatedKpiRate] = useState(1)
    const [tabsToEdit, setTabsToEdit] = useState('profile')


    // Data of the Employee
    const specificEmployee = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get(`/employees/specific-employee/${idToEdit}`, { headers: { token: Cookies.get('token') } })
            setEmployeeData(response.data.data)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
            }
        }
        setTimeout(() => { setLoading(false) }, 2000);
    }

    // Data of the Employee
    const kpisOfEmployee = async () => {
        try {
            // setLoading(true)
            const response = await
                axiosInstance.get(`/employees/kpis-of-employee-update/${idToEdit}`, { headers: { token: Cookies.get('token') } })
            setEmployeeKPIS(response.data.data.kpis)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
            }
        } setTimeout(() => { setLoading(false) }, 2000);
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
                axiosInstance.put(`/teams/assign-team-to-employee/${selectedTeam}`, { employeeId: idToEdit }, {
                    headers: { token: Cookies.get('token') }
                })
            GlobalToast('success', response.data.message)
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
            setEmployeeData({ ...employeeData, teamName: response.data.team })
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
            }
        } setTimeout(() => { setLoading(false) }, 2000);
    }

    // Change Image
    const handleImageUpload = (e) => {
        setImage(e.target.files[0])
    }
    const changeImage = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/employees/change-image/${idToEdit}`, { image: image }, {
                headers: { token: Cookies.get('token'), "content-type": "multipart/form-data", }
            })
            setLoading(true)
            GlobalToast('success', response.data.message)
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
            setEmployeeData({ ...employeeData, image: response.data.data.image })
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);
    }

    // Update Employee Information (Name, Email, Phone)
    const updateEmployeeInformation = async (e) => {
        e.preventDefault()
        // Check if length of phone number = 8
        const phoneRegex = /^\d{8}$/
        if (!phoneRegex.test(phone || employeeData.phone)) {
            GlobalToast('warn', 'Please enter a valid 8-digit phone number.')
            return
        }
        try {
            const response = await axiosInstance.put(`/employees/update-info/${idToEdit}`, {
                first_name: first_name, last_name: last_name, email: email, phone: phone
            }, { headers: { token: Cookies.get('token') } })
            setLoading(true)
            GlobalToast('success', response.data.message)
            getAllEmployees()
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            } setTimeout(() => { setLoading(false) }, 2000);
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
            const response = await axiosInstance.put(`/employees/add-kpi-to-employee/${idToEdit}`, {
                kpiId: updatedKpiName, kpiRate: updatedKpiRate,
            }, { headers: { token: Cookies.get('token') } })
            setLoading(true)
            GlobalToast('success', response.data.message)
            // Get The Updated Employee Data
            setEmployeeKPIS(response.data.kpis)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);
    }

    useEffect(() => {
        specificEmployee()
    }, [])


    const formComponents = { image: Image, team: Team, kpi: KPI, profile: Profile, };
    const FormComponent = formComponents[tabsToEdit] || null;

    return (
        <>
            {/* Circles */}
            <Circles className1={'-left-2 bottom-0 w-6 h-6 bg-orange'} className2={'left-6 bottom-2 w-4 h-4 bg-orange'} className3={'left-4 bottom-6 w-1 h-1 bg-orange'} />
            {/* Close */}
            <AiFillCloseCircle onClick={() => { setOpenFormToAddEdit({ openedToEdit: false }) }} className='absolute top-2 right-2' cursor='pointer' size={25} color='#e04e17' />
            {/* Title */}
            <h1 className='font-alkatra text-orange font-semibold w-full p-2 my-1 text-center text-xl'>
                Update Employee Data
            </h1>

            {/* Nav Tabs */}
            <div className='w-10/12 m-auto h-fit p-2  flex justify-between items-center gap-x-2'>
                {['profile', 'image', 'team', 'kpi'].map((key, index) => (
                    <span key={index} onClick={() => setTabsToEdit(key)}
                        className={`${tabsToEdit === key ? 'opacity-40' : ''} w-1/2 rounded-lg transition duration-700 ease-in-out hover:opacity-40 bg-sidebar h-fit p-2 text-center cursor-pointer font-alkatra text-xl`}
                    >{key}
                    </span>
                ))}
            </div>

            {/* Forms */}
            <div className='w-full flex h-full'>
                {FormComponent && <FormComponent
                    employeeData={employeeData} image={image}
                    // Image Form
                    changeImage={changeImage} handleImageUpload={handleImageUpload}
                    // Profile Form
                    updateEmployeeInformation={updateEmployeeInformation}
                    setFirst_name={setFirst_name} setLast_name={setLast_name} setEmail={setEmail} setPhone={setPhone}
                    // Team From
                    teamsData={teamsData} selectedTeam={selectedTeam}
                    assignTeamToemployee={assignTeamToemployee}
                    handleChangeTeam={handleChangeTeam}
                    // KPI Form
                    kpiData={kpiData} kpisOfEmployee={kpisOfEmployee}
                    updateEmployeeKPIs={updateEmployeeKPIs}
                    handleChangeKPIName={handleChangeKPIName}
                    handleChangeKPIRate={handleChangeKPIRate}
                    employeeKPIS={employeeKPIS} setEmployeeKPIS={setEmployeeKPIS}
                />}
            </div>

        </>

    )
}

export default Employee
