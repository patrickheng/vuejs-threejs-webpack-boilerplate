import { TweenMax, Expo } from 'gsap';

/*
 *  ==== FadeTransitionMixin ====
 */

const FadeTransitionMixin = {

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

      TweenMax.to(this.$el, 0.7, {
        opacity: 0,
        onComplete: next,
        ease: Expo.easeOut
      });
    }

  }

};

module.exports = FadeTransitionMixin;
