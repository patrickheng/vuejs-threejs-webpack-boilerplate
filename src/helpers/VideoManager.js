/**
 * VideoManager class
 */

class VideoManager {

  constructor() {
    this.videos = [];
  }

  load(url, onLoad, onSucess, onReject, id) {
    const request = document.createElement('video');
    request.addEventListener('canplaythrough', ()=> {
      onLoad(request);
    }, false);
    request.addEventListener('error', onReject, false);
    request.preload = 'auto';
    request.src = url;
    request.load();
    this.videos[id] = request;
  }
}

export default new VideoManager();
