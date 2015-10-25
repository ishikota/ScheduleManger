jest.dontMock('../client/app/components/cal_table');
jest.dontMock('../client/app/fake_data');

describe( 'Calendar Table component', function () {
  var React     = require('react/addons');
  var CalTable  = require('../client/app/components/cal_table');
  var CalRow    = require('../client/app/components/cal_row');
  var TestUtils = React.addons.TestUtils;
  var FakeData  = require('../client/app/fake_data');

  var mockSchedule = FakeData.getEventData().schedule[9];

  describe( 'basic spec check', function () {
    var subject, mockFunc;
    beforeEach( function () {
      mockFunc = jest.genMockFunction();
      subject = TestUtils.renderIntoDocument(
        <CalTable year={2015} month={1} status={mockSchedule}
                  statelist={[1,2,3]} onClick={mockFunc}/>
      );
    });
    
    it ( 'should pass status to the row', function () {
      var rows = TestUtils.scryRenderedComponentsWithType(subject, CalRow);
      expect(rows.length).toBe(4);
      expect(rows[0].props.status).toEqual(mockSchedule.slice( 0, 7));
      expect(rows[1].props.status).toEqual(mockSchedule.slice( 7,14));
      expect(rows[2].props.status).toEqual(mockSchedule.slice(14,21));
      expect(rows[3].props.status).toEqual(mockSchedule.slice(21,28));
      expect(rows[0].props.statelist).toEqual([1,2,3]);
      expect(rows[0].props.onClick).toEqual(mockFunc);
    });

  });

  describe( 'get month info', function () {

    it ( 'should calculate lines, offset and last-day of 2015/10', function () {
      var caltb = TestUtils.renderIntoDocument(
        <CalTable year={2015} month={9} status={mockSchedule}/>
      );
      expect(caltb.getOffset()).toBe(4);
      expect(caltb.getLastDay()).toBe(31);
      expect(caltb.getLines()).toBe(5);
    });
    
    it ( 'should calculate lines, offset and last-day of 2015/8', function () {
      var caltb = TestUtils.renderIntoDocument(
        <CalTable year={2015} month={7} status={mockSchedule} />
      );
      expect(caltb.getOffset()).toBe(6);
      expect(caltb.getLastDay()).toBe(31);
      expect(caltb.getLines()).toBe(6);
    });

    it ( 'should calculate lines, offset and last-day of 2015/2', function () {
      var caltb = TestUtils.renderIntoDocument(
        <CalTable year={2015} month={1} status={mockSchedule} />
      );
      expect(caltb.getOffset()).toBe(0);
      expect(caltb.getLastDay()).toBe(28);
      expect(caltb.getLines()).toBe(4);
    });
  });

});
