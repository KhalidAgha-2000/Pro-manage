import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [isOpenToAdd, setIsOpenToAdd] = useState(false);
    const [isOpenToEdit, setIsOpenToEdit] = useState(false);
    const [idToEdit, setIdToEdit] = useState('');

    return (
        <AdminContext.Provider
            value={{
                isOpenToAdd, setIsOpenToAdd,
                isOpenToEdit, setIsOpenToEdit,
                idToEdit, setIdToEdit,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
