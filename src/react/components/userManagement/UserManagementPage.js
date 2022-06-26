import React, { Component } from "react"
import {connect} from 'react-redux'
import { Navigate } from 'react-router-dom'

const mapStateToProps = state => {
	return state
}

class UserManagementPage extends Component {

	constructor(props){
		super(props)
	}
    

    render() {
        let page
        console.log(this.props)
        if(this.props.isAdministrator){
            page = <div>User Management</div>
        } else {
            page = <Navigate to="/"/>
        }

        return (
            <>
                {page}
            </>            
        )
    }
}

export default connect(mapStateToProps)(UserManagementPage)