import React, { useCallback } from 'react';

const links = [
    {
        link:'assets/musica/stayHigh.mp4',
        img:'assets/obj/minerales/3.jpg'
    },
    {
        link:'assets/musica/gotham.mp4',
        img:'assets/obj/minerales/3.jpg'
    },
    {
        link:'assets/musica/elane-low.mp4',
        img:'assets/obj/minerales/3.jpg'
    },
    {
        name:'Nah Eeto - What About Me?',
        link:'https://www.youtube.com/watch?v=yY4_df3LhmQ&list=RDEMcaomExPumLPGKg4giAxElQ&start_radio=1',
        img:'assets/obj/minerales/3.jpg'
    },
    {
        name:`Renni Rucci "Freestyle" (Lil Baby Remix)`,
        link:'https://www.youtube.com/watch?v=BgcFGo7X3_M&list=PLbF25hg0V3wBCMH8pvbGOUw5fxp0pbrLA&index=71',
        img:'assets/obj/minerales/3.jpg'
    },
    {
        name:`Moha La Squale - Bienvenue a la Banane`,
        link:'https://www.youtube.com/watch?v=96h97kNEgXM',
        img:'assets/obj/minerales/3.jpg'
    },
    {
        name:'HIGHKILI - IMTHEMAN RMX',
        link:'https://www.youtube.com/watch?v=1EUwuhI2BZs',
        img:'assets/obj/minerales/3.jpg'
    }
];

export default function PanelItems({handleSubmit}) {

    const onClick = useCallback((link)=>{
        if(link){    
            handleSubmit(link);
        }
    },[])

    return (
      <>
      <div style={{position:'absolute', width:'100%', height:'100vh', backgroundColor:'#333333', opacity:'0.5', zIndex:20 }}></div>
      <div style={{top:'30px', position:'absolute', display:'flex', flexDirection:'row', flexWrap:'wrap', zIndex: 25}}>
          { links.map((l,i) => (
              <div key={i} style={{width:'100px', height:'100px', margin:'10px', backgroundImage:`url("/${l.img}")`, backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center', borderRadius:'20px', cursor:'pointer' }}
                           className='panel-items-children'
                           onClick={(e)=>onClick(l.link)}></div>
          ))}
      </div>
      </>
    )
  }