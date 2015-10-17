jest.dontMock('../src/jsx/cal_cell.js');

describe( 'Calendar Cell component', function () {
  var React     = require('react/addons');
  var CalCell   = require('../src/jsx/cal_cell.js');
  var TestUtils = React.addons.TestUtils;

  describe( 'renderIntoDocument', function () {
    it ( 'should render the component', function () {
      TestUtils.renderIntoDocument(<CalCell />);
    });
  });

  describe( 'set correct date when', function () {

    it ( 'sets 2 on props.val', function () {
      var calcell = TestUtils.renderIntoDocument(
        <table><tr><CalCell val="2"/></tr></table>
      );
      expect(React.findDOMNode(calcell).textContent).toEqual("2");
    });
  });

  describe( 'set invalid date when', function () {
    it ( 'sets -1 on props.val', function () {
      var calcell = TestUtils.renderIntoDocument(
        <table><tr><CalCell val="-1"/></tr></table>
      );
      expect(React.findDOMNode(calcell).textContent).toEqual("");
    });

  });

});
