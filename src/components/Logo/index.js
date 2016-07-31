'use strict';

import './styles.scss';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
  ROUTER_ROUTE_CHANGE
} from 'config/messages';

export default Vue.extend({

  mixins: [ EventManagerMixin ],

  template: require( './template.html' ),

  emitterEvents: [{
    message: ROUTER_ROUTE_CHANGE,
    method: 'onRouterRouteChange'
  }],

  data() {

    return {
    };
  },

  ready() {
    this.generateTimelineMax();
  },

  methods: {

    generateTimelineMax() {},

    onRouterRouteChange() {}
  }

});
