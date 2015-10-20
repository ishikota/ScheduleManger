jest.dontMock('../client/app/components/panel_body')
jest.dontMock('../client/app/fake_data');

describe( 'PanelBody component', function () {
  var React      = require('react/addons');
  var PanelMedia = require('../client/app/components/panel_media');
  var PanelBody  = require('../client/app/components/panel_body');
  var FakeData   = require('../client/app/fake_data');
  var TestUtils  = React.addons.TestUtils;

  describe( 'write passed media', function () {
    var subject;
    beforeEach( function () {
      subject = TestUtils.renderIntoDocument(
        <PanelBody items={FakeData.PANEL2()} />
      );
    });

    it ( 'should pass information to media', function () {
      var i,
        data  = FakeData.PANEL2().data,
        media = TestUtils.scryRenderedComponentsWithType(subject, PanelMedia);
      expect(media.length).toBe(2);
      for (i=0; i<media.length; i++) {
        expect(media[i].props.msg).toEqual(data[i].msg);
        expect(media[i].props.avtr).toEqual(data[i].avtr);
      }
    });
  });
});
