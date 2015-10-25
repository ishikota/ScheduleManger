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
    var i,
      rows   = [],
      end    = this.getLastDay(),
      offset = this.getOffset(),
      lines  = this.getLines();

    for ( i=0; i<lines; i++ ) {
      var status = this.props.status.slice(i*7, (i+1)*7);
      rows.push(
        <CalRow key={i} start={i*7-offset+1} end={end} status={status}
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
