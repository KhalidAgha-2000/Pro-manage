import React, { createContext, useState } from 'react'
export const Context = createContext()

export const ContextBody = ({ children }) => {


    //-------------- Notification Bar
    const [notificationBar, setNotificationBar] = useState(false)
    const [pass, setPass] = useState(false)
    const [notificationBarMessage, setNotificationBarMessage] = useState('')

    return (
        <Context.Provider
            value={{
                notificationBar, setNotificationBar,
                notificationBarMessage, setNotificationBarMessage,
                pass, setPass
            }}
        >
            {children}
        </Context.Provider>
    )
}