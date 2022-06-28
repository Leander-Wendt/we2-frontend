export const SHOW_LOGIN_DIALOG = "SHOW_LOGIN_DIALOG"
export const HIDE_LOGIN_DIALOG = "HIDE_LOGIN_DIALOG"
export const AUTHENTICATION_PENDING = "AUTHENTICATION_PENDING"
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS"
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR"
export const LOGOUT_USER = "LOGOUT_USER"
export const GET_USERS_PENDING = "GET_USERS_PENDING"
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS"

export function getShowLoginDialogAction(){
	return {
		type: SHOW_LOGIN_DIALOG
	}
}

export function getHideLoginDialogAction(){
	return {
		type: HIDE_LOGIN_DIALOG
	}
}

export function getAuthenticationPendingAction(){
	return {
		type: AUTHENTICATION_PENDING
	}
}

export function getAuthenticationSuccessAction(userSession){
	return {
		type: AUTHENTICATION_SUCCESS,
		user: userSession.user,
		userID: userSession.userID,
		accessToken: userSession.accessToken
	}
}

export function getAuthenticationErrorAction(error){
	return {
		type: AUTHENTICATION_ERROR,
		error: error
	}
}

export function getLogoutUserAction(){
	return {
		type: LOGOUT_USER
	}
}

export function getUsersPendingAction(){
	return {
		type: GET_USERS_PENDING
	}
}

export function getUsersSuccessAction(data){
	return {
		type: GET_USERS_SUCCESS,
		users: data
	}
}

export function authenticateUser(userID, password){
	return dispatch => {
		dispatch(getAuthenticationPendingAction())
		login(userID, password)
		.then(			
			userSession => {
				const action = getAuthenticationSuccessAction(userSession)
				dispatch(action)
			},
			error => {
				dispatch(getAuthenticationErrorAction(error))
			}
		)
		.catch(error => {
			dispatch(getAuthenticationErrorAction(error))
		})
	}
}

function login(userID, password){
	const credentials = btoa(userID + ":" + password)
	const requestOptions = {
		method: 'GET',
		mode: "cors",
		headers: {
			'Content-Type': 'application/json',
			'authorization': 'Basic ' + credentials
		}
	}
	return fetch('https://localhost/authenticate', requestOptions)
		.then(handleResponse)
		.then(userSession => {
			return userSession
		})
}

export function getUserData(token) {
	return dispatch => {
		const pendingAction = getUsersPendingAction()
		dispatch(pendingAction)
		getUsers(token)
			.then( 
				data => {
					const action = getUsersSuccessAction(data)
					dispatch(action)
				})
	}
}

function getUsers(token){
	const requestOptions = {
		method: 'GET',
		mode: "cors",
		headers: {
			'Content-Type': 'application/json',
			'authorization': "Basic " + token
		}
	}
	return fetch('https://localhost/users', requestOptions)
		.then(handleUsersResponse)
		.then(users => {
			return users
		})
}

function handleResponse(response){
	const authorizationHeader = response.headers.get("Authorization")
	return response.text().then(text => {

		let token
		const data = text && JSON.parse(text)
		if(authorizationHeader){
			token = authorizationHeader.split(" ")[1]
		}

		if(!response.ok){
			if(response.status === 401){
				logout()
			}
			const error = response.statusText
			return Promise.reject(error)
		} else {
			return {user: data, 
					accessToken: token}
		}
	})
}

function handleUsersResponse(response){
	return response.text().then(text => {
		const data = text && JSON.parse(text)
		return {users: data}
	})
}

function logout(){
	return dispatch => {
		dispatch(getLogoutUserAction())
	}
}