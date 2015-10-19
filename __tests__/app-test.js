jest.dontMock('../client/app/components/app');

describe( 'App component', function () {
  var React         = require('react/addons');
  var TestUtils     = React.addons.TestUtils;
  var App           = require('../client/app/components/app');
  var Dispatcher    = require('../client/app/flux/Dispatcher');
  var ScheduleStore = require('../client/app/flux/ScheduleStore');

  describe( 'renderIntoDocument', function () {
    it ( 'should render the component', function () {
      TestUtils.renderIntoDocument(<App/>);
    });
  });

  describe( 'register Dispatcher', function () {
    var subject = TestUtils.renderIntoDocument(<App/>);
    expect(Dispatcher.register.mock.calls.length).toBe(1);
  });

});
