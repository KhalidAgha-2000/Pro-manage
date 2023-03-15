import React, { useContext } from 'react'
import { Context } from '../Context/Context'

const Notification = () => {
    const { notificationBar, notificationBarMessage, pass } = useContext(Context)

    return (
        <>
            {notificationBar &&
                <div
                    className={`${pass ? 'bg-success' : 'bg-failed'}  overflow-hidden w-full absolute z-[9999] h-10 py-2 px-4 text-light font-bold`}
                >{notificationBarMessage}
                </div>
            }
        </>
    )
}

export default Notification