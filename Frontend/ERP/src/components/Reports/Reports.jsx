import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context';
import axiosInstance from '../../utils/axios';
import Cookies from 'js-cookie';
import GlobalToast from '../Shared/Toast';
import NoValueMatchSeaarch, { filteredArrayToSearch } from '../../utils/search'
import { FalidtoFetch } from '../Shared/Loading';
import ReportCard from './ReportCard';

const Reports = () => {

    const [employees, setEmployees] = useState([]);
    const { setLoading, search } = useContext(Context)

    // Get All Employees
    const getAllEmployees = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get('/employees/all-employees', { headers: { token: Cookies.get('token') } }
                )
            setEmployees(response.data.data);
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
            }
        }
        setTimeout(() => { setLoading(false) }, 2000);
    }

    // Search
    const filteredAdminsToSearch = filteredArrayToSearch(employees, 'Employee_Name', search)

    useEffect(() => {
        getAllEmployees()
    }, [search]);

    return (
        <div className='w-full h-[75vh] relative flex flex-wrap justify-center p-3 gap-x-4 gap-y-4 overflow-auto'>
            {employees.length == 0 ?
                <FalidtoFetch /> :
                filteredAdminsToSearch.length === 0 ?
                    <NoValueMatchSeaarch /> : filteredAdminsToSearch
                        .map((emp) => (<ReportCard key={emp.id} data={emp} />))
            }
        </div>
    )
}

export default Reports