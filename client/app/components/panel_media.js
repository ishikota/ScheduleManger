var React = require('react');

var PanelMedia = React.createClass({
  propTypes : {
    msg    : React.PropTypes.string.isRequired,
    member : React.PropTypes.array.isRequired
  },
  genIconPath : function (id) {
    switch( id ) {
      case 0: return '/assets/img/yes.jpg';
      case 1: return '/assets/img/budda.jpg';
      default: return '/assets/img/budda.jpg';
    }
  },
  renderAvatars : function () {
    return this.props.member.map( function ( info, i ) {
      return (<span key={i} className="avtr numberCircle"><span>
                 {info.name}</span></span>);
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
