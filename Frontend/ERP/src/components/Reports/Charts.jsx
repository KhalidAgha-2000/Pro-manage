import React, { useContext, useEffect } from 'react'
import { Context } from '../../Context/Context'
import { motion } from 'framer-motion'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Charts = ({ kpisOfEmployee }) => {

    const { setLoading } = useContext(Context)
    useEffect(() => {
        setLoading(true)
        setTimeout(() => { setLoading(false) }, 1000);
    }, [kpisOfEmployee])

    return (
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }} transition={{ duration: 0.5 }}
            className='w-full h-[60vh] bg-sidebar relative text-dark rounded-md px-2 overflow-auto  '>
            <div className='my-2 '>
                {kpisOfEmployee.length === 0 ? (
                    <p className='w-fit h-fit m-auto p-3 my-8 rounded-md bg-orange text-lg font-alkatra text-light'>
                        No KPIs found for this employee!
                    </p>
                ) : (
                    kpisOfEmployee.map((kpi, index) => {
                        const kpiName = kpi.kpi.name.toUpperCase();
                        const rates = kpi.rates.map((rate) => rate.rate);

                        const data = {
                            labels: rates.map((_, index) => ` ${index + 1}`),
                            datasets: [
                                {
                                    label: kpiName,
                                    data: rates,
                                    backgroundColor: '#e04e17',
                                    borderRadius: 10,
                                    style: {
                                        color: 'orange',
                                        textTransform: 'uppercase',
                                    },
                                },
                            ],
                        };

                        return (
                            <div key={index} className='my-8 '>
                                {rates.length === 0 ? (
                                    <p className='text-orange'>No rates found for this KPI!</p>
                                ) : (
                                    <motion.div className='w-3/4 m-auto '
                                        initial={{ opacity: 0, y: 100 }} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }} transition={{ duration: 0.5 }}
                                    >
                                        <Bar

                                            className='my-10 rounded-md uppercase text-orange bg-light'
                                            data={data}
                                        />
                                    </motion.div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

        </motion.div>
    )
}
export default Charts