import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import { getShowLoginDialogAction } from '../actions/AuthenticationActions'
import {connect} from "react-redux"

class LoginButton extends Component {

	constructor(props){
		super(props)
		this.showLoginDialog = this.showLoginDialog.bind(this)
	}

	showLoginDialog(){
		const dispatch = this.props.dispatch
		dispatch(getShowLoginDialogAction())

	}

	render(){
		return(
			<div>
				<Button  id="MainPageLoginButton" variant="custom" onClick={this.showLoginDialog}>
					Login
				</Button>
			</div>
		)
	}
}

export default connect()(LoginButton)