import { Composer } from '@superguigui/wagner';

/**
 * EffectComposer class
 */
class EffectComposer extends Composer {

  /**
   * Constructor function
   * @param {object} renderer Renderer
   */
  constructor( renderer ) {
    super( renderer, { useRGBA: true });
  }

  /**
   * handleWindowResize function
   * @param {Object} size         Viewport size
   * @param {number} param.width  Viewport width
   * @param {number} param.height Viewport height
   */
  handleWindowResize({ width, height }) {
    this.setSize( width, height );
  }
}

export default EffectComposer;
