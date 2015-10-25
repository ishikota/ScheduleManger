jest.dontMock('../client/app/components/panel_head')

describe( 'PanelHead component', function () {
  var React       = require('react/addons');
  var PanelHeader = require('../client/app/components/panel_head');
  var TestUtils   = React.addons.TestUtils;
  var ScheduleActions = require('../client/app/flux/ScheduleActions');

  describe( 'renderIntoDocument', function () {
    xit ( 'should render the component', function () {
      TestUtils.renderIntoDocument(<PanelHeader />);
    });
  });

  describe( 'display correct title', function () {

    describe( 'with menu 1', function () {
      var subject,
          menu = [
            { id : 0, title : "default"},
            { id : 1, title : "menu1"  },
            { id : 2, title : "menu2"  },
            { id : 3, title : "menu3"  }  ];


      beforeEach( function () {
        subject = TestUtils.renderIntoDocument(
          <PanelHeader menu={menu} />
        );
      });

      it ( 'should display default title', function () {
        var btn = TestUtils.scryRenderedDOMComponentsWithClass(
          subject, "btn"
          );
        expect(btn[0].textContent).toEqual(menu[0].title);
      });

      it ( 'should change displayed title and invoke callback', function () {
        var targets = TestUtils.scryRenderedDOMComponentsWithClass(
          subject, "panel-menu-item"
          );
        expect(targets.length).toBe(3);
        TestUtils.Simulate.click(targets[2]);
        expect(ScheduleActions.updateCalendar.mock.calls[0][0]).toEqual({ filter:3});
      });
      
    });

    describe (" with another menu", function () {
      var menu = [
            { id : 2, title : "menu2"    , callback : jest.genMockFunction() },
            { id : 1, title : "menu1"    , callback : jest.genMockFunction() },
            { id : 3, title : "menu3"    , callback : jest.genMockFunction() },
            { id : 0, title : "default"  , callback : jest.genMockFunction() }  ];
      it ( "should display menu in correct order", function () {
        var subject = TestUtils.renderIntoDocument( <PanelHeader menu={menu} /> ),
            btn = TestUtils.scryRenderedDOMComponentsWithClass(subject, "btn"),
            targets = TestUtils.scryRenderedDOMComponentsWithClass(subject, "panel-menu-item");
        expect(btn[0].textContent).toEqual(menu[0].title);
        expect(targets.length).toBe(3);
        for (var i=0; i<3; i++ ) {
          expect(targets[i].textContent).toEqual(menu[i+1].title);
        }

      });
    });
  });

});
