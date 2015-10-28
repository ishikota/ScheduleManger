var _       = require('underscore');
var React   = require('react');
var CalCell = require('./cal_cell');
var CalRow  = require('./cal_row');

var CalTable = React.createClass({
  propTypes : function () {
    return {
      year   : React.PropTypes.number.isRequired,
      month  : React.PropTypes.number.isRequired,
      status : React.PropTypes.array.isRequired,
      statelist : React.PropTypes.array.isRequired,
      onClick   : React.PropTypes.func.isRequired
    };
  },
  renderRows : function () {
    var
      rows   = [],
      end    = this.getLastDay(),
      offset = this.getOffset(),
      lines  = this.getLines(),
      memo   = _.map(_.range(lines),function() {
                 return _.map( _.range(7), function() { return -1 } )
               });

    // calculate status of each row
    // status of offset cell is set to -1
    for ( var i=0; i<lines; i++ ) {
      for ( var j=0; j<7; j++ ) {
        var day = i*7-offset+1+j;
        if( 0 < day && day <= end) {
          memo[i][j] = this.props.status[day];
        }
      }
    }

    for ( var i=0; i<lines; i++ ) {
      rows.push(
       <CalRow key={i} start={i*7-offset+1} end={end} status={memo[i]}
               statelist={this.props.statelist}
               onClick={this.props.onClick}/>
      );
    }
    return rows;
  },
  render : function () {
    return (
      <table className="cal-table">
        <thead>
          <tr>
            <th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
      );
  },
  getOffset : function () {
    return new Date( this.props.year, this.props.month ).getDay();
  },
  getLastDay : function () {
    return new Date( this.props.year, this.props.month+1, 0).getDate();
  },
  getLines : function () {
    var 
      needed_cells = this.getOffset() + this.getLastDay(),
      lines = Math.floor(needed_cells / 7),
      alpha = needed_cells % 7 === 0 ? 0 : 1;
    return lines + alpha;
  }

});

module.exports = CalTable;
