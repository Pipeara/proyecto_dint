import React, { createContext } from 'react';

import useDeveloper from '../hooks/useDeveloper';
const Context = createContext();

export const Provider = ({ children }) => {
    const { getDeveloper, setDeveloper } = useDeveloper();

    return (
        <Context.Provider value={{ developer: getDeveloper, setDeveloper }}>
            {children}
        </Context.Provider>
    );
};

export default Context;
