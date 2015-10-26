var React = require('react');
var Modal = require('./modal');
var ShareModalBody = require('./share_modal_body');

var ShareModal = React.createClass({
  render : function () {
    return (
      <Modal title="Lets share!!">
        <ShareModalBody />
      </Modal>
    );
  }
});

module.exports = ShareModal;
