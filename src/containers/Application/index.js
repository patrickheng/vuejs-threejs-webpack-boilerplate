'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import States from 'core/States';

import debounce from 'lodash.debounce';

import 'augmented-compile-shader';
import 'utils/webgl/AugmentedConsole';
import 'gsap';

import {
  WINDOW_RESIZE,
  WINDOW_ON_FOCUS,
  WINDOW_ON_BLUR
} from 'config/messages';

import LogoComponent from 'components/Logo';

export default Vue.extend({

  mixins: [EventManagerMixin],

  template: require('./template.html'),

  emitterEvents: [],

  domEvents: [{
    target: window,
    event: 'resize',
    method: 'handleWindowResize'
  },{
    target: window,
    event: 'blur',
    method: 'handleWindowBlur'
  },{
    target: window,
    event: 'focus',
    method: 'handleWindowFocus'
  }],

  data() {

    return {
    };
  },

  ready() {
    this.creditsLog();
    this.addDeviceClass();
    this.addBrowserClass();
  },

  methods: {

    bind() {
      this.handleWindowResize = debounce(this.broadcastWindowSize, 200);
    },

    creditsLog() {
       /*eslint-disable */
       console.log('%c', 'background: #ffffff; font-size: 11px; color: #f0f0f0');

       console.log('%c > Portfolio: http://hengpatrick.fr', 'background: #2c3e50; padding:5px; font-size: 11px; color: #ffffff');
       console.log('%c > Lab: http://lab.hengpatrick.fr', 'background: #2c3e50; padding:5px; font-size: 11px; color: #ffffff');
       console.log('%c > Twitter: http://twitter.com/Pat_Hg', 'background: #2c3e50; padding:5px; font-size: 11px; color: #ffffff');
       console.log('%c', 'background: #ffffff; font-size: 11px; color: #f0f0f0');
       /*eslint-enable */
    },

    addBrowserClass() {
      this.$el.classList.add(States.browserName + '-browser');
    },

    addDeviceClass() {
      this.$el.classList.add(States.deviceType + '-device');
    },

    handleWindowBlur() {
      this.emitter.emit( WINDOW_ON_BLUR );
    },

    handleWindowFocus() {
      this.emitter.emit( WINDOW_ON_FOCUS );
    },

    broadcastWindowSize() {
      this.emitter.emit(WINDOW_RESIZE, {
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  },

  components: {
    'logo' : LogoComponent
  }
});
