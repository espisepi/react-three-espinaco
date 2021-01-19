import * as THREE from "three";
import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo
} from "react";
import { Canvas, useThree, useFrame, useLoader } from "react-three-fiber";
import { useAspect, Html, TorusKnot, Plane, Stars } from "drei";
import { EffectComposer, Bloom, Glitch } from "@react-three/postprocessing";
import { Flex, Box, useReflow } from "react-three-flex";
import { Text } from "./Text";

import { useHistory } from "react-router-dom";

const state = {
  top: 0
};

function Reflower() {
  const reflow = useReflow();
  useFrame(reflow);
  return null;
}

function Title() {
  return (
    <Box
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      <Box margin={0.05}>
        <Text fontSize={0.3} letterSpacing={0.1}>
          WELLCOME
          <meshStandardMaterial />
        </Text>
      </Box>
      <Box margin={0.05}>
        <Text fontSize={0.3} letterSpacing={0.1}>
          TO MY
          <meshStandardMaterial />
        </Text>
      </Box>
      <Box margin={0.05}>
        <Text fontSize={0.3} letterSpacing={0.1}>
          PORTFOLIO
          <meshStandardMaterial />
        </Text>
      </Box>
    </Box>
  );
}

function BackGrid() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2(0, 0.05);
  }, [scene]);
  
  const mesh = useRef();
  useFrame(({clock})=>{
    mesh.current.position.z = 0.5 * (clock.elapsedTime % 5);
  });

  return (
    <Plane
      ref={mesh}
      position={[0, -1, -8]}
      rotation={[Math.PI / 2, 0, 0]}
      args={[80, 80, 128, 128]}
    >
      <meshStandardMaterial color="#ea5455" wireframe side={THREE.DoubleSide} />
    </Plane>
  );
}

function RotatingObj() {
  const ref = useRef();
  useFrame(
    ({ clock }) =>{
      if(ref.current){
        ref.current.rotation.y = clock.getElapsedTime();
      }
    }
  );
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach='geometry' args={[0.7,0.7,0.7]} />
      <meshBasicMaterial attach='material' wireframe={true} />
    </mesh>
  );
}

function Page({ onChangePages }) {
  const group = useRef();
  const { size } = useThree();
  const [vpWidth, vpHeight] = useAspect("cover", size.width, size.height);
  const vec = new THREE.Vector3();
  useFrame(() =>
    group.current.position.lerp(vec.set(0, state.top / 100, 0), 0.1)
  );
  const handleReflow = useCallback(
    (w, h) => {
      onChangePages(h / vpHeight);
      // console.log({ h, vpHeight, pages: h / vpHeight });
    },
    [onChangePages, vpHeight]
  );

  const projects = useMemo(()=>([
    {
      name: 'app32',
      img: '/assets/img/home/mineral.png'
    },
    {
      name: 'app31',
      img: '/assets/img/home/botines.png'
    },
    {
      name: 'app35',
      img: '/assets/img/home/gallery.png'
    },
    {
      name: 'app34',
      img: '/assets/img/home/viewer.png'
    },
    {
      name: 'app6',
      img: '/assets/img/home/gatacattana.png'
    },
    {
      name: 'app14',
      img: '/assets/img/home/elane.png'
    },
    {
      name: 'app1',
      img: '/assets/img/home/070shake.png'
    }
  ]),[]);
  const projectsTextures = useLoader(THREE.TextureLoader, projects.map(p=>p.img));

  const handleClickProject = useCallback((nameApp)=>{
    const path = window.location.href;
    const pathNew = path.replace("app25", nameApp);
    window.location.href = pathNew;
  });
  return (
    <group ref={group}>
      <BackGrid />

      <Flex
        flexDirection="column"
        size={[vpWidth, vpHeight, 0]}
        onReflow={handleReflow}
      >
        {/* <Reflower /> */}

        <Title />

        <group position-z={-0.3}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            width="100%"
            marginTop={0.5}
            marginBottom={0.1}
          >
            <Box margin={0.1} centerAnchor>
              <RotatingObj />
            </Box>
            <Box marginTop={0.3}>
              <Text fontSize={0.3} maxWidth={vpWidth}>
                BUILD BY
                <meshBasicMaterial />
              </Text>
            </Box>
            <Box marginTop={0.1}  >
              <Text fontSize={0.3} maxWidth={vpWidth}>
                JOSE ANGEL
                <meshBasicMaterial />
              </Text>
            </Box>
          </Box>
        </group>

        <Box
          marginTop={0.2}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          // width="70%"
        >
          {projects.map((project, i) => (
            <Box key={'item'+i} margin={0.05} key={i}>
              <mesh position={[0.5, -0.5, 0]}>
                <planeBufferGeometry args={[1, 1]} />
                <meshStandardMaterial
                  map={projectsTextures[i]}
                  
                />
                <Html scaleFactor={1} center>
                  <div style={{width:'200px', height:'200px', cursor:'pointer', borderRadius:'50%', opacity:0.4, backgroundColor:'#edf6f9', backgroundImage:`url("/assets/img/icon/directional_arrow.png")`, backgroundPosition:'center', backgroundSize:'cover'}}
                       onPointerDown={()=>handleClickProject(project.name)}></div>
                </Html>
              </mesh>
            </Box>
          ))}
        </Box>
      </Flex>
    </group>
  );
}

