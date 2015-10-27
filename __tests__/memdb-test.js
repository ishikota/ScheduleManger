jest.dontMock('../client/app/mem_db')
jest.dontMock('../client/app/fake_data');

describe( 'MemDb', function () {
  var MemDB    = require('../client/app/mem_db');
  var FakeData = require('../client/app/fake_data');

  describe ( 'insert data', function () {
    var expected = FakeData.getFakeEventData();
    it ( 'should insert and retrieve data', function () {
      MemDB.insert(0, expected);
      expect(MemDB.find(0)).toEqual(expected);
    });
  });

});
