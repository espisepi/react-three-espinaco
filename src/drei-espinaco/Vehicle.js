// https://github.com/dreammonkey/use-cannon/tree/e240ee22fecd9488937511f095c2cb1d6b77e061
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber'
import { useCylinder } from 'use-cannon'
import { Physics, useBox, usePlane, useRaycastVehicle } from 'use-cannon'
import { useCompoundBody } from 'use-cannon'
import { createRef } from 'react'

// The vehicle chassis
const Chassis = React.forwardRef((props, ref) => {
    const boxSize = [1.2, 1, 4]
    useBox(
      () => ({
        // type: 'Kinematic',
        mass: 500,
        rotation: props.rotation,
        angularVelocity: [0, 0.5, 0],
        allowSleep: false,
        args: boxSize,
        ...props,
      }),
      ref
    )
    return (
      <mesh ref={ref} castShadow>
        <boxBufferGeometry attach="geometry" args={boxSize} />
        <meshNormalMaterial attach="material" />
        <axesHelper scale={[5, 5, 5]} />
      </mesh>
    )
  })
  
  // A Wheel
  const Wheel = React.forwardRef((props, ref) => {
    const wheelSize = [0.7, 0.7, 0.5, 16]
    // useCylinder(() => ({
    //   mass: 1,
    //   type: 'Kinematic',
    //   material: new Material('wheel'),
    //   collisionFilterGroup: 0,// turn off collisions !!
    //   // rotation: [0,0,Math.PI/2], // useless -> the rotation should be applied to the shape (not the body)
    //   args: wheelSize,
    //   ...props,
    // }), ref)
    useCompoundBody(
      () => ({
        mass: 1,
        type: 'Kinematic',
        material: 'wheel',
        collisionFilterGroup: 0, // turn off collisions
        ...props,
        shapes: [{ type: 'Cylinder', args: wheelSize, rotation: [Math.PI / 2, 0, 0] }],
      }),
      ref
    )
    return (
      <mesh ref={ref} castShadow>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderBufferGeometry attach="geometry" args={wheelSize} />
          <meshNormalMaterial attach="material" />
        </mesh>
      </mesh>
    )
  })
  
  function CylinderCompound(props) {
    console.log(props.rotation)
    const args = [0.7, 0.7, 5, 16]
    const [ref] = useCompoundBody(() => ({
      mass: 10,
      ...props,
      shapes: [{ type: 'Cylinder', rotation: props.rotation, args: args }],
    }))
    return (
      <mesh ref={ref} castShadow>
        <mesh rotation={props.rotation}>
          <cylinderBufferGeometry attach="geometry" args={args} />
          <meshNormalMaterial attach="material" />
        </mesh>
      </mesh>
    )
  }
  
  const wheelInfo = {
    radius: 0.7,
    directionLocal: [0, -1, 0], // same as Physics gravity
    suspensionStiffness: 30,
    suspensionRestLength: 0.3,
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: 0.3,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    frictionSlip: 5,
    rollInfluence: 0.01,
    axleLocal: [1, 0, 0], // wheel rotates around X-axis
    chassisConnectionPointLocal: [1, 0, 1],
    isFrontWheel: false,
    useCustomSlidingRotationalSpeed: true,
    customSlidingRotationalSpeed: -30,
  }

  // useKeyPress Hook (credit: https://usehooks.com/useKeyPress/)
function useKeyPress(targetKey) {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState(false)
  
    // If pressed key is our target key then set to true
    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true)
      }
    }
  
    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false)
      }
    }
  
    // Add event listeners
    useEffect(() => {
      window.addEventListener('keydown', downHandler)
      window.addEventListener('keyup', upHandler)
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener('keydown', downHandler)
        window.removeEventListener('keyup', upHandler)
      }
    }, []) // Empty array ensures that effect is only run on mount and unmount
  
    return keyPressed
  }
  