function Cube() {
  const mesh = useRef();
  const quat = new THREE.Quaternion().setFromEuler(new THREE.Euler(1, 1, 0));
  const quat2 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0));
  const euler = new THREE.Euler(0, 0, 0);
  useFrame(() => {
    euler.set(state.top / 1000, state.top / 1000, 0);
    quat.slerp(quat2.setFromEuler(euler), 0.1);
    mesh.current.rotation.setFromQuaternion(quat);
  });
  return (
    <mesh ref={mesh} position={[0, 0, -1.5]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#272730" />
    </mesh>
  );
}

export default function App() {
  const scrollArea = useRef();
  const onScroll = (e) => (state.top = e.target.scrollTop);
  // useEffect(() => void onScroll({ target: scrollArea.current }), [])
  const [pages, setPages] = useState(0);

  const [activeGlitch, setActiveGlitch] = useState(false);
  const handleActiveGlitch = useCallback(()=>{
    setActiveGlitch(true)
  },[]);
  const handleActiveGlitchOut = useCallback(()=>{
    setActiveGlitch(false)
  },[]);
  const composer = useRef(null);
  useEffect(()=>{
    if(composer.current){
      if(activeGlitch){
        composer.current.passes[2].effects[1].mode = 1
      } else {
        composer.current.passes[2].effects[1].mode = 0
      }
    }
  },[composer.current, activeGlitch])
  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        gl={{ alpha: false }}
        camera={{ position: [0, 0, 2], zoom: 1 }}
        style={{
          // zIndex:'10'
            // position:'absolute',
            // width:'100%',
            // height:'100vh'
        }}
        // orthographic
        // pixelRatio={window.devicePixelRatio}
      >
        <pointLight position={[0, 1, 4]} intensity={0.1} />
        <ambientLight intensity={0.2} />
        <spotLight
          position={[1, 1, 1]}
          penumbra={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Stars radius={500} />

        <Suspense fallback={<Html center>loading..</Html>}>
          <Page onChangePages={setPages} />
        </Suspense>

        <EffectComposer ref={composer}>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            height={1024}
          />
          <Glitch active={true} delay={new THREE.Vector2(0,1)} />
        </EffectComposer>
      </Canvas>
      <div className="scrollArea" 
           style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'auto',
            }} 
            ref={scrollArea}
            onScroll={onScroll}>
        <div style={{ height: `${pages * 100}vh`, width:'5px' }} ></div>
        <div onPointerDown={handleActiveGlitch} onPointerOut={handleActiveGlitchOut} onPointerUp={handleActiveGlitchOut} style={{width:'100%', height:'70vh', position:'absolute', top:0}}></div>
      </div>
    </>
  );
}
