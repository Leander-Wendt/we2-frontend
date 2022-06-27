import React, { Component } from "react"
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card';

const mapStateToProps = state => {
	return state
}

class UserCard extends Component {

	constructor(props){
		super(props)
        console.log(JSON.stringify(this.props.data))
        console.log(this.props)
	}

    render() {
        return (
            <>
                <Card id="UserItem%userID" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>UserID: {this.props.data.userID}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Username: {this.props.data.userName}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Is Admin: {this.props.data.isAdministrator}</Card.Subtitle>
                            <Card.Link id="EditButton%userID" href="#">Edit</Card.Link>
                            <Card.Link id="DelteButton%userID" href="#">Delete</Card.Link>
                        </Card.Body>
                    </Card>
            </>            
        )
    }
}

export default connect(mapStateToProps)(UserCard)