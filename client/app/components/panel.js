var React       = require('react');
var PanelHeader = require('./panel_head');
var PanelBody   = require('./panel_body');

var Panel = React.createClass({
  propTypes : {
    menu  : React.PropTypes.array.isRequired,
    data  : React.PropTypes.object.isRequired
  },
  render : function () {
    return (
      <div className="panel panel-info">
        <PanelHeader menu={this.props.menu} />
        <PanelBody items={this.props.data} />
      </div>
      );
  }
});

module.exports = Panel;
