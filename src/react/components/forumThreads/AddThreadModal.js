import React, {Component} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import * as authenticationActions from '../../actions/AuthenticationActions'

class AddThreadModal extends Component {

	constructor(props){
		super(props)
		this.state = {
			enableBtn: false,
			name: '',
            description: "",
			ownerID: this.props.ownerID,
            isAdministrator: false
		}
	}

	handleChange = (e) => {
		const {name, value} = e.target
		this.setState({[name]: value}, () => {
			if(this.state.name.trim() && this.state.description.trim()){
				this.setState({enableBtn: true})
			} else {
				this.setState({enableBtn: false})
			}	
		})			
	}

	handleSubmit = (e) => {		
		e.preventDefault()		
		this.props.createThreadAction(this.props.accessToken, this.state)
        this.props.onClose()
	}

	render(){
		return(
			<>
				<Modal onHide={this.props.onClose} show={true} centered>
					<Modal.Header closeButton>
						<Modal.Title>
							Neuen Thread erstellen
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>Titel</Form.Label>
								<Form.Control id="ForumThreadNameInput" className="mb-3" type="text" name="name" placeholder="Titel" onChange={this.handleChange} />
							</Form.Group>
                            <Form.Group>
								<Form.Label>Inhalt</Form.Label>
								<Form.Control id="ForumThreadDescriptionInput" className="mb-3" type="text" name="description" placeholder="Inhalt" onChange={this.handleChange} />
							</Form.Group>
						</Form>
					</Modal.Body>
					
					<Modal.Footer>
                        <Button id="CancelCreateForumThreadButton" variant="custom" type="cancel" onClick={this.props.onClose}>Cancel</Button>
						<Button id="CreateForumThreadButton" disabled={!this.state.enableBtn} variant="custom" type="submit" onClick={this.handleSubmit}>Create</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	createThreadAction: authenticationActions.createThread
}, dispatch)


export default connect(null, mapDispatchToProps)(AddThreadModal)