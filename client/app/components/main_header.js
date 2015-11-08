var React = require('react');
var MainHeadBtn     = require('./main_head_btn');
var WelcomeBtn      = require('./welcome_head_btn');
var ScheduleActions = require('../flux/ScheduleActions');
var TEXT = require('../text_content');

var MainHeader = React.createClass({
  propTypes : {
    mode : React.PropTypes.number.isRequired,
    data : React.PropTypes.object.isRequired
  },
  renderButton : function ( mode ) {
    switch ( mode ) {
      case 0:
        return <MainHeadBtn data={this.props.data} />
      case 1:
        return <WelcomeBtn data={this.props.data}/>
      default:
        throw { message : "invalid mode "+mode, name : "InvalidArgumentError" }
    }
  },
  render : function () {
    return ( 
      <nav className="main-header navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">{TEXT.APP_NAME}</a>
          <div className="btn-toolbar pull-right">
            <div className="main-header-btn-group btn-group">
              {this.renderButton(this.props.mode)}
            </div>
          </div>
          </div>
        </div>
      </nav>
    );
  },
});

module.exports = MainHeader;
