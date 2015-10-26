jest.dontMock('../client/app/components/share_modal_body');
jest.dontMock('../client/app/fake_data');

describe ( 'ShareModalBody component', function () {
  var React = require('react/addons');
  var TestUtils     = React.addons.TestUtils;
  var ShareModalBody = require('../client/app/components/share_modal_body');
  var TEXT  = require('../client/app/text_content');
  var FakeData = require('../client/app/fake_data');

  var subject, data = { numer:2, denom:32, schedule : FakeData.getEventData().schedule };
  beforeEach( function () {
    subject = TestUtils.renderIntoDocument(<ShareModalBody data={data}/>);
  });

  it ( 'should render correct content', function () {
    var send_btn = TestUtils.scryRenderedDOMComponentsWithClass(subject, "modal-send");
    expect(send_btn.length).toBe(1);
  });

  it ( 'should change its state as input received', function () {
    var 
      send_btn = TestUtils.scryRenderedDOMComponentsWithClass(subject, "modal-send")[0],
      target   = TestUtils.scryRenderedDOMComponentsWithClass(subject, "modal-input-name"),
      target2  = TestUtils.findRenderedDOMComponentWithTag(subject, "textarea");
    expect(subject.state.name).toEqual("");
    expect(send_btn.className).toContain("disabled");
    expect(target2.textContent).toContain(TEXT.SHARE_DEFALT_NAME);
    expect(target.length).toBe(1);
    target[0].value ="Kota";
    TestUtils.Simulate.change(target[0]);
    expect(subject.state.name).toBe("Kota");
    expect(target2.value).toContain("Kota");
    expect(target2.value).toContain("10/6");
    expect(target2.value).toContain("10/7");
    expect(send_btn.className).not.toContain("disabled");
  });

});
    
  
