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
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE"
export const EDIT_USER_PENDING = "EDIT_USER_PENDING"
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS"
export const EDIT_USER_FAILURE = "EDIT_USER_SUCCESS"
export const DELETE_USER_PENDING = "DELETE_USER_PENDING"
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS"
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE"

export const GET_THREADS_PENDING = "GET_THREADS_PENDING"
export const GET_THREADS_SUCCESS = "GET_THREADS_SUCCESS"
export const CREATE_THREAD_PENDING = "CREATE_THREAD_PENDING"
export const CREATE_THREAD_SUCCESS = "CREATE_THREAD_SUCCESS"
export const CREATE_THREAD_FAILURE = "CREATE_THREAD_FAILURE"
export const EDIT_THREAD_PENDING = "EDIT_THREAD_PENDING"
export const EDIT_THREAD_SUCCESS = "EDIT_THREAD_SUCCESS"
export const EDIT_THREAD_FAILURE = "EDIT_THREAD_SUCCESS"
export const DELETE_THREAD_PENDING = "DELETE_THREAD_PENDING"
export const DELETE_THREAD_SUCCESS = "DELETE_THREAD_SUCCESS"
export const DELETE_THREAD_FAILURE = "DELETE_THREAD_FAILURE"

export const GET_MESSAGES_PENDING = "GET_MESSAGES_PENDING"
export const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS"
export const CREATE_MESSAGE_PENDING = "CREATE_MESSAGE_PENDING"
export const CREATE_MESSAGE_SUCCESS = "CREATE_MESSAGE_SUCCESS"
export const CREATE_MESSAGE_FAILURE = "CREATE_MESSAGE_FAILURE"

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

export function getUserCreatePendingAction(){
	return {
		type: CREATE_USER_PENDING
	}
}

export function getUserCreateSuccessAction(){
	return {
		type: CREATE_USER_SUCCESS
	}
}

export function getUserEditPendingAction(){
	return {
		type: EDIT_USER_PENDING
	}
}

export function getUserEditSuccessAction(){
	return {
		type: EDIT_USER_SUCCESS
	}
}

export function getUserDeletePendingAction(){
	return {
		type: DELETE_USER_PENDING
	}
}

export function getUserDeleteSuccessAction(){
	return {
		type: DELETE_USER_SUCCESS
	}
}

export function getThreadsPendingAction(){
	return {
		type: GET_THREADS_PENDING
	}
}

export function getThreadsSuccessAction(data){
	return {
		type: GET_THREADS_SUCCESS,
		threads: data
	}
}

export function getThreadCreatePendingAction(){
	return {
		type: CREATE_THREAD_PENDING
	}
}

export function getThreadCreateSuccessAction(){
	return {
		type: CREATE_THREAD_SUCCESS
	}
}

export function getThreadEditPendingAction(){
	return {
		type: EDIT_THREAD_PENDING
	}
}

export function getThreadEditSuccessAction(){
	return {
		type: EDIT_THREAD_SUCCESS
	}
}

export function getThreadDeletePendingAction(){
	return {
		type: DELETE_THREAD_PENDING
	}
}

export function getThreadDeleteSuccessAction(){
	return {
		type: DELETE_THREAD_SUCCESS
	}
}

export function getMessagesPendingAction(){
	return {
		type: GET_MESSAGES_PENDING
	}
}

export function getMessagesSuccessAction(data){
	return {
		type: GET_MESSAGES_SUCCESS,
		messages: data
	}
}

export function getMessageCreatePendingAction(){
	return {
		type: CREATE_MESSAGE_PENDING
	}
}

export function getMessageCreateSuccessAction(){
	return {
		type: CREATE_MESSAGE_SUCCESS
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
		const pendingAction = getUserCreatePendingAction()
		dispatch(pendingAction)
		createUserQuery(token, id, name, pw, isAdmin)
			.then( 
				() => {
					const action = getUserCreateSuccessAction()
					dispatch(action)
				})
	}
}

export function deleteUser(token, id) {
	return dispatch => {
		const pendingAction = getUserDeletePendingAction()
		dispatch(pendingAction)
		deleteUserQuery(token, id)
			.then( 
				() => {
					const action = getUserDeleteSuccessAction()
					dispatch(action)
				})
	}
}

