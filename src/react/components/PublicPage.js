import React, {Component} from "react"
import LoginButton from "./LoginButton"

class PublicPage extends Component {

	render(){
		return(
			<div className="page-content" id="LandingPage">
                <h2>Hier werden Foren dargestellt.{'\u2728'}</h2>
				<LoginButton />
			</div>
		)
	}
}

export default PublicPage