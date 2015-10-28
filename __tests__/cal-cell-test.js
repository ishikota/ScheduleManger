jest.dontMock('../client/app/components/cal_cell')

describe( 'Calendar Cell component', function () {
  var React     = require('react/addons');
  var CalCell   = require('../client/app/components/cal_cell');
  var TestUtils = React.addons.TestUtils;
  var ScheduleActions = require('../client/app/flux/ScheduleActions');

  describe( 'render correct date and state', function () {
    var subject, tb, row, td, mockFunc;
    var preprocess = function (status) {
      mockFunc = jest.genMockFunction();
      tb  = document.createElement("table");
      row = document.createElement("row");
      document.body.appendChild(tb);
      tb.appendChild(row);
      subject = React.render(
        <CalCell val={2} status={status} statelist={["", "blue"]} onClick={mockFunc}/>,
        tb
      );
      td = TestUtils.findRenderedDOMComponentWithTag(subject, "td");
    };

    var afterprocess = function () {
      React.unmountComponentAtNode(tb);
      tb.parentNode.removeChild(tb);
    };

    describe( 'get correct class', function () {
      it ( 'should get class "cal-cell"', function () {
        preprocess(0);
        expect(td.className).toEqual("cal-cell");
        afterprocess();
      });
      it ( 'should get class "cal-cell blue"', function () {
        preprocess(1);
        expect(td.className).toEqual("cal-cell blue");
        afterprocess();
      });
    });

    describe ( 'sets 2 on props.val', function () {
      it ( 'should display 2 and have class "cal-cell"', function () {
        preprocess(0);
        expect(React.findDOMNode(subject).textContent).toEqual("2");
        expect(td.className).toEqual("cal-cell");
        expect(subject.props.status).toBe(0);
        subject.handleClick();
        expect(mockFunc).toBeCalledWith({ day:2, next_state:1});
        afterprocess();
      });
      it ( 'should display 2 and have class "cal-cell blue"', function () {
        preprocess(1);
        expect(React.findDOMNode(subject).textContent).toEqual("2");
        expect(td.className).toEqual("cal-cell blue");
        expect(subject.props.status).toBe(1);
        subject.handleClick();
        expect(mockFunc).toBeCalledWith({ day:2, next_state:0});
        afterprocess();
      });
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
