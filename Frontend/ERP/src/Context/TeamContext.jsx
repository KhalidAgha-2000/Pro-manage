import React, { createContext, useState } from 'react';

export const TeamContext = createContext();

export const TeamtProvider = ({ children }) => {
    const [idToEdit, setIdToEdit] = useState('')
    const [isOpenToEdit, setIsOpenToEdit] = useState(false)
    const [isOpenToAdd, setIsOpenToAdd] = useState(false)

    const [openFormToEdit, setOpenFormToEdit] = useState({ id: '', formName: '', teamName: '', opened: false, hasEmployees: false, hasProjects: false })
    const { id, formName, opened, teamName, hasEmployees, hasProjects } = openFormToEdit;

    return (
        <TeamContext.Provider
            value={{
                idToEdit, setIdToEdit,
                isOpenToEdit, setIsOpenToEdit,
                isOpenToAdd, setIsOpenToAdd,
                id, formName, opened, teamName, hasEmployees, hasProjects,
                setOpenFormToEdit, openFormToEdit
            }}
        >
            {children}
        </TeamContext.Provider>
    );
};
