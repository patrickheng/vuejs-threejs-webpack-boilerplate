'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';

import Scene from './core/Scene';

import { home as homeConfig } from 'config/webgl';

import {
  WINDOW_RESIZE,
  RAYCAST_TOGGLE
} from 'config/messages';

export default Vue.extend({

  mixins: [ EventManagerMixin ],

  template: require( './template.html' ),

  emitterEvents: [{
    message: WINDOW_RESIZE,
    method: 'onWindowResize'
  },{
    message: RAYCAST_TOGGLE,
    method: 'onRaycastToggle'
  }],

  domEvents: [],

  props: {
    resources: Object
  },

  data() {

    return {
      isIntersecting: false
    };
  },

  created() {

    this.scene = new Scene( homeConfig, this.resources );
    this.sceneDomEl = this.scene.renderer.domElement;
    this.aboutTimeout = null;
    this.currentIndex = 0;
  },

  ready() {
    this.$el.appendChild( this.sceneDomEl );
  },

  beforeDestroy() {
    this.scene.raf.stop();
    this.scene.remove();
  },

  methods: {

    onWindowResize({ width, height }) {
      this.scene.handleWindowResize({ width, height });
    },

    onRaycastToggle( toggle ) {

      this.isIntersecting = toggle;
    }
  }
});
