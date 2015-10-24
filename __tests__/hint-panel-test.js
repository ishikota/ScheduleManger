jest.dontMock('../client/app/components/hint_panel');

describe( 'HintPanel components', function () {
  var React       = require('react/addons');
  var TestUtils   = React.addons.TestUtils;
  var HintPanel   = require('../client/app/components/hint_panel');
  var EditHint    = require('../client/app/components/edit_hint');
  var WelcomeHint = require('../client/app/components/welcome_hint');

  it ( 'should render edit hint', function () {
    var subject, target, props = { numer:2, denom:3, editing:true };
    subject = TestUtils.renderIntoDocument(<HintPanel mode={0} data={props}/>);
    target  = TestUtils.scryRenderedComponentsWithType(subject, EditHint)[0];
    expect(target.props.numer).toBe(props.numer);
    expect(target.props.denom).toBe(props.denom);
    expect(target.props.visible).toBe(props.editing);
  });

  it ( 'should render welcome hint', function () {
    var subject, target, props = {};
    subject = TestUtils.renderIntoDocument(<HintPanel mode={1} data={props}/>);
    target  = TestUtils.scryRenderedComponentsWithType(subject, WelcomeHint)[0];
  });

});

