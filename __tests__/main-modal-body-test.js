jest.dontMock('../client/app/components/main_modal_body');
jest.dontMock('../client/app/mem_db');

describe ( 'MainModalBody components', function () {
  var React          = require('react/addons');
  var TestUtils      = React.addons.TestUtils;
  var MemDB          = require('../client/app/mem_db');
  var MainModalBody  = require('../client/app/components/main_modal_body');

  describe( 'login', function () {
    it ( 'should change state of send btn', function () {
      var eid, subject, name_input, send_btn;

      eid = MemDB.createEvent();
      MemDB.createUser(eid, "Mike", [], true);
      subject = TestUtils.renderIntoDocument(<MainModalBody event_id={eid}/>);
      name_input = TestUtils.findRenderedDOMComponentWithClass(
        subject, "form-control login"
      );
      send_btn = TestUtils.findRenderedDOMComponentWithTag(
        subject, "button"
      );

      name_input.value = "Mike";
      TestUtils.Simulate.change(name_input);
      expect(send_btn.className).toContain("disabled");
      name_input.value = "Mikel";
      TestUtils.Simulate.change(name_input);
      expect(send_btn.className).not.toContain("disabled");
    });
  });

});
