import React from 'react'
import { useGlobalContext } from './context'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CartContainer from './CartContainer'
// import Navbar from './Navbar'
// import ItemsList from './ItemsList'
// components

// import Navbar from './Navbar'
// import CartContainer from './CartContainer'
import Home from './Home'
// items

function App() {
  const { loading } = useGlobalContext()
  if (loading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <Router>
      {/* <Navbar />
      <ItemsList /> */}
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/cart'>
          <CartContainer />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
