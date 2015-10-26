var React = require('react');
var TEXT  = require('../text_content');
var ShareModalBody = require('./share_modal_body');

var Modal = React.createClass({
  propTypes : {
    mode  : React.PropTypes.number.isRequired,
    data  : React.PropTypes.object.isRequired
  },
  renderBody : function ( mode ) {
    switch ( mode ) {
      case 0 : return <ShareModalBody data={this.props.data}/>;
      case 1 : return <ShareModalBody data={this.props.data}/>;
    }
  },
  getTitle : function ( mode ) {
    switch ( mode ) {
      case 0 : return "Let's Share";
      case 1 : return TEXT.SHARE_TITLE;
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
                {this.getTitle(this.props.mode)}
              </h4>
              <div className="modal-body">
                {this.renderBody(this.props.mode)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Modal;

