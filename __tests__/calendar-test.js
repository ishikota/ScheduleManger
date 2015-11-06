jest.dontMock('../client/app/components/calendar');
jest.dontMock('../client/app/fake_data');

describe( 'Calendar Header component' , function () {
  var React     = require('react/addons');
  var Calendar   = require('../client/app/components/calendar');
  var CalHeader = require('../client/app/components/cal_head');
  var CalTable  = require('../client/app/components/cal_table');
  var FakeData  = require('../client/app/fake_data');
  var TestUtils = React.addons.TestUtils;
  var ScheduleActions = require('../client/app/flux/ScheduleActions');

  describe( 'basic spec check', function () {
    var schedule = FakeData.getFakeEventData().member["1"].schedule;

    it ('should pass props to children', function () {
      var mockFunc = jest.genMockFunction();
      var subject = TestUtils.renderIntoDocument(
        <Calendar year={2015} month={10} status={schedule}
                statelist={[1,2,3]} onClick={mockFunc}/>
      );
      var head  = TestUtils.scryRenderedComponentsWithType(subject, CalHeader)[0],
          table = TestUtils.scryRenderedComponentsWithType(subject, CalTable)[0];
      expect(head.props.year).toBe(2015);
      expect(head.props.month).toBe(10);
      expect(table.props.year).toBe(2015);
      expect(table.props.month).toBe(10);
      expect(table.props.status).toEqual(schedule[10]);
      expect(table.props.statelist).toEqual([1,2,3]);
      expect(table.props.onClick).toEqual(mockFunc);
    });

    it ( 'should use default callback', function () {
      var
        subject = TestUtils.renderIntoDocument(
          <Calendar year={2015} month={10} status={FakeData.getEventData()}
                statelist={[1,2,3]} />
        ),
        table = TestUtils.scryRenderedComponentsWithType(subject, CalTable)[0];
      expect(table.props.onClick).toEqual(jasmine.any(Function));
    });


  });
});
