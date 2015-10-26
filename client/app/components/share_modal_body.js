var React   = require('react');
var TEXT    = require('../text_content');

var ShareModalBody = React.createClass({
  getInitialState : function () {
    return { name : "" }
  },
  render : function () {
    var share_tmplate,
        name = this.state.name ? this.state.name : TEXT.SHARE_DEFALT_NAME,
        send_class = "btn btn-primaty modal-send";
    share_tmplate = name+" created event!!";
    send_class += this.state.name ? "" : " disabled";
    return (
      <div>
        <div className="modal-body">
          <div className="form-group">
            <label forName="recipient-name" className="control-label">
              {TEXT.SHARE_NAME_LABEL}
            </label>
            <input type="text" className="form-control modal-input-name" 
                   id="recipient-name" placeholder={TEXT.SHARE_DEFALT_NAME} 
                   onChange={this.handleInput}/>
          </div>
          <div className="form-group">
            <label forName="template-msg" className="control-label">
              Share template
            </label>
            <textarea id="template-msg" className="form-control modal-share-txt"
                      rows="3" value={share_tmplate} onChange={this.dummyCallback}>
            </textarea>
          </div>
          <p>{TEXT.SHARE_BTN_TITLE}</p>
          <button type="button" className="btn btn-primary">Line</button>
          <button type="button" className="btn btn-primary">Facebook</button>
          <button type="button" className="btn btn-primary">Twitter</button>
        </div>
        <div className="modal-footer">
          <button type="button" className={send_class}>
            {TEXT.SHARE_BTN_SEND}
          </button>
        </div>
      </div>
    );
  },
  handleInput : function ( ev ) {
    this.setState( { name : ev.target.value } );
  },
  dummyCallback : function ( ev ) {
    /* needed to surpress jest warning */
  }
});

module.exports = ShareModalBody;
