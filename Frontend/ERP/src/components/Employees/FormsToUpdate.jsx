import { MdAdminPanelSettings } from "react-icons/md"
import Inputs from "../Shared/Inputs"
import { Buttons } from "../Shared/Buttons"
import { useEffect } from "react"

// Employee Image
export const Image = ({ image, employeeData, changeImage, handleImageUpload }) => {
    return (
        <div className='flex flex-col items-center'>
            {employeeData.image &&
                <img src={employeeData.image} alt={employeeData.first_name}
                    className="w-48 h-48 mb-3 object-cover object-center border-orange shadow-lg shadow-light rounded-full"
                /> || <MdAdminPanelSettings className='text-orange w-24 h-24 ' />
            }
            <form
                onSubmit={changeImage}
                className=' flex flex-col justify-between items-center gap-y-10 my-10 pb-5'>
                <Inputs
                    onChange={handleImageUpload}
                    name="image"
                    defaultValue={employeeData.image}
                    placeholder='image'
                    type='file'
                    className={'pt-3 px-1 w-full'} />
                <Buttons disabled={image === ''} done text={'upload'} className={'w-10/12'} />

            </form>
        </div>
    )
}

// Employee Profile
export const Profile = ({ updateEmployeeInformation, employeeData, setFirst_name, setLast_name, setEmail, setPhone }) => {

    return (
        <form onSubmit={updateEmployeeInformation} className=' w-full  flex flex-col items-center gap-y-6 '        >
            <Inputs
                type={'text'} placeholder='first_name' name={'first_name'} className={'w-5/6'}
                defaultValue={employeeData.first_name}
                onChange={(e) => { setFirst_name(e.target.value) }}
            />
            <Inputs
                type={'text'} placeholder='last_name' name={'last_name'} className={'w-5/6'}
                defaultValue={employeeData.last_name}
                onChange={(e) => { setLast_name(e.target.value) }}

            />
            <Inputs
                type={'email'} placeholder='email' name={'email'} className={'w-5/6'}
                defaultValue={employeeData.email}
                onChange={(e) => { setEmail(e.target.value) }}

            />
            <Inputs
                type={'number'} placeholder='Phone, Enter (8)digits' name={'phone'} className={'w-5/6'}
                defaultValue={employeeData.phone}
                onChange={(e) => { setPhone(e.target.value.trim()) }}
            />
            <Buttons done text={'done'} className={'w-3/6 mb-'} />
        </form>

    )
}

// Employee Team
export const Team = ({ assignTeamToemployee, handleChangeTeam, employeeData, teamsData }) => {
    return (
        <form onSubmit={assignTeamToemployee} className='w-full h-full flex flex-col justify-start items-center gap-16 mt-32 '>
            <select name="team" onChange={handleChangeTeam}
                className='h-14 rounded-md w-5/6 p-1 bg-light outline-none border-4 border-sidebar font-montserrat font-semibold text-dark placeholder:text-dark placeholder:opacity-60 focus:shadow-lg focus:shadow-orange'>
                <option selected>{employeeData.teamName && employeeData.teamName || "No Team"}</option>
                {teamsData.map(team => (
                    <option className='text-orange hover:bg-dark hover:text-light'
                        value={team._id}>{team.name}
                    </option>
                ))}
            </select>
            <Buttons className={'w-4/6'} done text={'done'} />
        </form>)
}

// Employee KPIs
export const KPI = ({ employeeData, kpiData, updateEmployeeKPIs, handleChangeKPIName, handleChangeKPIRate }) => {
    useEffect(() => {

    }, [employeeData.kpis])

    return (
        <div className='w-full h-full -mt-4 p-1'>
            {/* Header */}
            <header className='h-fit w-5/6 m-auto p-2 flex gap-2 bg-sidebar rounded-md'>
                <span className='w-1/2 rounded-lg bg-light h-fit p-2 text-center font-alkatra text-xl'>KPI</span>
                <span className='w-1/2 rounded-lg bg-light h-fit p-2 text-center font-alkatra text-xl'>RATE</span>
            </header>

            {/* Inputs */}
            <div className='h-full w-5/6  m-auto p-1 '>
                <div className='w-full h-3/5 rounded-md bg-sidebar relative overflow-auto '>
                    {/* h-1/2 */}
                    <div className=' w-full'>
                        {
                            employeeData.kpis && employeeData.kpis.length > 0 ? (
                                employeeData.kpis.map((k) => (
                                    <div className='w-full flex gap-2 p-2' key={k.id}>

                                        <span
                                            className='w-1/2 py-2 flex items-center justify-center bg-light text-center rounded-md text-orange font-bold uppercase font-alkatra' >
                                            {k.name}
                                        </span>

                                        <select
                                            className='w-1/2 text-center m-auto  rounded-md p-2 bg-light focus:outline-orange outline-orange font-alkatra text-lg text-orange'
                                            // name="" id=""
                                            defaultValue={k.rate}
                                        // onChange={(e) => { updateEmployeeKPIs(e, employeeData.id, k.id) }}
                                        >
                                            <option value="">{k.rate}</option>
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rate) => (
                                                <option key={rate} value={rate}>
                                                    {rate}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ))
                            ) : (
                                <p>No KPIs found for this employee</p>
                            )
                        }


                    </div>
                </div>
                {/* ADD */}
                <form onSubmit={updateEmployeeKPIs} className=' w-full h-fit mt-1 m-auto p-2 flex items-center gap-2 bg-sidebar rounded-md'>

                    <select
                        className='w-1/3 text-center h-10 m-auto  rounded-md p-2 bg-light focus:outline-orange outline-orange font-alkatra text-lg text-orange'
                        // name="" id=""
                        onChange={handleChangeKPIName}

                    >
                        <option value="">Chooose</option>
                        {kpiData.map((k) => (
                            <option key={k.id} value={k.id}>
                                {k.name}
                            </option>
                        ))}

                    </select>
                    <select
                        className='w-1/3 h-10 text-center m-auto  rounded-md p-2 bg-light focus:outline-orange outline-orange font-alkatra text-lg text-orange'
                        // name="" id=""
                        onChange={handleChangeKPIRate}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rate) => (
                            <option key={rate} value={rate}>
                                {rate}
                            </option>
                        ))}
                    </select>
                    <Buttons className={'w-1/3'} done text={'done'} />

                </form>
            </div>

        </div >

    )
}
