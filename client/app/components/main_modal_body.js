var React = require('react');
var TEXT  = require('../text_content');
var MemDB = require('../mem_db');
var ScheduleActions = require('../flux/ScheduleActions');

var MainModalBody = React.createClass({
  propTypes : {
    event_id : React.PropTypes.string.isRequired
  },
  getInitialState : function () {
    return {
      registering   : true,
      login_name    : "",
      register_name : ""
    }
  },
  render : function () {
    var btn_msg,
      event_id = this.props.event_id,
      valid_login    = !MemDB.isNewone(event_id, this.state.login_name),
      valid_register = MemDB.isNewone(event_id, this.state.register_name),
      login_form_class = "form-group",
      login_help_class = "help-block hidden",
      login_help_msg   = this.state.login_name+ " "+ TEXT.LOGIN_WARNING,
      register_form_class = "form-group",
      register_help_class = "help-block hidden",
      register_help_msg   = TEXT.REGISTER_WARNING,
      btn_class   = "btn btn-primary";


    if ( this.state.login_name != "" & !valid_login ) {
      login_form_class += " has-error";
      login_help_class = "help-block";
    }
    if ( !valid_register ) {
      register_form_class += " has-error";
      register_help_class = "help-block";
    }

    if ( this.state.registering ) {
      btn_msg = TEXT.LOGIN_TAB_REGISTER;
      if ( this.state.register_name == "" || !valid_register ) {
        btn_class += " disabled";
      }
    } else {
      btn_msg = TEXT.LOGIN_TAB_LOGIN;
      if ( !valid_login ) { btn_class += " disabled"; }
    }

    return (
      <div>
        <div className="modal-body">
          <ul className="nav nav-tabs">
            <li className="active">
              <a href="#register" data-toggle="tab" onClick={this.handleClick}>
                {TEXT.LOGIN_TAB_REGISTER}
              </a>
            </li>
            <li>
              <a href="#login" data-toggle="tab" onClick={this.handleClick}>
                {TEXT.LOGIN_TAB_LOGIN}
              </a>
            </li>
          </ul>
          <div id="loginTabContent" className="tab-content">
            <div className="tab-pane fade in active" id="register">
              <div className={register_form_class}>
                <label forName="recipient-name"
                       className="control-label">
                  {TEXT.SHARE_NAME_LABEL}
                </label>
                <input type="text"
                       className="form-control register" id="recipient-name"
                       onChange={this.handleChange} placeholder="Your name here"
                       area-describedby="help-register"/>
                <span id="help-register" className={register_help_class}>
                  {register_help_msg}
                </span>
              </div>
            </div>
            <div className="tab-pane fade" id="login">
              <div className={login_form_class}>
                <label forName="recipient-name"
                       className="control-label">
                  {TEXT.SHARE_NAME_LABEL}
                </label>
                <input type="text"
                       className="form-control login" id="recipient-name"
                       onChange={this.handleChange} placeholder="Your name here"
                       area-describedby="help-login"/>
                <span id="help-login" className={login_help_class}>
                  {login_help_msg}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className={btn_class} onClick={this.handleSend}>
            {btn_msg}
          </button>
        </div>
      </div>
    );
  },
  handleChange : function ( ev ) {
    if ( ev.target.className == "form-control register" ) {
      this.setState( { register_name : ev.target.value } );
    } else {
      this.setState( { login_name    : ev.target.value } );
    }
  },
  handleClick : function ( ev ) {
    var is_register_mode= ev.target.textContent == TEXT.LOGIN_TAB_REGISTER;
    this.setState( { registering : is_register_mode } );
  },
  handleSend : function ( ev ) {
    var callback  = function ( res ) {
      console.log("callback status:"+res.status);
      console.log("callback uid:"+res.user_id);
      if ( res.status ) {
        this.hideModal();
      }
    }.bind(this);
    if ( this.state.registering ) {
      ScheduleActions.registerAccount(
          this.props.event_id,
          this.state.register_name,
          callback );
    } else {
      ScheduleActions.loginAccount(
          this.props.event_id,
          this.state.login_name,
          callback );
    }
  },
  hideModal : function () {
    $('#modal').modal('hide');
  },
});

module.exports = MainModalBody;
