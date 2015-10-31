var React = require('react');
var TEXT  = require('../text_content');
var MemDB = require('../mem_db');

var MainModalBody = React.createClass({
  propTypes : {
    event_id : React.PropTypes.string.isRequired
  },
  getInitialState : function () {
    return {
      register : true,
      name : ""
    }
  },
  render : function () {
    var
      event_id = this.props.event_id,
      valid_login = MemDB.validateUser(event_id, this.state.name),
      btn_class = "btn btn-primary";
    if ( !valid_login ) { btn_class += " disabled"; }
    var btn_msg = TEXT.LOGIN_TAB_LOGIN;
    return (
      <div>
        <div className="modal-body">
          <ul className="nav nav-tabs">
            <li className="active">
              <a href="#register" data-toggle="tab">
                Register
              </a>
            </li>
            <li>
              <a href="#login" data-toggle="tab">
                Login
              </a>
            </li>
          </ul>
          <div id="loginTabContent" className="tab-content">
            <div className="tab-pane fade in active" id="register">
              <div className="form-group">
                <label forName="recipient-name"
                       className="control-label">
                  {TEXT.SHARE_NAME_LABEL}
                </label>
                <input type="text"
                       className="form-control register" id="recipient-name"
                       onChange={this.handleChange} placeholder="Your name here"/>
              </div>
            </div>
            <div className="tab-pane fade" id="login">
              <div className="form-group">
                <label forName="recipient-name"
                       className="control-label">
                  {TEXT.SHARE_NAME_LABEL}
                </label>
                <input type="text"
                       className="form-control login" id="recipient-name"
                       onChange={this.handleChange} placeholder="Your name here"/>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className={btn_class}>
            {btn_msg}
          </button>
        </div>
      </div>
    );
  },
  handleChange : function ( ev ) {
    this.setState( { name : ev.target.value } );
  }
});

module.exports = MainModalBody;
