var _ = require('underscore');

var Util = {
  /* 
   * Return parsed schedule if passsed schedule contains onlu Number element,
   * else return -1 as invalid flg.
   */
  formatSchedule : function ( schedule ) {
    var valid = true;
    var parsed = _.map(schedule,function(e){return _.map(e,function(ee){
      if(isNaN(parseInt(ee))) { valid = false; }
      return parseInt(ee);
    })});
    return valid ? parsed : -1;
  }
}

module.exports = Util;
