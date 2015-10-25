jest.dontMock('../client/app/components/welcome_hint');

describe( 'WelcomeHint component', function () {
  var React         = require('react/addons');
  var TestUtils     = React.addons.TestUtils;
  var WelcomeHint   = require('../client/app/components/welcome_hint');
  var TEXT          = require('../client/app/text_content');

  it ( 'should render howto choose possible date', function () {
    var dat = { numer:0, denom:32 };
    var subject = TestUtils.renderIntoDocument(
      <WelcomeHint data={dat} />
      );
    expect(React.findDOMNode(subject).textContent).toContain(TEXT.WELCOME_INTRO);
    expect(React.findDOMNode(subject).textContent).toContain(TEXT.WELCOME_HOWTO_SELECT);
  });
  
  it ( 'should render howto choose possible date', function () {
    var dat = { numer:1, denom:32 };
    var subject = TestUtils.renderIntoDocument(
      <WelcomeHint data={dat} />
      );
    expect(React.findDOMNode(subject).textContent).toContain(dat.numer);
    expect(React.findDOMNode(subject).textContent).toContain(TEXT.WELCOME_INPUT_STATE);
    expect(React.findDOMNode(subject).textContent).toContain(TEXT.WELCOME_HOWTO_SAVE);
  });

});
