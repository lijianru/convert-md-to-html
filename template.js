import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import * as readme from './README.md'

const App = () => (
  <BrowserRouter>
    <ul>
      <li><Link to="/readme">Home</Link></li>
    </ul>
    <Switch>
      <Route path="/readme">
        <div dangerouslySetInnerHTML={{__html: readme.default}}></div>
      </Route>
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('root'))
