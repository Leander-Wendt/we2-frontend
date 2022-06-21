import React, {Component} from "react"
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return state
}

class PrivatePage extends Component {

	constructor(props){
		super(props)
	}

	render(){
		return(
			<div className="page-content" id="PrivatePage">
                <h2>Wilkommen, {this.props.user.userName}!</h2>
			</div>
		)
	}
}

export default connect(mapStateToProps)(PrivatePage)