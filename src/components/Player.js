import * as THREE from "three"
import React, { useEffect, useRef, useState } from "react"
import { useSphere } from "use-cannon"
import { useThree, useFrame } from "react-three-fiber"

const SPEED = 5
const SPEEDRUN = 50;
const keys = { KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right", Space: "jump", ShiftLeft: "run", KeyQ: "down", KeyE: "up" }
const moveFieldByKey = (key) => keys[key]
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

const usePlayerControls = () => {
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false, jump: false, run: false, down: false, up: false })
  useEffect(() => {
    const handleKeyDown = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }))
    const handleKeyUp = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }))
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [])
  return movement
}

export const Player = (props) => {
  const godMode = props.godMode || false;
  const mass = godMode ? 0 : 1;
  const [ref, api] = useSphere(() => ({ mass: mass,  type: "Dynamic", ...props }))
  const { forward, backward, left, right, jump, run, down, up } = usePlayerControls()
  const { camera } = useThree()
  const velocity = useRef([0, 0, 0])
  useEffect(() => void api.velocity.subscribe((v) => (velocity.current = v)), [])
  useFrame(() => {
    camera.position.copy(ref.current.position)
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    if(run){
      direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEEDRUN).applyEuler(camera.rotation)
    } else {
      direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation)
    }
    api.velocity.set(direction.x, velocity.current[1], direction.z)
    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) api.velocity.set(velocity.current[0], 10, velocity.current[2])

    if(godMode){
      if(down){
        api.velocity.set(direction.x, -20, direction.z)
      } else if(up || jump){
        api.velocity.set(direction.x, 20, direction.z)
      }else {
        api.velocity.set(direction.x, 0, direction.z)
      }
    }
  })
  return <mesh ref={ref} />
}
