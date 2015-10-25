jest.dontMock('../client/app/components/main_header')

describe( 'MainHeader component', function () {
  var React       = require('react/addons');
  var TestUtils   = React.addons.TestUtils;
  var MainHeader  = require('../client/app/components/main_header');
  var MainHeadBtn = require('../client/app/components/main_head_btn');
  var WelcomeBtn  = require('../client/app/components/welcome_head_btn');
  var Text = require('../client/app/text_content');

  describe( 'welcome mode', function () {
    var subject;
    beforeEach( function () {
      subject = TestUtils.renderIntoDocument(
        <MainHeader mode={1}/>
      );
    });

    it ( 'should display welcome button', function () {
      var btn = TestUtils.scryRenderedComponentsWithType(subject, WelcomeBtn);
      expect(btn.length).toBe(1);
      //TestUtils.Simulate.click(btn);
      //expect(calls[calls.length-1][0]).toEqual({ editing : false });
    });
  });

  describe( 'main mode', function () {
    var subject;
    beforeEach( function() {
      subject = TestUtils.renderIntoDocument(
        <MainHeader mode={0}/>
      );
    });

    it ( 'should display message', function () {
      var btn = TestUtils.scryRenderedComponentsWithType(subject, MainHeadBtn);
      expect(btn.length).toBe(1);
      //btn = TestUtils.scryRenderedDOMComponentsWithTag(subject, "button")[0];
      //expect(btn.textContent).toEqual(Text.MAIN_HEADER_BUTTON_OFF);
    });
  });

});
