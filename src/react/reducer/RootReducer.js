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
	createUserPending: false,
	getThreadsPending: false,
	editThreadPending: false,
	deleteThreadPending: false,
	createThreadPending: false,
	getMessagesPending: false,
	editMessagesPending: false,
	deleteMessagePending: false,
	threads: null,
	messages: null,
	refresh: false
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
				users: action.users,
				refresh: false
		}
		case authenticationActions.CREATE_USER_PENDING:
			return {
				...state,
				createUserPending: true
		}
		case authenticationActions.CREATE_USER_SUCCESS:
			return {
				...state,
				createUserPending: false,
				refresh: true
		}
		case authenticationActions.DELETE_USER_PENDING:
			return {
				...state,
				deleteUserPending: true
		}
		case authenticationActions.DELETE_USER_SUCCESS:
			return {
				...state,
				deleteUserPending: false,
				refresh: true
		}
		case authenticationActions.EDIT_USER_PENDING:
			return {
				...state,
				editUserPending: true
		}
		case authenticationActions.EDIT_USER_SUCCESS:
			return {
				...state,
				editUserPending: false,
				refresh: true
		}
	case authenticationActions.GET_THREADS_PENDING:
		return {
			...state,
			getThreadsPending: true,
			error: null
	}
	case authenticationActions.GET_THREADS_SUCCESS:
		return {
			...state,
			getThreadsPending: false,
			threads: action.threads,
			refresh: false
	}
	case authenticationActions.CREATE_THREAD_PENDING:
		return {
			...state,
			createThreadPending: true
	}
	case authenticationActions.CREATE_THREAD_SUCCESS:
		return {
			...state,
			createThreadPending: false,
			refresh: true
	}
	case authenticationActions.DELETE_THREAD_PENDING:
		return {
			...state,
			deleteThreadPending: true
	}
	case authenticationActions.DELETE_THREAD_SUCCESS:
		return {
			...state,
			deleteThreadPending: false,
			refresh: true
	}
	case authenticationActions.EDIT_THREAD_PENDING:
		return {
			...state,
			editThreadPending: true
	}
	case authenticationActions.EDIT_THREAD_SUCCESS:
		return {
			...state,
			editThreadPending: false,
			refresh: true
	}
	case authenticationActions.GET_MESSAGES_PENDING:
		return {
			...state,
			getMessagesPending: true,
			error: null
	}
	case authenticationActions.GET_MESSAGES_SUCCESS:
		return {
			...state,
			getMessagesPending: false,
			messages: action.messages,
			refresh: false
	}
	case authenticationActions.CREATE_MESSAGE_PENDING:
		return {
			...state,
			createMessagePending: true
	}
	case authenticationActions.CREATE_MESSAGE_SUCCESS:
		return {
			...state,
			createMessagePending: false,
			error: null
	}
	case authenticationActions.DELETE_THREAD_SUCCESS:
		return {
			...state,
			deleteMessagePending: false,
			refresh: true
	}
		default:
			return state
	}
}

export default rootReducer