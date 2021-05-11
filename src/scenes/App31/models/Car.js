import React, { useRef, useState, useEffect } from "react"
import { useThree } from "react-three-fiber"
import { useGLTF } from "drei"
import { useProxy } from "valtio"
import { state } from '../App31';

export default function Car() {
    const { nodes, materials } = useGLTF("assets/obj/gltf/scene.gltf");
    const [hovered, set] = useState(null)
    const snap = useProxy(state)
  
    const { scene } = useThree();
    const group = useRef(null);
    useEffect(()=>{
      const sceneCopy = nodes.root.clone(true);
      if(  group.current ) {
      
        sceneCopy.rotation.set(-Math.PI/2,0,0);
      
        const filterNames = ["Circle001_49"];
        filterNames.forEach( name => {
          const object = sceneCopy.children[0].getObjectByName(name);
          if(object){
            sceneCopy.children[0].remove(object);
          }
        });
        
        scene.add(sceneCopy);
  
      }
  
      return () => {
        scene.remove(sceneCopy);
      }
  
    },[group.current]);
    
    return (
      <group
        ref={group}
        dispose={null}
        onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
        onPointerOut={(e) => e.intersections.length === 0 && set(null)}
        onPointerMissed={() => (state.current = null)}
        onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
        <mesh geometry={nodes.Circle001_49.children[0].geometry} material={materials.paint} material-color={snap.items.paint} />
      </group>
    );
  }