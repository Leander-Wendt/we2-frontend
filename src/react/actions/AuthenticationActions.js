export const SHOW_LOGIN_DIALOG = "SHOW_LOGIN_DIALOG"
export const HIDE_LOGIN_DIALOG = "HIDE_LOGIN_DIALOG"
export const AUTHENTICATION_PENDING = "AUTHENTICATION_PENDING"
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS"
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR"
export const LOGOUT_USER = "LOGOUT_USER"
export const GET_USERS_PENDING = "GET_USERS_PENDING"
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS"
export const CREATE_USER_PENDING = "CREATE_USER_PENDING"
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS"
export const EDIT_USER_PENDING = "EDIT_USER_PENDING"
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS"
export const DELETE_USER_PENDING = "DELETE_USER_PENDING"
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS"

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

export function getCreatePendingAction(){
	return {
		type: CREATE_USER_PENDING
	}
}

export function getCreateSuccessAction(){
	return {
		type: CREATE_USER_SUCCESS
	}
}

export function getEditPendingAction(){
	return {
		type: EDIT_USER_PENDING
	}
}

export function getEditSuccessAction(){
	return {
		type: EDIT_USER_SUCCESS
	}
}

export function getDeletePendingAction(){
	return {
		type: DELETE_USER_PENDING
	}
}

export function getDeleteSuccessAction(){
	return {
		type: DELETE_USER_SUCCESS
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

export function createUser(token, id, name, pw, isAdmin) {
	return dispatch => {
		const pendingAction = getCreatePendingAction()
		dispatch(pendingAction)
		createUserQuery(token, id, name, pw, isAdmin)
			.then( 
				() => {
					const action = getCreateSuccessAction()
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

export function deleteUser(token, id){
	const requestOptions = {
		method: 'DELETE',
		mode: "cors",
		headers: {
			'Content-Type': 'application/json',
			'authorization': "Basic " + token
		}
	}
	return fetch('https://localhost/users/' + id, requestOptions)
		.then(handleUsersResponse)
		.then(users => {
			return users
		})
}

export function updateUser(token, id, name, pw, isAdmin){
	const requestOptions = {
		method: 'PUT',
		mode: "cors",
		headers: {
			'Content-Type': 'application/json',
			'authorization': "Basic " + token
		},
		body: JSON.stringify({
			"userID": id,
			"userName": name,
			"password": pw,
			"isAdministrator": isAdmin
		})
	}
	return fetch('https://localhost/users/', requestOptions)
}

function createUserQuery(token, id, name, pw, isAdmin){
	const requestOptions = {
		method: 'POST',
		mode: "cors",
		headers: {
			'Content-Type': 'application/json',
			'authorization': "Basic " + token
		},
		body: JSON.stringify({
			"userID": id,
			"userName": name,
			"password": pw,
			"isAdministrator": isAdmin
		})
	}
	return fetch('https://localhost/users/', requestOptions)
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