import React, {Component} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import * as authenticationActions from '../../actions/AuthenticationActions'

class EditUserModal extends Component {

	constructor(props){
		super(props)
		this.state = {
			enableBtn: false,
			userID: this.props.user.userID,
            userName: this.props.user.userName,
			password: '',
            isAdministrator: this.props.user.isAdministrator
		}
        this.handleToggle = this.handleToggle.bind(this)
	}

	handleChange = (e) => {
		const {name, value} = e.target
		this.setState({[name]: value})			
	}

    handleToggle = () => {
		this.setState({isAdministrator: !this.state.isAdministrator})			
	}

	handleSubmit = (e) => {		
		e.preventDefault()	
		this.props.editUserAction(this.props.accessToken, this.state.userID, this.state.userName, this.state.password.trim(), this.state.isAdministrator)
        this.props.onClose()
	}

	render(){
		return(
			<>
				<Modal onHide={this.props.onClose} show={true} centered>
					<Modal.Header closeButton>
						<Modal.Title>
							Benutzer editieren
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>User ID</Form.Label>
								<Form.Control id="UserIDInput" className="mb-3" type="text" name="userID" value={this.props.user.userID} placeholder="User ID" onChange={this.handleChange} readOnly/>
							</Form.Group>
                            <Form.Group>
								<Form.Label>Username</Form.Label>
								<Form.Control id="UserNameInput" className="mb-3" type="text" name="userName" value={this.state.userName} placeholder="Username" onChange={this.handleChange} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control id="PasswordInput" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
							</Form.Group>
                            <Form.Group>
								<Form.Label>Is Admin</Form.Label>
								<Form.Check type="checkbox" id="IsAdministratorInput" name="isAdministrator" checked={this.state.isAdministrator} onChange={this.handleToggle}/>
                            </Form.Group>
						</Form>
					</Modal.Body>
					
					<Modal.Footer>
                        <Button id="CancelEditUserButton" variant="custom" type="cancel" onClick={this.props.onClose}>Cancel</Button>
						<Button id="SaveUserButton" disabled={!this.state.enableBtn} variant="custom" type="submit" onClick={this.handleSubmit}>Save</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	editUserAction: authenticationActions.editUser
}, dispatch)


export default connect(null, mapDispatchToProps)(EditUserModal)