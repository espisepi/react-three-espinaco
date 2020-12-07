import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';

import { Canvas } from 'react-three-fiber';
import Stars from '../drei-espinaco/Stars';

export default function Home() {
    return (
        <>
        <div style={{display:'flex', flexFlow:'row nowrap', alignItems:'center', justifyContent:'center', position:'relative', top:'50vh', zIndex:'10' }}>        
                <Link to="/app6" className="card2 gatacattana"></Link>
                <Link to="/app14" className="card2 elane"></Link>
                <Link to="/app1" className="card2 shake070"></Link>
        </div>
        <Canvas style={{position: 'absolute', top:'0', margin:'0', backgroundColor:'black'}}>
            <Stars />
        </Canvas>
        </>
    );
}