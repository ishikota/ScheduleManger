jest.dontMock('../client/app/components/cal_cell')

describe( 'Calendar Cell component', function () {
  var React     = require('react/addons');
  var CalCell   = require('../client/app/components/cal_cell');
  var TestUtils = React.addons.TestUtils;
  var ScheduleActions = require('../client/app/flux/ScheduleActions');

  describe( 'render into body', function () {
    var subject, tb, row, mockFunc;
    beforeEach( function () {
      mockFunc = jest.genMockFunction();
      tb  = document.createElement("table");
      row = document.createElement("row");
      document.body.appendChild(tb);
      tb.appendChild(row);
      subject = React.render(
        <CalCell val={2} status={1} statelist={["", "blue", "red"]} onClick={mockFunc}/>,
        tb
      );
    });

    afterEach( function () {
      React.unmountComponentAtNode(tb);
      tb.parentNode.removeChild(tb);
    });

    it ( 'should change state and send action to store', function () {
      var td;
      spyOn(ScheduleActions, "update");
      expect(subject.state.click_count).toBe(0);
      // click 1
      subject.handleClick();
      expect(mockFunc).toBeCalledWith({ date: { day:2 } });
      expect(subject.state.click_count).toBe(1);
      td = TestUtils.scryRenderedDOMComponentsWithTag(subject, "td")[0];
      expect(td.className).toEqual("cal-cell blue");
      // click 2
      subject.handleClick();
      expect(subject.state.click_count).toBe(2);
      td = TestUtils.scryRenderedDOMComponentsWithTag(subject, "td")[0];
      expect(td.className).toEqual("cal-cell red");
      // click 3
      subject.handleClick();
      expect(subject.state.click_count).toBe(3);
      td = TestUtils.scryRenderedDOMComponentsWithTag(subject, "td")[0];
      expect(td.className).toEqual("cal-cell");

      var td = TestUtils.scryRenderedDOMComponentsWithTag(subject, "td")[0];
    });
  });

  describe( 'set correct date when', function () {

    it ( 'sets 2 on props.val', function () {
      var calcell = TestUtils.renderIntoDocument(
        <table><tr><CalCell val="2" statelist={[""]} onClick={function(){}}/></tr></table>
      );
      expect(React.findDOMNode(calcell).textContent).toEqual("2");
    });
  });

  describe( 'set invalid date when', function () {
    it ( 'sets -1 on props.val', function () {
      var calcell = TestUtils.renderIntoDocument(
        <table><tr><CalCell val="-1" statelist={[""]} onClick={function(){}}/></tr></table>
      );
      expect(React.findDOMNode(calcell).textContent).toEqual("");
    });

  });


});
