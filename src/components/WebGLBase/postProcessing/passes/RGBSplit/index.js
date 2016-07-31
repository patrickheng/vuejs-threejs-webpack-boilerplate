import Pass from '@superguigui/wagner/src/Pass';

import vertexShader from '../../shaders/vertex/basic.glsl';
import fragmentShader from './frag.glsl';

/**
 * RGBSplit class
 */
class RGBSplit extends Pass {

  /**
   * Constructor function
   * @param  {object} options Options
   */
  constructor( options = {}) {
    super();

    this.setShader( vertexShader, fragmentShader );
    this.params.delta = options.delta;
  }

  /**
   * Run function
   * @param  {object} composer Composer
   */
  run( composer ) {
    this.shader.uniforms.delta.value.copy( this.params.delta );

    composer.pass( this.shader );
  }
}

export default RGBSplit;