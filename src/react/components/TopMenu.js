import React, { Component } from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
import UserSessionWidget from './UserSessionWidget'
import {connect} from 'react-redux'
import Engi from "../../images/Engi.png";
import {Link} from "react-router-dom"

const mapStateToProps = state => {
	return state
}

class TopMenu extends Component {

	constructor(props){
		super(props)
	}
	

	render() {
		let id
		if (this.props.accessToken){
			id = "OpenPrivatePageButton"
		} else {
			id = "OpenPublicPageButton"
		}
		return (
			<>
				<Navbar bg="light" expand="lg" sticky="top">
					<Container fluid>
						<Navbar.Brand to="/">
							<img width="60" height="60" src={Engi} className="d-inline-block align-center" alt="Engineer" />
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto" style={{gap:"1rem"}}>
								<Link to="/" style={{color:"black", textAlign:"center", textDecoration: "none"}} id={id}> Home </Link>
								{this.props.isAdministrator && <Link id="OpenUserManagementButton" style={{color:"black", textAlign:"center", textDecoration: "none"}} to="/userManagement"> User Management </Link>}
							</Nav>							
							<UserSessionWidget />
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</>
		)
	}
}

export default connect(mapStateToProps)(TopMenu)