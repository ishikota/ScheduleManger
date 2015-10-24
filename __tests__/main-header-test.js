jest.dontMock('../client/app/components/main_header')

describe( 'MainHeader component', function () {
  var React      = require('react/addons');
  var TestUtils  = React.addons.TestUtils;
  var MainHeader = require('../client/app/components/main_header');
  var ScheduleActions = require('../client/app/flux/ScheduleActions');

  describe( 'click handler', function () {
    var subject;
    beforeEach( function () {
      subject = TestUtils.renderIntoDocument(
        <MainHeader/>
      );
    });

    it ( 'should invole callback when clicked', function () {
      var calls, btn;
      expect(subject.state.editing).toBe(false);
      subject.switchEditMode( null );
      calls = ScheduleActions.edit.mock.calls;
      expect(calls[calls.length-1][0]).toEqual({ editing : true });
      btn = TestUtils.scryRenderedDOMComponentsWithTag(subject, "button");
      TestUtils.Simulate.click(btn[0]);
      expect(subject.state.editing).toBe(false);
      expect(calls[calls.length-1][0]).toEqual({ editing : false });
    });
  });
});
