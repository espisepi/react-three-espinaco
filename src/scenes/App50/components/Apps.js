import React from 'react';
import * as App from '../../../App';

/* index: number */
export default function Apps({ index = 0 }){
    if ( index === 0 ) {
        return <App.App0 />
    } else if ( index === 1 ) {
        return <App.App1 />
    } else if ( index === 2 ) {
        return <App.App2 />
    } else if ( index === 3 ) {
        return <h1>This App was removed</h1>
    } else if ( index === 4 ) {
        return <App.App4 />
    } else if ( index === 5 ) {
        return <App.App5 />
    }
    else {
        console.log('index not match with any App')
        return <h1>Sorry, App Not Found</h1>;
    }
}