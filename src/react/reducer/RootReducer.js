import * as authenticationActions from '../actions/AuthenticationActions'

const initialState = {
	user: null,
	loginPending: false,
	showLoginDialog: false,
	pending: false,
	accessToken: null,
	isAdministrator: null,
	users: null,
	error: null,
	getUsersPending: false,
	editUserPending: false,
	deleteUserPending: false,
	createUserPending: false
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
		case authenticationActions.GET_USERS_PENDING:
			return {
				...state,
				getUsersPending: true,
				error: null
		}
		case authenticationActions.GET_USERS_SUCCESS:
			return {
				...state,
				getUsersPending: false,
				users: action.users
		}
		case authenticationActions.CREATE_USER_PENDING:
			return {
				...state,
				createUserPending: true
		}
		case authenticationActions.CREATE_USER_SUCCESS:
			return {
				...state,
				createUserPending: false
		}
		case authenticationActions.DELETE_USER_PENDING:
			return {
				...state,
				deleteUserPending: true
		}
		case authenticationActions.DELETE_USER_SUCCESS:
			return {
				...state,
				deleteUserPending: false
		}
		case authenticationActions.EDIT_USER_PENDING:
			return {
				...state,
				editUserPending: true
		}
		case authenticationActions.EDIT_USER_SUCCESS:
			return {
				...state,
				editUserPending: false
		}
		default:
			return state
	}
}

export default rootReducer