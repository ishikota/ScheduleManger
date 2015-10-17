jest.dontMock('../src/jsx/calendar');

describe( 'Calendar Header component' , function () {
  var React     = require('react/addons');
  var Calendar   = require('../src/jsx/calendar');
  var CalHeader = require('../src/jsx/cal_head');
  var CalTable  = require('../src/jsx/cal_table');
  var TestUtils = React.addons.TestUtils;

  describe( 'renderIntoDocument', function () {
    it ( 'should render the component', function () {
      TestUtils.renderIntoDocument(<Calendar/>);
    });
  });

  describe( 'handle controller click event', function () {
    var subject;

    beforeEach( function () {
      var date = new Date(2015, 10);
      subject = TestUtils.renderIntoDocument(
        <Calendar year={date.getFullYear()} month={date.getMonth()} />
        );
    });

    it ( 'should forward a month', function () {
      var head  = TestUtils.scryRenderedComponentsWithType(subject, CalHeader),
          table = TestUtils.scryRenderedComponentsWithType(subject, CalTable);
      expect(head.length).toBe(1);
      expect(table.length).toBe(1);
      subject.handleChange(true);
      head  = head[0];
      table = table[0];
      expect(table.props.year).toBe(2015);
      expect(table.props.month).toBe(11);
      expect(table.props.year).toBe(2015);
      expect(table.props.month).toBe(11);
    });
    
    it ( 'should backward a month', function () {
      var head  = TestUtils.scryRenderedComponentsWithType(subject, CalHeader),
          table = TestUtils.scryRenderedComponentsWithType(subject, CalTable);
      expect(head.length).toBe(1);
      expect(table.length).toBe(1);
      subject.handleChange(false);
      head  = head[0];
      table = table[0];
      expect(table.props.year).toBe(2015);
      expect(table.props.month).toBe(9);
      expect(table.props.year).toBe(2015);
      expect(table.props.month).toBe(9);
    });

  });
});
