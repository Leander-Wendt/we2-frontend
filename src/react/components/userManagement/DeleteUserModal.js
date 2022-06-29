import React, {Component} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import * as authenticationActions from '../../actions/AuthenticationActions'


class DeleteUserModal extends Component {

	handleSubmit = (e) => {		
		e.preventDefault()		
		console.log(this.props.accessToken)
		console.log(this.props.userid)
		this.props.deleteUserAction(this.props.accessToken, this.props.userid)
        this.props.onClose()
	}

	render(){
		console.log(this.props)
		return(
			<>
				<Modal onHide={this.props.onClose} show={true} centered>
					<Modal.Header closeButton>
						<Modal.Title>
							Wollen Sie den Benutzer wirklich löschen?
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Button id="DeleteUserConfirm" variant="custom" type="submit" onClick={this.handleSubmit}>Ja</Button>
							<Button id="DeleteUserCancel" variant="custom" type="cancel" onClick={this.props.onClose}>Nein</Button>							
						</Form>
					</Modal.Body>
				</Modal>
			</>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	deleteUserAction: authenticationActions.deleteUser
}, dispatch)


export default connect(null, mapDispatchToProps)(DeleteUserModal)