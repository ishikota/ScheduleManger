var React = require('react');
var EditHint    = require("./edit_hint");
var WelcomeHint = require("./welcome_hint");

var HintPanel = React.createClass({
  propTypes : {
    mode : React.PropTypes.number.isRequired,
    data : React.PropTypes.object.isRequired
  },
  render : function () {
    var dt = this.props.data;
    switch ( this.props.mode ) {
      case 0:
        return <EditHint
                  numer={dt.numer} 
                  denom={dt.denom} 
                  visible={dt.editing} />
      case 1:
        return <WelcomeHint data={this.props.data} />
    }
  }
});

module.exports = HintPanel;
