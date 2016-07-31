/**
 * AbstractRenderer class
 */
class AbstractRenderer extends THREE.WebGLRenderer {

  /**
   * constructor function
   */
  constructor({ antialias, alpha, clearColor, clearColorAlpha, pixelRatio }) {

    super({ antialias, alpha });

    this.setSize( window.innerWidth, window.innerHeight );
    this.setClearColor( clearColor, clearColorAlpha );
    this.setPixelRatio( pixelRatio );
    this.clear();

    this.shadowMap.enabled = true;
    this.shadowMapSoft = true;

    this.shadowCameraNear = 3;
    this.shadowCameraFar = 2000;
    this.shadowCameraFov = 50;

    this.shadowMapBias = 0.0039;
    this.shadowMapDarkness = 0.5;
    this.shadowMapWidth = 1024;
    this.shadowMapHeight = 1024;
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

export default AbstractRenderer;
