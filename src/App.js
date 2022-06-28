import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import PublicPage from './react/components/PublicPage'
import TopMenu from './react/components/TopMenu'
import PrivatePage from './react/components/PrivatePage'
import UserManagementPage from './react/components/userManagement/UserManagementPage'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

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
				<Router>
					<TopMenu />	
					<Routes>
						<Route path="/" element={page}/>
						<Route path="/userManagement" element={<UserManagementPage/>}/>

						<Route path="*" element={<Navigate to="/"/>}/>
					</Routes>
				</Router>		
			</div>
	)}
}

export default connect(mapStateToProps)(App)
