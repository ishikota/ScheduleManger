var React = require('react');

var EditHint = React.createClass({
  propTypes : {
    numer   : React.PropTypes.number,
    denom   : React.PropTypes.number,
    visible : React.PropTypes.bool
  },
  render : function () {
    var progress = this.calcRatio( this.props.numer, this.props.denom ),
        prog_txt = progress+"% Completed",
        cmp_rate = this.props.numer+" / "+this.props.denom,
        clazz    = "panel-body";
    if ( !this.props.visible ) { clazz += " hide" };
    return (
        <div className="panel panel-default edit-hint" >
        <div className={clazz}>
          <p className="pull-left col-sm-11">Switch state by click date</p>
          <button type="button" className="close col-sm-1" 
                  data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div style={{clear:"both"}}></div>
          <p className="col-sm-12">
            <img className="eh-mark ok"/><span className="eh-txt">OK</span>
            <img className="eh-mark pend"/><span className="eh-txt">Pending</span>
            <img className="eh-mark no"/><span className="eh-txt">Busy</span>
          </p>
          <p className="col-sm-12">Completion Rate</p>
          <div className="col-sm-12">
            <div className="progress">
              <div className="progress-bar progress-bar-success"
                      role="progressbar" aria-valuenow={progress} aria-valuemin="0"
                      aria-valuemax="100" style={{width: progress+"%"}}>
                <span className="sr-only">{prog_txt}</span>
                {cmp_rate}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  calcRatio : function ( numer, denom ) {
    return Math.floor( numer / denom * 100);
  }
});

module.exports = EditHint;
