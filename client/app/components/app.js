var React         = require("react");
var MainHeader    = require("./main_header");
var Calendar      = require("./calendar");
var SchedulePanel = require("./schedule_panel");

var App = React.createClass({
  render : function () {
    return (
      <div className='app'>
        <MainHeader/>
        <div className="main-content container">
          <div className="col-xs-7">
            <Calendar/>
          </div>
          <div className="col-xs-5">
            <SchedulePanel/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
