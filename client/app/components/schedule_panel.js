var React = require('react');
var Panel = require('./panel');

var SchedulePanel = React.createClass({
  render : function () {
    return (
      <Panel menu={this.swapMenu(this.props.data, this.menu)} 
             data={this.props.data} />
             );
  },
  swapMenu : function ( data, menu ) {
    var ordered_menu = [];
    for ( var i=0; i< menu.length; i++ ) {
      var tmp = { id : menu[i].id, title : menu[i].title };
      if ( i != data.filter ) {
        ordered_menu.push(tmp);
      } else {
        ordered_menu.unshift(tmp);
      }
    }
    return ordered_menu;
  },
  menu : [
    { id : 0 , title : "Filter-All" },
    { id : 1 , title : "Filter-1"   },
    { id : 2 , title : "Filter-2"   },
    { id : 3 , title : "Filter-3"   }
  ]
});

module.exports = SchedulePanel;
