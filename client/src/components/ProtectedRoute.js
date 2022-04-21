import React from "react";
import { Redirect, Route } from "react-router-dom";
import {MainLayout} from './layout/MainLayout';

function ProtectedRoute({ component: Component, ...restOfProps }) {
    // const user = localStorage.getItem("loggedUser");
    // const isAuthenticated = user.type
    const isAuthenticated = localStorage.getItem("loggedUser");
    // console.log("this", isAuthenticated);

    return (
    <Route
        {...restOfProps}
        render={(props) =>
            isAuthenticated ? <MainLayout><Component {...props} /></MainLayout> : <Redirect to="/register" />
        }
        />
    );
}

function RouteWrapper({
    component: Component, 
    layout: Layout, 
    ...rest
    }) {
    return (
        <Route {...rest} render={(props) =>
            <Layout {...props}>
                <Component {...props} />
            </Layout>
        } />
    );
    }

export default ProtectedRoute;