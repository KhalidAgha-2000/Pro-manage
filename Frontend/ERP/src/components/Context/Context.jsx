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

    const [adminData, setAdminData] = useState('')
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

    return (
        <Context.Provider
            value={{
                notifications, setNotifications,
                notificationBar, pass, notificationBarMessage,
                adminData, setAdminData,
                loading, setLoading,
                search, setSearch,
            }}
        >
            {children}
        </Context.Provider>
    )
}