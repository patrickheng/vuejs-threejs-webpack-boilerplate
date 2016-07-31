import BallGeometry from './BallGeometry';
import BallMaterial from './BallMaterial';
import Emitter from 'helpers/Emitter';
import GUI from 'helpers/GUI';
import {
  RAYCAST_TOGGLE
} from 'config/messages';

/**
 * Ball class
 */
class Ball extends THREE.Mesh {

  /**
   * Constructor function
   * @param {Object} configuration Configuration
   */
  constructor({ geometry, material, position }, resources ) {

    super( new BallGeometry( geometry ), new BallMaterial( material, resources ));

    this.isHovered = false;

    this.castShadow = true;

    this.position.copy(position);

    this.position.range = [ -300, 300 ];

    this.animProgress = 0;

    this.defaultRotationSpeed = 0.005;
    this.rotationSpeed = 0.005;

    this.addGUI();
    this.addListeners();
    this.generateTimelineMax();

    this.enterTl.play();
  }

  addListeners() {
    this.onRaycastToggle = ::this.onRaycastToggle;

    Emitter.on( RAYCAST_TOGGLE, this.onRaycastToggle );
  }

  generateTimelineMax() {

    this.enterTl = new TimelineMax({ paused: true });

    this.enterTl
      .from(this.position, 2, { z: 500, ease: Expo.easeOut });
  }

  play() {
    this.material.play();
  }

  pause() {
    this.material.pause();
  }

  addGUI() {
    GUI.panel
      .addGroup({ label: 'Ball position', enable: false })
        .addSlider( this.position, 'x', 'range', { label: 'X', dp: 0 })
        .addSlider( this.position, 'y', 'range', { label: 'Y', dp: 0 })
        .addSlider( this.position, 'z', 'range', { label: 'Z', dp: 0 });
  }

  onRaycastToggle( toggle ) {
    if( toggle ) {
      this.material.hover();
    } else {
      this.material.unHover();
    }
  }

  update( time ) {
    this.rotation.y += this.rotationSpeed;
    this.material.update( time );
  }
}

export default Ball;
