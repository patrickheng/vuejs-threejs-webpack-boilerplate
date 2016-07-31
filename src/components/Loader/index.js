'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
  RESSOURCES_PROGRESS
} from 'config/messages';

export default Vue.extend({

  mixins: [ EventManagerMixin ],

  template: require( './template.html' ),

  emitterEvents: [{
    message: RESSOURCES_PROGRESS,
    method: 'onResourceProgress'
  }],

  domEvents: [],

  props : {
  },

  data() {

    return {
      progress: 0
    };
  },

  created() {
    this.tweenProgress = 0;
    this.canTween = true;
  },

  ready() {

  },

  methods: {
    onResourceProgress( p ) {
      this.progress = Math.ceil( p * 100 );

      TweenMax.to(this.$els.bar, 0.2, { scaleX: p, ease: Expo.easeOut});

      if( this.progress === 100 ) {

        TweenMax.to(this, 0.1, { tweenProgress: this.progress, onUpdate: () => {
          this.progress = Math.ceil( this.tweenProgress );
        }});
      }
      else if ( this.progress <= 100 ) {

        TweenMax.to(this, 0.4, { tweenProgress: this.progress, onUpdate: () => {
          this.progress = Math.ceil( this.tweenProgress );
        }});
      } else {

        this.progress = 0;
        this.tweenProgress = 0;
      }

    }
  },

  components: {}
});
