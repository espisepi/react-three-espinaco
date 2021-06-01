import React, { useState, useCallback, useEffect } from 'react';
import Apps from './components/Apps';
import SelectApp from './components/SelectApp';

import './style.css';

const numberTotalApps = 50;
const initialApp = 23;

export default function App50() {

    const [index, setIndex] = useState(initialApp); // index -> Range between [0,numberTotalApps] aka [0, 49]
    const nextIndex = useCallback( () => {
        if( index === numberTotalApps ) {
            setIndex(0);
        } else {
            setIndex( Math.abs(index + 1) % numberTotalApps);
        }
    }, [index] )
    const backIndex = useCallback( () => {
        if( index === 0) {
            setIndex(numberTotalApps - 1);
        }
        else {
            setIndex( Math.abs(index - 1) % numberTotalApps);
        }
    }, [index] )

    const [urlGithub, setUrlGithub] = useState();
    useEffect(()=>{
        if(parseInt(index) === 0 || parseInt(index) === 1 ) {
            setUrlGithub(`https://github.com/espisepi/react-three-espinaco/blob/master/src/scenes/App${index}.js`)
        } else {
            setUrlGithub(`https://github.com/espisepi/react-three-espinaco/blob/master/src/scenes/App${index}/App${index}.js`)
        }
    },[index])

    return (
        <>
        <Apps index={index} />
        <div style={{zIndex:20000, position:'fixed', top:0, right:0 }}><a href={urlGithub} target="_blank" style={{textDecoration:'none', color:'red'}}>{urlGithub}</a></div>
        <div onClick={backIndex} style={{ transform:'scaleX(-1)', backgroundImage:'url("assets/img/icon/directional_arrow.png")', backgroundSize:'cover', position:'fixed', WebkitFilter:'invert(100%)', width:'50px', height:'50px', bottom: '50%', left: 0, color: '#e60005', zIndex: 2000, cursor: 'pointer', opacity:0.6 }}></div>
        <div onClick={nextIndex} style={{ backgroundImage:'url("assets/img/icon/directional_arrow.png")', backgroundSize:'cover', position:'fixed', WebkitFilter:'invert(100%)', width:'50px', height:'50px', bottom: '50%', right: 0, color: '#e60005', zIndex: 2000, cursor: 'pointer', opacity:0.6 }}></div>
        <SelectApp index={index} setIndex={setIndex} />
        </>
    )
}