import React, { createContext, useState } from 'react'
export const Context = createContext()

export const ContextBody = ({ children }) => {

    const [adminData, setAdminData] = useState('')
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

    const [openFormToAddEdit, setOpenFormToAddEdit] = useState({ idToEdit: '', openedToEdit: false, openedToAdd: false })
    const { idToEdit, openedToEdit, openedToAdd } = openFormToAddEdit;

    return (
        <Context.Provider
            value={{
                adminData, setAdminData,
                loading, setLoading,
                search, setSearch,
                idToEdit, openedToAdd, openedToEdit, setOpenFormToAddEdit, openFormToAddEdit
            }}
        >
            {children}
        </Context.Provider>
    )
}