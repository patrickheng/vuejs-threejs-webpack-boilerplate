'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';
import LoaderComponent from 'components/Loader';
import WebGLHomeComponent from 'components/WebGLHome';
import AssetsLoader from 'helpers/AssetsLoader';


import {
  WINDOW_RESIZE,
  WINDOW_ON_MOUSEMOVE,
  RESOURCES_READY,
  ROUTER_LEAVE_HOME
} from 'config/messages';

export default Vue.extend({

  mixins: [ EventManagerMixin ],

  template: require( './template.html' ),

  route: {

    activate: function( { next } ) {

      TweenMax.fromTo(this.$el, 0.7, {
        opacity: 0
      }, {
        opacity: 1,
        ease: Expo.easeOut
      });

      next();
    },

    deactivate: function( { next } ) {

      this.emitter.emit( ROUTER_LEAVE_HOME );
      TweenMax.to(this.$el, 0.7, {
        opacity: 0,
        onComplete: next,
        ease: Expo.easeOut,
        delay: 0.5
      });
    }

  },

  emitterEvents: [{
    message: WINDOW_RESIZE,
    method: 'onWindowResize'
  }],

  domEvents: [{
    target: window,
    event: 'mousemove',
    method: 'handleMouseMove'
  }],

  data() {

    return {
      assetsIsLoaded: false,
      resources: {}
    };
  },

  created() {

    this.loader = AssetsLoader;

    this.loader
     .load()
     .then( resources => {

       resources.forEach( ({ id, resource }) => this.resources[ id ] = resource );
       this.emitter.emit( RESOURCES_READY, this.resources );

       this.assetsIsLoaded = true;
     } );
  },

  beforeDestroy() {
  },

  methods: {

    onWindowResize() {},

    handleMouseMove( ev ) {
      this.emitter.emit( WINDOW_ON_MOUSEMOVE, ev );
    }
  },

  components: {
    'loader': LoaderComponent,
    'webgl-home': WebGLHomeComponent
  }
});
