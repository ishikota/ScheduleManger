var React = require('react');
var Calendar = require('./calendar');

var Welcome = React.createClass({
  render : function () {
    var 
      cd = this.props.data.cal_data,
      pd = this.props.data.panel_data;

    // yet loaded calendar data
    if ( !cd ) {
      return <div className='app' />
    }
   
    y   = cd.date.year;
    m   = cd.date.month;
    st  = cd.status;
    return (
      <div className="col-xs-12 col-sm-12">
        <Calendar year={y} month={m} status={st}
                  statelist={this.colors}/>
      </div>
    );
  },
  colors : [ "", "blue" ]
});

module.exports = Welcome;
