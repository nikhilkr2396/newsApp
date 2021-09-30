import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  HashRouter
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
 
export default class App extends Component {
  pageSize = 12;

  state = {
    progress : 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress});
  }

  apiKey = process.env.REACT_APP_NEWS_API

  render() {
    return (
      <div>
        <HashRouter>
          
        <LoadingBar color='#cf352e'  progress={this.state.progress}  height = {3} />

        <Navbar/>
        
        <Switch>
            <Route exact path="/"> 
                <News apiKey = {this.apiKey}  setProgress = {this.setProgress}  pageSize={this.pageSize} country = "in" category = "general" key = "general"/> 
            </Route>
            
            <Route exact path="/business"> 
                <News apiKey = {this.apiKey}  setProgress = {this.setProgress}  pageSize={this.pageSize} country = "in" category = "business" key = "business"/> 
            </Route>

            <Route exact path="/entertainment"> 
                <News apiKey = {this.apiKey}  setProgress = {this.setProgress}  pageSize={this.pageSize} country = "in" category="entertainment" key = "entertainment"/> 
            </Route>

            <Route exact path="/general"> 
                <News apiKey = {this.apiKey}  setProgress = {this.setProgress}  pageSize={this.pageSize} country = "in" category="general" key = "general" /> 
            </Route>

            <Route exact path="/health"> 
                <News apiKey = {this.apiKey}  setProgress = {this.setProgress}  pageSize={this.pageSize} country = "in" category="health" key = "health" /> 
            </Route>

            <Route exact path="/science"> 
                <News apiKey = {this.apiKey}  setProgress = {this.setProgress}  pageSize={this.pageSize} country = "in" category="science" key = "science" /> 
            </Route>

            <Route exact path="/sports"> 
                <News apiKey = {this.apiKey}  setProgress = {this.setProgress}  pageSize={this.pageSize} country = "in" category="sports" key = "sports" /> 
            </Route>

            <Route exact path="/technology"> 
                <News apiKey = {this.apiKey}  setProgress = {this.setProgress}  pageSize={this.pageSize} country = "in" category="technology" key = "technology" /> 
            </Route>

        </Switch>
        </HashRouter>
      </div>
    )
  }
}
