import * as React from "react";
import { useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";

const PI_2 = Math.PI / 2;
const DragControls = ({
  dragY
}) => {
  const { camera, gl } = useThree();
  const previousEvent = React.useRef();
  const dragging = React.useRef(false);
  const yawObject = React.useRef(new THREE.Object3D());
  const pitchObject = React.useRef(new THREE.Object3D());

  React.useEffect(() => {
    camera.rotation.set(0, 0, 0);
  }, [camera]);

  React.useEffect(() => {
    yawObject.current.add(pitchObject.current);
    function mouseDown(event) {
      dragging.current = true;
      previousEvent.current = event;
    }

    function mouseMove(event) {
      if (dragging.current && previousEvent.current) {
        const movementX = event.screenX - previousEvent.current.screenX;
        const movementY = event.screenY - previousEvent.current.screenY;
        const direction = -1;
        yawObject.current.rotation.y += movementX * 0.002 * direction;
        if(dragY === undefined || dragY === true){
            pitchObject.current.rotation.x += movementY * 0.002 * direction;
        }
        pitchObject.current.rotation.x = Math.max(
          -PI_2,
          Math.min(PI_2, pitchObject.current.rotation.x)
        );
      }

      previousEvent.current = event;
    }
    function mouseUp() {
      previousEvent.current = undefined;
      dragging.current = false;
    }
    gl.domElement.addEventListener("mousedown", mouseDown, false);
    gl.domElement.addEventListener("mousemove", mouseMove, false);
    gl.domElement.addEventListener("mouseup", mouseUp, false);

    return () => {
      gl.domElement.removeEventListener("mousedown", mouseDown);
      gl.domElement.removeEventListener("mousemove", mouseMove);
      gl.domElement.removeEventListener("mouseup", mouseUp);
    };
  }, [gl.domElement]);

  useFrame(() => {
    camera.rotation.x = pitchObject.current.rotation.x;
    camera.rotation.y = yawObject.current.rotation.y;
  });

  return null;
};

export default DragControls;