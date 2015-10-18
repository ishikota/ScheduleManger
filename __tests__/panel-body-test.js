jest.dontMock('../client/app/components/panel_body')

describe( 'PanelBody component', function () {
  var React      = require('react/addons');
  var PanelMedia = require('../client/app/components/panel_media');
  var PanelBody  = require('../client/app/components/panel_body');
  var TestUtils  = React.addons.TestUtils;

  describe( 'write passed media', function () {
    var subject,
        items = [
          { msg : "media1", avtr_ids : [0,0,0,0] },
          { msg : "media2", avtr_ids : [0,1] },
          { msg : "media3", avtr_ids : [1] }
        ];
    beforeEach( function () {
      subject = TestUtils.renderIntoDocument(
        <PanelBody items={items} />
      );
    });

    it ( 'should pass information to media', function () {
      var i,
        media = TestUtils.scryRenderedComponentsWithType(subject, PanelMedia);
      expect(media.length).toBe(3);
      for (i=0; i<media.length; i++) {
        expect(media[i].props.msg).toEqual(items[i].msg);
        expect(media[i].props.avtr_ids).toEqual(items[i].avtr_ids);
      }
    });
  });
});
