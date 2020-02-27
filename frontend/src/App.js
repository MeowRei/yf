import React, {Component} from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Layout from './Layout/Layout';
import SignIn from './components/SignIn/SignIn';
import Mainpage from './containers/mainpage/mainpage';
import Navbar from './containers/Navbar/Navbar';
import SignUp from './components/SignUp/SignUp';
import Loader from './containers/Loader/Loader';
// const Cookies = require('js-cookie');

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: '',
      logged_in: false,
      loading: false,
    };
  }

  handler = () => {
    this.setState({logged_in: true, loading: false});
  };

  logout = () => {
    this.setState({logged_in: false, loading: false});
  };
  
  componentDidMount = async () => {
    this.setState({loading: true});
    const response = await fetch('/users');
    const result = await response.json();
    if (result.user && result.cookie) {
      this.setState({user: result.user, loading: false, logged_in: true});
    } else {
      this.setState({loading: false, logged_in: false})
    }
  };


  render() {
    return (this.state.loading === true) ? (<Layout>
        <Loader/>
      </Layout>) :
      (this.state.logged_in === false) ? (<Layout>
          <div><Route path={'/'} render={(props) => {
            return (
                <div>
                  <SignIn {...props} handler={this.handler}/>
                </div>
            );
          }}/></div>
        </Layout>) :
        (<Layout>
            <Router>
              <div>
                <Route render={(props) => {
                  return (
                    <div>
                      <Route render={(props) => {
                        return (
                            <div>
                              <Navbar {...props} logout={this.logout} options={this.state.user.user}/>
                            </div>
                        );
                      }}/>
                      <Switch>
                        <Route path={'/registration'} component={SignUp}/>
                        <Route exact path={'/'} render={(props) => {
                          return (
                              <div>
                                <Mainpage {...props} options={this.state.user.user}/>
                              </div>
                          );
                        }}/>
                      </Switch>
                    </div>
                  );
                }}/>
              </div>
            </Router>
          </Layout>
        );
  }
}

export default App
