var React = require('react');

var PanelMedia = React.createClass({
  propTypes : {
    msg      : React.PropTypes.string.isRequired,
    avtr     : React.PropTypes.array.isRequired
  },
  genIconPath : function (id) {
    switch( id ) {
      case 0: return '/assets/img/yes.jpg';
      case 1: return '/assets/img/budda.jpg';
    }
  },
  renderAvatars : function () {
    return this.props.avtr.map( function ( info, i ) {
      return <img key={i} className="avtr img-circle" src={this.genIconPath(info.icon)}/>;
    }.bind(this));
  },
  render : function () {
    return (
      <div className="media">
        <p>{this.props.msg}</p>
        {this.renderAvatars()}
      </div>
      );
  }
});

module.exports = PanelMedia;
