jest.dontMock('../client/app/components/modal')

describe ( 'Modal component', function () {
  var React     = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var Modal     = require('../client/app/components/modal');
  var ShareModalBody = require('../client/app/components/share_modal_body');
  var TEXT      = require('../client/app/text_content');

  it ( 'should render welcome modal', function () {
    var dummy = { dummy:true };
    var subject = TestUtils.renderIntoDocument(<Modal mode={1} data={dummy}/>),
        title   = TestUtils.findRenderedDOMComponentWithTag(subject, "h4"),
        body    = TestUtils.findRenderedComponentWithType(subject, ShareModalBody);
    expect(title.textContent).toEqual(TEXT.SHARE_TITLE);
    expect(body.props.data).toEqual(dummy);
  });

});
