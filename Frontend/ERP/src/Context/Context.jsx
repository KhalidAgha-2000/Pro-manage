import React, { createContext, useState } from 'react'
export const Context = createContext()

export const ContextBody = ({ children }) => {

    const [adminData, setAdminData] = useState('')
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

    return (
        <Context.Provider
            value={{
                adminData, setAdminData,
                loading, setLoading,
                search, setSearch,
            }}
        >
            {children}
        </Context.Provider>
    )
}