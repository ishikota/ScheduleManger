var React = require('react');

var MainHeader = React.createClass({
  render : function () {
    return ( 
      <nav className="main-header navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Schedule Manager</a>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = MainHeader;
