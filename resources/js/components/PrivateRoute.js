
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
 
// handle the private routes
export const PrivateRoute =({ component: Component, ...rest }) => (
 
    <Route
      {...rest}
      render={(props) =>( localStorage.getItem('user')?
     <Component {...props} /> 
     : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
       )}
    />
)
 
