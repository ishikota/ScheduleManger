jest.dontMock('../client/app/components/cal_head');

describe( 'Calendar Header component' , function () {
  var React     = require('react/addons');
  var CalHead   = require('../client/app/components/cal_head');
  var TestUtils = React.addons.TestUtils;

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
        <CalHead year={date.getFullYear()} month={date.getMonth()}
          onChange={mock_func}/>
        );
    });

    it ( 'should forward a month', function () {
      var btn_next= TestUtils.scryRenderedDOMComponentsWithClass(
                      subject, "next"
                    );
      expect(btn_next.length).toBe(1);
      TestUtils.Simulate.click(React.findDOMNode(btn_next[0]));
      expect(mock_func).toBeCalledWith(true);
    });


    it ( 'should backward a month', function () {
      var btn_back = TestUtils.scryRenderedDOMComponentsWithClass(
                      subject, "back"
                    );
      expect(btn_back.length).toBe(1);
      TestUtils.Simulate.click(React.findDOMNode(btn_back[0]));
      expect(mock_func).toBeCalledWith(false);
    });
  });

});
