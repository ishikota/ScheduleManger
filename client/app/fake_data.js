module.exports = {
  
  CALENDAR : { 
    date   : { year : 2015, month : 9 },
    status : [ 
      0,1,1,0,0,0,1,
      0,1,0,0,0,1,0,
      0,0,0,1,0,0,1,
      1,0,1,0,0,0,0,
      0,0,1 ]
  },

  PANEL : {
    summary : "Max 6 people attends",
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
}
