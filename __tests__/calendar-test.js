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
});
