import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux'

export default function ProtectedRoute({ component: Component, ...rest }){
    const userData = useSelector(store=>store.Auth);

    return (
        <Route {...rest} render={props => {
            if (userData.item.IsAuthenticated) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                    );
                }
            }}
        />
    )
}