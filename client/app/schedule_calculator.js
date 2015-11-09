var _ = require('underscore');
var genContainer = function () {
  return _.map(_.range(12), function (m) {
   return _.map(_.range(32), function (d) {
     return [m,d,[]];
   })
 });
};

var ScheduleCalculator = function(){};

ScheduleCalculator.prototype.calcEventPanelData = function(event_data) {
  var res = this.combineMemberSchedule(event_data);
  res = this.removeEmptyDate(res);
  res = this.removeEmptyMonth(res);
  res = this.flattenResult(res);
  res = this.formatData(res);
  return res;
};

ScheduleCalculator.prototype.combineMemberSchedule = function(event_data) {
  var res = genContainer();
  return _.map(_.range(12), function(m) {
    return _.map(_.range(32), function(d) {
      return _.reduce(event_data.member, function(acc, e) {
        if(e.schedule[m][d]!=0) { acc[2].push(e) };
        return acc;
      }, res[m][d])
    });
  });
};

ScheduleCalculator.prototype.removeEmptyDate = function(combined) {
  return _.map(combined, function(e) {
    return _.filter(e, function(ee) {
      return ee[2].length > 1;
    });
  });
};

ScheduleCalculator.prototype.removeEmptyMonth = function(removed) {
  return _.filter(removed, function(e) { return e.length!=0; });
}

ScheduleCalculator.prototype.flattenResult = function(res) {
  return _.reduce(res, function(acc,e) { return acc.concat(e); }, []);
}

ScheduleCalculator.prototype.formatData = function(raw) {
  var data = {};
  data.filter = 0;
  data.date = "-1";

  if(raw.length==0) {
    data.summary = "No match found...";
    data.data = [];
  } else {
    var ranking = _.sortBy(raw, function(e){ return e[2].length }).reverse();
    var top3 = _.first(ranking, 3);
    data.summary = "Max "+top3[0].length+" people attends";
    data.data = _.map(top3, function(e) {
      return {
        msg : (e[0]+1)+"/"+e[1]+" "+e[2].length+" people attends",
        member : e[2]
      };
    });
  }
  return data;
}

module.exports = new ScheduleCalculator();
