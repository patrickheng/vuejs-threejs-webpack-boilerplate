import MobileDetect from 'mobile-detect';
import browser from 'detect-browser';

class States {

  constructor() {

    this.userAgent = window.navigator.userAgent;
    this.mobileDetect = new MobileDetect( this.userAgent );
    this.deviceType = this.getDeviceType();
    this.browserName = browser.name;

    this.isDesktop = ( this.deviceType === 'desktop' );
    this.isTablet  = ( this.deviceType  === 'tablet' );
    this.isMobile  = ( this.deviceType  === 'mobile' );
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
}


export default new States();
