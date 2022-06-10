import React, { Component } from "react"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import UserSessionWidget from './UserSessionWidget'
import Engi from "../../images/Engi.png";

class TopMenu extends Component {

	render() {
		return (
			<>
				<Navbar bg="light" expand="lg" sticky="top">
					<Container fluid>
						<Navbar.Brand href="#home">
							<img width="60" height="60" src={Engi} className="d-inline-block align-center" alt="Engineer" />
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link href="#home">Home</Nav.Link>
								<Nav.Link href="#link">Link</Nav.Link>
								<NavDropdown title="Dropdown" id="basic-nav-dropdown">
									<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
								</NavDropdown>
							</Nav>							
							<UserSessionWidget />
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</>
		)
	}
}

export default TopMenu