var React = require('react');

var MainHeader = React.createClass({
  render : function () {
    return ( 
      <nav className="main-header navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Schedule Manager</a>
          <div className="btn-toolbar pull-right">
            <div className="main-header-btn-group btn-group">
              <button type="button" className="btn btn-primary">Edit Schedule</button>
            </div>
          </div>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = MainHeader;
