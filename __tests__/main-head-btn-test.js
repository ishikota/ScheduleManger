jest.dontMock('../client/app/components/main_head_btn')

describe( 'WelcomeHeadBtn component', function () {
  var React           = require('react/addons');
  var TestUtils       = React.addons.TestUtils;
  var MainHeadBtn     = require('../client/app/components/main_head_btn');
  var ScheduleStore   = require('../client/app/flux/ScheduleStore');
  var TEXT            = require('../client/app/text_content');

  describe ( 'set owner_id to -1', function () {
    var subject;
    beforeEach( function () {
      subject = TestUtils.renderIntoDocument(
        <MainHeadBtn data={{owner_id:"-1"}}/>
      );
    });

    it ( 'should display to-my-calendar message', function () {
      expect(React.findDOMNode(subject).textContent)
          .toEqual(TEXT.MAIN_HEADER_MY_CALENDAR);
    });

    it ( 'should handle click', function () {
      var
        calls,
        btn = TestUtils.findRenderedDOMComponentWithTag(subject, "btn");
      TestUtils.Simulate.click(btn);
      calls = ScheduleStore.switchCalendar.mock.calls;
      expect(calls[calls.length-1]).toEqual(["0"]);
    });

  });

  describe( 'set owner_id to 0', function () {
    var subject;
    beforeEach( function () {
      subject = TestUtils.renderIntoDocument(
        <MainHeadBtn data={{owner_id:"0"}}/>
      );
    });

    it ( 'should display to-event-calendar message', function () {
      expect(React.findDOMNode(subject).textContent)
          .toEqual(TEXT.MAIN_HEADER_EVENT_CALENDAR);
    });

    it ( 'should handle click', function () {
      var
        calls,
        btn = TestUtils.findRenderedDOMComponentWithTag(subject, "btn");
      TestUtils.Simulate.click(btn);
      calls = ScheduleStore.switchCalendar.mock.calls;
      expect(calls[calls.length-1]).toEqual(["-1"]);
    });
  });

});


