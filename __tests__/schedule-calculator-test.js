jest.dontMock('../client/app/schedule_calculator');


describe( 'calculate schedule', function () {
  var _ = require('underscore');
  var ScheduleCalculator = require('../client/app/schedule_calculator');
  var getEmptySchedule = function () {
    return _.map(_.range(12), function () {
      return _.map(_.range(32), function () {
        return 0;
      })
    });
  };
  var s1 = getEmptySchedule();
  var s2 = getEmptySchedule();
  var s3 = getEmptySchedule();
  s1[9][4]=1;s1[9][5]=1;s1[9][6]=1;s1[9][7]=1;s1[9][8]=1;s1[9][9]=1;
             s2[9][5]=1;s2[9][6]=1;           s2[9][8]=1;
  s3[9][4]=1;s3[9][5]=1;

  var kota = { _id : "d", name:"Kota", leader:true , schedule : s1 };
  var ishm = { _id : "e", name:"Ishm", leader:false, schedule : s2 };
  var motu = { _id : "f", name:"motu", leader:false, schedule : s3 };
  var event_data = {
    id : "abc",
    member : [ kota, ishm, motu ]
  };

  it ( 'should calculate event schedule', function () {
    var res = ScheduleCalculator.calcEventPanelData(event_data);
    console.log(res);
  });

  it ( 'should combine member schedule', function () {
    var res = ScheduleCalculator.combineMemberSchedule(event_data);
    expect(res[9][4][2].length).toBe(2);
    expect(res[9][5][2].length).toBe(3);
    expect(res[9][6][2].length).toBe(2);
    expect(res[9][7][2].length).toBe(1);
    expect(res[9][8][2].length).toBe(2);
    expect(res[9][9][2].length).toBe(1);
  });

  it ( 'should remove empty date', function () {
    var res = ScheduleCalculator.combineMemberSchedule(event_data);
    res = ScheduleCalculator.removeEmptyDate(res);
    for(var i=0;i<12;i++) {
      if (i==9) {
        expect(res[i].length).toBe(6);
      } else { 
        expect(res[i].length).toBe(0);
      }
    }
  });

  it( 'should remove empty month', function () {
    var res = ScheduleCalculator.combineMemberSchedule(event_data);
    res = ScheduleCalculator.removeEmptyDate(res);
    res = ScheduleCalculator.removeEmptyMonth(res);
    expect(res.length).toBe(1);
  });

  it ( 'should calculate dates when at least 1 people can attend', function () {
    var expected = [
      [9,4,[kota,motu]],
      [9,5,[kota,ishm,motu]],
      [9,6,[kota,ishm]],
      [9,7,[kota]],
      [9,8,[kota,ishm]],
      [9,9,[kota]]
    ];
    var res = ScheduleCalculator.combineMemberSchedule(event_data);
    res = ScheduleCalculator.removeEmptyDate(res);
    res = ScheduleCalculator.removeEmptyMonth(res);
    res = ScheduleCalculator.flattenResult(res);
    expect(res).toEqual(expected);
  });

  // TODO ordering is not implemented
  xit ( 'should format panel data', function () {
    var res = [
      [9,4,[kota,motu]],
      [9,5,[kota,ishm,motu]],
      [9,6,[kota,ishm]],
      [9,7,[kota]],
      [9,8,[kota,ishm]],
      [9,9,[kota]]
    ];
    var expected = {
      summary : "Max 3 people attends",
      filter  : 0,
      date    : "-1",
      data    : [
        { msg : "10/5 3 people attends",
          member : [ kota, ishm, motu ] },
        { msg : "10/4 2 people attends",
          member : [ kota, motu ] },
        { msg : "10/6 2 people attends",
          member : [ kota, ishm ] }
      ] };
    res = ScheduleCalculator.formatData(res);
    expect(res).toEqual(expected);
  });

});
