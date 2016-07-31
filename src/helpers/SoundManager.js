import { Howl, Howler } from 'howler';
import Emitter from 'helpers/Emitter';

import {
  WINDOW_ON_FOCUS,
  WINDOW_ON_BLUR
} from 'config/messages';

/**
 * SoundManager class
 */
class SoundManager {

  constructor() {

    this.sounds = [];

    this.blockMute = false;

    this.bind();

    this.addListeners();
  }

  bind() {

    [ 'onWindowBlur', 'onWindowFocus' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  addListeners() {

    Emitter.on( WINDOW_ON_FOCUS, this.onWindowFocus );
    Emitter.on( WINDOW_ON_BLUR, this.onWindowBlur );

  }

  get( id ) {

    if( typeof this.sounds[ id ] === 'undefined' ) return false;

    return this.sounds[ id ];
  }

  play( id ) {

    if( typeof this.sounds[ id ] === 'undefined' ) return;

    this.sounds[ id ].play();

  }

  onWindowFocus() {
    if(this.blockMute) return;

    Howler.unmute();
  }

  onWindowBlur() {
    this.mute();
  }

  mute() {
    Howler.mute();
  }

  lockMute() {
    this.blockMute = true;
    this.mute();
  }

  unmute() {
    Howler.unmute();
    this.blockMute = false;
  }

  load( url, onLoad, onSucess, onReject, id ) {

    const audio = new Howl({
      urls: [ url ],
      volume: 1,
      onload: () => {

        this.sounds[ id ] = audio;

        onLoad( audio );
      }
    });
  }

}

export default new SoundManager();
