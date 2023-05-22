import React, { createContext, useState } from 'react';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const [idToEdit, setIdToEdit] = useState('')
    const [isOpenToEdit, setIsOpenToEdit] = useState(false)
    const [isOpenToAdd, setIsOpenToAdd] = useState(false)

    const [openFormToEdit, setOpenFormToEdit] = useState({ id: '', formName: '', opened: false })
    const { id, formName, opened } = openFormToEdit;


    return (
        <EmployeeContext.Provider
            value={{
                idToEdit, setIdToEdit,
                isOpenToEdit, setIsOpenToEdit,
                isOpenToAdd, setIsOpenToAdd,
                id, formName, opened, setOpenFormToEdit, openFormToEdit
            }}
        >
            {children}
        </EmployeeContext.Provider>
    );
};
