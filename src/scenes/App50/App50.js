import React, { useState, useCallback } from 'react';
import Apps from './components/Apps';

const numberTotalApps = 6;

export default function App50() {

    const [index, setIndex] = useState(0); // index -> Range between [0,numberTotalApps] aka [0, 49]
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

    console.log(index)

    return (
        <>
        <Apps index={index} />
        <div style={{position:'fixed', top:0, zIndex:10000, backgroundColor: 'red', opacity:0.5}}>
        <h1>Holi</h1>
        <button onClick={backIndex}>Atras</button>
        <button onClick={nextIndex}>Siguiente</button>
        {/* div con icono de flecha para cambiar de escena */}
        {/* No ocupar toda la pantalla, solo el tamaño que tenga el boton */}
        </div>
        </>
    )
}