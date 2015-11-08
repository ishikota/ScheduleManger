var React             = require("react");
var MainHeader        = require("./main_header");
var Modal             = require('./modal');
var HintPanel         = require("./hint_panel");
var ScheduleStore     = require("../flux/ScheduleStore");
var Dispatcher        = require("../flux/Dispatcher");
var ScheduleConstants = require("../flux/ScheduleConstants");

Dispatcher.register( function ( payload ) {
  switch ( payload.actionType ) {
    case ScheduleConstants.UPDATE_CALENDAR:
      ScheduleStore.changeCalendar( payload.data );
      break;
    case ScheduleConstants.UPDATE_SCHEDULE:
      ScheduleStore.updateSchedule( payload.data );
      break;
    case ScheduleConstants.UPDATE_EVENT:
      ScheduleStore.updateEvent( payload.data );
      break;
    case ScheduleConstants.EDIT_CALENDAR:
      ScheduleStore.changeState( payload.data );
      break;
    case ScheduleConstants.REGISTER_ACCOUNT:
      ScheduleStore.registerAccount(
        payload.data.event_id, payload.data.user_data, payload.data.callback);
      break;
    case ScheduleConstants.LOGIN_ACCOUNT:
      ScheduleStore.loginAccount(
        payload.data.event_id, payload.data.user_name, payload.data.callback);
      break;
    case ScheduleConstants.CREATE_EVENT:
      var dat = payload.data;
      ScheduleStore.createEvent(
          dat.event, dat.leader, dat.callback);
      break;
  }
});

var App = React.createClass({
  handleChange : function () {
    ScheduleStore.receiveCalendarData( function( data ){
      console.log("receive new calendar : "+JSON.stringify(data));
      this.setState( { cal_data : data } );
    }.bind(this));
    ScheduleStore.receivePanelData( function( data ){
      console.log("receive new panel : "+JSON.stringify(data));
      this.setState( { panel_data : data } );
    }.bind(this));
    ScheduleStore.receiveInputState( function( data ){
      console.log("receive input state : "+JSON.stringify(data));
      this.setState( { input_state : data } );
    }.bind(this));
    ScheduleStore.receiveEventData( function( data ){
      console.log("receive event data : "+JSON.stringify(data));
      this.setState( { event_data : data } );
    }.bind(this));
  },
  getInitialState : function () {
    return {
      cal_data    : { owner_id : null }, // need for before receiveCalendar
      panel_data  : null,
      input_state : { numer : 0, denom : 100 },
      event_data  : { id : null } // need for before receiveCalendar
    };
  },
  componentWillMount : function () {
    this.handleChange();  // initialize child components
   },
  componentDidMount : function () {
    ScheduleStore.addChangeListener(this.handleChange);
  },
  componentWillUnmount : function () {
    ScheduleStore.removeChangeListener(this.handleChange);
  },
  render : function () {
    var mode = this.props.children.type.displayName == 'Main' ? 0 : 1;
    var head_dat = mode === 0 ?
      { event_id : this.state.event_data.id,
        owner_id : this.state.cal_data.owner_id,
        schedule : this.state.cal_data.schedule } :
      this.state.input_state;
    var modal_dat = mode === 0 ?
      this.state.event_data :
      this.state.input_state;

    return (
      <div className='app'>
        <MainHeader mode={mode} data={head_dat} />
        <HintPanel mode={mode} data={this.state.input_state} />
        <div className="main-content container">
          { React.cloneElement(this.props.children, { data : this.state }) }
        </div>
        <Modal mode={mode} data={modal_dat}/>
      </div>
    );
  }
});

module.exports = App;
