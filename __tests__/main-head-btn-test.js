jest.dontMock('../client/app/components/main_head_btn')

describe( 'WelcomeHeadBtn component', function () {
  var React           = require('react/addons');
  var TestUtils       = React.addons.TestUtils;
  var MainHeadBtn     = require('../client/app/components/main_head_btn');
  var ScheduleStore   = require('../client/app/flux/ScheduleStore');
  var TEXT            = require('../client/app/text_content');
  var API             = require('../client/app/api');

  describe ( 'set owner_id to -1', function () {
    var subject;
    beforeEach( function () {
      var data = { event_id:"abc", owner_id:"-1", schedule:[1,2] };
      subject = TestUtils.renderIntoDocument(
        <MainHeadBtn data={data}/>
      );
    });

    it ( 'should display to-my-calendar message', function () {
      expect(React.findDOMNode(subject).textContent)
          .toEqual(TEXT.EDIT_MY_SCHEDULE);
    });

    it ( 'should handle click', function () {
      var
        calls,
        mockFunc = jest.genMockFunction(),
        btn = TestUtils.findRenderedDOMComponentWithTag(subject, "btn");
      API.updateUser = mockFunc;
      TestUtils.Simulate.click(btn);
      calls = ScheduleStore.switchCalendar.mock.calls;
      expect(calls[calls.length-1]).toEqual(["0"]);
      expect(mockFunc).not.toBeCalled();
    });

  });

  describe( 'set owner_id to mine', function () {
    var subject;
    beforeEach( function () {
      var data = { event_id:"abc", owner_id:"def", schedule:[1,2] };
      subject = TestUtils.renderIntoDocument(
        <MainHeadBtn data={data}/>
      );
    });

    it ( 'should display to-event-calendar message', function () {
      expect(React.findDOMNode(subject).textContent)
          .toEqual(TEXT.FINISH_EDIT);
    });

    it ( 'should handle click', function () {
      var
        calls,
        mockFunc = jest.genMockFunction(),
        btn = TestUtils.findRenderedDOMComponentWithTag(subject, "btn");
      TestUtils.Simulate.click(btn);
      calls = API.updateUser.mock.calls;
      expect(calls[calls.length-1][0]).toEqual("abc");
      expect(calls[calls.length-1][1]).toEqual("def");
      expect(calls[calls.length-1][2]).toEqual(null);
      expect(calls[calls.length-1][3]).toEqual([1,2]);
    });
  });

});


