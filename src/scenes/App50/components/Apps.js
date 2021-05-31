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
    } else if ( index === 6 ) {
        return <App.App6 />
    } else if ( index === 7 ) {
        return <App.App7 />
    } else if ( index === 8 ) {
        return <h1>This App was removed</h1>
    } else if ( index === 9 ) {
        return <App.App9 />
    } else if ( index === 10 ) {
        return <App.App10 />
    } else if ( index === 11 ) {
        return <App.App11 />
    } else if ( index === 12 ) {
        return <App.App12 />
    } else if ( index === 13 ) {
        return <App.App13 />
    } else if ( index === 14 ) {
        return <App.App14 />
    } else if ( index === 15 ) {
        return <App.App15 />
    } else if ( index === 16 ) {
        return <App.App16 />
    } else if ( index === 17 ) {
        return <App.App17 />
    } else if ( index === 18 ) {
        return <App.App18 />
    } else if ( index === 19 ) {
        return <App.App19 />
    } else if ( index === 20 ) {
        return <App.App20 />
    } else if ( index === 21 ) {
        return <App.App21 />
    } else if ( index === 22 ) {
        return <App.App22 />
    } else if ( index === 23 ) {
        return <App.App23 />
    } else if ( index === 24 ) {
        return <App.App24 />
    } else if ( index === 25 ) {
        return <App.App25 />
    } else if ( index === 26 ) {
        return <App.App26 />
    } else if ( index === 27 ) {
        return <App.App27 />
    } else if ( index === 28 ) {
        return <h1>This App was removed</h1>
    } else if ( index === 29 ) {
        return <App.App29 />
    } else if ( index === 30 ) {
        return <App.App30 />
    } else if ( index === 31 ) {
        return <App.App31 />
    } else if ( index === 32 ) {
        return <App.App32 />
    } else if ( index === 33 ) {
        return <App.App33 />
    } else if ( index === 34 ) {
        return <App.App34 />
    } else if ( index === 35 ) {
        return <App.App35 />
    } else if ( index === 36 ) {
        return <App.App36 />
    } else if ( index === 37 ) {
        return <App.App37 />
    } else if ( index === 38 ) {
        return <App.App38 />
    } else if ( index === 39 ) {
        return <App.App39 />
    } else if ( index === 40 ) {
        return <App.App40 />
    } else if ( index === 41 ) {
        return <App.App41 />
    } else if ( index === 42 ) {
        return <App.App42 />
    } else if ( index === 43 ) {
        return <App.App43 />
    } else if ( index === 44 ) {
        return <App.App44 />
    } else if ( index === 45 ) {
        return <App.App45 />
    } else if ( index === 46 ) {
        return <App.App46 />
    } else if ( index === 47 ) {
        return <App.App47 />
    } else if ( index === 48 ) {
        return <App.App48 />
    } else if ( index === 49 ) {
        return (
            <>
            <div style={{position:'fixed', top:0, zIndex:10000, backgroundColor: 'red', opacity:0.5}}>
                <h1 style={{zIndex:2000}}>Links To App only works in joseangel.art/app49 or joseangel.art</h1>
            </div>
            <App.App49 />
            </>
        )
    }
    else {
        console.log('index not match with any App')
        return <h1>Sorry, App Not Found</h1>;
    }
}