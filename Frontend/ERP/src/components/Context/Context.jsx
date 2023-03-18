import React, { createContext, useState } from 'react'
export const Context = createContext()

export const ContextBody = ({ children }) => {


    //-------------- Notification Bar
    const [notifications, setNotifications] = useState({
        notificationBar: false,
        pass: false,
        notificationBarMessage: ''
    })
    const { notificationBar, pass, notificationBarMessage } = notifications;

    // const [notificationBar, setNotificationBar] = useState(false)
    // const [pass, setPass] = useState(false)
    // const [notificationBarMessage, setNotificationBarMessage] = useState('')
    const [adminData, setAdminData] = useState('')
    const [loading, setLoading] = useState(false)
    return (
        <Context.Provider
            value={{
                // notificationBar, setNotificationBar,
                // notificationBarMessage, setNotificationBarMessage,
                // pass, setPass,
                notifications, setNotifications,
                notificationBar, pass, notificationBarMessage,
                adminData, setAdminData,
                loading, setLoading
            }}
        >
            {children}
        </Context.Provider>
    )
}