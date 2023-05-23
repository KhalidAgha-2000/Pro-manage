import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [isOpenToAdd, setIsOpenToAdd] = useState(false);
    const [isOpenToEdit, setIsOpenToEdit] = useState(false);
    const [idToEdit, setIdToEdit] = useState('');

    return (
        <ProjectContext.Provider
            value={{
                isOpenToAdd, setIsOpenToAdd,
                isOpenToEdit, setIsOpenToEdit,
                idToEdit, setIdToEdit,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};
