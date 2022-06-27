import React, { Component } from "react"
import {connect} from 'react-redux'
import { Navigate } from 'react-router-dom'
import UserCard from "./UserCard"
import { bindActionCreators } from 'redux'

import * as authenticationActions from '../../actions/AuthenticationActions'

const mapStateToProps = state => {
	return state
}

class UserManagementPage extends Component {

	constructor(props){
		super(props)
	}

    render() {
        
        const {getUsersAction} = this.props
		getUsersAction(this.props.accessToken)
        console.log(this.props)

        let page
        if(this.props.isAdministrator){
            page = <h1>User Management</h1>
        } else {
            page = <Navigate to="/"/>
        }
        console.log(this.props)
        if (this.props.user !== null && !this.props.getUsersPending){
            for (const user of this.props.users){
                page.append(<UserCard data={user}/>)
            }
        }
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
	getUsersAction: authenticationActions.getUserData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementPage)