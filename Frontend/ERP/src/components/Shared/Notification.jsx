import React, { useContext } from 'react'
import { Context } from '../Context/Context'

const Notification = () => {
    const { notificationBar, setNotificationBar, notificationBarMessage, setNotificationBarMessage, pass, setPass } = useContext(Context)

    return (
        <>
            {notificationBar ?
                <div
                    className={`${pass ? 'bg-[#4bb543]' : 'bg-[#ff3333]'}  overflow-hidden w-full absolute z-[9999] h-10 py-2 px-4 text-light font-bold`}
                >{notificationBarMessage}
                </div> : null
            }
        </>
    )
}

export default Notification