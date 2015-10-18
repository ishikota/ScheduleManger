jest.dontMock('../client/app/components/panel_head')

describe( 'PanelHead component', function () {
  var React       = require('react/addons');
  var PanelHeader = require('../client/app/components/panel_head');
  var TestUtils   = React.addons.TestUtils;

  describe( 'renderIntoDocument', function () {
    xit ( 'should render the component', function () {
      TestUtils.renderIntoDocument(<PanelHeader />);
    });
  });

  describe( 'display correct title', function () {
    var subject,
        menu = [
          { id : 0, title : "default", callback : jest.genMockFunction() },
          { id : 1, title : "menu1"  , callback : jest.genMockFunction() },
          { id : 2, title : "menu2"  , callback : jest.genMockFunction() },
          { id : 3, title : "menu3"  , callback : jest.genMockFunction() }  ];


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
      // click menu 3
      var targets = TestUtils.scryRenderedDOMComponentsWithClass(
        subject, "panel-menu-item"
        );
      expect(targets.length).toBe(3);
      TestUtils.Simulate.click(targets[2]);
      expect(menu[3].callback).toBeCalled();
      // check if menu state has changed
      var btn = TestUtils.scryRenderedDOMComponentsWithClass(
        subject, "btn"
        );
      expect(btn[0].textContent).toEqual(menu[3].title);
      targets = TestUtils.scryRenderedDOMComponentsWithClass(
        subject, "panel-menu-item"
        );
      for( var i=0; i<targets.length; i++ ) {
        expect(targets[i].textContent).toEqual(menu[i].title);
      }
    });
      
  });

});
