module.exports = {
  getFakeEventData : function () {
    return {
      id     : 0,
      member : [
        { id : "1", 
          name : "Kota", 
          schedule : [null,null,null,null,null,null,null,null,null,
                     [0,0,0,0,0,0,1,1,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0,1,1,0,1,0,1,1,1],
                     [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
        },
        { id : "2",
          name : "Mike",
          schedule : [null,null,null,null,null,null,null,null,null,
                     [1,0,1,1,0,0,1,1,1,1,0,0,0,1,0,1,1,1,1,0,0,1,1,1,0,0,1,0,0,1,0],
                     [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
        },
        { id : "3",
          name : "Roy",
          schedule : [null,null,null,null,null,null,null,null,null,
                     [0,0,0,0,1,1,1,1,0,0,1,1,1,0,0,1,0,1,0,1,0,0,0,1,1,1,0,1,1,1,1],
                     [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
        }
      ]
    };
  },

  getFakeCalendar : function () {
    return {
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