export function editUser(token, id, name, pw, isAdmin) {
	return dispatch => {
		const pendingAction = getUserEditPendingAction()
		dispatch(pendingAction)
		editUserQuery(token, id, name, pw, isAdmin)
			.then( 
				() => {
					const action = getUserEditSuccessAction()
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

export function getThreads() {
	return dispatch => {
		const pendingAction = getThreadsPendingAction()
		dispatch(pendingAction)
		getThreadsQuery()
			.then( 
				data => {
					const action = getThreadsSuccessAction(data)
					dispatch(action)
				})
	}
}

function getThreadsQuery(){
	const requestOptions = {
		method: 'GET',
		mode: "cors",
		headers: {
			'Content-Type': 'application/json'
		}
	}
	return fetch('https://localhost/forumThreads', requestOptions)
		.then(handleGenericResponse)
		.then(threads => {
			return threads
		})
}

export function createThread(token, thread) {
	return dispatch => {
		const pendingAction = getThreadCreatePendingAction()
		dispatch(pendingAction)
		createThreadQuery(token, thread)
			.then( 
				() => {
					const action = getThreadCreateSuccessAction()
					dispatch(action)
				})
	}
}

function createThreadQuery(token, thread){
	const requestOptions = {
		method: 'POST',
		mode: "cors",
		headers: {
			'Content-Type': 'application/json',
			'authorization': "Basic " + token
		},
		body: JSON.stringify({
			"name": thread.name,
			"description": thread.description,
			"ownerID": thread.ownerID
		})
	}
	return fetch('https://localhost/forumThreads', requestOptions)
}

export function updateThread(token, thread) {
	return dispatch => {
		const pendingAction = getThreadEditPendingAction()
		dispatch(pendingAction)
		updateThreadQuery(token, thread)
			.then( 
				() => {
					const action = getThreadEditSuccessAction()
					dispatch(action)
				})
	}
}

function updateThreadQuery(token, thread){
	const requestOptions = {
		method: 'PUT',
		mode: "cors",
		headers: {
			'Content-Type': 'application/json',
			'authorization': "Basic " + token
		},
		body: JSON.stringify({
			"name": thread.name,
			"description": thread.description
		})
	}
	return fetch('https://localhost/forumThreads/' + thread._id, requestOptions)
}

export function deleteThread(token, id) {
	return dispatch => {
		const pendingAction = getThreadDeletePendingAction()
		dispatch(pendingAction)
		deleteThreadQuery(token, id)
			.then( 
				() => {
					const action = getThreadDeleteSuccessAction()
					dispatch(action)
				})
	}
}

function deleteThreadQuery(token, id){
	const requestOptions = {
		method: 'DELETE',
		mode: "cors",
		headers: {
			'Content-Type': 'application/json',
			'authorization': "Basic " + token
		}
	}
	return fetch('https://localhost/forumThreads/' + id, requestOptions)
}

export function deleteUserQuery(token, id){
	const requestOptions = {
		method: 'DELETE',
		mode: "cors",
		headers: {
			'Content-Type': 'application/json',
			'authorization': "Basic " + token
		}
	}
	return fetch('https://localhost/users/' + id, requestOptions)
}

function editUserQuery(token, id, name, pw, isAdmin){
	let body
	if(pw){
		body = JSON.stringify({
			"userID": id,
			"userName": name,
			"password": pw,
			"isAdministrator": isAdmin
		})
	} else {
		body = JSON.stringify({
			"userID": id,
			"userName": name,
			"isAdministrator": isAdmin
		})
	}
	const requestOptions = {
		method: 'PUT',
		mode: "cors",
		headers: {
			'Content-Type': 'application/json',
			'authorization': "Basic " + token
		},
		body: body
	}
	return fetch('https://localhost/users/' + id, requestOptions)
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

export function getMessages(threadID) {
	return dispatch => {
		const pendingAction = getMessagesPendingAction()
		dispatch(pendingAction)
		getMessagesQuery(threadID)
			.then( 
				data => {
					const action = getMessagesSuccessAction(data)
					dispatch(action)
				})
	}
}

function getMessagesQuery(threadID){
	const requestOptions = {
		method: 'GET',
		mode: "cors",
		headers: {
			'Content-Type': 'application/json'
		}
	}
	return fetch('https://localhost/forumMessages?forumThreadID=' + threadID, requestOptions)
		.then(handleGenericResponse)
		.then(messages => {
			return messages
		})
}

export function createMessage(token, message) {
	return dispatch => {
		const pendingAction = getMessageCreatePendingAction()
		dispatch(pendingAction)
		createMessageQuery(token, message)
			.then( 
				() => {
					const action = getMessageCreateSuccessAction()
					dispatch(action)
				})
	}
}

function createMessageQuery(token, message){
	console.log(message, "hey")
	const requestOptions = {
		method: 'POST',
		mode: "cors",
		headers: {
			'Content-Type': 'application/json',
			'authorization': "Basic " + token
		},
		body: JSON.stringify({
			"forumThreadID": message.forumThreadID,
			"title": message.title,
			"text": message.text,
			"authorID": message.authorID
		})
	}
	return fetch('https://localhost/forumMessages', requestOptions)
}

function handleResponse(response){
	const authorizationHeader = response.headers.get("Authorization")
	return response.text().then(() => {

		let token
		if(authorizationHeader){
			token = authorizationHeader.split(" ")[1]
		}
		let payload = parseJWT(token)
		if(!response.ok){
			if(response.status === 401){
				logout()
			}
			const error = response.statusText
			return Promise.reject(error)
		} else {
			return {user: payload, 
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

function handleGenericResponse(response){
	return response.text().then(text => {
		return text && JSON.parse(text)
	})
}

function logout(){
	return dispatch => {
		dispatch(getLogoutUserAction())
	}
}

function parseJWT(token){
	return JSON.parse(atob(token.split('.')[1]))
}