jest.dontMock('../client/app/components/app');

describe( 'App component', function () {
  var React         = require('react/addons');
  var TestUtils     = React.addons.TestUtils;
  var App           = require('../client/app/components/app');
  var Main          = require('../client/app/components/main');
  var Welcome       = require('../client/app/components/welcome');
  var Modal         = require('../client/app/components/modal');
  var Dispatcher    = require('../client/app/flux/Dispatcher');
  var ScheduleStore = require('../client/app/flux/ScheduleStore');
  var FakeData      = require('../client/app/fake_data');
  var MainHeader    = require('../client/app/components/main_header');

  describe( 'renderIntoDocument', function () {
    it ( 'should render the component', function () {
      TestUtils.renderIntoDocument(<App><Welcome/></App>);
    });
  });

  describe( 'Initialization', function () {
    var subject, memo_receive_cal, memo_receive_panel;
    beforeEach( function () {
      memo_receive_cal   = ScheduleStore.receiveCalendarData.mock.calls.length;
      memo_receive_panel = ScheduleStore.receivePanelData.mock.calls.length;
      subject = TestUtils.renderIntoDocument(<App><Welcome/></App>);
    });

    it ( 'should receive calendar/panel info in getInitialState()', function () {
      expect(ScheduleStore.receiveCalendarData.mock.calls.length)
             .toBe(memo_receive_cal+1);
      expect(ScheduleStore.receivePanelData.mock.calls.length)
             .toBe(memo_receive_panel+1);
    });

  });

  describe( 'handle change from ScheduleStore', function () {

    var subject, memo_receive_cal, memo_receive_panel;
    beforeEach( function () {
      subject = TestUtils.renderIntoDocument(<App><Welcome/></App>);
      memo_receive_cal   = ScheduleStore.receiveCalendarData.mock.calls.length;
      memo_receive_panel = ScheduleStore.receivePanelData.mock.calls.length;
    });

    it ( 'should invoke receive calendar/panel when emit change received', function () {
      subject.handleChange();
      expect(ScheduleStore.receiveCalendarData.mock.calls.length)
             .toBe(memo_receive_cal+1);
      expect(ScheduleStore.receivePanelData.mock.calls.length)
             .toBe(memo_receive_panel+1);
    });

    it ( 'should update state', function () {
      var dummy = { dummy : true };
      spyOn(ScheduleStore, "receiveCalendarData").andCallFake(
        function ( callback ) {
          callback(FakeData.CALENDAR);
        });
      spyOn(ScheduleStore, "receivePanelData").andCallFake(
        function ( callback ) {
          callback(FakeData.PANEL);
        });
      spyOn(ScheduleStore, "receiveInputState").andCallFake(
        function ( callback ) {
          callback( dummy );
      });

      subject.handleChange();
      expect(subject.state.cal_data).toEqual(FakeData.CALENDAR);
      expect(subject.state.panel_data).toEqual(FakeData.PANEL);
      expect(subject.state.input_state).toEqual(dummy);
    });
  });

  describe( 'switch data to pass child component', function () {

    it ( 'should pass data for main page', function () {
      var
        subject  = TestUtils.renderIntoDocument(<App><Main/></App>),
        header   = TestUtils.findRenderedComponentWithType(subject, MainHeader),
        modal    = TestUtils.findRenderedComponentWithType(subject, Modal),
        cal_data = { year:2015, month:9, day:31, schedule:[], owner_id:"1234" },
        cal_expected = { event_id:"a", owner_id : "1234", schedule:[] };
      subject.setState( { cal_data : cal_data } );
      subject.setState( { event_data : { id:"a", leader:"1", member:{}} } );
      expect(header.props.data).toEqual(cal_expected);
      expect(modal.props.data).toEqual(subject.state.event_data);
    });

    it ( 'should pass data for welcome page', function () {
      var
        subject = TestUtils.renderIntoDocument(<App><Welcome/></App>),
        header  = TestUtils.findRenderedComponentWithType(subject, MainHeader),
        modal    = TestUtils.findRenderedComponentWithType(subject, Modal);
      subject.setState( { input_state : { schedule : [1,2,3] } } );
      expect(header.props.data).toEqual(subject.state.input_state);
      expect(modal.props.data).toEqual(subject.state.input_state);
    });
  });

});
