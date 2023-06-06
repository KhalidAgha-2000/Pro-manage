import { MdAdminPanelSettings } from "react-icons/md"
import Inputs from "../Shared/Inputs"
import { Buttons } from "../Shared/Buttons"
import { useEffect } from "react"
import { motion } from "framer-motion";

// Employee Image
export const Image = ({ image, employeeData, changeImage, handleImageUpload }) => {
    return (
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}
            className='w-full py-4 flex flex-col items-center'>
            {employeeData.image &&
                <img src={employeeData.image} alt={employeeData.first_name}
                    className="mt-2 w-36 h-36 mb-3 object-cover object-center border-orange shadow-lg shadow-light rounded-full"
                /> || <MdAdminPanelSettings className='text-orange w-24 h-24 ' />
            }
            <form onSubmit={changeImage} className='flex flex-col items-center gap-y-4 mt-10'>
                <Inputs onChange={handleImageUpload} name="image" placeholder='image'
                    type='file' className={'pt-3 px-1 w-full'} />
                <Buttons disabled={image === ''} done text={'upload'} className={'w-full'} />
            </form>
        </motion.div>
    )
}

// Employee Profile
export const Profile = ({ updateEmployeeInformation, employeeData, setFirst_name, setLast_name, setEmail, setPhone }) => {
    return (
        <motion.form initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}
            onSubmit={updateEmployeeInformation} className=' w-full flex flex-col items-center gap-y-3 mt-2 '>
            <Inputs type={'text'} placeholder='first_name' name={'first_name'} className={'w-5/6'} defaultValue={employeeData.first_name}
                onChange={(e) => { setFirst_name(e.target.value) }} />

            <Inputs type={'text'} placeholder='last_name' name={'last_name'} className={'w-5/6'} defaultValue={employeeData.last_name}
                onChange={(e) => { setLast_name(e.target.value) }}
            />

            <Inputs type={'email'} placeholder='email' name={'email'} className={'w-5/6'} defaultValue={employeeData.email}
                onChange={(e) => { setEmail(e.target.value) }} />

            <Inputs type={'number'} placeholder='Phone, Enter (8)digits' name={'phone'} className={'w-5/6'} defaultValue={employeeData.phone}
                onChange={(e) => { setPhone(e.target.value.trim()) }} />

            <Buttons done text={'update'} className={'w-10/12 '} />
        </motion.form>

    )
}

// Employee Team
export const Team = ({ assignTeamToemployee, handleChangeTeam, employeeData, selectedTeam, teamsData }) => {
    return (
        <motion.form initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}
            onSubmit={assignTeamToemployee} className='w-full h-full flex flex-col items-center my-8 gap-y-14  '>

            <h1 className="w-10/12 rounded-lg bg-sidebar h-fit p-2 text-center font-alkatra text-xl">
                {employeeData.teamName ? `Assigned To ${employeeData.teamName}` : "No Team"}
            </h1>
            <select name="team" onChange={handleChangeTeam}
                className='h-14 rounded-md w-10/12 p-1 bg-light outline-none border-4 border-sidebar font-montserrat font-semibold text-dark placeholder:text-dark placeholder:opacity-60 focus:shadow-lg focus:shadow-orange'>
                <option >choose a team</option>
                {teamsData.map(team => (
                    <option className='text-orange hover:bg-dark hover:text-light'
                        value={team._id} key={team._id} >{team.name}
                    </option>
                ))}
            </select>
            <Buttons className={'w-10/12'} disabled={selectedTeam === '' && true} done text={'assign'} />
        </motion.form>)
}

// Employee KPIs
export const KPI = ({ kpisOfEmployee, employeeKPIS, kpiData, updateEmployeeKPIs, handleChangeKPIName, handleChangeKPIRate }) => {
    useEffect(() => {
        kpisOfEmployee()
    }, [])

    return (
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}
            className='w-full h-full p-1'>
            {/* Header */}
            <header className='h-fit w-10/12 m-auto p-2 flex gap-2 bg-sidebar rounded-md'>
                <span className='w-1/2 rounded-lg bg-light h-fit p-2 text-center font-alkatra text-xl'>KPI</span>
                <span className='w-1/2 rounded-lg bg-light h-fit p-2 text-center font-alkatra text-xl'>RATE</span>
            </header>

            {/* Values */}
            <div className='h-full w-10/12 m-auto py-1 '>
                <div className='w-full h-1/2 rounded-md border-y-2 border-light bg-sidebar relative overflow-auto '>
                    <div className=' w-full'>
                        {employeeKPIS && employeeKPIS.length > 0 ? (employeeKPIS.map((k) => (
                            <div className='w-full flex gap-2 p-2' key={Math.random() * 100 - 50}>
                                <span className='w-1/2 py-2 flex items-center justify-center bg-light text-center rounded-md text-orange font-bold uppercase font-alkatra' >
                                    {k.name}
                                </span>
                                <span className='w-1/2 text-center m-auto  rounded-md p-2 bg-light focus:outline-orange outline-orange font-alkatra text-lg text-orange'>
                                    {k.rate}
                                </span>
                            </div>
                        ))) : (<p className='w-fit h-fit m-auto p-3 my-8 rounded-md bg-orange text-lg font-alkatra text-light'
                        >No KPIs found for this employee, Add !
                        </p>
                        )}
                    </div>
                </div>

                {/* ADD */}
                <form onSubmit={updateEmployeeKPIs} className='w-full h-fit mt-1 m-auto p-1 flex items-center gap-2 bg-sidebar rounded-md'>

                    <select className='w-1/3 text-center h-10 m-auto  rounded-md p-2 bg-light focus:outline-orange outline-orange font-alkatra text-lg text-orange'
                        onChange={handleChangeKPIName}><option value="640392f74b670907f1bea1d6">agile</option>
                        {kpiData.map((k) => (<option key={k._id} value={k.id}>{k.name}</option>))}
                    </select>

                    <select className='w-1/3 h-10 text-center m-auto  rounded-md p-2 bg-light focus:outline-orange outline-orange font-alkatra text-lg text-orange'
                        onChange={handleChangeKPIRate}>{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rate) => (
                            <option key={Math.random() * 100 - 50} value={rate}>{rate}</option>
                        ))}
                    </select>

                    <Buttons className={'w-1/3'} done text={'done'} />
                </form>
            </div>
        </motion.div>
    )
}
