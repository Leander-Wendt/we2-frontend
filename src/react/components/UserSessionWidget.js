import React, {Component} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import * as authenticationActions from '../actions/AuthenticationActions'

const mapStateToProps = state => {
	return state
}

class UserSessionWidget extends Component {

	constructor(props){
		super(props)
		this.state = {
            show: false,
			enableBtn: false,
			enableWarning: false,
			userID: '',
			password: ''
		}
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
	}

	handleShow = (e) => {
		e.preventDefault()        
		const {showLoginDialogAction} = this.props
		showLoginDialogAction()
	}

	handleClose = () => {
        this.setState({show: false, userID: "", password: "", enableBtn: false, enableWarning: false})
		const {hideLoginDialogAction} = this.props
		hideLoginDialogAction()
	}

	handleChange = (e) => {
		const {name, value} = e.target
		this.setState({[name]: value}, () => {
			if(this.state.userID.trim() && this.state.password.trim()){
				this.setState({enableBtn: true})
			} else {
				this.setState({enableBtn: false})
			}	
		})			
	}

	handleSubmit = (e) => {		
		e.preventDefault()		
		const {userID, password} = this.state
		const {authenticateUserAction} = this.props
		authenticateUserAction(userID, password)
		this.setState({enableWarning: true})
	}

	handleLogout = (e) => {
		e.preventDefault()
		const {logoutAction} = this.props
		logoutAction()
	}

	render(){

		var showDialog = this.props.showLoginDialog
		if(showDialog === undefined) showDialog = false;
		

		const token = this.props.accessToken
		let button

		if(!token){
			button = <Button id="OpenLoginDialogButton" variant="custom" onClick={this.handleShow}>Login</Button>
		} else {
			button = <Button id="LogoutButton" variant="custom" onClick={this.handleLogout}>Logout</Button>
		}

		return(
			<>
				{button}

				<Modal show={showDialog} onHide={this.handleClose} centered>
					<Modal.Header closeButton>
						<Modal.Title>
							Login
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>Username</Form.Label>
								<Form.Control id="LoginUserIDInput" className="mb-3" type="text" name="userID" placeholder="Username" onChange={this.handleChange} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control id="LoginPasswordInput" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
							</Form.Group>
						</Form>
						<p hidden={!this.state.enableWarning} style={{color:"red", textAlign:"center"}}>Eingabedaten sind falsch.</p>
					</Modal.Body>
					
					<Modal.Footer>
                        <Button id="CancelButton" variant="custom" type="cancel" onClick={this.handleClose}>Cancel</Button>
						<Button id="LoginButton" disabled={!this.state.enableBtn} variant="custom" type="submit" onClick={this.handleSubmit}>Login</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
	hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
	authenticateUserAction: authenticationActions.authenticateUser,
	logoutAction: authenticationActions.getLogoutUserAction
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(UserSessionWidget)