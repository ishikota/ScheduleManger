jest.dontMock('../src/jsx/cal_table');

describe( 'Calendar Table component', function () {
  var React     = require('react/addons');
  var CalTable  = require('../src/jsx/cal_table');
  var CalRow    = require('../src/jsx/cal_row');
  var CalCell   = require('../src/jsx/cal_cell');
  var TestUtils = React.addons.TestUtils;

  describe( 'renderIntoDocument', function () {
    it ( 'should render the component', function () {
      TestUtils.renderIntoDocument(<CalTable year={2015} month={1}/>);
    });
  });

  describe( 'get month info', function () {

    it ( 'should calculate lines, offset and last-day of 2015/10', function () {
      var caltb = TestUtils.renderIntoDocument(
        <CalTable year={2015} month={9} />
      );
      expect(caltb.getOffset()).toBe(4);
      expect(caltb.getLastDay()).toBe(31);
      expect(caltb.getLines()).toBe(5);
    });
    
    it ( 'should calculate lines, offset and last-day of 2015/8', function () {
      var caltb = TestUtils.renderIntoDocument(
        <CalTable year={2015} month={7} />
      );
      expect(caltb.getOffset()).toBe(6);
      expect(caltb.getLastDay()).toBe(31);
      expect(caltb.getLines()).toBe(6);
    });

    it ( 'should calculate lines, offset and last-day of 2015/2', function () {
      var caltb = TestUtils.renderIntoDocument(
        <CalTable year={2015} month={1} />
      );
      expect(caltb.getOffset()).toBe(0);
      expect(caltb.getLastDay()).toBe(28);
      expect(caltb.getLines()).toBe(4);
    });
  });

});
