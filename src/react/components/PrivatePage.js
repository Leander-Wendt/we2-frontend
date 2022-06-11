import React, {Component} from "react"
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return state
}

class PrivatePage extends Component {

	render(){
		return(
			<div className="page-content" id="PrivatePage">
                <h2>Wilkommen</h2>
			</div>
		)
	}
}

export default connect(mapStateToProps)(PrivatePage)