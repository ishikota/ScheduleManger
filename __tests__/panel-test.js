jest.dontMock('../client/app/components/panel')
jest.dontMock('../client/app/fake_data');

describe( 'Panel component', function () {
  var React       = require('react/addons');
  var Panel       = require('../client/app/components/panel');
  var PanelHeader = require('../client/app/components/panel_head');
  var PanelBody   = require('../client/app/components/panel_body');
  var FakeData    = require('../client/app/fake_data');
  var TestUtils   = React.addons.TestUtils;

  var subject,
      menu = [
        { id : 0, title : "default" },
        { id : 1, title : "menu1"   },
        { id : 2, title : "menu2"   },
        { id : 3, title : "menu3"   }
      ];

  beforeEach( function () {
    subject = TestUtils.renderIntoDocument(
      <Panel menu={menu} data={FakeData.PANEL2}/>
      );
  });

  describe( 'initialize child components', function () {

    it ( 'should pass menu and items to child components', function () {
      var head = TestUtils.scryRenderedComponentsWithType(subject, PanelHeader),
          body = TestUtils.scryRenderedComponentsWithType(subject, PanelBody);
      expect(head[0].props.menu).toEqual(menu);
      expect(body[0].props.items).toEqual(FakeData.PANEL2);
    });
  });

});
