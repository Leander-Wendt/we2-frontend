import React, { Component } from "react"
import {connect} from 'react-redux'
import { Navigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card';

import * as authenticationActions from '../../actions/AuthenticationActions'

const mapStateToProps = state => {
	return state
}

class UserManagementPage extends Component {

	constructor(props){
		super(props)
	}
    
    setDataInfo(element, object) {
        let cont = element.innerHTML;
        for (let key in object){
            let rexp = new RegExp("%" + key, "g");
            cont = cont.replace(rexp, object[key]);
        }
        element.innerHTML = cont;
    }

    render() {
        let page
        console.log(this.props)
        if(this.props.isAdministrator){
            page = <h1>User Management</h1>
        } else {
            page = <Navigate to="/"/>
        }

        let card = <Card id="UserItem%userID" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>%userID</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">%userName</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Is Admin: %isAdministrator</Card.Subtitle>
                            <Card.Link id="EditButton%userID" href="#">Edit</Card.Link>
                            <Card.Link id="DelteButton%userID" href="#">Delete</Card.Link>
                        </Card.Body>
                    </Card>

        this.props.users.forEach(user => {
            page.append(card)
            this.setDataInfo(page, user)
        })
        return (
            <>
                <div style={{gap: "2rem"}}>
                    {page}
                </div>
            </>            
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
	showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
	hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
	authenticateUserAction: authenticationActions.authenticateUser,
	logoutAction: authenticationActions.getLogoutUserAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementPage)