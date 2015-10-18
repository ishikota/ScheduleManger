var React   = require('react');

var CalHeader = React.createClass({
  propTypes : function () {
    return {
      year  : React.PropTypes.number.isRequired,
      month : React.PropTypes.number.isRequired,
      onChange : React.PropTypes.func
    };
  },
  render : function () {
    return (
        <div className="cal-head">
          <i className="material-icons md-dark cal-head-ctrl back"
             onClick={this.handleClick}>keyboard_arrow_left</i>
          <i className="material-icons md-dark cal-head-ctrl next"
             onClick={this.handleClick}>keyboard_arrow_right</i>
          <p className="cal-head-title">
            {this.parseMonth(this.props.month)} {this.props.year}
          </p>
        </div>
        );
  },
  handleClick : function (ev) {
    if ( this.props.onChange ) {
      var forward_month = ev.target.className.indexOf('next') > -1;
      this.props.onChange( forward_month );
    }
  },
  parseMonth : function ( month ) {
    var names = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
        ];
    return names[month];
  }

});

module.exports = CalHeader;

