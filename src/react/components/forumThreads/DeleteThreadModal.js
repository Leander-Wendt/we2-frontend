import React, {Component} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import * as authenticationActions from '../../actions/AuthenticationActions'


class DeleteUserModal extends Component {

	handleSubmit = (e) => {		
		e.preventDefault()
		this.props.deleteThreadAction(this.props.accessToken, this.props.id)
        this.props.onClose()
	}

	render(){
		return(
			<>
				<Modal onHide={this.props.onClose} show={true} centered>
					<Modal.Header closeButton>
						<Modal.Title>
							Wollen Sie den Thread wirklich löschen?
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Button id="DeleteForumThreadConfirm" variant="custom" type="submit" onClick={this.handleSubmit}>Ja</Button>
							<Button id="DeleteForumThreadCancel" variant="custom" type="cancel" onClick={this.props.onClose}>Nein</Button>							
						</Form>
					</Modal.Body>
				</Modal>
			</>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	deleteThreadAction: authenticationActions.deleteThread
}, dispatch)


export default connect(null, mapDispatchToProps)(DeleteUserModal)