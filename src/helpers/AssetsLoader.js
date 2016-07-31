import AWDLoader from 'common/utils/webgl/AWDLoader';
import SoundManager from 'helpers/SoundManager';
import VideoManager from 'helpers/VideoManager';
import files from 'config/resources';

import Emitter from 'helpers/Emitter';

import { RESSOURCES_PROGRESS } from 'config/messages';

/**
 * AssetsLoader class
 */
class AssetsLoader {

  /**
   * constructor function
   * @param {array} files               Files to load
   * @param {function} onResourceLoaded Called everytime a resource is loaded
   */
  constructor() {

    this.promises = [];
    this.totalProgress = files.length;
    this.currentProgress = 0;

    const getLoader = type => {
      switch( type ) {
        case 'model': return new AWDLoader();
        case 'texture': return new THREE.TextureLoader();
        case 'audio': return SoundManager;
        case 'video': return VideoManager;
      }
    };

    files.map( file => {

      const { type, id, url } = file;

      const promise = new Promise( ( resolve, reject ) => {
        getLoader( type ).load(
          url,
          resource => {

            resolve({ id, resource });

            this.currentProgress++;

            Emitter.emit( RESSOURCES_PROGRESS, this.currentProgress / this.totalProgress );

            if(this.currentProgress >= this.totalProgress) {
              this.load();
            }
          },
          () => null,
          () => reject,
          id
        );
      });

      this.promises.push( promise );

    });
  }

  /**
   * load function
   * @return {promise} Promise
   */
  load() {

    return Promise.all( this.promises );
  }

}

export default new AssetsLoader();
