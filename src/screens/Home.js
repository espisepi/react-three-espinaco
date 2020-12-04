import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
    return (
        <div style={{display:'flex', flexFlow:'row nowrap'}}>
            <div style={{width:'200px', height:'200px'}}>
                <Link to="/app6">Gatacattana</Link>
            </div>
            <div style={{width:'200px', height:'200px'}}>
                <Link to="/app14">Elane</Link>
            </div>
            <div style={{width:'200px', height:'200px'}}>
                <Link to="/app1">070Shake</Link>
            </div>
        </div>
    );
}