import { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from '../home/Home';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';

import FoodPage from '../food/FoodPage';
import Favorites from '../favs/Favorites';
import AuthPage from '../../auth/AuthPage.js';


class App extends Component {


state = {
  token: window.localStorage.getItem('TOKEN'),
  userId: window.localStorage.getItem('USER_ID'),
  userName: window.localStorage.getItem('USER_NAME')
}

handleUser = user => {
  window.localStorage.setItem('USER_NAME', user.name);
  window.localStorage.setItem('USER_ID', user.id);
  window.localStorage.setItem('TOKEN', user.token);

  this.setState({ token: user.token });


}
  

render() {
  const { token, userName } = this.state;


  return (
    <div className="App">
      <Router>
        <Header userName={userName}/>

        <main>
          
          <Switch>
            <Route path="/" exact={true}
              render={routerProps => (
                <Home {...routerProps}/>
              )}
            />

            <Route path="/auth" exact={true}
              render={routerProps => (
                <AuthPage {...routerProps}
                  onUser={this.handleUser}/>
              )}
            />

            <Route path="/recipes" exact={true}
              render={routerProps => (
                token
                  ? <FoodPage {...routerProps}/>
                  : <Redirect to="/auth"/>
              )}
            />

            <Route path="/recipes/:id"
              render={routerProps => (
                <div>Implement a page for id {routerProps.match.params.id}</div>
              )}
            />

            <Route path="/favorites" exact={true}
              render={routerProps => (
                token
                  ? <Favorites {...routerProps}/>
                  : <Redirect to="/auth"/>
              )}
            />

            <Redirect to="/" />

          </Switch>
        </main>
        <Footer/>
      </Router>
    </div>
  );
}

}

export default App;
