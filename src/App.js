import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import PublicPage from './react/components/PublicPage'
import TopMenu from './react/components/TopMenu'
import PrivatePage from './react/components/PrivatePage'

const mapStateToProps = state => {
	return state
}

class App extends Component {

	render() {
		let page
		if(this.props.accessToken){
			page = <PrivatePage user={this.props.user} />
		} else {
			page = <PublicPage />
		}

		return (
			<div className="App">
				<TopMenu />
				{page}
			</div>
	)}
}

export default connect(mapStateToProps)(App)
