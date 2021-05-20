import { Component } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

class Header extends Component {

  render() { 

    const { userName } = this.props;

    return (
      <header className="Header">

        <h1>Tasty Yummy</h1>
        <nav>
          <NavLink to="/" exact={true}> Home </NavLink>
          <NavLink to="/recipes" exact={true}> Search Recipes </NavLink>
          <NavLink to="/favorites" exact={true}> My Favorites </NavLink>
          { userName
            ? <span> Hi { userName } </span>
            : <NavLink to="/auth"> sign in </NavLink>
          }
        </nav>
        
      </header>
    );
  }

}
 
export default Header;