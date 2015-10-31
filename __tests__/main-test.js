jest.dontMock('../client/app/components/main');

describe( 'Main compoent', function () {
  var React         = require('react/addons');
  var TestUtils     = React.addons.TestUtils;
  var Main          = require('../client/app/components/main');
  var MemDB         = require('../client/app/mem_db');

  it ( 'should invoke loadEvent method of MemDB', function () {
    var calls,
     event_id = "abcdefgh",
     data = {
       cal_data : {
         date : { year : 2015, month : 9, day : 31 },
         schedule : []
       },
       panel_data : null
     };
     TestUtils.renderIntoDocument(
       <Main data={data} params={{id:event_id}}/>
     );
     calls = MemDB.loadEventData.mock.calls;
     expect(calls[calls.length-1]).toEqual([event_id]);
  });
});
