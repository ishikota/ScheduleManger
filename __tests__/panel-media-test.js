jest.dontMock('../client/app/components/panel_media')
jest.dontMock('../client/app/fake_data');

describe( 'PanelMedia component', function () {
  var React      = require('react/addons');
  var PanelMedia = require('../client/app/components/panel_media');
  var TestUtils  = React.addons.TestUtils;
  var FakeData    = require('../client/app/fake_data');

  describe( 'renderIntoDocument', function () {
    xit ( 'should render the component', function () {
      TestUtils.renderIntoDocument(<PanelMedia />);
    });
  });

  describe( 'display content', function () {
    var subject,
        msg = "Test Message!!",
        avatar = FakeData.PANEL2().data[0].avtr

    beforeEach( function () {
      subject = TestUtils.renderIntoDocument(
        <PanelMedia msg={msg} avtr={avatar}/>
      );
    });

    it ( 'should display passed message', function () {
      expect(React.findDOMNode(subject).textContent).toEqual(msg);
    });

    it ( 'should display passed avatars', function () {
      var avtrs = TestUtils.scryRenderedDOMComponentsWithClass(subject, "avtr");
      expect(avtrs.length).toBe(avatar.length);
    });

  });


});
