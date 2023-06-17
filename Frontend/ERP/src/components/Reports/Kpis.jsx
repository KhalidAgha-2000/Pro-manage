import { motion } from 'framer-motion'
import { useContext, useEffect } from 'react'
import { Context } from '../../Context/Context'

const Kpis = ({ kpisOfEmployee }) => {

    const { setLoading } = useContext(Context)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => { setLoading(false) }, 1000);
    }, [kpisOfEmployee])

    return (
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }} transition={{ duration: 0.5 }}
            className='w-full bg-sidebar relative text-dark  rounded-md px-2  '>

            <header className='sticky top-0 z-10 h-14 p-2  flex gap-x-4 justify-between items-center w-11/12 m-auto bg-sidebar rounded-md'>
                <h2 className='w-1/2 m-auto text-2xl font-alkatra p-2 text-center bg-light rounded-md'>KPI</h2>
                <h2 className='w-1/2 m-auto text-2xl font-alkatra p-2 text-center bg-light rounded-md'>Rate</h2>
            </header>

            <div className='w-full m-auto mt-2 border-t-2 p-2 mb-20 h-[50vh] overflow-auto'>
                {kpisOfEmployee.length == 0 ?
                    <p className='w-fit h-fit m-auto p-3 my-8 rounded-md bg-orange text-lg font-alkatra text-light'
                    >No KPIs found for this employee!</p> :
                    kpisOfEmployee.map((k, index) => (
                        <div key={index} className='h-14 p-2 flex gap-x-4 justify-between items-center w-11/12 m-auto bg-sidebar rounded-md'>
                            <span className='w-1/2 uppercase m-auto text-2xl truncate font-alkatra p-2 text-center bg-light rounded-md'>{k.kpi.name}</span>
                            <span className='w-1/2 m-auto text-2xl font-alkatra p-2 text-center bg-light rounded-md'>{k.rates[0].rate || '0'}</span>
                        </div>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default Kpis