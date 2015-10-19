jest.dontMock('../client/app/components/cal_cell')

describe( 'Calendar Cell component', function () {
  var React     = require('react/addons');
  var CalCell   = require('../client/app/components/cal_cell');
  var TestUtils = React.addons.TestUtils;
  var ScheduleActions = require('../client/app/flux/ScheduleActions');

  describe( 'renderIntoDocument', function () {
    xit ( 'should render the component', function () {
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

  describe( 'invoke callback directoly', function () {
    xit ( 'should change state and send action to store', function () {
      var subject = TestUtils.renderIntoDocument(<CalCell />);
      subject.handleClick();
      expect(subject.state.selected).toBe(true);
      expect(ScheduleActions.fetchDateInfo.mock.calls.length).toBe(1);
      console.log(subject);
    });
  });


});
