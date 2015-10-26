jest.dontMock('../client/app/components/welcome_head_btn')

describe( 'WelcomeHeadBtn component', function () {
  var React           = require('react/addons');
  var TestUtils       = React.addons.TestUtils;
  var WelcomeHeadBtn  = require('../client/app/components/welcome_head_btn');
  var ScheduleActions = require('../client/app/flux/ScheduleActions');
  var TEXT            = require('../client/app/text_content');

  it ( 'activated state', function () {
    var dat = { numer:1, denom:10 },
      subject = TestUtils.renderIntoDocument(
      <WelcomeHeadBtn data={dat} />
      ),
      btn = TestUtils.scryRenderedDOMComponentsWithTag(subject, "btn")[0];
    expect(React.findDOMNode(subject).textContent)
        .toEqual(TEXT.WELCOME_HEADER_BUTTON);
    expect(btn.className).not.toContain("disabled");
  });

  it ( 'unactivated state', function () {
    var dat = { numer:0, denom:10 },
      subject = TestUtils.renderIntoDocument(
      <WelcomeHeadBtn data={dat} />
      ),
      btn = TestUtils.scryRenderedDOMComponentsWithTag(subject, "btn")[0];
    expect(React.findDOMNode(subject).textContent)
        .toEqual(TEXT.WELCOME_HEADER_BUTTON);
    expect(btn.className).toContain("disabled");
  });

});


