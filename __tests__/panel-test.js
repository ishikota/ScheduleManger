jest.dontMock('../client/app/components/panel')

describe( 'Panel component', function () {
  var React       = require('react/addons');
  var Panel       = require('../client/app/components/panel');
  var PanelHeader = require('../client/app/components/panel_head');
  var PanelBody   = require('../client/app/components/panel_body');
  var TestUtils   = React.addons.TestUtils;

  var subject,
      mockFetch = jest.genMockFunction().mockReturnValue(
        [ { msg: "mock", avtr_ids : [1,1] } ]
      ),
      menu = [
        { id : 0, title : "default", fetch_data : jest.genMockFunction() },
        { id : 1, title : "menu1"  , fetch_data : mockFetch              },
        { id : 2, title : "menu2"  , fetch_data : jest.genMockFunction() },
        { id : 3, title : "menu3"  , fetch_data : jest.genMockFunction() }
      ];

  beforeEach( function () {
    subject = TestUtils.renderIntoDocument(
      <Panel menu={menu} />
      );
  });

  describe( 'initialize child components', function () {

    it ( 'should pass menu and items to child components', function () {
      expect(PanelHeader.mock.calls[0][0].menu).toEqual(menu);
      expect(menu[0].fetch_data).toBeCalled();
    });

  });

  describe( 'handle menu click', function () {
    it ( 'should update body content', function () {
      var media,
          body = TestUtils.scryRenderedComponentsWithType(subject, PanelBody);
      subject.state.menu[1].callback();
      expect(mockFetch).toBeCalled();
      expect(body[0].props.items).toEqual(mockFetch());
    });
  });

});
