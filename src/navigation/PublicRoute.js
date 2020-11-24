import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';


export const PublicRoute = ({
    component: Component,
    ...rest
}) => {

    return (
        <Route { ...rest }
            component={ (props) => ( <Component { ...props } /> ) }
        />
    )
}

PublicRoute.propTypes = {
    component: PropTypes.func.isRequired
}
