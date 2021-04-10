// https://codesandbox.io/s/r3f-ibl-envmap-normalmap-yn4up?from-embed=&file=/src/components/Effects.js:0-1729
// https://spectrum.chat/react-three-fiber/general/applying-post-processing-shaders~ead8ca5e-3242-4652-8d26-4cb762d14b66
import { useMemo, useEffect } from 'react'
import { useLoader, useThree, useFrame } from 'react-three-fiber'
import {
  SMAAImageLoader,
  BlendFunction,
  KernelSize,
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  SMAAEffect,
  GammaCorrectionEffect,
  BokehEffect
} from 'postprocessing'

// Fix smaa loader signature
// Will not be neccessary next version: https://github.com/vanruesc/postprocessing/commit/f05bb85fc9548458ee5e4a24026f308f0a8b72d4
const _load = SMAAImageLoader.prototype.load
SMAAImageLoader.prototype.load = function(_, set) {
  return _load.bind(this)(set)
}

export default function Effects() {
  const { gl, scene, camera, size } = useThree()
  const smaa = useLoader(SMAAImageLoader)
  const composer = useMemo(() => {
    const composer = new EffectComposer(gl)
    composer.addPass(new RenderPass(scene, camera))
    const smaaEffect = new SMAAEffect(...smaa)
    smaaEffect.colorEdgesMaterial.setEdgeDetectionThreshold(0.1)
    const gammaCorrection = new GammaCorrectionEffect()
    const bloom = new BloomEffect({
      blendFunction: BlendFunction.ADD,
      kernelSize: KernelSize.HUGE,
      luminanceThreshold: 0.1,
      height: 600
    })
    bloom.blendMode.opacity.value = 2
    const bokehEffect = new BokehEffect({
      focus: 0.8,
      dof: 0.05,
      aperture: 0.2,
      maxBlur: 0.015
    })
    composer.addPass(new EffectPass(camera, bokehEffect))
    const effectPass = new EffectPass(camera, gammaCorrection, smaaEffect, bloom)
    effectPass.renderToScreen = true
    composer.addPass(effectPass)
    return composer
  }, [])
  // gl.setRenderTarget( composer.readBuffer );
  useEffect(() => void composer.setSize(size.width, size.height), [size])
  useEffect(()=>{
    scene.onAfterRender = function () {
      composer.render();
    }
  },[])
  
  // return useFrame((_, delta) => composer.render(delta), 1)
  return null;
}
