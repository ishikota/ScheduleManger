jest.dontMock('../client/app/components/cal_head');

describe( 'Calendar Header component' , function () {
  var React     = require('react/addons');
  var CalHead   = require('../client/app/components/cal_head');
  var TestUtils = React.addons.TestUtils;
  var ScheduleActions = require('../client/app/flux/ScheduleActions');

  describe( 'renderIntoDocument', function () {
    it ( 'should render the component', function () {
      TestUtils.renderIntoDocument(<CalHead/>);
    });
  });

  describe( 'parseMonth', function () {
    it ( 'should parse month from int to string', function () {
      var 
        date    = new Date(2015, 10),
        subject = TestUtils.renderIntoDocument(
        <CalHead year={date.getFullYear()} month={date.getMonth()}/>
        );

      expect(subject.props.month).toBe(10);
      expect(React.findDOMNode(subject).textContent).toContain('November');
    });
  });


  describe( 'handle controller click', function () {
    var subject, date, mock_func;

    beforeEach( function () {
      date    = new Date(2015, 10);
      mock_func = jest.genMockFunction();
      subject = TestUtils.renderIntoDocument(
        <CalHead year={date.getFullYear()} month={date.getMonth()}/>
        );
    });

    it ( 'should forward a month', function () {
      var btn_next= TestUtils.scryRenderedDOMComponentsWithClass(
                      subject, "next"
                    ),
          target = ScheduleActions.updateCalendar.mock;
      expect(btn_next.length).toBe(1);
      TestUtils.Simulate.click(React.findDOMNode(btn_next[0]));
      expect(target.calls[target.calls.length-1][0]).toEqual({ year:2015, month:11 });
    });


    it ( 'should backward a month', function () {
      var btn_back = TestUtils.scryRenderedDOMComponentsWithClass(
                      subject, "back"
                    ),
          target = ScheduleActions.updateCalendar.mock;
      expect(btn_back.length).toBe(1);
      TestUtils.Simulate.click(React.findDOMNode(btn_back[0]));
      expect(target.calls[target.calls.length-1][0]).toEqual({ year:2015, month:9 });
    });
  });

  describe( "next month of December should be January in next year", function () {
    it ( "should go Kamakura Bakuhu year",function () {
      var subject = TestUtils.renderIntoDocument(
        <CalHead year={1191} month={11}/>
      ),
          target  = ScheduleActions.updateCalendar.mock;
      subject.handleClick({ target : { className : ['next'] }});
      expect(target.calls[target.calls.length-1][0]).toEqual({year:1192, month:0});
    });
  });
      


});
