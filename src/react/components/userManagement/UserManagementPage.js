import React, { Component } from "react"
import {connect} from 'react-redux'
import { Navigate } from 'react-router-dom'
import UserCard from "./UserCard"
import { bindActionCreators } from 'redux'

import * as authenticationActions from '../../actions/AuthenticationActions'
import { Row } from "react-bootstrap"
import { eventWrapper } from "@testing-library/user-event/dist/utils"

const mapStateToProps = state => {
	return state
}

class UserManagementPage extends Component {

	constructor(props){
		super(props)
        const {getUsersAction} = this.props
        this.props.user && getUsersAction(this.props.accessToken)
	}

    

    render() { 
       
        console.log(this.props.users)
        console.log(this.props.getUsersPending)
        console.log(typeof this.props.users)
        let page
        if(this.props.isAdministrator){
            page = <h1>User Management</h1>
        } else {
            page = <Navigate to="/"/>
        }
        return (
            <>
                {page}
                <div style={{padding: "2rem", gap: "2rem", display: "flex", flexdirection: "row", flexwrap: "wrap"}}>
                    
                    {(!this.props.getUsersPending && this.props.users && this.props.users.users) && this.props.users.users.map( user => <UserCard key={user.userID} data={user}/>)}
                </div>
            </>            
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
	getUsersAction: authenticationActions.getUserData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementPage)