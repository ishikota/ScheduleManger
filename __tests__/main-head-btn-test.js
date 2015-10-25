jest.dontMock('../client/app/components/main_head_btn')

describe( 'WelcomeHeadBtn component', function () {
  var React           = require('react/addons');
  var TestUtils       = React.addons.TestUtils;
  var MainHeadBtn     = require('../client/app/components/main_head_btn');
  var ScheduleActions = require('../client/app/flux/ScheduleActions');
  var TEXT            = require('../client/app/text_content');

  var subject;
  beforeEach( function () {
    subject = TestUtils.renderIntoDocument(
      <MainHeadBtn />
    );
  });

  it ( 'should display correct message', function () {
    expect(React.findDOMNode(subject).textContent)
        .toEqual(TEXT.MAIN_HEADER_BUTTON_OFF);
  });

});


