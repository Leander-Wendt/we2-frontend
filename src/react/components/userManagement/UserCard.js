import React, { Component } from "react"
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card';

const mapStateToProps = state => {
	return state
}

class UserCard extends Component {

	constructor(props){
		super(props)
	}

    render() {
        return (
            <>
                <Card id={"UserItem" + this.props.data.userID} style={{ width: '18rem', minWidth: 150 }}>
                        <Card.Body>
                            <Card.Title>UserID: {this.props.data.userID}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Username: {this.props.data.userName}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Is Admin: {this.props.data.isAdministrator ? "Yes" : "No"}</Card.Subtitle>
                            <Card.Link id={"EditButton" + this.props.data.userID} >Edit</Card.Link>
                            <Card.Link id={"DeleteButton" + this.props.data.userID}>Delete</Card.Link>
                        </Card.Body>
                    </Card>
            </>            
        )
    }
}

export default connect(mapStateToProps)(UserCard)