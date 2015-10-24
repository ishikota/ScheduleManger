jest.dontMock('../client/app/components/edit_hint')

describe( 'EditHint component', function () {
  var React       = require('react/addons');
  var TestUtils   = React.addons.TestUtils;
  var EditHint    = require('../client/app/components/edit_hint')

  describe( 'visible 70% progress state', function () {
    var subject;
    beforeEach( function () {
      subject = TestUtils.renderIntoDocument(
        <EditHint numer={7} denom={12} visible={true} />
      );
    });
    
    it( 'should display content', function () {
      var progress = TestUtils.scryRenderedDOMComponentsWithClass(subject, "sr-only");
      expect(progress.length).toBe(1);
      expect(progress[0].textContent).toEqual("58% Completed");
    });

    it( 'should set width to match its progress', function () {
      var progress = TestUtils.scryRenderedDOMComponentsWithClass(subject, "progress-bar");
      expect(progress[0].textContent).toContain("7 / 12");
    });

    it ( 'should be invisible', function () {
      var panel = TestUtils.scryRenderedDOMComponentsWithClass(subject, "panel-body");
      expect(panel[0].className).not.toContain("hide");
    });
  });

  describe( 'invisible 100% progress state', function () {
    var subject;
    beforeEach( function () {
      subject = TestUtils.renderIntoDocument(
        <EditHint numer={7} denom={12} visible={false}/>
      );
    });

    it ( 'should be invisible', function () {
      var panel = TestUtils.scryRenderedDOMComponentsWithClass(subject, "panel-body");
      expect(panel[0].className).toContain("hide");
    });
  });

});
