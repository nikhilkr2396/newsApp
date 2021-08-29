import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 12;
  render() {
    return (
      <div>
        <Router>
        
        <Navbar/>
        
        <Switch>
            <Route exact path="/"> 
                <News pageSize={this.pageSize} country = "in" category = "general" key = "general"/> 
            </Route>
            
            <Route exact path="/business"> 
                <News pageSize={this.pageSize} country = "in" category = "business" key = "business"/> 
            </Route>

            <Route exact path="/entertainment"> 
                <News pageSize={this.pageSize} country = "in" category="entertainment" key = "entertainment"/> 
            </Route>

            <Route exact path="/general"> 
                <News pageSize={this.pageSize} country = "in" category="general" key = "general" /> 
            </Route>

            <Route exact path="/health"> 
                <News pageSize={this.pageSize} country = "in" category="health" key = "health" /> 
            </Route>

            <Route exact path="/science"> 
                <News pageSize={this.pageSize} country = "in" category="science" key = "science" /> 
            </Route>

            <Route exact path="/sports"> 
                <News pageSize={this.pageSize} country = "in" category="sports" key = "sports" /> 
            </Route>

            <Route exact path="/technology"> 
                <News pageSize={this.pageSize} country = "in" category="technology" key = "technology" /> 
            </Route>

        </Switch>
        </Router>
      </div>
    )
  }
}
