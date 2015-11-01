jest.dontMock('../client/app/components/main_modal_body');
jest.dontMock('../client/app/mem_db');

describe ( 'MainModalBody components', function () {
  var React           = require('react/addons');
  var TestUtils       = React.addons.TestUtils;
  var MemDB           = require('../client/app/mem_db');
  var MainModalBody   = require('../client/app/components/main_modal_body');
  var TEXT            = require('../client/app/text_content');
  var ScheduleActions = require('../client/app/flux/ScheduleActions');

  describe( 'Check state change while user input', function () {
    var eid, subject, name_input, send_btn, hints, hint, tabs;
    beforeEach( function () {
      eid = MemDB.createEvent();
      MemDB.createUser(eid, "Mike", [], true);
      subject = TestUtils.renderIntoDocument(<MainModalBody event_id={eid}/>);
      send_btn = TestUtils.findRenderedDOMComponentWithTag(
        subject, "button"
      );
      hints = TestUtils.scryRenderedDOMComponentsWithClass(
        subject, "help-block"
      ),
      tabs  = TestUtils.scryRenderedDOMComponentsWithTag(
        subject, "a"
      );
    });

    it ( 'should switch mode', function () {
      expect(subject.state.registering).toBe(true);
      TestUtils.Simulate.click(tabs[1]);
      expect(subject.state.registering).toBe(false);
      TestUtils.Simulate.click(tabs[0]);
      expect(subject.state.registering).toBe(true);
    });

    var stateTest = function ( mode ) {
      TestUtils.Simulate.click(tabs[mode=="register" ? 0 : 1]);
      name_input = TestUtils.findRenderedDOMComponentWithClass(
        subject, "form-control "+mode
      );
      for( var idx in hints ) {
        if ( hints[idx].id == "help-"+mode ) {
          hint = hints[idx];
          break;
        }
      }
      //should not display error when no input
      if ( mode == "login" ) {
        expect(hint.className).toContain("hidden");
      }
      expect(send_btn.className).toContain("disabled");
      name_input.value = "Mike";
      TestUtils.Simulate.change(name_input);
      if ( mode == "login" ) {
        expect(hint.className).toContain("hidden");
        expect(send_btn.className).not.toContain("disabled");
      } else {
        expect(hint.className).not.toContain("hidden");
        expect(send_btn.className).toContain("disabled");
      }
      name_input.value = "Mikel";
      TestUtils.Simulate.change(name_input);
      if ( mode == "login" ) {
        expect(hint.className).not.toContain("hidden");
        expect(send_btn.className).toContain("disabled");
      } else {
        expect(hint.className).toContain("hidden");
        expect(send_btn.className).not.toContain("disabled");
      }
    };


    it ( 'should change hint state in login/register mode', function () {
      stateTest("login");
      stateTest("register");
    });

    describe ( 'should send pay load when valid name is given', function () {
      var calls;
      it ( 'should register account', function () {
        subject.state.registering   = true;
        subject.state.register_name = "Mikel";
        subject.handleSend( { dummy_event : true } );
        calls = ScheduleActions.registerAccount.mock.calls;
        expect(calls[calls.length-1][0]).toEqual(eid);
        expect(calls[calls.length-1][1]).toEqual("Mikel");
      });

      it ( 'should login account', function () {
        subject.state.registering   = false;
        subject.state.login_name = "Mike";
        subject.handleSend( { dummy_event : true } );
        calls = ScheduleActions.loginAccount.mock.calls;
        expect(calls[calls.length-1][0]).toEqual(eid);
        expect(calls[calls.length-1][1]).toEqual("Mike");
      });
    });
  });
});
