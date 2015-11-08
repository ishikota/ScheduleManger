jest.dontMock('../server/util');
var _    = require('underscore');
var Util = require('../server/util');

describe( "User api test", function () {
  it ( 'should accept schedule', function () {
    var schedule = _.map(_.range(12),function(){ return _.map(_.range(32),function(e){return "0"})});
    var expected = _.map(_.range(12),function(){ return _.map(_.range(32),function(e){return 0})});
    expect(Util.formatSchedule(schedule)).toEqual(expected);
  });

  it ( 'should reject schedule', function () {
    var schedule = _.map(_.range(12),function(){ return _.map(_.range(32),function(e){return "0"})});
    schedule[9][31] = "Heppay Helloween!!";
    expect(Util.formatSchedule(schedule)).toBe(-1);
  });
});
