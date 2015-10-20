jest.dontMock('../client/app/components/schedule_panel')
jest.dontMock('../client/app/fake_data');

describe( 'Panel component', function () {
  var React  = require('react/addons');
  var SchedulePanel = require('../client/app/components/schedule_panel');
  var Panel       = require('../client/app/components/panel');
  var PanelHeader = require('../client/app/components/panel_head');
  var PanelBody   = require('../client/app/components/panel_body');
  var TestUtils   = React.addons.TestUtils;
  var FakeData    = require('../client/app/fake_data');

  describe( 'display content', function () {
    var subject, data;

    beforeEach( function () {
      data = FakeData.PANEL2();
      subject = TestUtils.renderIntoDocument(
        <SchedulePanel data={data} />
        );
    });

    it ( 'should pass props to child', function () {
      var panel = TestUtils.scryRenderedComponentsWithType(subject, Panel);
      expect(panel[0].props.data).toEqual(data);
      expect(panel[0].props.menu).toEqual(
        [
          { id : 1 , title : "Filter-1"   },
          { id : 0 , title : "Filter-All" },
          { id : 2 , title : "Filter-2"   },
          { id : 3 , title : "Filter-3"   }
        ]);
    });
  });
});
