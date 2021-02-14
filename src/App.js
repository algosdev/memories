import React from 'react'
import Form from './components/Form'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import PostContainer from './components/PostContainer'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Header />
          <div className='grid'>
            <PostContainer />
            <Form />
          </div>
        </Route>
        <Route path='/login' exact>
          <Header />
          <LoginForm />
        </Route>
        <Route path='/signup' exact>
          <Header />
          <SignupForm />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
