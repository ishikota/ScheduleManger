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
        data = FakeData.getDummyPanelData().data[0];

    beforeEach( function () {
      subject = TestUtils.renderIntoDocument(
        <PanelMedia msg={data.msg} member={data.member}/>
      );
    });

    it ( 'should display passed message', function () {
      expect(React.findDOMNode(subject).textContent).toEqual(data.msg);
    });

    it ( 'should display passed avatars', function () {
      var avtrs = TestUtils.scryRenderedDOMComponentsWithClass(subject, "avtr");
      expect(avtrs.length).toBe(data.member.length);
    });

  });


});
