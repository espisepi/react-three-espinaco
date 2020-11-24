import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
    return (
        <div style={{display:'flex', flexFlow:'row nowrap'}}>
            <div style={{width:'200px', height:'200px'}}>
                <Link to="/app0">app0</Link>
            </div>
            <div style={{width:'200px', height:'200px'}}>
                <Link to="/app1">app1</Link>
            </div>
            <div style={{width:'200px', height:'200px'}}>
                <Link to="/app2">app2</Link>
            </div>
            <div style={{width:'200px', height:'200px'}}>
                <Link to="/app3">app3</Link>
            </div>
            <div style={{width:'200px', height:'200px'}}>
                <Link to="/app4">app4</Link>
            </div>
            <div style={{width:'200px', height:'200px'}}>
                <Link to="/app5">app5</Link>
            </div>
            <div style={{width:'200px', height:'200px'}}>
                <Link to="/app6">app6</Link>
            </div>
            <div style={{width:'200px', height:'200px'}}>
                <Link to="/app7">app7</Link>
            </div>
            <div style={{width:'200px', height:'200px'}}>
                <Link to="/app8">app8</Link>
            </div>
            <div style={{width:'200px', height:'200px'}}>
                <Link to="/app9">app9</Link>
            </div>
            <div style={{width:'200px', height:'200px'}}>
                <Link to="/app10">app10</Link>
            </div>
            <div style={{width:'200px', height:'200px'}}>
                <Link to="/app11">app11</Link>
            </div>
            <div style={{width:'200px', height:'200px'}}>
                <Link to="/dirty">dirty</Link>
            </div>
        </div>
    );
}