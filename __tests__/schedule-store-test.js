jest.dontMock('../client/app/flux/ScheduleStore')

describe( 'ScheduleStore', function () {
  var React     = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var Dispatcher = require('../client/app/flux/Dispatcher');
  var ScheduleActions = require('../client/app/flux/ScheduleActions');
  var ScheduleConstants = require('../client/app/flux/ScheduleConstants');
  var ScheduleStore = require('../client/app/flux/ScheduleStore');

  describe( 'emit change when Action received', function () {
    var mockFunc;

    beforeEach( function () {
      mockFunc = jest.genMockFunction();
      ScheduleStore.addChangeListener(mockFunc);
    });

    it( "shold call mockFunc as callback", function () {
      ScheduleStore.fetchDateInfo({});
      expect(mockFunc).toBeCalled();
    });

  });

});
