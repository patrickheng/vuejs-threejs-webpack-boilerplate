import States from 'core/States';
import Emitter from 'helpers/Emitter';
import AbstractScene from 'webgl/core/AbstractScene';
import { lights as lightsConfig } from 'config/webgl/home';

import Ball from '../meshes/Ball';

import {
  RAYCAST_TOGGLE
} from 'config/messages';

/**
 * Scene class
 */
class Scene extends AbstractScene {

  /**
   * constructor function
   */
  constructor( config, resources ) {

    super({
      camera: config.camera,
      renderer: config.renderer,
      postProcessing: config.postProcessing
    });

    this.config = config;
    this.resources = resources;

    this.mouseCamPos = new THREE.Vector2();
    this.mouseCastPos = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.isIntersecting = false;
    this.previousIntersectIndex = false;

    // Camera
    this.camera.position.copy( config.camera.position );
    this.camera.lookAt( config.camera.target );

    this.renderer.setClearColor( 0xffffff, 0 );

    this.addListeners();

    this.initLights();
    this.initMeshes();
  }

  addListeners() {

    // Bind
    [ 'handleMouseMove' ]
      .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

    document.addEventListener( 'mousemove', this.handleMouseMove, false );
  }

  dispose() {
    document.removeEventListener( 'mousemove', this.handleMouseMove, false );
  }

  initLights() {
    this.pointLights = [];

    this.ambientLight = new THREE.AmbientLight( lightsConfig.ambientLight.color, lightsConfig.ambientLight.intensity );
    this.add( this.ambientLight );
  }

  initMeshes() {

    this.ball = new Ball( this.config.ball, this.resources );
    this.ball.play();
    this.add( this.ball );

  }

  raycast() {

    this.raycaster.setFromCamera( this.mouseCastPos, this.camera );

    const intersects = this.raycaster.intersectObjects( [ this.ball ] );

    if ( intersects.length > 0 ) {

      if( !this.isIntersecting ) {
        Emitter.emit( RAYCAST_TOGGLE, true );
      }
      this.isIntersecting = true;

    } else if( this.isIntersecting ) {
      Emitter.emit( RAYCAST_TOGGLE, false );

      this.isIntersecting = false;
    }

  }

  handleMouseMove( ev ) {

    if ( this.config.camera.orbitControls ) return;

    const mouseSensibility = 0.5;
    this.mouseCamPos.x = (- ( ev.pageX - this.width / 2 ) / ( this.width / 2 ) ) * mouseSensibility;
    this.mouseCamPos.y = ( ( ev.pageY - this.height / 2 ) /  ( this.height / 2 ) ) * mouseSensibility;

    this.mouseCastPos.x = ( ev.clientX / this.width ) * 2 - 1;
    this.mouseCastPos.y = - ( ev.clientY / this.height ) * 2 + 1;
  }

  handleWindowResize({ width, height }) {
    this.width = width;
    this.height = height;

    this.camera.handleWindowResize({ width, height });
    this.renderer.handleWindowResize({ width, height });
    this.effectComposer.handleWindowResize({ width, height });
  }

  /**
   * render function
   */
  render() {

    if( States.isDesktop ) this.raycast();

    this.preRender();

    this.ball.update( this.clock.time, this.clock.delta );
  }
}

export default Scene;
