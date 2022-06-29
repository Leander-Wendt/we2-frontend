import React, {Component} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import * as authenticationActions from '../../actions/AuthenticationActions'

class AddUserModal extends Component {

	constructor(props){
		super(props)
		this.state = {
			enableBtn: false,
			userID: '',
            userName: "",
			password: '',
            isAdministrator: false
		}
        this.handleToggle = this.handleToggle.bind(this)
	}

	handleChange = (e) => {
		const {name, value} = e.target
		this.setState({[name]: value}, () => {
			if(this.state.userID.trim() && this.state.password.trim() && this.state.userName.trim()){
				this.setState({enableBtn: true})
			} else {
				this.setState({enableBtn: false})
			}	
		})			
	}

    handleToggle = () => {
		this.setState({isAdministrator: !this.state.isAdministrator})			
	}

	handleSubmit = (e) => {		
		e.preventDefault()		
		this.props.createUserAction(this.props.accessToken, this.state.userID, this.state.userName, this.state.password, this.state.isAdministrator)
        this.props.onClose()
	}

	render(){
		return(
			<>
				<Modal onHide={this.props.onClose} show={true} centered>
					<Modal.Header closeButton>
						<Modal.Title>
							Neuen Benutzer erstellen
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>User ID</Form.Label>
								<Form.Control id="UserIDInput" className="mb-3" type="text" name="userID" placeholder="User ID" onChange={this.handleChange} />
							</Form.Group>
                            <Form.Group>
								<Form.Label>Username</Form.Label>
								<Form.Control id="UserNameInput" className="mb-3" type="text" name="userName" placeholder="UserName" onChange={this.handleChange} />
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control id="PasswordInput" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
							</Form.Group>
                            <Form.Group>
								<Form.Label>Is Admin</Form.Label>
								<Form.Check type="checkbox" id="IsAdministratorInput" name="isAdministrator" onChange={this.handleToggle}/>
                            </Form.Group>
						</Form>
					</Modal.Body>
					
					<Modal.Footer>
                        <Button id="CancelButton" variant="custom" type="cancel" onClick={this.props.onClose}>Cancel</Button>
						<Button id="CreateUserButton" disabled={!this.state.enableBtn} variant="custom" type="submit" onClick={this.handleSubmit}>Create</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	createUserAction: authenticationActions.createUser
}, dispatch)


export default connect(null, mapDispatchToProps)(AddUserModal)