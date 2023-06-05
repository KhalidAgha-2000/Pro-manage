import { motion } from "framer-motion"
import Inputs from "../Shared/Inputs"
import { Buttons } from "../Shared/Buttons"

{/* Email / Username */ }
export const Info = ({ updateAdminInformation, adminData, setAdminUsername, setAdminEmail }) => {
    return (
        <motion.form initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}
            onSubmit={updateAdminInformation} className='w-full m-auto h-full flex flex-col items-center gap-y-10 mt-10'>
            <Inputs className={'w-10/12'} type={'text'} placeholder='username'
                defaultValue={adminData.username} onChange={(e) => setAdminUsername(e.target.value)} />
            <Inputs className={'w-10/12'} type={'email'} placeholder='email'
                defaultValue={adminData.email} onChange={(e) => setAdminEmail(e.target.value)} />
            <Buttons done text={"Update"} className={'w-10/12'} />
        </motion.form>
    )
}

{/* Password */ }
export const Password = ({ changePassword, setAdminOldPassword, setAdminNewPassword }) => {
    return (
        <motion.form initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}
            onSubmit={changePassword} className='w-full m-auto h-full flex flex-col items-center gap-y-10 mt-10'>
            <Inputs className={'w-10/12'} type={'password'} placeholder='Old Password'
                onChange={(e) => setAdminOldPassword(e.target.value)} />
            <Inputs className={'w-10/12'} type={'password'} placeholder='New Password'
                onChange={(e) => setAdminNewPassword(e.target.value)} />
            <Buttons done text={"Update"} className={'w-10/12'} />
        </motion.form>
    )
}

{/* Image */ }
export const Image = ({ adminData, changeImage, handleImageUpload, image }) => {
    return (
        <motion.form initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}
            onSubmit={changeImage} className='w-full m-auto h-full flex flex-col items-center gap-y-10 mt-7'>
            {adminData.image && <img src={adminData.image} alt="admin-image"
                className="w-24 h-24  object-cover object-center border-orange shadow-lg shadow-light rounded-full"
            /> || <MdAdminPanelSettings className='text-orange w-24 h-24 ' />}
            <Inputs onChange={handleImageUpload} defaultValue={image} className={'w-10/12 pt-3 px-1 '} name="image" placeholder='image' type='file' />
            <Buttons done text={"Upload"} className={'w-10/12 '} />
        </motion.form>
    )
}