export default function Vehicle(props) {
    // chassisBody
    const chassis = createRef()
  
    // wheels
    const wheels = []
    const wheelInfos = []
  
    // chassis - wheel connection helpers
    var chassisWidth = 2
    var chassisHeight = 0
    var chassisFront = 1
    var chassisBack = -1
  
    // FrontLeft [-X,Y,Z]
    const wheel_1 = createRef()
    wheels.push(wheel_1)
    const wheelInfo_1 = { ...wheelInfo }
    wheelInfo_1.chassisConnectionPointLocal = [-chassisWidth / 2, chassisHeight, chassisFront]
    wheelInfo_1.isFrontWheel = true
    wheelInfos.push(wheelInfo_1)
    // FrontRight [X,Y,Z]
    const wheel_2 = createRef()
    wheels.push(wheel_2)
    const wheelInfo_2 = { ...wheelInfo }
    wheelInfo_2.chassisConnectionPointLocal = [chassisWidth / 2, chassisHeight, chassisFront]
    wheelInfo_2.isFrontWheel = true
    wheelInfos.push(wheelInfo_2)
    // BackLeft [-X,Y,-Z]
    const wheel_3 = createRef()
    wheels.push(wheel_3)
    const wheelInfo_3 = { ...wheelInfo }
    wheelInfo_3.chassisConnectionPointLocal = [-chassisWidth / 2, chassisHeight, chassisBack]
    wheelInfo_3.isFrontWheel = false
    wheelInfos.push(wheelInfo_3)
    // BackRight [X,Y,-Z]
    const wheel_4 = createRef()
    wheels.push(wheel_4)
    const wheelInfo_4 = { ...wheelInfo }
    wheelInfo_4.chassisConnectionPointLocal = [chassisWidth / 2, chassisHeight, chassisBack]
    wheelInfo_4.isFrontWheel = false
    wheelInfos.push(wheelInfo_4)
  
    const [vehicle, api] = useRaycastVehicle(() => ({
      chassisBody: chassis,
      wheels: wheels,
      wheelInfos: wheelInfos,
      indexForwardAxis: 2,
      indexRightAxis: 0,
      indexUpAxis: 1,
    }))
  
    const reset = useKeyPress('r')
    const forward = useKeyPress('w')
    const backward = useKeyPress('s')
    const left = useKeyPress('a')
    const right = useKeyPress('d')
    const brake = useKeyPress(' ') // space bar
  
    const [steeringValue, setSteeringValue] = useState(0)
    const [brakeForce, setBrakeForce] = useState(0)
  
    var maxSteerVal = 0.5
    var maxForce = 1e3
    var maxBrakeForce = 1e5
  
    useFrame(() => {
      if (left && !right) {
        setSteeringValue(maxSteerVal)
      } else if (right && !left) {
        setSteeringValue(-maxSteerVal)
      } else {
        setSteeringValue(0)
      }
      if (forward && !backward) {
        setBrakeForce(0)
        api.applyEngineForce(-maxForce, 2)
        api.applyEngineForce(-maxForce, 3)
      } else if (backward && !forward) {
        setBrakeForce(0)
        api.applyEngineForce(maxForce, 2)
        api.applyEngineForce(maxForce, 3)
      }
      if (brake) {
        setBrakeForce(maxBrakeForce)
      }
      if (reset) {
        chassis.current.position.set(0, 5, 0)
      }
    })
  
    useEffect(() => {
      api.setSteeringValue(steeringValue, 0)
      api.setSteeringValue(steeringValue, 1)
    }, [steeringValue])
    useEffect(() => {
      api.setBrake(brakeForce, 0)
      api.setBrake(brakeForce, 1)
      api.setBrake(brakeForce, 2)
      api.setBrake(brakeForce, 3)
    }, [brakeForce])
  
    return (
      <group ref={vehicle}>
        <Chassis ref={chassis} rotation={props.position} position={props.position}></Chassis>
        <Wheel ref={wheel_1}></Wheel>
        <Wheel ref={wheel_2}></Wheel>
        <Wheel ref={wheel_3}></Wheel>
        <Wheel ref={wheel_4}></Wheel>
      </group>
    )
  }