import React, { Component } from "react"
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card';

const mapStateToProps = state => {
	return state
}

class MessageCard extends Component {
    render() {
        return (
            <>
                <Card id={this.props.id} style={{ width: '18rem', minWidth: 150 }} className="forumMessage">
                        <Card.Body>
                            <Card.Title>Titel: {this.props.data.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Autor: {this.props.data.authorID}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">{this.props.data.text}</Card.Subtitle>
                        </Card.Body>
                </Card>
            </>            
        )
    }
}

export default connect(mapStateToProps)(MessageCard)