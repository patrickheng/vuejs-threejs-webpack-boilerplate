import Application from 'containers/Application';

import Router from 'core/Router';

import 'stylesheets/main.scss';

import domready from 'domready';

class Main {

  constructor() {

    this.bind();

    this.addEventListeners();

    this.router = Router;

    this.start();
  }

  bind() {}

  addEventListeners() {}

  start() {

    this.router.start(Application, '#application');

  }
}

domready(() => {

  new Main();
});
