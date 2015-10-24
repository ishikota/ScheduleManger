jest.dontMock('../client/app/components/app');

describe( 'App component', function () {
  var React         = require('react/addons');
  var TestUtils     = React.addons.TestUtils;
  var App           = require('../client/app/components/app');
  var Welcome       = require('../client/app/components/welcome');
  var Dispatcher    = require('../client/app/flux/Dispatcher');
  var ScheduleStore = require('../client/app/flux/ScheduleStore');
  var FakeData      = require('../client/app/fake_data');

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
      spyOn(ScheduleStore, "receiveEditInfo").andCallFake(
        function ( callback ) {
          callback( dummy );
      });

      subject.handleChange();
      expect(subject.state.cal_data).toEqual(FakeData.CALENDAR);
      expect(subject.state.panel_data).toEqual(FakeData.PANEL);
      expect(subject.state.hint_data).toEqual(dummy);
    });
  });

});
