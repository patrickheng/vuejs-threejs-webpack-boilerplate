import shaderParse from 'utils/webgl/shader-parse';
import vertexShader from './shader/vert.glsl';
import fragmentShader from './shader/frag.glsl';
import GUI from 'helpers/GUI';


class BallMaterial extends THREE.ShaderMaterial {

  /**
   * Constructor function
   * @param {Object} options Options
   */
  constructor() {
    const defines = {};
    const baseShader = THREE.ShaderLib.phong;
    const baseUniforms = THREE.UniformsUtils.clone( baseShader.uniforms );

    const uniforms = THREE.UniformsUtils.merge( [
      baseUniforms,
      {
        u_time: { type: 'f', value: 0.0 },
        u_speed: { type: 'f', value: 0.0, range: [ 0, 20 ] },
        u_amp: { type: 'f', value: 0.0, range: [ 0, 20 ]  }
      }
    ]);

    const options = {
      fragmentShader: shaderParse( fragmentShader ),
      vertexShader: shaderParse( vertexShader ),
      defines: defines,
      uniforms: uniforms,
      lights: true,
      fog: false,
      side: THREE.FrontSide,
      blending: THREE.NormalBlending,
      transparent: true,
      wireframe: true
    };

    super( options );

    this.defaultUniforms = {
      u_speed: { type: 'f', value: 0.2, range: [ 0, 20 ] },
      u_amp: { type: 'f', value: 3.0, range: [ 0, 20 ]  }
    };

    this.hoverTl = new TimelineMax();
    this.isPaused = false;
    this.needsUpdate = true;

    this.addGUI();
  }

  addGUI() {
    GUI.panel
      .addGroup({ label: 'Ball vertex', enable: false })
        .addSlider( this.uniforms.u_speed, 'value', 'range', { label: 'Speed' })
        .addSlider( this.uniforms.u_amp, 'value', 'range', { label: 'Amplitude' });
  }

  play() {

    this.uniforms.u_speed.value = this.defaultUniforms.u_speed.value;
    this.uniforms.u_amp.value = this.defaultUniforms.u_amp.value;

    this.isPaused = false;
  }

  pause() {

    this.isPaused = true;

    clearTimeout( this.noiseGlitchInterval );

    this.uniforms.u_speed.value = 0.0;
    this.uniforms.u_amp.value = 0.0;
  }

  hover() {

    this.hoverTl.progress(1);
    this.hoverTl.kill();

    this.hoverTl
      .to( this.uniforms.u_speed, 1, {
        value: this.defaultUniforms.u_speed.value * 2,
        ease: Expo.easeOut
      })
      .to( this.uniforms.u_amp, 1, {
        value: this.defaultUniforms.u_amp.value * 2,
        ease: Expo.easeOut
      }, 0);
  }

  unHover() {

    this.hoverTl.kill();

    let speed, amp;

    if( this.isPaused ) {
      speed = 0;
      amp = 0;
    } else {
      speed = this.defaultUniforms.u_speed.value;
      amp = this.defaultUniforms.u_amp.value;
    }

    this.hoverTl
      .to( this.uniforms.u_speed, 0.5, {
        value: speed,
        ease: Expo.easeOut
      })
      .to( this.uniforms.u_amp, 0.5, {
        value: amp,
        ease: Expo.easeOut
      }, 0);
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {

    if( !this.isPaused ) {
      this.uniforms.u_time.value = time;
    }

  }
}

export default BallMaterial;
