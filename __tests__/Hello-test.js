jest.dontMock('../client/app/components/Hello');
describe('Hello component', function () {
  var React = require('react/addons');
  var Hello = require('../client/app/components/Hello');
  var TestUtils = React.addons.TestUtils;

  it( 'should have the content "Hello World"', function() {
    var hello = TestUtils.renderIntoDocument(
      <Hello world="World" />
    );
    expect(hello.props.world).toEqual('World');
  });
});
