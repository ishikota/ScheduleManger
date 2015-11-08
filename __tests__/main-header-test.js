jest.dontMock('../client/app/components/main_header')

describe( 'MainHeader component', function () {
  var React       = require('react/addons');
  var TestUtils   = React.addons.TestUtils;
  var MainHeader  = require('../client/app/components/main_header');
  var MainHeadBtn = require('../client/app/components/main_head_btn');
  var WelcomeBtn  = require('../client/app/components/welcome_head_btn');
  var TEXT = require('../client/app/text_content');

  describe( 'welcome mode', function () {
    it ( 'should display welcome button', function () {
      var subject = TestUtils.renderIntoDocument(
        <MainHeader mode={1} data={{any:"thing"}}/>
      );
      var btn = TestUtils.scryRenderedComponentsWithType(subject, WelcomeBtn);
      expect(btn.length).toBe(1);
      expect(React.findDOMNode(subject).textContent).toEqual(TEXT.APP_NAME);
    });
  });

  describe( 'main mode', function () {
    it ( 'should display message', function () {
      var subject = TestUtils.renderIntoDocument(
        <MainHeader mode={0} data={{owner_id:"-1"}}/>
      );
      var btn = TestUtils.scryRenderedComponentsWithType(subject, MainHeadBtn);
      expect(btn.length).toBe(1);
    });
  });

});
