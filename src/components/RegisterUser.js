import React, { useReducer } from "react"
import {registerUser} from "../services/authServices"
import stateReducer from "../config/stateReducer"



const RegisterUser = (props) => {

	const [registerError, dispatchRegisterError] = useReducer(stateReducer,null)

	function handleRegister(event) {
		console.log("in handleregister")
		event.preventDefault()
		const form = event.target
		const username = form.elements.username.value
		const email = form.elements.email.value
		const password = form.elements.password.value

		// TBD: Register user with server and redirect to login.
		registerUser({username: username, email: email, password: password}).then((response) => {
			console.log("gotresponse from server:", response)
			props.history.push("/auth/login")
		}).catch((error) => {
			const status = error.response.status
			if(status === 409) {
				// This username is already registered. Let the user know.
				dispatchRegisterError({
					type: "setRegisterError",
					data: "This username already exists. Please login, or specify another username."
				})
			}
			console.log(`registration failed with error: ${error} and status: ${status} `)
		})
	}



	return (
		<form onSubmit={handleRegister}>
			{ registerError && <p className="has-text-danger">{ registerError }</p> }
			<label className="label">Username</label>
			<input type="text" className="input" name="username" placeholder="Username" required></input>
            <label className="label">Email address</label>
			<input type="email" className="input" name="email" placeholder="Email" required></input>
			<label className="label">Password</label>
			<input type="password" className="input" name="password" placeholder="Password" required></input>
			<input type="submit" value="Register" className="button is-info"></input>
		</form>
	)
}

export default RegisterUser
