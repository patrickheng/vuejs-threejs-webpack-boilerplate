import ControlKit from 'controlkit';

class GUI extends ControlKit {

  constructor( options ) {
    super( options );

    this.panel = this.addPanel();
  }

  removeGroup( index ) {
    this.panel._groups[ index ]._node._element.remove();
  }

  removeLastGroup() {
    this.removeGroup( this.panel._groups.length - 1 );
  }

  addPanel( options = {}) {
    return super.addPanel({
      align: 'right',
      position: [ 10, 10 ],
      opacity: 0.8,
      width: 275,
      ratio: 10,
      fixed: false,
      ...options
    });
  }
}

export default new GUI();
