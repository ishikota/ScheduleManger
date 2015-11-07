var _ = require('underscore');
var React = require('react');
var TEXT  = require('../text_content');
var ShareModalBody = require('./share_modal_body');
var MainModalBody  = require('./main_modal_body');

var Modal = React.createClass({
  propTypes : {
    mode : React.PropTypes.number.isRequired,
    data : React.PropTypes.object.isRequired
  },
  renderBody : function ( mode, data ) {
    switch ( mode ) {
      case 0 :
        if ( !data.id ) { return <span/> }
        return <MainModalBody  event_id={data.id}/>;
      case 1 : return <ShareModalBody data={data}/>;
    }
  },
  getTitle : function ( mode, data ) {
    switch ( mode ) {
      case 0 :
        if ( !data.id ) { return "Error" }
        var leader_name = this.getLeader(data.member).name;
        return leader_name + " " +TEXT.LOGIN_TITLE;
      case 1 :
        return TEXT.SHARE_TITLE;
    }
  },
  render : function () {
    return (
      <div className="modal fade" id="modal" tabindex="-1"
           role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal"
                      area-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="modalLabel">
                {this.getTitle(this.props.mode, this.props.data)}
              </h4>
              <div className="modal-body">
                {this.renderBody(this.props.mode, this.props.data)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  getLeader : function(member) {
    return _.filter(member, function (m) { return m.leader })[0];
  }
});

module.exports = Modal;

