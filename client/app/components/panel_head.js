var React      = require('react');
var ScheduleActions = require('../flux/ScheduleActions');

/*
 * prop format ( passed menu is listed by the same order in arguments array ).
 * menu : 
 *   [ /selected menu  / { id : 0, title : ... },
 *     /dropdown menu1 / { id : 2, title : ... },
 *     ...
 *    ]
 *
 */
var PanelHeader = React.createClass({
  propTypes : {
    menu : React.PropTypes.array.isRequired
  },
  render : function () {
    return (
    <div className="panel panel-info">
      <div className="panel-heading">
        <div className="dropdown">
          <button className="btn btn-primary" type="button" data-toggle="dropdown">
            <span className="caret left"></span>
            {this.props.menu[0].title}
          </button>
          <ul className="dropdown-menu">
            {this.genMenu()}
          </ul>
        </div>
      </div>
    </div>
      );
  },
  genMenu : function () {
    return (
      this.props.menu.slice(1)
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
      //this.setState( { selected_idx : menu.id } );
      //menu.callback(menu.id);
      console.log("change filter called "+JSON.stringify(menu));
      ScheduleActions.changeFilter(0, menu.id);
    };
  }
});

module.exports = PanelHeader;
