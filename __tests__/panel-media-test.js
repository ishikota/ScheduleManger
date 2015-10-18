jest.dontMock('../client/app/components/panel_media')

describe( 'PanelMedia component', function () {
  var React      = require('react/addons');
  var PanelMedia = require('../client/app/components/panel_media');
  var TestUtils  = React.addons.TestUtils;

  describe( 'renderIntoDocument', function () {
    xit ( 'should render the component', function () {
      TestUtils.renderIntoDocument(<PanelMedia />);
    });
  });

  describe( 'display content', function () {
    var subject,
        msg = "Test Message!!",
        avatar_ids = [1,0,1,1,1,1,0,0];
    
    beforeEach( function () {
      subject = TestUtils.renderIntoDocument(
        <PanelMedia msg={msg} avtr_ids={avatar_ids}/>
      );
    });

    it ( 'should display passed message', function () {
      expect(React.findDOMNode(subject).textContent).toEqual(msg);
    });

    it ( 'should display passed avatars', function () {
      var avtrs = TestUtils.scryRenderedDOMComponentsWithClass(subject, "avtr");
      expect(avtrs.length).toBe(avatar_ids.length);
    });

  });


});
