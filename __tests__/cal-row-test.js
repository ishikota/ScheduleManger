jest.dontMock('../client/app/components/cal_row');

describe( 'Calendar Row component', function () {
  var React     = require('react/addons');
  var CalRow    = require('../client/app/components/cal_row');
  var CalCell   = require('../client/app/components/cal_cell');
  var TestUtils = React.addons.TestUtils;
  var fake_status = [0,0,1,1,0,1,0];

  describe( 'basic spec check', function () {
    var subject, el, mockFunc;

    beforeEach( function () {
      mockFunc = jest.genMockFunction();
      el = document.createElement("table");
      document.body.appendChild(el);
      subject = React.render(
        <CalRow start={1} end={31} status={fake_status} 
                statelist={[1,2,3]}
                onClick={mockFunc}/>
        ,el
      );
    });

    afterEach( function () {
      React.unmountComponentAtNode(el);
      el.parentNode.removeChild(el);
    });
    
    it( 'should pass status to CalCell', function () {
      var cells = TestUtils.scryRenderedComponentsWithType(subject, CalCell);
      expect(cells.length).toBe(7);
      for ( var i=0; i<7 ; i++ ) {
        expect(cells[i].props.status).toBe(fake_status[i]);
        expect(cells[i].props.statelist).toEqual([1,2,3]);
        expect(cells[i].props.onClick).toEqual(mockFunc);
      }
    });
  });

  describe( 'CalRow.validate', function () {

    it ( 'should return -1 when passed date is invalid', function () {
      var calrow = TestUtils.renderIntoDocument(
        <CalRow start={1} end={28} status={fake_status} />);
      expect(calrow.validate(-1)).toBe(false);
      expect(calrow.validate(0)).toBe(false);
      expect(calrow.validate(29)).toBe(false);
    });

    it ( 'should return  passed date when it is valid', function () {
     var calrow = TestUtils.renderIntoDocument(
       <CalRow start={1} end={28} status={fake_status} />)
     expect(calrow.validate(1)).toBe(true);
     expect(calrow.validate(28)).toBe(true);
    });
  });

});
