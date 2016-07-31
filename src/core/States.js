import Emitter from 'helpers/Emitter';
import MobileDetect from 'mobile-detect';
import browser from 'detect-browser';

import {
  PROJECT_CHANGE
} from 'config/messages';
class States {

  constructor() {

    this.userAgent = window.navigator.userAgent;
    this.mobileDetect = new MobileDetect( this.userAgent );
    this.deviceType = this.getDeviceType();
    this.browserName = browser.name;

    this.isDesktop = ( this.deviceType === 'desktop' );
    this.isTablet  = ( this.deviceType  === 'tablet' );
    this.isMobile  = ( this.deviceType  === 'mobile' );

    this.addListeners();
    this.currentIndex = 0;
  }

  addListeners() {

    this.onProjectChange = ::this.onProjectChange;

    Emitter.on( PROJECT_CHANGE, this.onProjectChange );
  }

  getDeviceType() {
    if( this.mobileDetect.tablet() ) {
      return "tablet";
    } else if ( this.mobileDetect.mobile() ) {
      return "mobile";
    } else {
      return "desktop";
    }
  }

  isIE() {
    return ( this.userAgent.indexOf( 'MSIE ' ) > 0 || this.userAgent.indexOf( 'Trident/' ) > 0 || this.userAgent.indexOf( 'Edge/' ) > 0 );
  }


  onProjectChange( index ) {
    this.currentIndex = index;
  }
}


export default new States();
