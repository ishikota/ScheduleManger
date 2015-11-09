jest.dontMock('../client/app/schedule_calculator');
jest.dontMock('../client/app/fake_data');


describe( 'calculate schedule', function () {
  var _ = require('underscore');
  var FakeData = require('../client/app/fake_data');
  var ScheduleCalculator = require('../client/app/schedule_calculator');

  var event_data = FakeData.getDummyEventData();
  var kota = event_data.member[0];
  var ishm = event_data.member[1];
  var motu = event_data.member[2];

  it ( 'should return empty result', function () {
    var data = FakeData.getDummyEventData();
    data.member[1].schedule[9][5] = 0;
    data.member[1].schedule[9][6] = 0;
    data.member[1].schedule[9][8] = 0;
    data.member[2].schedule[9][4] = 0;
    data.member[2].schedule[9][5] = 0;
    var expected = FakeData.getDummyPanelData();
    expected.summary = "No match found...";
    expected.data = [];
    expect(ScheduleCalculator.calcEventPanelData(data)).toEqual(expected);
  });

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
        expect(res[i].length).toBe(4);
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
      [9,8,[kota,ishm]],
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
