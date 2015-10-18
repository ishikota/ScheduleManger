var React = require('react');
var Panel = require('./panel');

/* Fake data */
var data = [
      [  { msg : "media1", avtr_ids : [0,0,0,0]         },
         { msg : "media2", avtr_ids : [0,1]             },
         { msg : "media3", avtr_ids : [1]               }  ],
      [  { msg : "media1", avtr_ids : [1,0,0]           },
         { msg : "media3", avtr_ids : [1,1]             }  ],
      [  { msg : "media1", avtr_ids : [0,1,1,0,0,1,1,0] },
         { msg : "media2", avtr_ids : [0,1,1,1,1,1]     },
         { msg : "media3", avtr_ids : [1,1,1]           }  ],
      [  { msg : "media1", avtr_ids : [1,0,0]           }  ]
    ];

var SchedulePanel = React.createClass({
  getInitialState : function () {
    return { 
      menu : [
        { id : 0, title : "default", fetch_data : this.fetchData(0) },
        { id : 1, title : "menu1"  , fetch_data : this.fetchData(1) },
        { id : 2, title : "menu2"  , fetch_data : this.fetchData(2) },
        { id : 3, title : "menu3"  , fetch_data : this.fetchData(3) } ]
    };
  },
  render : function () {
    return <Panel menu={this.state.menu} />;
  },
  fetchData : function ( flg ) {
    return function() {
      return data[flg];
    };
  }
});

module.exports = SchedulePanel;
