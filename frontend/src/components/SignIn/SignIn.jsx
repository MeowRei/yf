import React, {Component} from 'react';
import './SignIn.css';
const Cookies = require('js-cookie');

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      logged_in: null,
    }
  };

  refreshUsernameField = (e) => {
    this.setState({username: e.target.value})
  };

  refreshPasswordField = (e) => {
    this.setState({password: e.target.value})
  };

  signIn = async() => {
    let resp = await fetch('/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state)
    });
    

    const result = await resp.json();
    if (result.username) {
      const {_id, username, surname, name} = result;

      Cookies.set('user_id', _id);
      Cookies.set('username', username);
      Cookies.set('surname', surname);
      Cookies.set('name', name);
      
      this.props.handler()
      
    } else {
      alert('The password was entered incorrectly')
    }
  };


  render() {
    return (
      <div className={'logContainer'}>
        <h2>YFAC</h2>
        <br/>
          <input className={'logInput'} onChange={this.refreshUsernameField} placeholder="Name"/>
        <br/>
          <input className={'logInput'} onChange={this.refreshPasswordField} placeholder="Password" type="password"/>
        {this.state.logged_in === false ? <div>Check your username and password</div> : <div/>}
        <br/>
        <button type={'submit'} className={'logButton'} onClick={this.signIn}>Entrance</button>
      </div>
    );
  }
}


export default SignIn
