import React, { Component } from "react"
import {connect} from 'react-redux'
import { Navigate } from 'react-router-dom'
import UserCard from "./UserCard"
import { bindActionCreators } from 'redux'
import AddUserModal from "./AddUserModal"
import EditUserModal from "./EditUserModal"
import DeleteUserModal from "./DeleteUserModal"

import * as authenticationActions from '../../actions/AuthenticationActions'
import AddUserButton from "./AddUserButton"

const mapStateToProps = state => {
	return state
}

class UserManagementPage extends Component {

	constructor(props){
		super(props)

        this.state = {
            showCreateModal: false,
            showEditModal: false,
            showDeleteModal: false,
            deleteID: null,
            editUser: null,
		}

        this.createUser = this.createUser.bind(this);
        this.closeCreateUser = this.closeCreateUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.closeEditUser = this.closeEditUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.closeDeleteUser = this.closeDeleteUser.bind(this);
        const {getUsersAction} = this.props
        this.props.user && getUsersAction(this.props.accessToken)
	}

    

    render() {
        if (this.props.refresh){
            const {getUsersAction} = this.props
            getUsersAction(this.props.accessToken)
        }
        
        let page
        if(this.props.isAdministrator){
            page = <h1>User Management</h1>
        } else {
            page = <Navigate to="/"/>
        }

        return (
            <>
                {page}
                {this.state.showCreateModal && <AddUserModal accessToken={this.props.accessToken} onClose={this.closeCreateUser}/>}
                {this.state.showEditModal && <EditUserModal user={this.state.editUser} accessToken={this.props.accessToken} onClose={this.closeEditUser}/>}
                {this.state.showDeleteModal && <DeleteUserModal accessToken={this.props.accessToken} userid={this.state.deleteID} onClose={this.closeDeleteUser}/>}
                <div style={{padding: "2rem", gap: "2rem", display: "flex", flexdirection: "row", flexWrap: "wrap"}}>
                    <AddUserButton onClick={this.createUser}/>
                    {(!this.props.getUsersPending && this.props.users && this.props.users.users) && this.props.users.users.map( user => <UserCard delete={this.deleteUser} edit={this.editUser} key={user.userID} data={user}/>)}
                </div>
            </>            
        )
    }

    createUser = () => {
        this.setState({showCreateModal: true})
    }

    closeCreateUser = () => {
        this.setState({showCreateModal: false})
    }

    deleteUser = (id) => {
        this.setState({showDeleteModal: true, deleteID: id})
    }

    closeDeleteUser = () => {
        this.setState({showDeleteModal: false, deleteID: null})
    }

    editUser = (user) => {
        this.setState({showEditModal: true, editUser: user})
    }

    closeEditUser = () => {
        this.setState({showEditModal: false, editUser: null})
    }
}



const mapDispatchToProps = dispatch => bindActionCreators({
	getUsersAction: authenticationActions.getUserData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementPage)