var React = require('react');
var TEXT  = require('../text_content');

var WelcomeHint = React.createClass({
  propTypes : {
    data : React.PropTypes.object.isRequired
  },
  renderBody : function ( can_save ) {
    var clazz = "panel-body",
        numer = this.props.data.numer;
    if ( can_save ) {
      return (
        <div className={clazz}>
          <p>{numer+TEXT.WELCOME_INPUT_STATE}</p>
          <p>{TEXT.WELCOME_HOWTO_SAVE}</p>
        </div>
      );
    } else {
      return (
        <div className={clazz}>
          <p>{TEXT.WELCOME_INTRO}</p>
          <p>{TEXT.WELCOME_HOWTO_SELECT}</p>
        </div>
      );
    }
  },
  render : function () {
    return (
      <div className="panel panel-default welcome-hint">
        {this.renderBody(this.props.data.numer >= 1)}
      </div>
      );
  }
});

module.exports = WelcomeHint;
