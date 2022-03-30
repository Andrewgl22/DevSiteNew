import React from 'react';
import Header from '../Header';

const MainLayout = ({children}) => {
    return(
        <>
            <Header />
            {children}
        </>
    )
}

const LogRegLayout = ({children}) => {
    return(
        <>
            <main>{children}</main>
        </>
    )
}

export {MainLayout,LogRegLayout};