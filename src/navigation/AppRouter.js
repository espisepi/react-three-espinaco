import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';

import Home from '../screens/Home';
import Dev from '../screens/Dev';

// import { App0, App1, App2, App3, App4, App5, App6, App7 } from '../App';
import * as App from '../App';

export default function AppRouter () {
    return (
        <Router>
            {/* <div> */}
                <Switch>
                    <PublicRoute
                        exact
                        path="/"
                        component={Home}
                    />

                    <PublicRoute
                        exact
                        path="/dev"
                        component={Dev}
                    />

                    <PublicRoute
                        exact
                        path="/app0"
                        component={App.App0}
                    />
                    <PublicRoute
                        exact
                        path="/app1"
                        component={App.App1}
                    />
                    <PublicRoute
                        exact
                        path="/app2"
                        component={App.App2}
                    />
                    <PublicRoute
                        exact
                        path="/app3"
                        component={App.App3}
                    />
                    <PublicRoute
                        exact
                        path="/app4"
                        component={App.App4}
                    />
                    <PublicRoute
                        exact
                        path="/app5"
                        component={App.App5}
                    />
                    <PublicRoute
                        exact
                        path="/app6"
                        component={App.App6}
                    />
                    <PublicRoute
                        exact
                        path="/app7"
                        component={App.App7}
                    />
                    <PublicRoute
                        exact
                        path="/app8"
                        component={App.App8}
                    />
                    <PublicRoute
                        exact
                        path="/app9"
                        component={App.App9}
                    />
                    <PublicRoute
                        exact
                        path="/app10"
                        component={App.App10}
                    />
                    <PublicRoute
                        exact
                        path="/app11"
                        component={App.App11}
                    />
                    <PublicRoute
                        exact
                        path="/app12"
                        component={App.App12}
                    />
                    <PublicRoute
                        exact
                        path="/app13"
                        component={App.App13}
                    />
                    <PublicRoute
                        exact
                        path="/app14"
                        component={App.App14}
                    />
                    <PublicRoute
                        exact
                        path="/app15"
                        component={App.App15}
                    />
                    <PublicRoute
                        exact
                        path="/app16"
                        component={App.App16}
                    />
                    <PublicRoute
                        exact
                        path="/app17"
                        component={App.App17}
                    />
                    <PublicRoute
                        exact
                        path="/app18"
                        component={App.App18}
                    />
                    <PublicRoute
                        exact
                        path="/app19"
                        component={App.App19}
                    />
                    <PublicRoute
                        exact
                        path="/dirty"
                        component={App.AppDirty}
                    />
                </Switch>
            {/* </div> */}
        </Router>
    );
}