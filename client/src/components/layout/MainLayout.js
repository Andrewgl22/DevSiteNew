import React from 'react';
import Header from '../Header';

const MainLayout = ({children}) => {
    return(
        <>
            <main>{children}</main>
        </>
    )
}

export default MainLayout;