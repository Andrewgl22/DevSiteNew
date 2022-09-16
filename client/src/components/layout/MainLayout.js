import React, {useContext} from 'react';
import Header from '../Header';
import {Outlet} from 'react-router-dom'
import {IconContext} from '../IconProvider';


export const MainLayout = () => {
    const {msgUpdate} = useContext(IconContext);
    const [msgToggle] = msgUpdate;

    return(
        <div className="h-100">
            <Header msgToggle={msgToggle} />
            <Outlet />
        </div>
    )
}