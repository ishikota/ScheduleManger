var React = require('react');
var ScheduleActions = require('../flux/ScheduleActions');

var MainHeader = React.createClass({
  getInitialState : function () {
    return { editing : false };
  },
  render : function () {
    var msg = this.state.editing ? "Save Schedule" : "Edit Schedule";
    return ( 
      <nav className="main-header navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Schedule Manager</a>
          <div className="btn-toolbar pull-right">
            <div className="main-header-btn-group btn-group">
              <button type="button" className="btn btn-primary"
                      onClick={this.switchEditMode}>{msg}
              </button>
            </div>
          </div>
          </div>
        </div>
      </nav>
    );
  },
  switchEditMode : function ( ev ) {
    var is_editing = this.state.editing;
    ScheduleActions.edit( { editing : !is_editing } );
    this.setState( { editing : !is_editing } );
  }
});

module.exports = MainHeader;
