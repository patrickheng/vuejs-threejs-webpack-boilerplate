export default {
  ambientLight: {
    color: new THREE.Color( '#fefefe' ),
    intensity: 1
  },
  directionalLight: {
    color: new THREE.Color( '#e7e3e3' ),
    intensity: 3,
    target: new THREE.Vector3( 0, 0, 0 ),
    position: new THREE.Vector3( 0, 1, 0 )
  }
};
