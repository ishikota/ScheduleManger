var React = require('react');
var TEXT  = require('../text_content');
var ScheduleActions = require('../flux/ScheduleActions');
//var ReactRouter = require('react-router');
//var History = ReactRouter.History;

var ShareModalBody = React.createClass({
//  mixins : [ History ],
  propTypes : {
    data : React.PropTypes.object.isRequired
  },
  getInitialState : function () {
    return { name : "" }
  },
  render : function () {
    var share_tmplate,
        name = this.state.name ? this.state.name : TEXT.SHARE_DEFALT_NAME,
        send_class = "btn btn-primary modal-send";
    share_tmplate = this.createShareTemplate( name, this.props.data.schedule );
    send_class += this.state.name ? "" : " disabled";
    return (
      <div>
        <div className="modal-body">
          <div className="form-group">
            <label forName="recipient-name" className="control-label">
              {TEXT.SHARE_NAME_LABEL}
            </label>
            <input type="text" className="form-control modal-input-name" 
                   id="recipient-name" placeholder={TEXT.SHARE_DEFALT_NAME} 
                   onChange={this.handleInput}/>
          </div>
          <div className="form-group">
            <label forName="template-msg" className="control-label">
              Share template
            </label>
            <textarea id="template-msg" className="form-control modal-share-txt"
                      rows="3" value={share_tmplate} onChange={this.dummyCallback}>
            </textarea>
          </div>
          <p>{TEXT.SHARE_BTN_TITLE}</p>
          <button type="button" className="btn btn-primary">Line</button>
          <button type="button" className="btn btn-primary">Facebook</button>
          <button type="button" className="btn btn-primary">Twitter</button>
        </div>
        <div className="modal-footer">
            <button type="button" className={send_class}
                    onClick={this.handleClick}>
              {TEXT.SHARE_BTN_SEND}
            </button>
        </div>
      </div>
    );
  },
  handleInput : function ( ev ) {
    this.setState( { name : ev.target.value } );
  },
  dummyCallback : function ( ev ) {
    /* needed to surpress jest warning */
  },
  handleClick : function ( ev ) {
    var callback = function ( data ) {
      if ( data.status ) {
        console.log(
            "Event created with id : %s, leader_id : %s", data.event_id, data.user_id);
        this.hideModal();
        this.history.pushState(null, '/event/'+data.event_id);
      } else {
        console.log("event crate failed");
      }
    }.bind(this);
    ScheduleActions.createEvent(
        this.state.name, this.props.data.schedule, callback);
  },
  hideModal : function () {
    $('#modal').modal('hide');
  },

  createShareTemplate : function ( name, schedule ) {
    var m, d, txt ="", date="";
    for ( m in schedule ) {
      for ( d in schedule[m] ) {
        if (schedule[m][d]===1) {
          date += (parseInt(m)+1)+"/"+d+" , ";
        }
      }
    }
    date = date.slice(0, date.length-3);
    txt += name + " " +TEXT.SHARE_TMPLATE_1;
    txt += TEXT.SHARE_TMPLATE_2;
    txt += TEXT.SHARE_TMPLATE_3;
    txt += date +"\n";
    txt += TEXT.SHARE_TMPLATE_3;
    txt += TEXT.SHARE_TMPLATE_4;
    txt += TEXT.SHARE_TMPLATE_5;
    return txt;
  }
});

module.exports = ShareModalBody;
