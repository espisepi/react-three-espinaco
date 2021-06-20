import React, { useEffect, useState } from 'react'


// I don't use jsx to write div panel because i want to use this component with children as HTMLElement and as ReactThreeFiberElement
// parentId: String  =>  id from HTMLElement where div clickToStartPanel is added as children
// children: HTMLElements or ReactThreeFiber Elements
export default function ClickToStartPanel({parentId='root', title='Click On Screen To Start', children}) {

    const [click, setClick] = useState(false)
    
    useEffect(()=>{
        const divPanel = document.createElement('div');
        divPanel.style.position = 'absolute';
        divPanel.style.top = 0;
        divPanel.style.zIndex = '99999';
        divPanel.style.width = '100%';
        divPanel.style.height = '100vh';
        divPanel.style.backgroundColor = '#101010';
        divPanel.addEventListener('click', (e) => {
            setClick(true)
            divPanel.style.zIndex = '-9999';
            divPanel.style.display = 'none'
        })
        document.getElementById(parentId).appendChild(divPanel);

        divPanel.style.display = 'flex';
        divPanel.style.alignItems = 'center';
        divPanel.style.justifyContent = 'center';
        divPanel.style.color = 'white';
        const textPanel = document.createElement('h1');
        textPanel.innerHTML = title
        divPanel.appendChild(textPanel)
    },[parentId, title])
    
    return click ? children : null;    
}