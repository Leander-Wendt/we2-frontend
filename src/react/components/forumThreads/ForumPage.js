import React, { Component } from "react"
import {connect} from 'react-redux'
import { Navigate } from 'react-router-dom'
import ThreadCard from "./ThreadCard"
import { bindActionCreators } from 'redux'
import AddThreadModal from "./AddThreadModal"
import AddMessageModal from "./messages/AddMessageModal"
import AddMessageButton from "./messages/AddMessageButton"
import MessageCard from "./messages/MessageCard"
import EditThreadModal from "./EditThreadModal"
import DeleteThreadModal from "./DeleteThreadModal"

import * as authenticationActions from '../../actions/AuthenticationActions'
import AddThreadButton from "./AddThreadButton"
import ShowThreadsButton from "./messages/ShowThreadsButton"

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
            editThread: null,
            showMessages: false,
            threadID: null,
            showCreateMessageModal: false
		}

        this.createThread = this.createThread.bind(this);
        this.closeCreateThread = this.closeCreateThread.bind(this);
        this.editThread = this.editThread.bind(this);
        this.closeEditThread = this.closeEditThread.bind(this);
        this.deleteThread = this.deleteThread.bind(this);
        this.closeDeleteThread = this.closeDeleteThread.bind(this);
        this.showMessages = this.showMessages.bind(this);
        this.showThreads = this.showThreads.bind(this);
        this.showAddMessage = this.showAddMessage.bind(this);
        this.closeAddMessage = this.closeAddMessage.bind(this);
        const {getThreadsAction} = this.props
        this.props.user && getThreadsAction(this.props.accessToken)    
        
	}

    

    render() {
        if (this.props.refresh){
            if (this.state.threadID && this.state.showMessages){                
                this.props.getMessagesAction(this.state.threadID)
            } else {
                const {getThreadsAction} = this.props
                getThreadsAction()
            }
        }
        let page
        if(this.props.isAdministrator){
            if (this.state.showMessages){
                page = <h1>Messages</h1>
            } else {
                page = <h1>Forum Threads</h1>
            }
        } else {
            page = <Navigate to="/"/>
        }
        return (
            <>
                {page}
                {this.state.showCreateModal && <AddThreadModal accessToken={this.props.accessToken} ownerID={this.props.userID} onClose={this.closeCreateThread}/>}
                {this.state.showEditModal && <EditThreadModal thread={this.state.editThread} accessToken={this.props.accessToken} onClose={this.closeEditThread}/>}
                {this.state.showDeleteModal && <DeleteThreadModal accessToken={this.props.accessToken} id={this.state.deleteID} onClose={this.closeDeleteThread}/>}              
                {this.state.showCreateMessageModal && <AddMessageModal authorID={this.props.user.userID} accessToken={this.props.accessToken} threadID={this.state.threadID} onClose={this.closeAddMessage}/>}
                <div hidden={this.state.showMessages} id="ForumThreadList" style={{padding: "2rem", gap: "2rem", display: "flex", flexdirection: "row", flexWrap: "wrap"}}>
                    <AddThreadButton onClick={this.createThread}/>
                    {(!this.props.getThreadsPending && this.props.threads) && this.props.threads.map( thread => <ThreadCard id={"ForumThread" + thread._id} showMessages={this.showMessages} delete={this.deleteThread} edit={this.editThread} key={thread._id} data={thread}/>)}
                </div>                
                <div hidden={!this.state.showMessages} style={{padding: "2rem", gap: "2rem", display: "flex", flexdirection: "row", flexWrap: "wrap"}}>
                    {this.state.showMessages && <ShowThreadsButton onClick={this.showThreads}/>}  
                    <AddMessageButton threadID={this.state.threadID} onClick={this.showAddMessage}/>
                    {(!this.props.getMessagesPending && this.state.showMessages && this.props.messages) && this.props.messages.map( message => <MessageCard id={"ForumMessage" + message._id} key={message._id} data={message}/>)}
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

    showMessages = (id) => {
        this.props.getMessagesAction(id)
        this.setState({showMessages: true, threadID: id})
    }

    showThreads = () => {
        this.setState({showMessages: false, threadID: null})
    }

    showAddMessage = () => {
        this.setState({showCreateMessageModal: true})
    }

    closeAddMessage = () => {
        this.setState({showCreateMessageModal: false})
    }
}



const mapDispatchToProps = dispatch => bindActionCreators({
	getThreadsAction: authenticationActions.getThreads,
    getMessagesAction: authenticationActions.getMessages
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ForumPage)