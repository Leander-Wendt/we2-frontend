import React, { Component } from "react"
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card';

const mapStateToProps = state => {
	return state
}

class ThreadCard extends Component {
    render() {
        return (
            <>
                <Card id={this.props.id} style={{ width: '18rem', minWidth: 150 }} className="forumThread">
                        <Card.Body>
                            <Card.Title>Titel: {this.props.data.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Autor: {this.props.data.ownerID}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">{this.props.data.description}</Card.Subtitle>
                            <Card.Link onClick={() => {this.props.edit(this.props.data)}} user={this.props.data} id={"EditForumThreadButton" + this.props.data._id}>Edit</Card.Link>
                            <Card.Link onClick={() => {this.props.delete(this.props.data._id)}} id={"DeleteForumThreadButton" + this.props.data._id}>Delete</Card.Link>
                            <Card.Link onClick={() => {this.props.showMessages(this.props.data._id)}} id={"ViewForumThreadButton" + this.props.data._id}>Messages</Card.Link>
                        </Card.Body>
                </Card>
            </>            
        )
    }
}

export default connect(mapStateToProps)(ThreadCard)