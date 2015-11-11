var _ = require('underscore');
var getEmptySchedule = function() {
  return _.map(_.range(12), function () {
    return _.map(_.range(32), function () {
      return 0;
    })
  });
};

module.exports = {
  getDummyEventData : function () {
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
    return event_data;
  },
  getDummyPanelData : function () {
    var s1 = getEmptySchedule();
    var s2 = getEmptySchedule();
    var s3 = getEmptySchedule();
    s1[9][4]=1;s1[9][5]=1;s1[9][6]=1;s1[9][7]=1;s1[9][8]=1;s1[9][9]=1;
               s2[9][5]=1;s2[9][6]=1;           s2[9][8]=1;
    s3[9][4]=1;s3[9][5]=1;
    var kota = { _id : "d", name:"Kota", leader:true , schedule : s1 };
    var ishm = { _id : "e", name:"Ishm", leader:false, schedule : s2 };
    var motu = { _id : "f", name:"motu", leader:false, schedule : s3 };
    return  {
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
  },
  getFakeEventData : function () {
    return {
      id     : 0,
      member : {
        "1" :
          { id : "1",
            name : "Kota",
            schedule :
                     [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,1,1,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0,1,1,0,1,0,1,1,1,0],
                     [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
        },
        "2" : { id : "2",
          name : "Mike",
          schedule :
                     [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [1,0,1,1,0,0,1,1,1,1,0,0,0,1,0,1,1,1,1,0,0,1,1,1,0,0,1,0,0,1,0,0],
                     [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
        },
        "3" : { id : "3",
          name : "Roy",
          schedule :
                     [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,1,1,1,1,0,0,1,1,1,0,0,1,0,1,0,1,0,0,0,1,1,1,0,1,1,1,1,0],
                     [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
        }
      }
    };
  },

  getFakeCalendar : function () {
    return {
      owner_id : "-1",
      year     : 2015,
      month    : 9,
      day      : 31,
      filter   : 0,
      schedule : [null,null,null,null,null,null,null,null,null,
                 [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                  ]
    }
  },
  getEventData : function () {
    return this.EVENT_DATA();
  },
  getPersonalData : function ( id ) {
    switch ( id ) {
      case 1: return this.KOTA_DATA();
    }
    return this.KOTA_DATA();
  },

  EVENT_DATA : function () { 
    var sched = [];
    sched[9] = [ 0,
                 0,0,0,0,0,1,1,
                 0,0,0,1,0,0,0,
                 0,0,1,0,0,0,0,
                 1,0,0,0,0,0,0,
                 0,0,0 ];
    return { schedule : sched }
  },

  KOTA_DATA : function () {
    var sched = [];
    sched[9] = [ 0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,
                 0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0 ];
    return {
      id   : 1,
      name : "Kota",
      schedule : sched
    }
  },

  PANEL1 : function () {
    return {
    summary : "Max 6 people attends",
    filter  : 0,
    date    : null,
    data    : [
      { msg : "10/18 6 people attends",
        avtr :
          [ { id : 0, name : "Michael", icon : 0 },
            { id : 1, name : "Ben"    , icon : 1 },
            { id : 2, name : "Mike"   , icon : 0 },
            { id : 3, name : "Mary"   , icon : 0 },
            { id : 4, name : "Mukami" , icon : 1 },
            { id : 5, name : "Roy"    , icon : 1 } ] },
      { msg : "10/24 4 people attends",
        avtr :
          [ { id : 0, name : "Michael", icon : 0 },
            { id : 2, name : "Mike"   , icon : 0 },
            { id : 4, name : "Mukami" , icon : 1 },
            { id : 5, name : "Roy"    , icon : 1 } ] },
      { msg : "10/28 3 people attends",
        avtr :
          [ { id : 0, name : "Michael", icon : 0 },
            { id : 3, name : "Mary"   , icon : 0 },
            { id : 4, name : "Mukami" , icon : 1 } ] }
    ]
  }
           },

  PANEL2 : function () {
    return {
    summary : "Max 3 people attends",
    filter  : 1,
    date    : null,
    data    : [
      { msg : "10/12 3 people attends",
        avtr :
          [ { id : 1, name : "Ben"    , icon : 1 },
            { id : 4, name : "Mukami" , icon : 1 },
            { id : 5, name : "Roy"    , icon : 1 } ] },
      { msg : "10/4 2 people attends",
        avtr :
          [ { id : 3, name : "Mary"   , icon : 0 },
            { id : 4, name : "Mukami" , icon : 1 } ] }
    ]
    }
  },

}
