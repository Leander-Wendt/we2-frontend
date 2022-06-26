import * as authenticationActions from '../actions/AuthenticationActions'

const initialState = {
	user: null,
	loginPending: false,
	showLoginDialog: false,
	accessToken: null,
	isAdministrator: null,
	error: null
}

function rootReducer(state = initialState, action){

	console.log("Bin im reducer " + action.type)

	switch(action.type){
		case authenticationActions.SHOW_LOGIN_DIALOG:
			return {
				...state,
				showLoginDialog: true,
				error: null
			}
		case authenticationActions.HIDE_LOGIN_DIALOG:
			return {
				...state,
				showLoginDialog: false,
				error: null
			}
		case authenticationActions.AUTHENTICATION_PENDING:
			return {
				...state,
				pending: true,
				error: null
			}
		case authenticationActions.AUTHENTICATION_SUCCESS:
			return {
				...state,
				showLoginDialog: false,
				pending: false,
				user: action.user,
				accessToken: action.accessToken,
				isAdministrator: action.user.isAdministrator
			}
		case authenticationActions.AUTHENTICATION_ERROR:
			return {
				...state,
				pending: false,
				error: "Authentication failed"
			}
		case authenticationActions.LOGOUT_USER:
			return {
				...state,
				user: null,
				accessToken: null,
				isAdministrator: null
			}
		default:
			return state
	}
}

export default rootReducer