import { BlendMode } from '@superguigui/wagner';
import MultiPassBloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass';
import TiltShiftPass from '@superguigui/wagner/src/passes/tiltShift/tiltShiftPass';
import VignettePass from '@superguigui/wagner/src/passes/vignette/VignettePass';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';
import RGBSplitPass from 'webgl/postProcessing/passes/RGBSplit';

export default {
  active: false,
  effectComposer: {
    useRGBA: true
  },
  passes: [
    {
      name: 'RGBSplitPass',
      active: false,
      constructor: () => new RGBSplitPass({
        delta: new THREE.Vector2(10, 10)
      })
    },
    {
      name: 'multiPassBloomPass',
      active: false,
      constructor: () => new MultiPassBloomPass({
        blurAmount: 0.05,
        applyZoomBlur: true,
        zoomBlurStrength: 2,
        blendMode: BlendMode.Screen
      })
    },
    {
      name: 'tiltShiftPass',
      active: false,
      constructor: () => new TiltShiftPass({
        bluramount: 0.5,
        center: 1,
        stepSize: 0.005
      })
    },
    {
      name: 'noisePass',
      active: true,
      constructor: () => new NoisePass({
        amount: 0.02,
        speed: 0.1
      })
    },
    {
      name: 'vignettePass',
      active: false,
      constructor: () => new VignettePass({
        boost: 1,
        reduction: 0.5
      })
    },
    {
      name: 'fxaaPass',
      active: false,
      constructor: () => new FXAAPass()
    }
  ]
};
