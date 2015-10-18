jest.dontMock('../client/app/components/cal_row');

describe( 'Calendar Row component', function () {
  var React     = require('react/addons');
  var CalRow    = require('../client/app/components/cal_row');
  var TestUtils = React.addons.TestUtils;

  describe( 'renderIntoDocument', function () {
    it ('should render the component', function () {
      TestUtils.renderIntoDocument(<CalRow start={1} end={31}/>);
    });
  });

  describe( 'CalRow.validate', function () {

    it ( 'should return -1 when passed date is invalid', function () {
      var calrow = TestUtils.renderIntoDocument(<CalRow start={1} end={28}/>);
      expect(calrow.validate(-1)).toBe(false);
      expect(calrow.validate(0)).toBe(false);
      expect(calrow.validate(29)).toBe(false);
    });

    it ( 'should return  passed date when it is valid', function () {
     var calrow = TestUtils.renderIntoDocument(<CalRow start={1} end={28}/>);
     expect(calrow.validate(1)).toBe(true);
     expect(calrow.validate(28)).toBe(true);
    });
  });

});
