import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './Navbar.module.css';

const Cookies = require('js-cookie');

class Navbar extends Component {
  logout = async () => {
    await fetch('/users/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    });
    Cookies.remove('user_id');
    Cookies.remove('username');
    Cookies.remove('surname');
    Cookies.remove('name');
    
    window.location.reload()
  };

  
  render() {
    return (
      <div className={classes.Navbar}>
        <Link className={'textNav'} to={'/'}>Main menu</Link>
        <div className={'textNav'}>{Cookies.get('surname')} {Cookies.get(
          'name')} / {Cookies.get('username')}
          <Link className={'textNav'} onClick={this.logout}
                to={'/'}>Logout</Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
