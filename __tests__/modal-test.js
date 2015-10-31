jest.dontMock('../client/app/components/modal')
jest.dontMock('../client/app/fake_data');

describe ( 'Modal component', function () {
  var React     = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var FAKE_DATA = require('../client/app/fake_data');
  var TEXT      = require('../client/app/text_content');
  var Modal     = require('../client/app/components/modal');
  var ShareModalBody = require('../client/app/components/share_modal_body');
  var MainModalBody  = require('../client/app/components/main_modal_body');

  it ( 'should render welcome modal', function () {
    var dummy = { dummy:true };
    var subject = TestUtils.renderIntoDocument(<Modal mode={1} data={dummy}/>),
        title   = TestUtils.findRenderedDOMComponentWithTag(subject, "h4"),
        body    = TestUtils.findRenderedComponentWithType(subject, ShareModalBody);
    expect(title.textContent).toEqual(TEXT.SHARE_TITLE);
    expect(body.props.data).toEqual(dummy);
  });

  it ( 'should render login modal', function () {
    var data = {
      id : "a",
      leader   : "1",
      member   : FAKE_DATA.getFakeEventData().member
    };
    var subject = TestUtils.renderIntoDocument(<Modal mode={0} data={data}/>),
        title   = TestUtils.findRenderedDOMComponentWithTag(subject, "h4"),
        body    = TestUtils.findRenderedComponentWithType(subject, MainModalBody);
    expect(body.props.event_id).toEqual(data.id);
    expect(title.textContent)
        .toEqual(data.member[data.leader].name+" "+TEXT.LOGIN_TITLE);
  });

});
