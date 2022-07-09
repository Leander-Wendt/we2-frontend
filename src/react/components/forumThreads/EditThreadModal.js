import React, {Component} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import * as authenticationActions from '../../actions/AuthenticationActions'

class EditThreadModal extends Component {

	constructor(props){
		super(props)
		this.state = {
			enableBtn: true,
			name: this.props.thread.name,
            description: this.props.thread.description,
            ownerID: this.props.thread.ownerID,
            _id: this.props.thread._id
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
		this.props.editThreadAction(this.props.accessToken, this.state)
        this.props.onClose()
	}

	render(){
		return(
			<>
				<Modal onHide={this.props.onClose} show={true} centered>
					<Modal.Header closeButton>
						<Modal.Title>
							Thread editieren
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>Titel</Form.Label>
								<Form.Control id="ForumThreadNameInput" className="mb-3" type="text" name="name" value={this.state.name} placeholder="Titel" onChange={this.handleChange}/>
							</Form.Group>
                            <Form.Group>
								<Form.Label>Inhalt</Form.Label>
								<Form.Control id="ForumThreadDescriptionInput" className="mb-3" type="text" name="description" value={this.state.description} placeholder="Inhalt" onChange={this.handleChange} />
							</Form.Group>
						</Form>
					</Modal.Body>
					
					<Modal.Footer>
                        <Button id="CancelEditForumThreadButton" variant="custom" type="cancel" onClick={this.props.onClose}>Cancel</Button>
						<Button id="SaveForumThreadButton" disabled={!this.state.enableBtn} variant="custom" type="submit" onClick={this.handleSubmit}>Save</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	editThreadAction: authenticationActions.updateThread
}, dispatch)


export default connect(null, mapDispatchToProps)(EditThreadModal)