jest.dontMock('../client/app/components/schedule_panel')

describe( 'Panel component', function () {
  var React  = require('react/addons');
  var SchedulePanel = require('../client/app/components/schedule_panel');
  var Panel       = require('../client/app/components/panel');
  var PanelHeader = require('../client/app/components/panel_head');
  var PanelBody   = require('../client/app/components/panel_body');
  var TestUtils   = React.addons.TestUtils;

  describe( 'display content', function () {
    var subject;

    beforeEach( function () {
      subject = TestUtils.renderIntoDocument(
        <SchedulePanel/>
        );
    });

    it ( 'should display correct menu', function () {
      var panel = TestUtils.scryRenderedComponentsWithType(subject, Panel);
      expect(panel[0].props.menu[0].title).toBe("default");
      expect(panel[0].props.menu[1].title).toBe("menu1");
      expect(panel[0].props.menu[2].title).toBe("menu2");
      expect(panel[0].props.menu[3].title).toBe("menu3");
    });
  });
});
