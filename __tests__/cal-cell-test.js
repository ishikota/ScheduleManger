jest.dontMock('../client/app/components/cal_cell')

describe( 'Calendar Cell component', function () {
  var React     = require('react/addons');
  var CalCell   = require('../client/app/components/cal_cell');
  var TestUtils = React.addons.TestUtils;
  var ScheduleActions = require('../client/app/flux/ScheduleActions');

  describe( 'render into body', function () {
    var subject, tb, row;
    beforeEach( function () {
      tb  = document.createElement("table");
      row = document.createElement("row");
      document.body.appendChild(tb);
      tb.appendChild(row);
      subject = React.render(
        <CalCell val={2} status={1} />,
        tb
      );
    });

    afterEach( function () {
      React.unmountComponentAtNode(tb);
      tb.parentNode.removeChild(tb);
    });

    it ( 'should have passed status', function () {
      expect(subject.props.status).toBe(1);
      expect(subject.props.val).toBe(2);
    });

    it ( 'should change state and send action to store', function () {
      spyOn(ScheduleActions, "update");
      subject.handleClick();
      expect(ScheduleActions.update).toHaveBeenCalledWith({ date: { day:2 } });
      expect(subject.state.selected).toBe(true);
      var td = TestUtils.scryRenderedDOMComponentsWithTag(subject, "td")[0];
      expect(td.className).toBe("cal-cell selected");
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
