import raf from 'raf-loop';
import AbstractRenderer from 'components/WebGLBase/core/AbstractRenderer';
import AbstractCamera from 'components/WebGLBase/core/AbstractCamera';
import EffectComposer from 'components/WebGLBase/postProcessing/EffectComposer';
import PostProcessing from 'components/WebGLBase/postProcessing/PostProcessing';
import Clock from 'utils/webgl/Clock';


/**
 * AbstractScene class
 */
class AbstractScene extends THREE.Scene {

  /**
   * constructor function
   * @param {Object} Configuration
   */
  constructor({ camera, renderer, postProcessing }) {

    super();

    const { fov, aspect, near, far, position, orbitControls } = camera;

    // Abstract camera
    this.camera = new AbstractCamera({ fov, aspect, near, far, position, orbitControls });
    this.bufferCamera = new AbstractCamera({ fov, aspect, near, far, position, orbitControls });

    const { antialias, alpha, clearColor, clearColorAlpha, pixelRatio } = renderer;

    // Abstract renderer
    this.renderer = new AbstractRenderer({ antialias, alpha, clearColor, clearColorAlpha, pixelRatio });

    if( alpha ) {
      this.renderer.setClearColor( 0xffffff, 0 );
    }

    // Effect composer
    this.effectComposer = new EffectComposer( this.renderer );
    this.postProcessing = new PostProcessing( this.effectComposer, this, this.camera, this.renderer, postProcessing );

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Misc
    this.clock = new Clock();
    this.raf = raf( ::this.render ).start();
  }


  /**
   * preRender function
   */
  preRender() {
    this.postProcessing.update();
  }

  handleWindowResize({ width, height }) {
    this.width = width;
    this.height = height;
    this.camera.handleWindowResize({ width, height });
    this.renderer.handleWindowResize({ width, height });
    this.effectComposer.handleWindowResize({ width, height });
  }
}

export default AbstractScene;
