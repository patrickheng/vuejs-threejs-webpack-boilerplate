/**
 * BallGeometry class
 */
class BallGeometry extends THREE.SphereGeometry {

  /**
   * constructor function
   */
  constructor({ radius, segments: { width: segmentsWidth, height: segmentsHeight } }) {
    super( radius, segmentsWidth, segmentsHeight );

  }
}

export default BallGeometry;
