jest.dontMock('../client/app/components/main');

describe( 'Main compoent', function () {
  var React         = require('react/addons');
  var TestUtils     = React.addons.TestUtils;
  var Main          = require('../client/app/components/main');
  var MemDB         = require('../client/app/mem_db');

  var
    event_id = "abcdefgh",
    data = {
      cal_data : {
        date : { year : 2015, month : 9, day : 31 },
        schedule : []
      },
      panel_data : null
    };

  it ( 'should invoke loadEvent method of MemDB', function () {
    var calls;
     TestUtils.renderIntoDocument(
       <Main data={data} params={{id:event_id}}/>
     );
     calls = MemDB.loadEventData.mock.calls;
     expect(calls[calls.length-1]).toEqual([event_id]);
  });


  describe ( 'display loading content', function () {
    var before, subject, loading;
    beforeEach( function () {
      before = JSON.parse(JSON.stringify(MemDB.data));
    });
    afterEach( function () {
      MemDB.data = before;
    });

    it ( 'should dislay loading content', function () {
      MemDB.data = {};
      subject = TestUtils.renderIntoDocument( <Main data={data} params={{id:event_id}}/> );
      loading = TestUtils.scryRenderedDOMComponentsWithClass(subject, "loading");
      expect(loading.length).toBe(1);
    });

    it ( 'should not dislay loading content', function () {
      MemDB.data = {};
      MemDB.data.event_id = { id : "abc", leader : "1", member : [/*members*/] };
      subject = TestUtils.renderIntoDocument( <Main data={data} params={{id:event_id}}/> );
      loading = TestUtils.scryRenderedDOMComponentsWithClass(subject, "loading");
      expect(loading.length).toBe(0);
    });

  });


});
