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

var unirest = require("unirest");

var req = unirest("GET", "https://tasty.p.rapidapi.com/recipes/list");

req.query({
	"from": "0",
	"size": "20",
	"tags": "under_30_minutes"
});

req.headers({
	"x-rapidapi-key": "89f81e7bd5mshd5de49e06c53005p1bc150jsnf985c53dffbe",
	"x-rapidapi-host": "tasty.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});
class App extends Component {

  

  render() {
    return (
      <div className="App">
        <Router>
          <Header/>
          <main>

            <Switch>
              <Route path="/" exact={true}
                render={routerProps => (
                  <Home {...routerProps}/>
                )}
              />

              <Route path="/resources" exact={true}
                render={routerProps => (
                  <div>Implement a page of resources</div>
                )}
              />

              <Route path="/resources/:id"
                render={routerProps => (
                  <div>Implement a page for id {routerProps.match.params.id}</div>
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
