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
                        component={App.App49}
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
                    {/* <PublicRoute
                        exact
                        path="/app3"
                        component={App.App3}
                    /> */}
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
                        path="/app20"
                        component={App.App20}
                    />
                    <PublicRoute
                        exact
                        path="/app21"
                        component={App.App21}
                    />
                    <PublicRoute
                        exact
                        path="/app22"
                        component={App.App22}
                    />
                    <PublicRoute
                        exact
                        path="/app23"
                        component={App.App23}
                    />
                    <PublicRoute
                        exact
                        path="/app24"
                        component={App.App24}
                    />
                    <PublicRoute
                        exact
                        path="/app25"
                        component={App.App25}
                    />
                    <PublicRoute
                        exact
                        path="/app26"
                        component={App.App26}
                    />
                    <PublicRoute
                        exact
                        path="/app27"
                        component={App.App27}
                    />
                    {/* <PublicRoute
                        exact
                        path="/app28"
                        component={App.App28}
                    /> */}
                    <PublicRoute
                        exact
                        path="/app29"
                        component={App.App29}
                    />
                    <PublicRoute
                        exact
                        path="/app30"
                        component={App.App30}
                    />
                    <PublicRoute
                        exact
                        path="/app31"
                        component={App.App31}
                    />
                    <PublicRoute
                        exact
                        path="/app32"
                        component={App.App32}
                    />
                    <PublicRoute
                        exact
                        path="/app33"
                        component={App.App33}
                    />
                    <PublicRoute
                        exact
                        path="/app34"
                        component={App.App34}
                    />
                    <PublicRoute
                        exact
                        path="/app35"
                        component={App.App35}
                    />
                    <PublicRoute
                        exact
                        path="/app36"
                        component={App.App36}
                    />
                    <PublicRoute
                        exact
                        path="/app37"
                        component={App.App37}
                    />
                    <PublicRoute
                        exact
                        path="/app38"
                        component={App.App38}
                    />
                    <PublicRoute
                        exact
                        path="/app39"
                        component={App.App39}
                    />
                    <PublicRoute
                        exact
                        path="/app40"
                        component={App.App40}
                    />
                    <PublicRoute
                        exact
                        path="/app41"
                        component={App.App41}
                    />
                    <PublicRoute
                        exact
                        path="/app42"
                        component={App.App42}
                    />
                    <PublicRoute
                        exact
                        path="/app43"
                        component={App.App43}
                    />
                    <PublicRoute
                        exact
                        path="/app44"
                        component={App.App44}
                    />
                    <PublicRoute
                        exact
                        path="/app45"
                        component={App.App45}
                    />
                    <PublicRoute
                        exact
                        path="/app46"
                        component={App.App46}
                    />
                    <PublicRoute
                        exact
                        path="/app47"
                        component={App.App47}
                    />
                    <PublicRoute
                        exact
                        path="/app48"
                        component={App.App48}
                    />
                    <PublicRoute
                        exact
                        path="/app49"
                        component={App.App49}
                    />
                    <PublicRoute
                        exact
                        path="/app50"
                        component={App.App50}
                    />
                    <PublicRoute
                        exact
                        path="/app51"
                        component={App.App51}
                    />
                    <PublicRoute
                        exact
                        path="/app52"
                        component={App.App52}
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