var React      = require('react');
var PanelMedia = require('./panel_media');

var PanelBody = React.createClass({
  renderMedias : function () {
    return this.props.items.data.map( function ( item, i ) {
      return (
        <li key={i} className="media">
          <PanelMedia msg={item.msg} member={item.member} />
        </li>
      );
    });
  },
  render : function () {
    return (
      <div className="panel-body">
        <ul className="media-list">
          {this.renderMedias()}
        </ul>
      </div>
    );
  }
});

module.exports = PanelBody;
