export default {
  fov: 45,
  aspect: window.innerWidth / window.innerHeight,
  near: 1,
  far: 2000,
  position: new THREE.Vector3( 0, 0, 250 ),
  target: new THREE.Vector3( 0, 0, 0 ),
  orbitControls: false
};
