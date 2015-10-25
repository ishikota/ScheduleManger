var React = require('react');
var TEXT = require('../text_content');

var MainHeadBtn = React.createClass({
  render : function () { 
    return (
      <btn>{TEXT.MAIN_HEADER_BUTTON_OFF}</btn>
    );
  }
});

module.exports = MainHeadBtn;
