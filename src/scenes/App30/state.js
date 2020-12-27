import { atom } from "recoil";

export const viewState = atom({
  key: "view",
  default: { viewMenu: false }
});

export const modelActiveState = atom({
  key: "modelActive", // unique ID (with respect to other atoms/selectors)
  default: { src: 'assets/obj/gallery_chapel_baked/scene.gltf', opacity: 1.0 } // default value (aka initial value)
});

export const modelsState = atom({
  key: "models",
  default: { array: [
    {
      src: 'assets/obj/cabezaPiedra.glb',
      scale: [1,1,1]
    },
    {
      src: 'assets/obj/arwing.glb',
      scale: [1,1,1]
    }
  ]}
});