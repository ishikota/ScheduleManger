jest.dontMock('../src/jsx/Hello.js');
describe('Hello component', function () {
  var React = require('react/addons');
  var Hello = require('../src/jsx/Hello.js');
  var TestUtils = React.addons.TestUtils;

  it( 'should have the content "Hello World"', function() {
    var hello = TestUtils.renderIntoDocument(
      <Hello world="World" />
    );
    expect(hello.props.world).toEqual('World');
  });
});
