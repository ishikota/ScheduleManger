var React      = require('react');

/*
 * prop format
 * menu : 
 *   [ /default menu/ { title : ... , callback : ... } , 
 *     /menu1/        { title : ... , callback : ... },
 *     ...
 *    ]
 *
 */
var PanelHeader = React.createClass({
  propTypes : {
    menu : React.PropTypes.array.isRequired
  },
  getInitialState : function () {
       return {
         selected_idx : 0
       };
  },
  render : function () {
    return (
    <div className="panel panel-info">
      <div className="panel-heading">
        <div className="dropdown">
          <button className="btn btn-primary" type="button" data-toggle="dropdown">
            <span className="caret left"></span>
            {this.getSelectedMenuTitle()}
          </button>
          <ul className="dropdown-menu">
            {this.genMenu()}
          </ul>
        </div>
      </div>
    </div>
      );
  },
  getSelectedMenuTitle : function () {
    return this.props.menu[this.state.selected_idx].title;
  },
  genMenu : function () {
    return (
      this.props.menu
       .filter( function ( menu, i ) {
         return i != this.state.selected_idx;
       }.bind(this))
       .map( function ( menu, i ) {
         return (
           <li key={i} className="panel-menu-item"
                       onClick={this.handleClick(menu).bind(this)}>
             <a href="#">{menu.title}</a>
           </li>);
       }.bind(this))
    );
  },
  handleClick : function ( menu ) {
    return function ( ev ) {
      this.setState( { selected_idx : menu.id } );
      menu.callback(menu.id);
    };
  }
});

module.exports = PanelHeader;
