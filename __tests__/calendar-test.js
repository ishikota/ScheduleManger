jest.dontMock('../client/app/components/calendar');

describe( 'Calendar Header component' , function () {
  var React     = require('react/addons');
  var Calendar   = require('../client/app/components/calendar');
  var CalHeader = require('../client/app/components/cal_head');
  var CalTable  = require('../client/app/components/cal_table');
  var FakeData  = require('../client/app/fake_data');
  var TestUtils = React.addons.TestUtils;
  var ScheduleActions = require('../client/app/flux/ScheduleActions');

  describe( 'basic spec check', function () {

    var subject;
    beforeEach( function () {
      subject = TestUtils.renderIntoDocument(
        <Calendar year={2015} month={10} status={FakeData.CALENDAR.status}/>
      );
    });

    it ('should pass props to children', function () {
      var head  = TestUtils.scryRenderedComponentsWithType(subject, CalHeader)[0],
          table = TestUtils.scryRenderedComponentsWithType(subject, CalTable)[0];
      expect(head.props.year).toBe(2015);
      expect(head.props.month).toBe(10);
      expect(table.props.year).toBe(2015);
      expect(table.props.month).toBe(10);
      expect(table.props.status).toEqual(FakeData.CALENDAR.status);
    });

  });

  describe( 'handle controller click event', function () {
    var subject;

    beforeEach( function () {
      var date = new Date(2015, 11);
      subject = TestUtils.renderIntoDocument(
        <Calendar year={date.getFullYear()} month={date.getMonth()} />
        );
    });

    it ( 'should forward a month', function () {
      /*var head  = TestUtils.scryRenderedComponentsWithType(subject, CalHeader),
          table = TestUtils.scryRenderedComponentsWithType(subject, CalTable);
      expect(head.length).toBe(1);
      expect(table.length).toBe(1); */
      subject.handleChange(true);
      expect(ScheduleActions.orderCalendar.mock.calls[0]).toEqual([-1,2016,0,-1,-1]);
    });
    
    it ( 'should backward a month', function () {
      var target = ScheduleActions.orderCalendar.mock;
      subject.handleChange(false);
      expect(target.calls[target.calls.length-1]).toEqual([-1,2015,10,-1,-1]);
    });

  });

});
