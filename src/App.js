import React, { Component } from 'react'
import './App.css'
import PublicPage from './react/components/PublicPage'
import TopMenu from './react/components/TopMenu'

class App extends Component {

	render() {
    return(
      <div className='App'>
        <TopMenu />
        <PublicPage />
      </div>
    )
	}
}

export default App
