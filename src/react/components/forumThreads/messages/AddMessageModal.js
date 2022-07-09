import React, {Component} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import * as authenticationActions from '../../../actions/AuthenticationActions'

class AddMessageModal extends Component {

	constructor(props){
		super(props)
		this.state = {
			enableBtn: false,
			title: "",
            text: "",
			authorID: this.props.authorID,
            forumThreadID: this.props.threadID
		}
	}

	handleChange = (e) => {
		const {name, value} = e.target
		this.setState({[name]: value}, () => {
			if(this.state.title.trim() && this.state.text.trim()){
				this.setState({enableBtn: true})
			} else {
				this.setState({enableBtn: false})
			}	
		})			
	}

	handleSubmit = (e) => {		
		e.preventDefault()		
		this.props.createMessageAction(this.props.accessToken, this.state)
        this.props.onClose()
	}

	render(){
		return(
			<>
				<Modal onHide={this.props.onClose} show={true} centered>
					<Modal.Header closeButton>
						<Modal.Title>
							Neue Nachricht erstellen
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>Titel</Form.Label>
								<Form.Control id="ForumMessageTitleInput" className="mb-3" type="text" name="title" placeholder="Titel" onChange={this.handleChange} />
							</Form.Group>
                            <Form.Group>
								<Form.Label>Inhalt</Form.Label>
								<Form.Control id="ForumMessageTextInput" className="mb-3" type="text" name="text" placeholder="Inhalt" onChange={this.handleChange} />
							</Form.Group>
						</Form>
					</Modal.Body>
					
					<Modal.Footer>
                        <Button id="CancelCreateForumMessageButton" variant="custom" type="cancel" onClick={this.props.onClose}>Cancel</Button>
						<Button id="CreateForumMessageButton" disabled={!this.state.enableBtn} variant="custom" type="submit" onClick={this.handleSubmit}>Create</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	createMessageAction: authenticationActions.createMessage
}, dispatch)


export default connect(null, mapDispatchToProps)(AddMessageModal)