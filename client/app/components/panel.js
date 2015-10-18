var React       = require('react');
var PanelHeader = require('./panel_head');
var PanelBody   = require('./panel_body');

var Panel = React.createClass({
  propTypes : {
    menu  : React.PropTypes.array.isRequired
  },
  getInitialState : function () {
    return { 
      menu : this.formatMenu(this.props.menu),
      data : this.props.menu[0].fetch_data()
    };
  },
  render : function () {
    return (
      <div className="panel panel-info">
        <PanelHeader menu={this.state.menu} />
        <PanelBody items={this.state.data} />
      </div>
      );
  },
  formatMenu : function( menu ) {
    // replace property fetch_data with callback
    var _this = this;
    return menu.map( function ( e ) {
      e.callback = function () {
        var new_data = e.fetch_data();
        _this.setState( { data : new_data } );
      };
      return e;
    });
  }
});

module.exports = Panel;
