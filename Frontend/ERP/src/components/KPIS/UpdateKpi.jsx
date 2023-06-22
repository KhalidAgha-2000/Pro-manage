import React, { useContext, useState } from 'react'
import axiosInstance from '../../utils/axios'
import { Context } from '../../Context/Context'
import Cookies from 'js-cookie'
import { GiCheckMark } from 'react-icons/gi'
import { TbLetterX } from 'react-icons/tb'
import GlobalToast from '../Shared/Toast'


const UpdateKpi = ({ kpiToUpdate, setKpiToUpdate, setAllKpisData }) => {
    const [updateTheKpi, setUpdateTheKpi] = useState('')
    const { setLoading } = useContext(Context)

    // Update KPI`s name
    const updateKPIName = async (e) => {
        e.preventDefault()
        // Check if the updateKpi state is empty
        if (!updateTheKpi) {
            GlobalToast('warn', 'Please enter a kpi name.')
            return
        }

        try {
            const response = await axiosInstance.put(`/kpis/update-kpi-name/${kpiToUpdate.id}`,
                { name: updateTheKpi },
                { headers: { token: Cookies.get('token') } })
            setLoading(true)
            GlobalToast('success', response.data.message)
            setTimeout(() => { setKpiToUpdate({ isOpen: false }) }, 1000);
            // Get The Updated KPI Data
            setAllKpisData((prevAllKpisData) =>
                prevAllKpisData.map((kpi) => kpi._id === kpiToUpdate.id ? { ...kpi, name: response.data.data.name } : kpi)
            );
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);

    }


    return (
        <form className='inset-y-1/2 w-1/3 h-fit flex flex-col gap-y-2  p-4 rounded-2xl bg-white border-4 border-sidebar '>
            <span className='text-orange text-[13px] font-montserrat'>You can modify the KPI name, however you should not change it because it is associated with employees data.</span>
            <div className='flex items-center justify-between'>
                <input onChange={(e) => setUpdateTheKpi(e.target.value.trim())}
                    type="text" defaultValue={kpiToUpdate.kpiName} required name="name" placeholder={kpiToUpdate.kpiName}
                    className="w-3/4 bg-gray-50 text-sm rounded-lg focus:ring-orange border outline-none p-2.5 "
                />
                <GiCheckMark cursor='pointer' color='#4bb543' onClick={updateKPIName} />
                <TbLetterX cursor='pointer' color='#ff3333' onClick={() => setKpiToUpdate({ isOpen: false })} />
            </div>
        </form>
    )
}

export default UpdateKpi