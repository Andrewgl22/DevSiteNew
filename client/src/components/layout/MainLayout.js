import React, {useContext} from 'react';
import Header from '../Header';
import {Container,Row,Col} from 'react-bootstrap';
import {IconContext} from '../IconProvider';


const MainLayout = ({children}) => {
    const {msgUpdate} = useContext(IconContext);
    const [msgToggle] = msgUpdate;

    return(
        <div className="h-100">
            <Header msgToggle={msgToggle} />
            {children}
        </div>
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