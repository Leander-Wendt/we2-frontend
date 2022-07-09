import React, { Component } from "react"
import {connect} from 'react-redux'
import { Navigate } from 'react-router-dom'
import ThreadCard from "./ThreadCard"
import { bindActionCreators } from 'redux'
import AddThreadModal from "./AddThreadModal"
import EditThreadModal from "./EditThreadModal"
import DeleteThreadModal from "./DeleteThreadModal"

import * as authenticationActions from '../../actions/AuthenticationActions'
import AddThreadButton from "./AddThreadButton"

const mapStateToProps = state => {
	return state
}

class ForumPage extends Component {

	constructor(props){
		super(props)

        this.state = {
            showCreateModal: false,
            showEditModal: false,
            showDeleteModal: false,
            deleteID: null,
            editThread: null
		}

        this.createThread = this.createThread.bind(this);
        this.closeCreateThread = this.closeCreateThread.bind(this);
        this.editThread = this.editThread.bind(this);
        this.closeEditThread = this.closeEditThread.bind(this);
        this.deleteThread = this.deleteThread.bind(this);
        this.closeDeleteThread = this.closeDeleteThread.bind(this);
        const {getThreadsAction} = this.props
        this.props.user && getThreadsAction(this.props.accessToken)
	}

    

    render() {
        if (this.props.refresh){
            const {getThreadsAction} = this.props
            getThreadsAction()
        }
        
        let page
        if(this.props.isAdministrator){
            page = <h1>Forum Threads</h1>
        } else {
            page = <Navigate to="/"/>
        }
        return (
            <>
                {page}
                {this.state.showCreateModal && <AddThreadModal accessToken={this.props.accessToken} ownerID={this.props.userID} onClose={this.closeCreateThread}/>}
                {this.state.showEditModal && <EditThreadModal thread={this.state.editThread} accessToken={this.props.accessToken} onClose={this.closeEditThread}/>}
                {this.state.showDeleteModal && <DeleteThreadModal accessToken={this.props.accessToken} id={this.state.deleteID} onClose={this.closeDeleteThread}/>}
                <div id="ForumThreadList" style={{padding: "2rem", gap: "2rem", display: "flex", flexdirection: "row", flexWrap: "wrap"}}>
                    <AddThreadButton onClick={this.createThread}/>
                    {(!this.props.getThreadsPending && this.props.threads) && this.props.threads.map( thread => <ThreadCard id={"ForumThread" + thread._id} delete={this.deleteThread} edit={this.editThread} key={thread._id} data={thread}/>)}
                </div>
            </>            
        )
    }

    createThread = () => {
        this.setState({showCreateModal: true})
    }

    closeCreateThread = () => {
        this.setState({showCreateModal: false})
    }

    deleteThread = (id) => {
        this.setState({showDeleteModal: true, deleteID: id})
    }

    closeDeleteThread = () => {
        this.setState({showDeleteModal: false, deleteID: null})
    }

    editThread = (thread) => {
        this.setState({showEditModal: true, editThread: thread})
    }

    closeEditThread = () => {
        this.setState({showEditModal: false, editUser: null})
    }

}



const mapDispatchToProps = dispatch => bindActionCreators({
	getThreadsAction: authenticationActions.getThreads
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ForumPage)